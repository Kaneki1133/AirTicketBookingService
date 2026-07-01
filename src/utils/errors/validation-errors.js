const { StatusCodes } = require(`http-status-codes`);

class ValidationError extends Error {
    constructor(error){
        super();
        let explaination = [];

        error.errors.forEach((err) => {
            explaination.push(err.message);
        });

        this.name = 'ValidationError',
        this.message = 'Not Able to validate the data sent in the request',
        this.explaination = explaination,
        this.statusCodes = StatusCodes.BAD_REQUEST
    }
}

module.exports = ValidationError;