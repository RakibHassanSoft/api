const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
require('dotenv').config();
app.use(express.json());

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// Routes
const authRouter = require('./routes/authRouter');
app.use('/api/v1', authRouter);
const userRoute = require('./routes/userRoute');
app.use('/api/v1', userRoute);
const gigRoute = require('./routes/gigRoute');
app.use('/api/v', gigRoute);
const orderRoute = require('./routes/orderRoute');
app.use('/api/v1', orderRoute);
const conversation = require('./routes/conversationRoute');
app.use('/api/v1', conversation);
const massage = require('./routes/massageRoute');
app.use('/api/v1', massage);
const review = require('./routes/reviewRoute');
app.use('/api/v1', review);


// Connect to MongoDB and start server
const PORT =  8000;
mongoose
  .connect('mongodb://127.0.0.1:27017/fiverr', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Other configurations or routes can be added here

module.exports = app;



    //touch server.js
    //npm i nodemon -D
    //npm run start-dev
