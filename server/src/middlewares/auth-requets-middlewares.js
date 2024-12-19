const { StatusCodes } = require('http-status-codes');

const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { UserService } = require('../services');

function validateAuthRequest(req,res,next){
    if(!req.body.email){
        ErrorResponse.message='Error while authenticating the user';
        ErrorResponse.error= new AppError({explanation : 'Email not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.password){
        ErrorResponse.message='Error while authenticating the user';
        ErrorResponse.error= new AppError({explanation : 'passsword not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    next();
}

async function checkAuth(req,res,next){
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from `Bearer token`
        const response= await UserService.isAuthenticated(token);
        if(response){
            req.user= response;
            next()
        }
    } catch (error) {
        console.log(error);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(error)
    }
}

module.exports= {
    validateAuthRequest,
    checkAuth
}