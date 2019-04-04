/* eslint-disable no-return-await */
const redis = require('redis');
const { promisify } = require('util');

const {
  host, port, db, password
} = config.redis;
const client = redis.createClient({
  host,
  port,
  db,
  password
});

client.async = method => promisify(client[method]).bind(client);

client.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log('redis connected!');
});

const users = {
  set: (key, value) => {
    client.set(key, value);
  },
  get: async key => await client.async('get')(key)
};

module.exports = {
  client,
  users
};
