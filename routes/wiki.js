const router = require('express').Router();
const main = require('../views/main');
const addPage = require('../views/addPage');



router.get('/', async (req, res, next) => {

  res.send('GET/hello');
  // res.send(main(''));

});

router.post('/', async (req, res, next) => {
  res.send('POST/hello');
  // res.send(addPage());
});

router.get('/add', async (req, res, next) => {
  res.send('GET/add hello');
  // res.send(addPage());
})

module.exports = router;
