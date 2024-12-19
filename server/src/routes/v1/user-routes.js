const express= require('express');
const {UserController}= require('../../controllers');
const {AuthRequestMiddlewares, UserMiddlewares}= require('../../middlewares');
const router= express.Router();

router.post('/signup',AuthRequestMiddlewares.validateAuthRequest,UserController.signup);
router.post('/signin',AuthRequestMiddlewares.validateAuthRequest, UserController.signin);
// /api/v1/cities/:id GET
router.get('/',UserController.getUsers);

// /api/v1/cities/:id GET
router.get('/:id',UserController.getUser);

// /api/v1/cities/:id DELETE
router.delete('/:id',UserController.deleteUser);

// /api/v1/cities/:id PATCH
router.patch('/:id',UserMiddlewares.validateUpdateRequest,UserController.updateUser);

module.exports= router;