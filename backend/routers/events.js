const eventsRouter = require('express').Router();
const Event = require('../models/event');

eventsRouter.get('/list', async (req,res) => {
    //res.status(200).send('eventshuffle');
    const events = await Event.find({});
    console.log(events);
    res.json(events);
});

module.exports = eventsRouter;