const { randomUUID } = require('crypto');
const eventsRouter = require('express').Router();
const Event = require('../models/event');

eventsRouter.get('/list', async (req,res) => {
    //res.status(200).send('eventshuffle');
    const events = await Event.find({});
    console.log(events);
    res.json(events);
});

eventsRouter.get('/:id', async (req, res) => {
    const event = await Event.findOne({ id: req.params.id });

    if(event === null) {
        return res.status(400).send('Invalid id');
    }
    return res.json(event);
});

eventsRouter.post('/', async (req, res) => {
    const body = req.body;

    const { name, dates } = body;

    if(name === undefined || dates === undefined){
        return res.status(400).send('name or date missing for event');
    }

    const dateObjects = dates.map(dateString => new Date(dateString));

    const event = new Event({
        name: name,
        dates: dateObjects,
        people: [],
        votes: [],
        id: randomUUID()
    });

    const savedEvent = await event.save();
    const savedId = savedEvent.id;

    return res.json({ id: savedId });
});

module.exports = eventsRouter;