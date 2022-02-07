const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const eventsRouter = require('./routers/events');
const requestLogger = require('./middleware/request-logger');

mongoose.connect(config.MONGODB_URL);

mongoose.connection.once('open', async() => {
    console.log(`Connected to database ${config.MONGODB_URL}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to database ${config.MONGODB_URL}. Error:`);
    console.log(err);
});

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use('/api/v1/event', eventsRouter);

module.exports = app;