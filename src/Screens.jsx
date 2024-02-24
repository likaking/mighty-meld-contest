import { useState } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";

import gameSong from "../docs/start.wav";
import clickedSound from "../docs/click-soundFXX.mp3";
import matchedSound from "../docs/matchedFX.mp3";


 

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

import {MdDarkMode, MdLightMode, MdOutlineLightMode, MdOutlineDarkMode} from "react-icons/md";


export function StartScreen({ start, gameState }) {
const [playSound, setPlaySound] = useState(false);
 let gameTune = new Audio(gameSong)	
 

   return (
    <div className={`pt-[40px] w-[100%] h-[100vh]`} >
    <div 
      className={
        "flex flex-col items-center justify-top bg-pink-50 lg:w-[400px] xl:w-[400px] md:w-[400px] sm:w-[400px] h-[400px] m-auto inline-block mt-[80px] md:mt-[80px] rounded-2xl"
      }
    >
      <div className="text-[40px] text-pink-600 font-bold pt-[60px] pb-[20px]">
        Memory
      </div>
      <div className="text-[20px] text-pink-600 font-normal pb-[50px]">
        Flip over tiles looking for pairs
      </div>
      <div className="mt-[0px]">
        <button
          onClick={start}
          className="text-white p-1 rounded-full w-[150px] text-[25px] bg-pink-600 bg-gradient-to-t from-pink-600 to-pink-400 shadow-lg"
        >
          Play
        </button>
      </div>
      <audio src={"docs/start.wav"} autoPlay={true} />
    </div>
	</div>
  );
}

export function PlayScreen({ end }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  let clickSound = new Audio(clickedSound)
  let matched = new Audio(matchedSound)
  
  
  clickSound.volume = 0.5

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
	  clickSound.play()
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti({
          ticks: 100,
        });
		setTimeout(()=>{matched.play()},220)
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <>
	  <div className={`${!darkMode ? "bg-white" : "bg-zinc-800"} pt-[40px] w-[100%] h-[100vh]`}>
	  
	  <div className={`flex flex-row items-center justify-center text-[22px] ${!darkMode ? "text-indigo-500" : "text-zinc-200" } font-medium m-auto lg:w-[637px] xl:w-[637px] md:w-[637px] sm:w-[400px] mt-[0px] xl:mt-[0px]`}>
	  <span>Tries</span>
	  <span className={`flex  items-center ${!darkMode ? "bg-indigo-200" : "bg-zinc-600"} flex flex-row items-center justify-center ml-[15px] min-w-[38px] p-[0px] text-center rounded-md`}>{tryCount}</span>
	  </div>
	  
      <div className={`flex flex-wrap ${
            !darkMode ? "bg-indigo-50" : "bg-zinc-500"
          } p-[7px] lg:w-[400px] xl:w-[400px] md:w-[400px] sm:w-[400px] h-[100vw] sm:h-[55vw] md:h-[400px] lg:h-[400px] xl:h-[400px] 2xl:h-[400px] m-auto inline-block mt-[50px] xl:mt-[50px] rounded-2xl`}>
        {getTiles(16).map((tile, i) => (
          <Tile key={i} flip={() => flip(i)} {...tile} darkMode={darkMode} setDarkMode={setDarkMode} />
        ))}
      </div>
	  
	  <div
          className={
            `flex items-center justify-center ${!darkMode ? "bg-indigo-200" : "bg-zinc-600"} p-[5px] m-auto mt-[40px] w-fit text-[30px] ${!darkMode ? "text-indigo-400" : "text-zinc-400" } rounded-full`
          }
        >
          {!darkMode ? (
            <span onClick={() => setDarkMode(true)}>
              <MdDarkMode />
            </span>
          ) : (
            <span onClick={() => setDarkMode(false)}>
			  <MdLightMode />
            </span>
          )}
        </div>
		
       </div>
    </>
  );
}
