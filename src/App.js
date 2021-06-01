import React, { useState, useEffect } from 'react';
import './index.css';


function App() {
    const emptyBoard = Array(9).fill("");
    const [board, setBoard] = useState(emptyBoard);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState(null);

    const handleCellClick = (index) => {
        if(winner){
            console.log("Jogo acabou!");
            return null
        }

        if(board[index] !== ""){
            console.log("Posição ocupada");
            return null
        }

        setBoard(
            board.map(
                (item, itemIndex) => 
                itemIndex === index ? currentPlayer : item
            )
        );

        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    const checkWinner = () => {
        const possibleWaysToWin = [
            [board[0], board[1], board[2]],
            [board[3], board[4], board[5]],
            [board[6], board[7], board[8]],

            [board[0], board[3], board[6]],
            [board[1], board[4], board[7]],
            [board[2], board[5], board[8]],

            [board[0], board[4], board[8]],
            [board[2], board[4], board[6]]
        ];

        possibleWaysToWin.forEach(cells => {
            if(cells.every(cell => cell === "O")){
                setWinner("O");
                console.log("O jogador O ganhou");
            }
            if(cells.every(cell => cell === "X")){
                setWinner("X");
                console.log("O jogador X ganhou");
            }
        });

        checkDraw();
    }

    const checkDraw = () => {
        if(board.every(item => item !== "")){
            setWinner("E");
        }
    }

    const handleReset = () => {
        setCurrentPlayer("O");
        setBoard(emptyBoard);
        setWinner(null);
    }

    useEffect(checkWinner, [board]);

    return (
        <main>
            <h1 className="title">Jogo da Velha!</h1>

            <div className={`board ${winner ? "game-over" : ""}`}>
                {/*Repetição de uma div com o tamanho da variável board*/}

                {board.map((item, index) => (
                    <div
                     key = {index}
                     className = {`cell ${item}`}
                     onClick = {() => handleCellClick(index)}
                    >

                        {item}

                    </div>
                ))}
            </div>

            
            {winner &&
           
                <div className = "modal-container">
                    {winner === "E" 
                    
                    ? 
                       
                       <div className="modal">
                           <div >
                                <h2 className="winner-message">
                                    <span className={winner}>Empate!</span> 
                                </h2>
                                <p>Nenhum dos dois jogadores venceram, para jogar novamente clique no botão recomeçar, se divirta! </p>
                                <button className = "btn" onClick = {() => handleReset()}>Recomeçar</button>
                           </div>
                           
                        </div>
              
                    
                    : 

                        <div className="modal">
                            <div >
                                <h2 className="winner-message">
                                    <span className={winner}>{winner}</span> Ganhou o Jogo!
                                </h2>
                                <p>Parabéns ao jogador vencedor, para jogar novamente clique no botão recomeçar, se divirta! </p>
                                <button className = "btn" onClick = {() => handleReset()}>Recomeçar</button>
                            </div>
                        </div>
                   
                
                    }
                    
                    
                </div>
            }
           
        </main>
    );
}

export default App;
