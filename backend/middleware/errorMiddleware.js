// req = HTTP response argument to the middleware function, called "res" by convention
// res = HTTP request argument to the middleware function, called "req" by convention
// next = Callback argument to the middleware function, called "next" by convention
// Callback functions = a function you can pass to another function for it to be invoked after performing another action
const notFound = (req, res, next) => {
    const error = new Error(`Not found -${req.originalUrl}`);
    res.status(404);
    //To pass it to global error handling
    //When we pass ANY argument in the next function, no matter what the argument is, express will automatically assume that there's an error
    //And will call an error handler and skip all middleware stack
    next(error);
}

//err = first argument for custom error middleware (express know based on this first argument, and will atuo recognize and will only call this when there's an error)
const errorHandler = (err, req, res, next) => {
    //If we throw a manual error we create, the status might be 200 but we don't want a 200 error
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message;

    //mongoose specific type of error: cast error
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
});
}

export { notFound, errorHandler }