import React from 'react';
import Board from '../board/Board';
import '../index.css';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history:[{
                squares:Array(9).fill(null)
            }],
            currentStep: 0,
            xIsNext: true,
            winnerResult:[],
            winners: [
                [0, 1, 2],
                [3, 4, 5], 
                [6, 7, 8], 
                [0, 3, 6], 
                [1, 4, 7], 
                [2, 5, 8], 
                [0, 4, 8],
                [2, 4, 6]
            ]

        }

        this.calculateWinners = this.calculateWinners.bind(this);
        this.handleClickSquare = this.handleClickSquare.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
        
    }


    handleClickSquare(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = [...current.squares];
        const currentStep = this.state.currentStep;

        if (!this.calculateWinners(squares) && !squares[i] && currentStep === history.length - 1) {
            const xIsNextCopy = this.state.xIsNext;
            squares[i] = xIsNextCopy ? "X" : "0";
      
            this.setState({
                history: history.concat([
                    {squares: squares}
                ]),
                currentStep: this.state.currentStep + 1,
                xIsNext: !this.state.xIsNext
            });

           
            if(this.calculateWinners(squares) && !squares.every(el => el != null)){
                                    
                const arr = [];
                                    
                this.state.xIsNext ? squares.filter((el, i) => { 
                                        if(el === "X") return arr.push(i)   
                                     }) : 
                                     squares.forEach((el, i) => {
                                         if(el === "0") return arr.push(i)
                                     });

                
              
                for(let i = 0; i < this.state.winners.length; i++){
                  if(arr.filter(el =>(this.state.winners[i].includes(el))).length === 3) {
                        const winnerCopy = this.state.winners[i];
                        this.setState({ 
                            winnerResult: winnerCopy
                        });
                    }
                }    
                
            } 
           
        } 
    }
    


    calculateWinners(squares) {
          
        for (let i = 0; i < this.state.winners.length; i++){

            const [a, b, c] = this.state.winners[i];

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                return 'Game Over! The winner is ' + squares[a];
            } 
        } 
        
        if (squares.every(el => el != null)) {
            return `Game Over! It's a draw`
        } 
        
        return null

    }


    jumpTo(move) {
        if(this.state.currentStep !== move) {
            this.setState({ currentStep: move, xIsNext: move % 2 === 0 });
        }      
    }




    startNewGame() {
        let history = [...this.state.history];
        history = [{ squares: Array(9).fill(null) }];
        this.setState({ history: history, currentStep: 0, xIsNext: true, winnerResult: [] });

    }



    render() {
        const history = this.state.history;
        const current = history[this.state.currentStep];
        const winner = this.calculateWinners(current.squares);
        const status = "Следующий ход: " + (this.state.xIsNext ? "X" : "O");
    
        const moves = history.length > 1 && history.map((step, move) => {
        const desc = move ? "Перейти к ходу #" + move : "К началу игры";
          return (
            <li key={move}>
                <button className = {move === this.state.currentStep ? 'active' : ''} 
                      onClick={() => this.jumpTo(move)}
                >{desc}
                </button>
            </li>
          );
        })

  
        return (
            <div className='game'>
        
               <div className='game-board'>
                    <Board 
                        squares = {current.squares}
                        handleClick = {this.handleClickSquare}
                        winnerCombo = {this.state.winnerResult}
                    />
                </div>

                <div className="game-info">
                    <div>{winner || status} </div>

                    <ol>{moves}</ol>
                    {winner && (
                        <button className="start" onClick={ this.startNewGame }>New game</button>
                    )}
                </div>
                
            </div>
        )
    }
}

export default Game;



