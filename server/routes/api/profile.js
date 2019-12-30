// User posts
const express = require('express');
const router = express.Router();

/*
    @route   GET api/profile/user
    @desc    Get profile for particular user
    @access  Public
*/
router.get('/user', (req, res) => res.send('Profile route'));

module.exports = router;
