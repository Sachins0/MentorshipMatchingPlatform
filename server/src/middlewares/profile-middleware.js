const { StatusCodes } = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.role){
        ErrorResponse.message='Error while creating profile';
        ErrorResponse.error= new AppError({explanation : 'userId or Role not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    next();
}

function validateUpdateRequest(req,res,next){
    if(!req.body.bio && !req.body.interests && !req.body.skills){
        ErrorResponse.message='Error while updating the profile';
        ErrorResponse.error= new AppError({explanation : 'bio or skill or interests not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    next();
}

module.exports={
    validateCreateRequest,
    validateUpdateRequest
}