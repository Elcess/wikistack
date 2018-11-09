const express = require('express');
const app = express();
const morgan = require('morgan');
const pg = require('pg');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const layout = require('./views/layout');


app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {

  res.send(layout(''));
});





const Port = 3000;
app.listen(Port);
