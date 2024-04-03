import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Block from './Components/Block';
import { stat } from 'fs';

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  const checkWinner = (state: any[])=>{
    const win = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for(let i=0; i<win.length; i++){
      const [a,b,c] = win[i];
      if(state[a] !== null && state[a] === state[b] && state[a] === state[c]) return state[a];
    }
    return null;
  }

  const handleBlockClick = (index:number)=>{
    if(winner || state[index] !== null) return;
    const stateCopy = [...state];

    stateCopy[index] = currentTurn;
    setState(stateCopy);

    //Check wining
    const winningPlayer = checkWinner(stateCopy);

    if(winningPlayer){
      setWinner(winningPlayer);
    }
    setCurrentTurn(currentTurn === "X" ? "0" : "X");
  };

  const renderStatus = () => {
    if (winner) {
      return `Player ${winner} wins!`;
    } else {
      return `Current Turn: ${currentTurn}`;
    }
  };


  return (
    <div className='board'>
      <h1>Tic Tac Toe!!</h1>
      <div className='status'>{renderStatus()}</div>
      <div className='row'>
        <Block onClick={()=>handleBlockClick(0)} value={state[0]}/>
        <Block onClick={()=>handleBlockClick(1)} value={state[1]}/>
        <Block onClick={()=>handleBlockClick(2)} value={state[2]}/>
      </div>
      <div className='row'>
        <Block onClick={()=>handleBlockClick(3)} value={state[3]}/>
        <Block onClick={()=>handleBlockClick(4)} value={state[4]}/>
        <Block onClick={()=>handleBlockClick(5)} value={state[5]}/>
      </div>
      <div className='row'>
        <Block onClick={()=>handleBlockClick(6)} value={state[6]}/>
        <Block onClick={()=>handleBlockClick(7)} value={state[7]}/>
        <Block onClick={()=>handleBlockClick(8)} value={state[8]}/>
      </div>
      {winner && (
        <div className="winnerMessage">
          Hurray!! Player {winner} wins!
        </div>
      )}
    </div>
  );
}

export default App;
