import React from 'react';
import Square from './Square';
import './index.css'


class Board extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            squares: Array(9).fill(null), 
            xIsNext: true
        }

        this.handleClickSquare = this.handleClickSquare.bind(this)
        this.calculateWinners =  this.calculateWinners.bind(this)
        this.renderSquare = this.renderSquare.bind(this)
        this.startNewGame = this.startNewGame.bind(this)

    }





    handleClickSquare(i){
       if (this.calculateWinners(this.state.squares)) return;

        const squaresCopy = [...this.state.squares];
        const xIsNextCopy = this.state.xIsNext;

        if (squaresCopy[i] != null) return
        squaresCopy[i] = xIsNextCopy ? 'X' : 'O';
        
        this.setState({ squares: squaresCopy, xIsNext: !xIsNextCopy })
       
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

        } return null

    }





    startNewGame() {

        if (this.calculateWinners(this.state.squares)){

            let squaresCopy = [...this.state.squares];
            squaresCopy = Array(9).fill(null);
            
            this.setState({ squares: squaresCopy, xIsNext: true})


            // this.setState((state) => { 
            //     return {
            //         squares: Array(9).fill(null), 
            //         xIsNext: true
            //     }
            // })
            
        }

    }





    renderSquare(i){

        return (
            <Square position = {i}
                value = {this.state.squares[i]} 
                handleClick = { this.handleClickSquare }
            />       
        )

    }






    render(){

        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        return (

            <div className='board'>

                <div className ='status'>{this.calculateWinners(this.state.squares) || status}</div>

                <div className ='board-row'>
                    <div>{this.renderSquare(0)}</div>
                    <div>{this.renderSquare(1)}</div>
                    <div>{this.renderSquare(2)}</div>
                </div>

                <div className ='board-row'>
                    <div>{this.renderSquare(3)}</div>
                    <div>{this.renderSquare(4)}</div>
                    <div>{this.renderSquare(5)}</div>
                </div>

                <div className ='board-row'>
                    <div>{this.renderSquare(6)}</div>
                    <div>{this.renderSquare(7)}</div>
                    <div>{this.renderSquare(8)}</div>
                </div>

                <button onClick={ this.startNewGame }>New game</button>

                <div className="end">{this.calculateWinners(this.state.squares)}</div>
            </div>

        ); 
    } 


}

export default Board;