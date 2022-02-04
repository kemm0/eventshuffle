const eventsRouter = require('express').Router();

eventsRouter.get('/', async (req,res) => {
    res.status(200).send('eventshuffle');
});

module.exports = eventsRouter;