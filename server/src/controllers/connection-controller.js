const {ConnectionService}= require('../services');
const { StatusCodes } = require('http-status-codes');
const {SuccessResponse,ErrorResponse} = require('../utils/common');

async function getMatches(req,res){
    try {
        const { menteeId } = req.params;
        const matches = await ConnectionService.findMatches(menteeId);
        SuccessResponse.data=matches;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
};

async function autoMatchAndConnect(req,res){
    try {
        const { menteeId } = req.params;
        console.log(menteeId);
        const connection = await ConnectionService.autoMatchAndConnect(menteeId);
        SuccessResponse.data=connection;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        console.log(error);
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
};
async function getAllConnections(req,res){
    try {
        const { id } = req.params;
        console.log(id);
        const connections = await ConnectionService.getAllConnections(id);
        console.log(connections);
        SuccessResponse.data=connections;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        console.log(error);
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
};


module.exports={
    getMatches,
    autoMatchAndConnect,
    getAllConnections
}