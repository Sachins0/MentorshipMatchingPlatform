const { StatusCodes } = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateUpdateRequest(req,res,next){
    if(!req.body.firstName && !req.body.lastName){
        ErrorResponse.message='Error while updating the user';
        ErrorResponse.error= new AppError({explanation : 'Name not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    next();
}

module.exports={
    validateUpdateRequest
}