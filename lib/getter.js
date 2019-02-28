require('dotenv').config();
const OAuth = require('oauth');
const endpoints = require('./endpoints');

const credentials = {
  consumerKey : process.env.CONSUMER_KEY,
  consumerSecret : process.env.CONSUMMER_SECRET,
  accessToken : process.env.ACCESS_TOKEN,
  accessSecret : process.env.ACCESS_TOKEN_SECRET
}

oauth = new OAuth.OAuth(
  endpoints.OA_REQ, 
  endpoints.OA_ACCESS,
  credentials.consumerKey,
  credentials.consumerSecret,
  '1.0A',
  null,
  'HMAC-SHA1'
);

oauth.get(
  endpoints.SAMPLE_STREAM, 
  credentials.accessToken, 
  credentials.accessSecret,
  function(error, data, response){
    if(error) console.error(error);
    data = JSON.parse(data);
    console.log(JSON.stringify(data, 0, 2));
  }
);
