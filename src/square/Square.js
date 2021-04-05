import React from 'react';
import '../index.css';

class Square extends React.Component {

    shouldComponentUpdate(nextProps) {
        return this.props.value !== nextProps.value
    }

    render(){

    const { position, value } = this.props;
 
        return(
            <div className="square"
                key = {position}
                onClick={() => this.props.onClick(position)}
            >
                {value}
            </div>
        )
    }

}

export default Square;