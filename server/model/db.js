// Check if user exists
const checkUser = async (connection, email) => {
  try {
    const queryStr =
      'SELECT COUNT(1) AS isUserFound FROM Author WHERE email= ?';

    const [findUser] = await connection.execute(queryStr, [email]);

    return findUser[0].isUserFound;
  } catch (error) {
    console.error(error.message);
  }
};

// Check if username exists
const checkUsername = async (connection, username) => {
  try {
    const queryStr =
      'SELECT COUNT(1) AS isUsernameFound FROM Author WHERE username= ?';

    const [findUsername] = await connection.execute(queryStr, [username]);

    return findUsername[0].isUsernameFound;
  } catch (error) {
    console.error(error.message);
  }
};

// Insert new user into db
const addUser = async (connection, userInfo) => {
  try {
    const queryStr =
      'INSERT INTO Author SET first_name = ?, last_name = ?, username = ?,                                    email = ?, password = ?, avatar = ?';

    await connection.execute(queryStr, [
      userInfo.first_name,
      userInfo.last_name,
      userInfo.username,
      userInfo.email,
      userInfo.encryptPassword,
      userInfo.avatar
    ]);
  } catch (error) {
    console.error(error.message);
  }
};

// Get user's info
const getUserInfo = async (connection, username) => {
  try {
    const queryStr =
      'SELECT first_name, last_name, username, email FROM Author WHERE username= ?';

    const [getUser] = await connection.execute(queryStr, [username]);

    const user = {
      firstName: getUser[0].first_name,
      lastName: getUser[0].last_name,
      username: getUser[0].username,
      email: getUser[0].email
    };

    return user;
  } catch (error) {
    console.error(error.message);
  }
};

// Get encrypted password
const getPassword = async (connection, email) => {
  try {
    const queryStr = 'SELECT password FROM Author WHERE email= ?';

    const [userPassword] = await connection.execute(queryStr, [email]);

    return userPassword[0].password;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  checkUser,
  checkUsername,
  addUser,
  getUserInfo,
  getPassword
};
