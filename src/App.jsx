import { useState,useEffect } from "react";
import { StartScreen, PlayScreen } from "./Screens";
import useSound from 'use-sound';

import boopSfx from '../docs/matched.mp3';

function App() {
  const [gameState, setGameState] = useState("start");
  
  
  switch (gameState) {
    case "start":
      return <StartScreen start={() => setGameState("play")} gameState={gameState} />;
    case "play":
      return <PlayScreen end={() => setGameState("start")} />;
    default:
      throw new Error("Invalid game state " + gameState);
  }
  
 
  
}

export default App;
