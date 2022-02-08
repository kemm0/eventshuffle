require('dotenv').config();

const checkMongoUrl = () => {

    let mongoUrl = '';

    switch(process.env.NODE_ENV){
        case 'production':
            mongoUrl = process.env.MONGODB_URL;
            break;
        case 'development':
            mongoUrl = process.env.MONGODB_DEV_URL;
            break;
        case 'test':
            mongoUrl = process.env.MONGODB_TEST_URL;
            break;
        default:
            mongoUrl = process.env.MONGODB_URL;
    }

    if(mongoUrl === '' || mongoUrl === undefined){
        throw ReferenceError('MONGODB_URL is not defined');
    }

    return mongoUrl;
};

const PORT = process.env.PORT;

const MONGODB_URL = checkMongoUrl();

module.exports = {
    PORT,
    MONGODB_URL
};