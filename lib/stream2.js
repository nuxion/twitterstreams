require('dotenv').config();
const { EventEmitter } = require('events');
const Twit = require('twit');
const fs = require('fs');
const service = require('./service');
const  makeTwitModel  = require('./model');
const mongoose = require('mongoose');
const TwitModel = makeTwitModel('streaming');

// https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
// https://stackoverflow.com/questions/39820651/node-js-eventemitter-how-to-bind-a-class-context-to-the-event-listener-and-then
// addlistener
class BufferTweets extends EventEmitter {
  constructor(modelName){
    super();
    this.count = 10;
    this.tweets = [];
  }
  reset(){
    this.count = 10;
    this.tweets = [];
  }
  add(tweet){
    this.emit('tweet', tweet);
  }
}

const buffer = new BufferTweets('streaming');
buffer.on('tweet', function(tweet){

    if (this.count > 0 ){
      this.tweets.push(tweet);
      this.count--;
    }else{
      this.emit('publish', this.tweets)
      this.reset();
    }
}.bind(buffer));

buffer.on('publish', (data)=>{
  console.log(data);
  service.saveData(data, TwitModel).catch(e => console.log(e));
})

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,
  strictSSL:            true,
});


mongoose.connect(process.env.MONGOURL).then(()=>
  {
    const stream = T.stream('statuses/sample')
    console.log("Streamiing");

    stream.on('tweet', function(tweet){
      console.log("Tweet receive");
      buffer.add(tweet);
    });
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
}).catch(e => console.log(e));






//const writeStream = fs.createWriteStream('twits.json');

