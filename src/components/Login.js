import React from 'react';

const Login = ({
  setPlayerOne,
  setPlayerTwo,
  setGameStart,
  playerOne,
  playerTwo,
  setData,
}) => {
  const onSubmit = () => {
    setData();
    if (playerOne === '' || playerTwo === '') {
      alert('Enter names to start the game!');
      return;
    }
    setGameStart(true);
  };
  return (
    <div className='login'>
      <h2>Enter player names</h2>
      <form>
        <div>
          <h3>Player one:</h3>
          <input
            type='text'
            onChange={(e) => setPlayerOne(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <h3>Player two:</h3>
          <input
            type='text'
            onChange={(e) => setPlayerTwo(e.target.value)}
            required
          ></input>
        </div>
        <button className='start-btn' type='submit' onClick={() => onSubmit()}>
          Start
        </button>
      </form>
    </div>
  );
};

export default Login;
