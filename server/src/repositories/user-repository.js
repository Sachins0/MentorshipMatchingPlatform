const {User}= require('../models');
const CrudeRepository= require('./crud-repository');

class UserRepository extends CrudeRepository{
    constructor(){
        super(User)
    }

    async getUserByEmail(email){
        const user= await User.findOne({
            where:{
                email: email
            }
        });

        return user;
    }
}

module.exports= UserRepository;