require("dotenv").config();
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect()
    .then(()=> console.log('Connected to PostgreSQL'))
    .catch(err =>console.error('Connection Error:', err));

module.exports= client;