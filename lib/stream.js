require('dotenv').config();
const Twit = require('twit');
const fs = require('fs');

const writeStream = fs.createWriteStream('twits.json');
const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,
  strictSSL:            true,
});

const stream = T.stream('statuses/sample')

const twits = [];
stream.on('tweet', function(tweet){
  if (twits.length < 20){
    twits.push(tweet);
    console.log(tweet);
    console.log('======================');
  } else { 
    console.log('Finish twits');
    writeStream.write(JSON.stringify(twits));
    writeStream.end();
    stream.emit('disconnect', 'Finish');
  }

})

stream.on('warning', function(error){
  //writeStream.write(twits);
  console.log(error);
  stream.stop();
});
stream.on('disconnect', function(msg){
  stream.stop();
  console.log(msg);
  //writeStream.write(twits);
})
