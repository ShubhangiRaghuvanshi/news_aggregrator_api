const redis = require('redis');
const client = redis.createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379
  }
});

const connectRedis = async () => {
  try {
    await client.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }
};

connectRedis();

client.on("error", (err) => console.error('Redis error:', err));

const setCache = async (key, expiration = 10, value) => {
  try {
    if (typeof expiration !== 'number' || expiration <= 0) {
      throw new Error('Expiration time must be a positive number.');
    }

    const stringifiedValue = JSON.stringify(value);

    // Set cache with expiration time
    await client.setEx(key, expiration, stringifiedValue);
    console.log(`Cache set for key: ${key} with expiration: ${expiration}s`);
  } catch (error) {
    console.error('Error setting cache:', error.message);
  }
};

const getCache = async (key) => {
  try {
    const data = await client.get(key);
    if (data) {
      console.log(`Cache retrieved for key: ${key}`);
      return JSON.parse(data);
    } else {
      console.log(`Cache miss for key: ${key}`);
      return null;
    }
  } catch (error) {
    console.error('Error getting cache:', error.message);
    return null;
  }
};

module.exports = { setCache, getCache };



