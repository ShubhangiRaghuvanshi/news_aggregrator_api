const redis = require("redis");

const client = redis.createClient({
  url: "redis://default:QkWDoU5P2ZC7k1fcNTvPoKLEJ9kiTM4u@redis-16053.crce179.ap-south-1-1.ec2.redns.redis-cloud.com:16053",
});

// Ensure Redis connects only once
(async () => {
  try {
    await client.connect();
    console.log("✅ Connected to Redis");
  } catch (err) {
    console.error("❌ Redis connection error:", err);
  }
})();

// Handle errors
client.on("error", (err) => console.error("❌ Redis error:", err));

/**
 * Set a cache value with an expiration time.
 */
const setCache = async (key, value, expiration = 10) => {
  try {
    await client.setEx(key, expiration, JSON.stringify(value));
    console.log(`✅ Cache set for key: "${key}" (Expires in: ${expiration}s)`);
  } catch (error) {
    console.error("❌ Error setting cache:", error.message);
  }
};

/**
 * Get a cached value by key.
 */
const getCache = async (key) => {
  try {
    const data = await client.get(key);
    if (data) {
      console.log(`✅ Cache hit for key: "${key}"`);
      return JSON.parse(data);
    } else {
      console.log(`❌ Cache miss for key: "${key}"`);
      return null;
    }
  } catch (error) {
    console.error("❌ Error getting cache:", error.message);
    return null;
  }
};

module.exports = { client, setCache, getCache };


