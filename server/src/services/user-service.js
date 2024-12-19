const {StatusCodes}= require('http-status-codes');
const {UserRepository}= require('../repositories');
const AppError= require('../utils/errors/app-error');
const {Auth}= require('../utils/common');

const userRepo= new UserRepository();

async function signup(data){
    try {
        const user= await userRepo.create(data);
        return user;
    } catch (error) {
        if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            let explanation=[];
            error.errors.forEach((err)=>explanation.push(err.message));
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new User object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data){
    try {
        const user= await userRepo.getUserByEmail(data.email);
        if(!user){
            throw new AppError('No user found for the given email',StatusCodes.NOT_FOUND);
        }
        const passwordMatch= Auth.checkPassword(data.password, user.password);
        if(!passwordMatch){
            throw new AppError('Invalid password',StatusCodes.BAD_REQUEST);
        }
        const jwt= Auth.createToken({id: user.id, email:user.email});
        return jwt;
    } catch (error) {
        throw error;
    }
}

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('Missing jwt token',StatusCodes.BAD_REQUEST);
        }
        const response= Auth.verifyToken(token);
        const user= await userRepo.get(response.id);
        if(!user){
            throw new AppError('No user found for given id',StatusCodes.BAD_REQUEST);
        }
        return user.id;
    } catch (error) {
        throw error;
    }
}

async function getUsers() {
    try {
        const users = await userRepo.getAll();
        return users;
    } catch(error) {
        throw new AppError('Cannot get all users',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUser(id) {
    try {
        const user = await userRepo.get(id);
        return user;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Requested user can not be found',error.statusCode);
        }
        throw new AppError('Cannot get requested user object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteUser(id) {
    try {
        const user = await userRepo.destroy(id);
        return user;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Requested user to delete can not be found',error.statusCode);
        }
        throw new AppError('Cannot delete the given user object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateUser(id,data) {
    try {
        const user = await userRepo.update(id,data);
        return user;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Requested user to update can not be found',error.statusCode);
        }
        throw new AppError('Cannot update the given user object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    signup,
    signin,
    isAuthenticated,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}