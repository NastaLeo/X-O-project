import React from 'react';
import '../index.css';

class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            positions: []
        }
    }

    // shouldComponentUpdate(nextProps) {
    //     return this.props.value !== nextProps.value
    // }

    //componentDidUpdate(prevProps) {
    //     console.log(this.props.position)
    //     const positionsCopy = [...this.state.positions];
   
    //     if (this.props.position !== prevProps.position) {
    //     this.setState({
    //         positions: positionsCopy.push(this.props.position)
    //     })
    //     
    //}

  
    render(){

        const { position, value, winner } = this.props;
                  
        return(
            <div className={`square ${winner.includes(position)? 'win' : ''}`}
                key = {position}
                onClick={() => this.props.onClick(position)}
                winner = {this.props.winner}
            >
                {value}
            </div>
        )
    }

}

export default Square;