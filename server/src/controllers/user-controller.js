const {StatusCodes}= require('http-status-codes');
const {UserService}= require('../services');
const {ErrorResponse, SuccessResponse}= require('../utils/common');

async function signup(req,res){
    try {
        const user= await UserService.signup({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        SuccessResponse.data= user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

async function signin(req,res){
    try {
        const user= await UserService.signin({
            email: req.body.email,
            password: req.body.password
        })
        SuccessResponse.data=user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

async function getUsers(req, res) {
    try {
        const users = await UserService.getUsers();
        SuccessResponse.data=users;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch(error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

/**
 * GET : /users/:id
 * req-body {}
 */
async function getUser(req, res) {
    try {
        const user = await UserService.getUser(req.params.id);
        SuccessResponse.data=user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch(error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

/**
 * DELETE : /users/:id 
 * req-body {}
 */
async function deleteUser(req, res) {
    try {
        const user = await UserService.deleteUser(req.params.id);
        SuccessResponse.data=user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch(error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

/**
 * PATCH : /citiess/:id 
 * req-body {firstName: 's', lastName: 's}
 */
async function updateUser(req, res) {
    try {
        const user = await UserService.updateUser(req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        );
        SuccessResponse.data=user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch(error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

module.exports={
    signup,
    signin,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}