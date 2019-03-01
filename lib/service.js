const  makeTwitModel  = require('./model');

tweet = makeTwitModel('example');


function prepareData(data){
  return {
    id_str: data.id_str,
    name: data.name,
    location: data.location,
    url: data.url,
    description: data.description,
    followers_count: data.followers_count,
    friends_count: data.friends_count,
    statuses_count: data.statuses_count,
    favourites_count: data.favourites_count,
    time_zone: data.time_zone,


  }

}




