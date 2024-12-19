const { where, col, Op } = require('sequelize');
const {Connection, Profile, User}= require('../models');
const CrudeRepository= require('./crud-repository');

class ConnectionRepository extends CrudeRepository{
    constructor(){
        super(Connection)
    }

    async getAllConnections(id){
        const connections= await Connection.findAll({
            where: {
                [Op.or]: {
                    mentorId: id,
                    menteeId: id,
                  },
            },
            include: [
                {
                    model: Profile,
                    required: true,
                    on: {
                        col1: where(col('Connection.mentorId'), '=', col('mentor.userId'))
                    },
                    as: 'mentor',
                    include: {
                        model: User,
                        required: true,
                    }
                },
                {
                    model: Profile,
                    required: true,
                    on: {
                        col1: where(col('Connection.menteeId'), '=', col('mentee.userId'))
                    },
                    as: 'mentee',
                    include: {
                        model: User,
                        required: true,
                    }
            },
        ]
        })
        return connections;
    }

    async getConnectionById(mentorId, menteeId){
        const user= await Connection.findOne({
            where:{
                mentorId, 
                menteeId
            },
        });

        return user;
    }
}

module.exports= ConnectionRepository;