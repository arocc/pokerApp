import { Button, Flex, Input } from "@fluentui/react-northstar";
import React from "react";
import Iframe from "react-iframe";
import * as microsoftTeams from "@microsoft/teams-js";

export default function PokerGame() {

  const prompt = "";
  const defaultURL = "https://www.pokernow.club/start-game";
  const [gameURL, setGameURL] = React.useState(prompt);
  const [updateGameURL, setUpdateGameURL] = React.useState(false);
  const [showURLBar, setShowURLBar] =React.useState(true);

  const onEnter = React.useCallback(() => {
    setUpdateGameURL(true);
    setShowURLBar(false);
  
    microsoftTeams.meeting.getAppContentStageSharingCapabilities((err, appContentStageSharingCapabilities) => {
      if (appContentStageSharingCapabilities) {
        //alert(appContentStageSharingCapabilities.doesAppHaveSharePermission);
      }
      else if (err) {
        alert(gameURL);
        console.log("Error with API call.");
      }
    });

   microsoftTeams.meeting.shareAppContentToStage((err, result) => {
    console.log("shareURL: ", gameURL);
    console.log("[Poker App] error", err);
    console.log("[Poker App] result", result);

      if (err) {
        alert(err.message);
      }
    }, gameURL);

  }, [gameURL, setUpdateGameURL]);

  const onURLChange = React.useCallback((e: React.SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;

      setGameURL(value);
    
  }, [setGameURL]);


  return ( 
  <div id="wrapper">
    {showURLBar ? <Flex>
      <Input fluid value={gameURL} onChange={onURLChange}/>
      <Button content="Submit" onClick={onEnter}/>
    </Flex> : (<></>)} 
    {updateGameURL ? <Iframe id="frame" url={gameURL} width="100%" height="100%"/> : 
    <Iframe id="frame" url={defaultURL} width="100%" height="100%"/> }
  </div>
  );
}
