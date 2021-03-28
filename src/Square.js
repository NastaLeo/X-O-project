import React from 'react';
import './index.css';

class Square extends React.Component {

    render(){

    const { position, value } = this.props;

        return(
            <div className="square"
                key = {position}
                onClick={() => this.props.handleClick(position)}
            >
                {value}
            </div>
        )
    }

}

export default Square;