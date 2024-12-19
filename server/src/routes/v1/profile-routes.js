const express = require('express');
const { ProfileController } = require('../../controllers');
const {ProfileMiddlewares, AuthRequestMiddlewares} = require('../../middlewares')
const router = express.Router();

// /api/v1/cities POST
router.post('/',
    ProfileMiddlewares.validateCreateRequest,
    AuthRequestMiddlewares.checkAuth,
    ProfileController.createProfile
);

router.get('/exist-profile',AuthRequestMiddlewares.checkAuth,ProfileController.existingProfile);

// /api/v1/cities/:id GET
router.get('/',ProfileController.getProfiles);

// /api/v1/cities/:id GET
router.get('/:id',ProfileController.getProfile);

// /api/v1/cities/:id DELETE
router.delete('/:id',ProfileController.deleteProfile);

// /api/v1/cities/:id PATCH
router.patch('/:id',
     ProfileMiddlewares.validateUpdateRequest,
     ProfileController.updateProfile);



module.exports = router;