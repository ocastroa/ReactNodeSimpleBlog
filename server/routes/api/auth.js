// Get JSON web token for authentication
const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const con = require('../../../server/config/mysqldb');
const poll = con();

/*
    @route   Post api/auth
    @desc    Authenticate User sign in && get token
    @access  Public
*/

router.post(
  '/',
  // Check Validation
  [
    // Check for correct email format
    check('email').isEmail(),
    // check that password field is not empty
    check('password', 'You must enter your password').exists()
  ],
  async (req, res) => {
    // Check for validation errors and send a 400 response if errors are found
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const connection = await poll.getConnection();

    try {
      const { email, password } = req.body;

      // Check if user exists in db by checking email.
      let queryStr =
        'SELECT COUNT(1) AS isUserFound FROM Author WHERE email= ?';

      const [findUser] = await connection.execute(queryStr, [email]);

      // user does not exist, return status 400
      if (findUser[0].isUserFound == 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials.' }] });
      }

      // Check that password matches
      queryStr = 'SELECT password FROM Author WHERE email= ?';

      const [getPassword] = await connection.execute(queryStr, [email]);

      // compare password with encrypted password
      const doesPwdMatch = await bcrypt.compare(
        password,
        getPassword[0].password
      );

      // Password does not match
      if (!doesPwdMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      res.end();
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
