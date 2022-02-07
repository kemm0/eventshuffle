const { randomInt, randomUUID } = require('crypto');

const MAX_INT = Math.pow(2,47); // randomInt function of crypto library requires max value less than 2^48

const int64bitID = () => {
    return randomInt(MAX_INT);
};

const UUID = () => {
    return randomUUID();
};

module.exports = { int64bitID, UUID };

