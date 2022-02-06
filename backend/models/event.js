const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    people: [String]
});

const eventSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    people: {
        type: [String]
    },
    votes: {
        type: [voteSchema]
    }
});

module.exports = mongoose.model('Event', eventSchema);

