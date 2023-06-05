import { userModel } from '../models/user.model.js';

class UserRepository {
    constructor(){
        this.model = userModel;
    }

    findWithMail = async (email) => {
        try {
            return await this.model.findOne({email: email});
        } catch (error) {
            console.log(error)
        }
    };

    createUser = async(user) => {
        try {
            return await this.model.create(user);
        } catch (error) {
             console.log(error)
        }
    };

    findById = async(id) => {
        try {
            return await this.model.findById(id);
        } catch (error) {
           console.log(error)
        }
    };

    findByCartId = async(cartId) => {
        try {
            return await this.model.findOne({cart: cartId});
        } catch (error) {
             console.log(error)
        }
    }

    updateUser = async (user) => {
        try {
            return await this.model.findOneAndUpdate({_id: user._id}, { $set: user });
        } catch (error) {
             console.log(error)
        }
    }
}


export const userRepository = new UserRepository();
