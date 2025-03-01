const redis = require('redis');
const client = redis.createClient();
client.connect();
client.on("error", (err) => console.error('Redis error:', err));

const setCache = async (key, expiration = 10, value) => {
  try {
  
    if (typeof expiration !== 'number' || expiration <= 0) {
      throw new Error('Expiration time must be a positive number.');
    }


    const stringifiedValue = JSON.stringify(value);


    await client.setEx(key, expiration, stringifiedValue);
  } catch (error) {
    console.error('Error setting cache:', error.message);
  }
};

const getCache = async (key) => {
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting cache:', error.message);
    return null;
  }
};

module.exports = { setCache, getCache };
