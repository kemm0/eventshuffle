const requestLogger = (request, response, next) => {
    const timeStamp = new Date().toString();
    console.log(`Request [${timeStamp}]`);
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};

module.exports = requestLogger;