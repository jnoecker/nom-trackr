const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const foodRouter = require('./routes/foodRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

/*
 ****************************
 **    Global Middleware   **
 ****************************
 */

// Set security HTTP headers
app.use(helmet());

const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};
app.use(cors(corsOptions));

// Dev Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: '100kb',
  })
);
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS attacks
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

/*
 ****************************
 **        Routes          **
 ****************************
 */

// Static Files
app.use(express.static(path.join(`${__dirname}`, `public`)));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/foods', foodRouter);

// Handle invalid URLs
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
