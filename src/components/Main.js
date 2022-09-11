import React, { useState, useEffect } from 'react';
import Login from './Login';
import Board from './Board';

const Main = () => {
  const [gameStart, setGameStart] = useState(false);
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);

  const [gameId, setGameId] = useState(() => {
    const saved = localStorage.getItem('gameId');
    const initValue = JSON.parse(saved);
    return initValue || 1;
  });

  const [gameData, setGameData] = useState(() => {
    const saved = localStorage.getItem('gameData-ttt');
    const initValue = JSON.parse(saved);
    return initValue || [];
  });

  let data = [];

  let date = new Date();
  let showDate = date.toDateString();
  let getTime =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  let showTime = getTime.toString();

  const setData = () => {
    data = [
      `${gameId}. ${showDate}/${showTime} - ${playerOne}: ${playerOneScore}, Draw: ${drawScore}, ${playerTwo}: ${playerTwoScore}`,
    ];
  };

  // if (gameEnd) {
  //   setData();
  // }

  if (gameEnd) {
    setData();
  }

  const gameInit = () => {
    setGameId(gameId + 1);
    setGameEnd(false);
    setGameStart(false);
    setData();
    setGameData((prev) => [...prev, data]);
    setPlayerOne('');
    setPlayerTwo('');
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setDrawScore(0);
  };

  useEffect(() => {
    localStorage.setItem('gameData-ttt', JSON.stringify(gameData));
  }, [gameData]);

  useEffect(() => {
    localStorage.setItem('gameId', JSON.stringify(gameId));
  }, [gameId]);

  return (
    <div className='main'>
      <div>
        {gameStart && (
          <Board
            setGameStart={setGameStart}
            setData={setData}
            playerOneScore={playerOneScore}
            playerTwoScore={playerTwoScore}
            setPlayerOneScore={setPlayerOneScore}
            setPlayerTwoScore={setPlayerTwoScore}
            drawScore={drawScore}
            playerOne={playerOne}
            playerTwo={playerTwo}
            setGameEnd={setGameEnd}
            gameEnd={gameEnd}
            setDrawScore={setDrawScore}
            gameInit={gameInit}
          />
        )}
      </div>
      <div>
        {!gameStart && (
          <Login
            playerOne={playerOne}
            playerTwo={playerTwo}
            setGameStart={setGameStart}
            setPlayerOne={setPlayerOne}
            setPlayerTwo={setPlayerTwo}
            setData={setData}
          />
        )}
      </div>
      <div>
        <div className='game-history'>
          <div>
            {gameData.map((el, index) => {
              return <div key={index}>{el}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
