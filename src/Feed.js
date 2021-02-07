import React from 'react';
import Tweet from './Tweet';
import './Feed.css';

const { ipcRenderer } = window.require('electron');

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'twitterdev',
            feed: [],
        };
        //event handler
        const self = this;
        ipcRenderer.on('load-feed-reply', (event, response) => {
            //console.log('response data: ' + JSON.stringify(response));
          self.setState({feed: response.data});
        });
    }
    
  componentDidMount() {
        // When the document is rendered.
        ipcRenderer.send('load-feed-request',this.state.username);
  }

  onUsernameChange(value){
    this.setState({
         username: value
    });
  }

  handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        ipcRenderer.send('load-feed-request',data.get('username'));
    }

    render() {
        let body;
        if (this.state.feed === undefined || this.state.feed.length === 0) {
            body = <div>No recent tweets found</div>;
        } else {
            body =<ul>{this.state.feed.map((tweet) => <li key={tweet.id}><Tweet text={tweet.text} date={tweet.created_at}></Tweet></li>)}</ul>;
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <label className="feed">
                    The feed from:
                    <input 
                    className="account_name"
                    name="username"
                    type="text"
                    value={this.state.username} 
                    onChange={e => this.onUsernameChange(e.target.value)}
                    />
                </label>
                </form>
                {body}
            </div>
          );
    }

}

export default Feed;