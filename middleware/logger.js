import colors from 'colors';
//imports colors for the console


//this is a middleware that takes three parameters, request, response and next
const logger = (req, res, next) => {
    const methodColors = {
        GET: 'green',
        POST: 'blue',
        PUT: 'yellow',
        DELETE: 'red',
    }
    const color = methodColors[req.method] || white;
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[color])
    //it loggs the http methond // logs the protocol and the host of the incoming request and logs the original
    //url of the request
    next();
    //this is a function that passes control to the next middleware in the stack.
}
export default logger;
//exports the middleware