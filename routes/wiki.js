const router = require('express').Router();
const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', async (req, res, next) => {
  res.redirect('/');
  // res.send(main(''));
});

const generateSlug = title => {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
};

router.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const page = new Page({
    title: title,
    content: content,
    slug: slug,
    status: status,
  });
  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/add', async (req, res, next) => {
  res.send(addPage());
  // res.send(addPage());
});

module.exports = router;
