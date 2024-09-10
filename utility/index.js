export async function cacheData(key, value, expiration = 1800) {
  try {
    await redisClient.set(key, JSON.stringify(value), 'EX', expiration);
  } catch (error) {
    console.error('Error caching data:', error);
  }
}

export async function getCachedData(key) {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting cached data:', error);
    return null;
  }
}
