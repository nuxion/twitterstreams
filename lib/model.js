/**
 * Timeline Model
 * @class timeline
 * @license MPL 2.0
 * @author Xavier Petit
 */

const mongoose = require('mongoose');

/**
 * Model to save tweets from timelines.
 */
const tweetSchema = new mongoose.Schema({
  // id: mongoose.Schema.ObjectId,
  id: Number,
  id_str: String,
  user: {
    id_str: String,
    name: String,
    location: String,
    url: String,
    description: String,
    followers_count: Number,
    friends_count: Number,
    statuses_count: Number,
    favourites_count: Number,
    time_zone: String,
    lang: String,
    created_at: Date,
    profile_background_color: String,
    profile_background_image_url: String,
    profile_link_color: String,
    profile_sidebar_border_color: String,
    profile_sidebar_fill_color: String,
    profile_image_url: String,
    following: String
  },
  geo: String,
  coordinates: String,
  reply_count: Number,
  created_at: Date,
  in_reply_to_status_id_str: String,
  in_reply_to_user_id_str: String,
  text: String,
  tags: String,
  retweeted: Boolean,
  retweet_count: Number,
  favorite_count: Number,
});

/**
 * Exported function.
 * Receives a string with a collection name and return a model.
 * @function makeTimelineModel
 * @param {string} collectionName
 * @returns {object} mongoose.model
 */
module.exports = function makeTwitModel(collectionName) {
  return mongoose.model('stream_tweets', tweetSchema, collectionName);
};
