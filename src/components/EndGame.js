import React from 'react';

const EndGame = ({
  gameInit,
  setGameEnd,
  setTurn,
  setBoard,
  playerOne,
  playerTwo,
  turn,
  setSquareClassName,
  setMessage,
  setRoundCounter,
}) => {
  const onPlayAgain = () => {
    setTurn(playerOne);
    setBoard(Array(9).fill(''));
    setGameEnd(false);
    setSquareClassName('squareEl');
    setRoundCounter(8);
    if (turn === playerOne) {
      setMessage(`It's ${playerOne}'s turn`);
      setTurn(playerOne);
    } else if (turn === playerTwo) {
      setTurn(playerTwo);
      setMessage(`It's ${playerTwo}'s turn`);
    }
  };

  const onReset = () => {
    onPlayAgain();
    gameInit();
  };
  return (
    <div className='end-game'>
      <button onClick={onPlayAgain}>Play again?</button>
      <button onClick={onReset}>Reset?</button>
    </div>
  );
};

export default EndGame;
