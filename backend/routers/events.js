const { randomUUID } = require('crypto');
const eventsRouter = require('express').Router();
const Event = require('../models/event');

eventsRouter.get('/list', async (req,res) => {
    //res.status(200).send('eventshuffle');
    const events = await Event.find({});
    res.json(events);
});

eventsRouter.post('/:id/vote', async (req,res) => {
    const event = await Event.findOne({ id: req.params.id });

    if(event === null) {
        return res.status(400).send('Invalid id');
    }

    const name = req.body.name;
    const newVotes = req.body.votes;

    if(name === undefined || newVotes === undefined){
        return res.status(400).send('Request is missing name or votes');
    }

    for(const date of newVotes){
        if(!event.dates.includes(date)){
            return res.status(400).send(`Date ${date} is not included in the event.`);
        }
    }


    if(event.people.includes(name)){
        if(newVotes.length === 0){
            event.people = event.people.filter(username => username !== name);
        }
    }
    else{
        if(newVotes.length === 0){
            return res.status(400).send('Suitable dates must be selected');
        }
        else{
            event.people.push(name);
        }
    }

    for(const voteInEvent of event.votes){
        const dateVotedByUser = newVotes.includes(voteInEvent.date);
        const alreadyVoted = voteInEvent.people.includes(name);

        if( dateVotedByUser && !alreadyVoted){
            voteInEvent.people.push(name);
        }
        else if(!dateVotedByUser && alreadyVoted){
            voteInEvent.people = voteInEvent.people.filter(username => username !== name);
        }
    }

    const savedEvent = await Event.findOneAndUpdate({ id: req.params.id }, { votes: event.votes }, { new: true });

    return res.json(savedEvent);

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

    const initVotes = dates.map(date => {
        return {
            date: date,
            people: []
        };
    });

    const event = new Event({
        name: name,
        dates: dates,
        votes: initVotes,
        id: randomUUID()
    });

    const savedEvent = await event.save();
    const savedId = savedEvent.id;

    return res.json({ id: savedId });
});

module.exports = eventsRouter;