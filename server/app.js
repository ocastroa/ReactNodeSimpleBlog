let createError = require('http-errors');
let express = require('express');
let app = express();
let path = require('path');
let logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

let articlesRouter = require('./routes/api/articles');
app.use('/api/articles', articlesRouter);

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
