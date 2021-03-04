const express = require('express');
const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql2/promise');
const faker = require('faker');

async function connect() {
  const connection = await mysql.createConnection(config);

  connection.connect(err => {
    if (err) throw err;
    console.log('Conectado com sucesso ao Banco de Dados.')
  })

  return connection;
}

async function init() {
  const connection = await connect();
  const sql = `INSERT INTO people (name) values('${faker.name.findName()}')`;
  connection.query(sql);
  connection.end();
}

async function selectPeople() {
  const conn = await connect();
  const [people,] = await conn.execute('SELECT * FROM people;');
  conn.end();
  return people;
}

app.get('/', async (req, res) => {
  const people = await selectPeople();

  const result = '<h1>Full Cycle Rocks!</h1><br />' + people.map(person => person.name).reduce((a, b) => `${a} <br /><p>${b}</p>`);
  res.write(result);
  res.end();
});

app.listen(port, () => {
  init();
  console.log(`Rodando na porta: ${port}`);
});