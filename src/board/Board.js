import React from 'react';
import Square from '../square/Square';
import '../index.css'


class Board extends React.Component {
   
    renderSquare(i){ 
        return (
            <Square position = {i}
                value = {this.props.squares[i]} 
                onClick = {() => this.props.handleClick(i)}
                winner = {this.props.winnerCombo}
            />       
        )
    };



    render(){
        return (
           <div className='board'>
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
            </div>
        ); 
    } 
}

export default Board;