const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

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
        required: true,
        unique: true
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

eventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

eventSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Event', eventSchema);

