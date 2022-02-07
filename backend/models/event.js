const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const eventSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    dates: {
        type: [String],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    people: [String],
    votes: [{
        date: {
            type: String,
            required: true,
        },
        people: [String]
    }]
});

eventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

eventSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Event', eventSchema);

