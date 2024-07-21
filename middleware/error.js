const errorHandler = (err, req, res, next) => {
    //a function that takes for parameters error object request response and next 
    if (err.status) {
        res.status(err.status).json({ msg: err.message });
    }
    //if err.status has a property set the statrus iof the request to it and print its response
    else {
        res.status(500).json({ mgg: err.message })
    }
    //else let the default status be 500 internal server error 
};
export default errorHandler;
//export