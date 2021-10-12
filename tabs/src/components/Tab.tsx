//import * as microsoftTeams from "@microsoft/teams-js";
import { Form, Input } from "@fluentui/react-northstar";
import React from "react";
import Iframe from "react-iframe";

export default function PokerGame() {

  const defaultURL = "https://www.pokernow.club/start-game";
  const [gameURL, setGameURL] = React.useState(defaultURL);
  const [updateGameURL, setUpdateGameURL] = React.useState(false);

  const onEnter = React.useCallback(() => {
    setUpdateGameURL(true);
  }, [setUpdateGameURL])

  const onURLChange = React.useCallback((e: React.SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    if (value.length === 0) {
      setGameURL(defaultURL);
      setUpdateGameURL(false);
    }
    else {
      setGameURL(value);
    }
  }, [setUpdateGameURL, setGameURL]);


  return ( 
  <div>
    <Form styles={{height: "min-content"}} onSubmit={onEnter}>
    <Input placeholder="Enter game URL..." fluid value={gameURL} onChange={onURLChange}/>
    </Form>
    {updateGameURL ? <Iframe url={gameURL} width="100%" height="100%"/> : 
    <Iframe url={defaultURL} width="100%" height="100%"/> }
    
  </div>
  );
}
