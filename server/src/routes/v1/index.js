const express= require('express');
const { infoController } = require('../../controllers');
const userRoutes= require('./user-routes');
const profileRoutes= require('./profile-routes');
const connectionRoutes= require('./connection-routes');

const router=express.Router();

router.use('/user',userRoutes);
router.use('/profile',profileRoutes);
router.use('/connection',connectionRoutes);

router.get('/info',infoController.info);

module.exports=router;