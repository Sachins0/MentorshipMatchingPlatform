const { StatusCodes } = require('http-status-codes');

const { ProfileService } = require('../services');
const {SuccessResponse,ErrorResponse} = require('../utils/common')

/**
 * POST : /profiles 
 * req-body {name: 'IGI', code: 'DEL, address: '', cityId: ,}
 */
async function createProfile(req, res) {
    try {
        const profile = await ProfileService.createProfile({
            userId: req.user,
            role: req.body.role,
            bio: req.body.bio,
            interests: req.body.interests,
            skills: req.body.skills,
        });
        SuccessResponse.data=profile
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
 * GET : /profiles 
 * req-body {}
 */
async function getProfiles(req, res) {
    try {
        const profiles = await ProfileService.getProfiles();
        SuccessResponse.data=profiles;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch(error) {
        console.log(error);
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

/**
 * GET : /profiles/:id
 * req-body {}
 */
async function getProfile(req, res) {
    try {
        console.log("get");
        const profile = await ProfileService.getProfile(req.params.id);
        SuccessResponse.data=profile;
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
 * DELETE : /profiles/:id 
 * req-body {}
 */
async function deleteProfile(req, res) {
    try {
        const profile = await ProfileService.deleteProfile(req.params.id);
        SuccessResponse.data=profile;
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
 * PATCH : /profiles/:id 
 * req-body {name: 'IGI', code: 'DEL, address: ''}
 */
async function updateProfile(req, res) {
    try {
        const profile = await ProfileService.updateProfile(req.params.id,
            {
                bio: req.body.bio,
                interests: req.body.interests,
                skills: req.body.skills,
            }
        );
        SuccessResponse.data=profile;
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

async function existingProfile(req, res) {
    try {
        const id= req.user;
        const profile = await ProfileService.existingProfile(id);
        if (profile) {
            SuccessResponse.data=profile;
            return res
                .status(StatusCodes.OK)
                .json({ exists: true, SuccessResponse });
        }
        return res.status(StatusCodes.OK).json({ exists: false });
        
    } catch(error) {
        console.log(error);
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

module.exports = {
    createProfile,
    getProfile,
    getProfiles,
    deleteProfile,
    updateProfile,
    existingProfile
}