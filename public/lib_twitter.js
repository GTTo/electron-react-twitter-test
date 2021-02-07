const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on Mac OS X, run the export command below from the terminal: 
// export BEARER_TOKEN='YOUR-TOKEN' 
const token = process.env.BEARER_TOKEN; 

const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'


function fetchFeed(username) {
    // Edit query parameters below
    const params = {
      'query': 'from:'+username, 
      'tweet.fields': 'created_at' ,
    } 

    return needle('get', endpointUrl, params, { headers: {
        "authorization": `Bearer ${token}`,
    }})
    
  }

 module.exports = {
    fetchFeed: fetchFeed,
    
};