const redis = require('redis');

const client = redis.createClient({
    host: '45.32.168.136',
    port: 6379,
    database: 0,
    options: {}
});

client.select(1, function (err) {
    console.log(err, 'Conectado!');
});