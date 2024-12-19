const {StatusCodes} = require('http-status-codes');
const { ProfileRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');


const profileRepository = new ProfileRepository();

async function createProfile(data) {
    try {
        const profile = await profileRepository.create(data);
        return profile;
    } catch(error) {
        if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            let explanation=[];
            error.errors.forEach((err)=>explanation.push(err.message));
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Profile',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getProfiles() {
    try {
        const profiles = await profileRepository.getAll();
        return profiles;
    } catch(error) {
        throw new AppError('Cannot get all profiles',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getProfile(id) {
    try {
        const profile = await profileRepository.get(id);
        return profile;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Requested profile can not be found',error.statusCode);
        }
        throw new AppError('Cannot get requested profile object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteProfile(id) {
    try {
        const profile = await profileRepository.destroy(id);
        return profile;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Requested profile to delete can not be found',error.statusCode);
        }
        throw new AppError('Cannot delete the given profile object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateProfile(id,data) {
    try {
        const profile = await profileRepository.update(id,data);
        return profile;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Requested profile to update can not be found',error.statusCode);
        }
        throw new AppError('Cannot update the given profile object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function existingProfile(id) {
    try {
        const profile = await profileRepository.getProfileByUserId(id);
        console.log(profile);
        return profile;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Requested profile can not be found',error.statusCode);
        }
        throw new AppError('Cannot find the given profile object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports={
    createProfile,
    getProfiles,
    getProfile,
    deleteProfile,
    updateProfile,
    existingProfile
}