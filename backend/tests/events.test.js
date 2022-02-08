const mongoose = require('mongoose');
const Event = require('../models/event');
const axios = require('axios');
const app = require('../app');
const http = require('http');
const config = require('../utils/config');
const { int64bitID } = require('../utils/generate-id');

const server = http.createServer(app);

beforeAll(() => {
    server.listen(config.PORT, () => {
        console.log(`Test server running on port ${config.PORT}`);
    });
});

afterAll(() => {
    server.close();
    mongoose.connection.close();
});

beforeEach(async () => {
    await Event.deleteMany({});
    const newEvent = {
        'name': 'Jake\'s secret party',
        'id': int64bitID(),
        'dates': [
            '2014-01-01',
            '2014-01-05',
            '2014-01-12'
        ]
    };
    const event = new Event(newEvent);
    await event.save();
});

test('receive correct length list of events', async () => {
    const response = await axios.get(`http://localhost:${config.PORT}/api/v1/event/list`);
    const events = response.data;
    console.log(events);
    expect(events.length).toBe(1);
});