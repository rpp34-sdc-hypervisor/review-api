const { createClient }  = require('redis');
const { redisUrl } = require('./config');

const cache = createClient({
    url: redisUrl
});

cache.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await cache.connect();
})();

// await client.set('key', 'value');
// const value = await client.get('key');

module.exports = {
    cache
}