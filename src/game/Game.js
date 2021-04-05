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
            xIsNext: true
        }

        this.calculateWinners = this.calculateWinners.bind(this);
        this.handleClickSquare = this.handleClickSquare.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
        console.log("constructor")
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
                
            console.log(`Клик ${current.squares[i]} по квадрату номер ${i}`);
            console.log("История ходов ", this.state.history);
        }
    }
    


    calculateWinners(squares) {
    
        const winners = [
            [0, 1, 2],
            [3, 4, 5], 
            [6, 7, 8], 
            [0, 3, 6], 
            [1, 4, 7], 
            [2, 5, 8], 
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < winners.length; i++){

            const [a, b, c] = winners[i];

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
        this.setState({ history: history, currentStep: 0, xIsNext: true });

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

        console.log('render')

        return (
            <div className='game'>

                

                <div className='game-board'>
                    <Board 
                        squares = {current.squares}
                        handleClick = {this.handleClickSquare}
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



