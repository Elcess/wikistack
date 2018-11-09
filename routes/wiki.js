const router = require('express').Router();
const { Page } = require('../models');
const { addPage } = require('../views');
const wikipage = require('../views/wikipage')

router.get('/', async (req, res, next) => {
  res.redirect('/');
  // res.send(main(''));
});



router.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const page = new Page({
    title: title,
    content: content,
    status: status,
  });
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', async (req, res, next) => {

  try {
    res.send(addPage());
  } catch (error) { next(error); }

});

router.get('/:slug', async (req, res, next) => {
  try {
    const foundPage = await Page.findOne({
      where: { slug: req.params.slug }
    })

    res.send(wikipage(foundPage, 'Author'));

  } catch (error) {

    next(error);
  }


});


module.exports = router;
