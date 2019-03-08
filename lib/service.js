//const  makeTwitModel  = require('./model');
//TwitModel = makeTwitModel('example');


function prepareData(data){
  return {
    id: data.id,
    id_str: data.id_str,
    user: {
      id_str: data.user.id_str,
      name: data.user.name,
      location: data.user.location,
      url: data.user.url,
      description: data.user.description,
      followers_count: data.user.followers_count,
      friends_count: data.user.friends_count,
      statuses_count: data.user.statuses_count,
      favourites_count: data.user.favourites_count,
      time_zone: data.user.time_zone,
      lang: data.user.lang,
      created_at: new Date(data.user.created_at),
      profile_background_color: data.user.profile_background_color,
      profile_background_image_url: data.user.profile_background_image_url,
      profile_link_color: data.user.profile_link_color,
      profile_sidebar_border_color: data.user.profile_sidebar_border_color,
      profile_image_url: data.user.profile_image_url
    },
    geo: data.geo,
    coordinates: data.coordinates,
    reply_count: data.reply_count,
    created_at: new Date(data.created_at),
    in_reply_to_user_id_str: data.in_reply_to_user_id_str,
    in_reply_to_status_id_str: data.in_reply_to_status_id_str,
    text: data.text,
    retweeted: data.retweeted,
    retweet_count: data.retweet_count,
    favorite_count: data.favorite_count
  }

}

async function saveData(arrayData, Model){
  const finalData = arrayData.map(prepareData)
  try{
    result = await Model.insertMany(finalData);
    console.log("Data saved");
  }catch(err){
    console.error(err);
  }
}


module.exports = {
  saveData,
  prepareData
}
