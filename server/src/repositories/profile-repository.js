const {Profile, User}= require('../models');
const CrudeRepository= require('./crud-repository');

class ProfileRepository extends CrudeRepository{
    constructor(){
        super(Profile)
    }

    async getProfileByUserId(userId){
        const profile= await Profile.findOne({
            where:{
                userId
            },
            include: {
                model: User
            }
        });

        return profile;
    }

    async getAllMentor(){
        const profile= await Profile.findAll({
            where:{ role: 'mentor' },
            include:{
                model: User
            }
        });

        return profile;
    }
}

module.exports= ProfileRepository;