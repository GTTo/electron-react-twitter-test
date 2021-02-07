import React from 'react';
import './Tweet.css';

class Tweet extends React.Component {

    render() {
        return (
          <div className="tweet">
            <p>{this.props.text}</p>
            <div className="date">{new Date(this.props.date).toLocaleDateString()}</div>
          </div>
          );
    }

}

export default Tweet;