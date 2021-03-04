const express = require('express');
const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql');

const connection = mysql.createConnection(config);

const sql = `INSERT INTO people (name) values('Wesley')`;
connection.query(sql);
connection.end();

app.get('/', async (req, res) => {
  let result = '<h1>FullCycle</h1>';
  res.write(result);
  res.end();
});

app.listen(port, () => console.log(`Rodando na porta: ${port}`));