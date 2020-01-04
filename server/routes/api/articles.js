let express = require('express');
let router = express.Router();
//
const {
  getAllFromDatabase,
  existsInDb,
  getFromDatabaseById,
  addToDatabase,
  updateDatabase,
  deleteFromDatabase
} = require('../../model/temp_db');

/**
 * TODO:
 *  1) add/edit endpoints
 *    - /api/user => register users
 *    - /api/profile/username => users profile which shows their first & last name and posts they've written
 *      - /api/profile/username/articleId => shows a post from that particular user
 *    - api/auth => authenticates users using a JWT token
 *    -
 *  2) set up jwt auth middleware and set up path where user signs in
 *    - jwt will be used to authenticate user in protected route (only in /settings path, everything else is public)
 *  3) test endpoints
 */

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
    @route   Post api/articles/new
    @desc    Create a new article and save it to DB
    @access  Public
*/
router.post('/new', (req, res) => {
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
  res.json(getArticles);
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
    @route   PUT api/articles/:articleId/edit
    @desc    Update a single article by id.
    @access  Public
*/
router.put('/:articleId/edit', (req, res) => {
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
