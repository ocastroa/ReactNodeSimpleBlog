let express = require('express');
let router = express.Router();

const {
  getAllFromDatabase,
  existsInDb,
  getFromDatabaseById,
  addToDatabase,
  updateDatabase,
  deleteFromDatabase
} = require('../database/db');

let sortArrayByDate = articles => {
  const sortByPublishedDate = articles.sort(
    (a, b) => new Date(b['createdOn']) - new Date(a['createdOn'])
  );

  return sortByPublishedDate;
};

// Checks if id exists in db
router.param('articleId', (req, res, next, id) => {
  let getArticleId = existsInDb(id);
  if (!getArticleId) {
    return res.status(404).json({ Error: 'Article not found in database' });
  }
  req.articleId = id;
  next();
});

/*
    @route   Post api/articles
    @desc    Create a new article and save it to DB
    @access  Public
*/
router.post('/', (req, res) => {
  const addArticle = addToDatabase(req.body);
  res.status(201).json(addArticle);
});

/*
    @route   GET api/articles
    @desc    Get array of all articles
    @access  Public
*/
router.get('/', (req, res) => {
  const getArticles = getAllFromDatabase();
  const sortArray = sortArrayByDate(getArticles);
  res.json(sortArray);
});

/*
    @route   GET api/articles/:articleId
    @desc    Get single article by id
    @access  Public
*/
router.get('/:articleId', (req, res) => {
  const getArticleById = getFromDatabaseById(req.articleId);
  res.json(getArticleById);
});

/*
    @route   PUT api/articles/:articleId
    @desc    Update a single article by id.
    @access  Public
*/
router.put('/:articleId', (req, res) => {
  const updateArticle = updateDatabase(req.body);
  res.json(updateArticle);
});

/*
    @route   DELETE api/articles/:articleId
    @desc    Delete a single article by Id
    @access  Public
*/
router.delete('/:articleId', (req, res) => {
  deleteFromDatabase(req.articleId);
  res.status(204).send();
});

module.exports = router;
