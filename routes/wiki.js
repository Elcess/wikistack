const router = require('express').Router();
const { Page } = require('../models');
const { main, addPage } = require('../views');
const wikipage = require('../views/wikipage');

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(main(pages));
  // res.send(main(''));
});

router.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const author = req.body.name;
  const email = req.body.email;
  try {
    const [authorData, wasCreated] = await User.findOrCreate({
      where: { name: author, email: email },
    });

    const page = await Page.create(req.body);
    page.setAuthor(authorData);
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', async (req, res, next) => {
  try {
    res.send(addPage());
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const foundPage = await Page.findOne({
      where: { slug: req.params.slug },
    });

    res.send(wikipage(foundPage, 'Author'));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
