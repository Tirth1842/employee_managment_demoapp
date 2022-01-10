const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Tpatel@6754",
    database: "postgres"
})

client.connect()
 .then(() => console.log('connected successfully'))
 .catch((err) => console.log(err));
module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback)
  },
}

