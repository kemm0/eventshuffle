const express = require('express');
const eventsRouter = require('./routers/events');

const app = express();

app.use(express.json());
app.use('/api/v1/event', eventsRouter);

module.exports = app;