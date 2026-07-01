const { StatusCodes } = require(`http-status-codes`);

class ServiceError extends Error {
    constructor(
        message = 'Something Went Wrong',
        explaination = 'Service Layer Error',
        statuCodes = StatusCodes.INTERNAL_SERVER_ERROR
    ){
        super();
        this.name = 'ServiceError',
        this.message = message,
        this.explaination = explaination,
        this.statuCodes = statuCodes
    }
}

module.exports = ServiceError;