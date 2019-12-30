const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// API endpoints
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/articles', require('./routes/api/articles'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
  next();
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

module.exports = app;
