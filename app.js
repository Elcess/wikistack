const express = require('express');
const app = express();
const morgan = require('morgan');
const pg = require('pg');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const layout = require('./views/layout');
const models = require('./models');
const wiki = require('./routes/wiki');
const user = require('./routes/user');


models.db.authenticate().then(() => {
  console.log('connected to the database');
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/wiki', wiki);
app.use('/user', user);



app.get('/', (req, res) => {
  res.send(layout(''));
});

const Port = 3000;
const init = async () => {
  try {
    await models.Page.sync();
    await models.User.sync();

    app.listen(Port, () => {
      console.log(`Server is listening on port ${Port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

init();
