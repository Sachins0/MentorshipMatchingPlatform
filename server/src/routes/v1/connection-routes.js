const express= require('express');
const router= express.Router();
const {ConnectionController}= require('../../controllers');

router.get('/matches/:menteeId',ConnectionController.getMatches);

router.get('/auto-connect/:menteeId',ConnectionController.autoMatchAndConnect);

router.get('/getallconnections/:id',ConnectionController.getAllConnections);



module.exports= router;