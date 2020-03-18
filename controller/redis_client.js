/*
 * Created by jemo on 2017-12-28.
 * redis client
 */

const redis = require('redis');
const config = require('../configs/config');

const redisOptions = config.redisOptions;
const redisClient = redis.createClient(redisOptions);

redisClient.on("error", function(err)
{
    logger.error("Error: ", err);
});

function setRedis($key,$value)
{
  return new Promise((resolve, reject) =>
  {
    redisClient.hmset($key, $value, (err, res) =>
    {
      if(err)
      {
        return reject(err);
      }
      else
      {
        return resolve($value);
      }
    });
  });
}

function getRedis($key)
{
  return new Promise((resolve, reject) =>
  {
    redisClient.hgetall($key, (err, res) =>
    {
      if(err)
      {
        return reject(err);
      }
      else
      {
        return resolve(res);
      }
    });
  });
}

module.exports = redisClient;
module.exports.setRedis = setRedis;
module.exports.getRedis = getRedis;
