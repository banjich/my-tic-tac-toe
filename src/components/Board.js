import React, { useState } from 'react';
import EndGame from './EndGame';

const Board = ({
  playerOneScore,
  playerTwoScore,
  setPlayerOneScore,
  setPlayerTwoScore,
  drawScore,
  setDrawScore,
  playerOne,
  playerTwo,
  setGameEnd,
  gameEnd,
  gameInit,
}) => {
  const [turn, setTurn] = useState(playerOne);
  const [board, setBoard] = useState(Array(9).fill(''));
  const [squareClassName, setSquareClassName] = useState('squareEl');
  const [message, setMessage] = useState(`It's ${playerOne}'s turn`);
  const [roundCounter, setRoundCounter] = useState(8);

  const squareStyle = {
    width: '94px',
    height: '94px',
    color: 'white',
    border: '2px solid #97d2ec',
    borderRadius: '5px',
  };

  const onSquareClick = (index) => {
    for (let i = 0; i < board.length; i++) {
      if (index === i) {
        if (turn === playerOne) {
          if (board[index] === 'x' || board[index] === 'o') {
            alert('Ocupied, choose another!');
            return;
          }
          board[index] = 'x';
          setRoundCounter(roundCounter - 1);
          setTurn(playerTwo);
          setMessage(`${playerTwo} it's your turn`);
          checkForWin();
        } else {
          if (board[index] === 'x' || board[index] === 'o') {
            alert('Ocupied, choose another!');
            return;
          }
          board[index] = 'o';
          setRoundCounter(roundCounter - 1);
          setTurn(playerOne);
          setMessage(`${playerOne} it's your turn`);
          checkForWin();
        }
        if (roundCounter === 0) {
          setMessage('It`s DRAW!');
          setDrawScore(drawScore + 1);
          setGameEnd(true);
          setSquareClassName('squareEl-disabled');
        }
      }
    }
  };

  const checkForWin = () => {
    checkForWinCombinations(0, 1, 2);
    checkForWinCombinations(3, 4, 5);
    checkForWinCombinations(6, 7, 8);
    checkForWinCombinations(0, 3, 6);
    checkForWinCombinations(1, 4, 7);
    checkForWinCombinations(2, 5, 8);
    checkForWinCombinations(6, 4, 2);
    checkForWinCombinations(0, 4, 8);
  };

  const checkForWinCombinations = (x, y, z) => {
    for (let i = 0; i < board.length; i++) {
      if (turn === playerOne) {
        if (board[x] === 'x' && board[y] === 'x' && board[z] === 'x') {
          setPlayerOneScore(playerOneScore + 1);
          setGameEnd(true);
          setSquareClassName('squareEl-disabled');
          setMessage(`${playerOne} You WON!`);
        } else return;
      } else {
        if (board[x] === 'o' && board[y] === 'o' && board[z] === 'o') {
          setPlayerTwoScore(playerTwoScore + 1);
          setGameEnd(true);
          setSquareClassName('squareEl-disabled');
          setMessage(`${playerTwo} You WON!`);
        } else return;
      }
    }
  };

  return (
    <div>
      <div className='header'>
        <h3>
          {playerOne} WON: {playerOneScore}
        </h3>
        <h3>DRAW: {drawScore}</h3>
        <h3>
          {playerTwo} WON: {playerTwoScore}
        </h3>
      </div>
      <div className='message'>
        <h2>{message}</h2>
      </div>
      <div className='board'>
        {board.map((square, index) => {
          return (
            <div
              key={index}
              className={squareClassName}
              onClick={() => {
                onSquareClick(index);
              }}
              style={squareStyle}
            >
              {square}
            </div>
          );
        })}
      </div>
      <div className='end-game'>
        {gameEnd && (
          <EndGame
            gameInit={gameInit}
            setGameEnd={setGameEnd}
            setTurn={setTurn}
            setBoard={setBoard}
            playerOne={playerOne}
            playerTwo={playerTwo}
            turn={turn}
            setSquareClassName={setSquareClassName}
            setMessage={setMessage}
            setRoundCounter={setRoundCounter}
          />
        )}
      </div>
    </div>
  );
};

export default Board;
