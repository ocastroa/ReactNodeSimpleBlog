const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const con = require('../../../server/config/mysqldb');
const poll = con();

/*
    @route   Post api/users
    @desc    Register User
    @access  Public
*/
router.post(
  '/',
  // Check Validation
  [
    // Check that name field is not empty
    check('first_name', 'First name is required')
      .not()
      .isEmpty(),
    check('last_name', 'Last name is required')
      .not()
      .isEmpty(),
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    // Check for correct email format
    check('email').isEmail(),
    // password must be at least 6 chars long
    check('password', 'Password must be 6 or more characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // Check for validation errors and send a 400 response if errors are found
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Manually acquire a connection from poll. Use same connection to do multiple queries (3 in this case)
    const connection = await poll.getConnection();

    try {
      const { first_name, last_name, username, email, password } = req.body;

      // Check if user exists in db by checking email. Use Prepared Statements
      let queryStr =
        'SELECT COUNT(1) AS isUserFound FROM Author WHERE email= ?';

      const [findUser] = await connection.execute(queryStr, [email]);

      // user exists, return status 400
      if (findUser[0].isUserFound == 1) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already registered.' }] });
      }

      // Check if username is available to use by checking db
      queryStr =
        'SELECT COUNT(1) AS isUsernameFound FROM Author WHERE username= ?';

      const [findUsername] = await connection.execute(queryStr, [username]);

      // username exists, return status 400
      if (findUsername[0].isUsernameFound == 1) {
        return res.status(400).json({
          errors: [{ msg: 'Username already exists. Choose another username.' }]
        });
      }

      // Get users gravatar with their email
      const avatar = gravatar.url(email, {
        s: '200', // default size
        r: 'pg', // rating
        d: 'mm' // default avatar if user not found
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const encryptPassword = await bcrypt.hash(password, salt);

      // Insert new user into db
      queryStr =
        'INSERT INTO Author SET first_name = ?, last_name = ?, username = ?,                                    email = ?, password = ?, avatar = ?';

      await connection.execute(
        queryStr,
        [first_name, last_name, username, email, encryptPassword, avatar],
        err => {
          if (err) {
            console.log(`Error: ${err}`);
            return res.status(500).send('Server error');
          }
          //   res.end();
        }
      );

      const payload = {
        // Pass username as payload for jsonwebtoken
        user: {
          username: username
        }
      };

      // Return jsonwebtoken
      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //   res.end();
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    } finally {
      // Release connection
      connection.release();
    }
  }
);

module.exports = router;
