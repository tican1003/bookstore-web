const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const AppError = require('./src/utils/AppError');
const Router = require('./src/routes/router');

const app = express();

// GLOBAL MIDDLEWARES
app.use(morgan('common'));
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES
app.use('/', Router);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't fint ${req.originalUrl} on this server`, 404));
});

module.exports = app;
