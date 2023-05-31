import "./App.css";
import "./index.css";
import Square from "./components/Square";
import { useState } from "react";
import confetti from 'canvas-confetti'

const TURNS = {
  x: "x",
  o: "o",
};

const WINNER_COMBO = [
  [0, 1, 2],
  [3, 4, 8],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.x);
  // null esq hay ganador, false esq hay empate
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    //revisamos todas las combinaciones ganadoras
    //para ver si X u O gano
    for (const combo of WINNER_COMBO) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };


const resetGame=() =>{
  setBoard(Array(9).fill(null))
  setTurn(TURNS.x)
  setWinner(null)
}

const chekEndGame=(newBoard)=>{
  return(
    newBoard.every((Square)=> Square !== null)
  )
}

  const updateboard = (index) => {
    //no actualizamos esta pisicion si ya tiene algo
    if (board[index] || winner) return;

    //actualizar tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //cambiar turno
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);

    // revisar si hay ganador

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner);
    } else if(chekEndGame(newBoard)) {
      setWinner(false) // empate
    }
  };



  return (
    <main className="board">
      <h1>Tic-Tac-Toe</h1>
      <button onClick={resetGame}>Resetear el juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateboard={updateboard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Gano:"}</h2>
            <header className="texto">
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
