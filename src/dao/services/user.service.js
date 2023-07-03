import { userRepository } from "../repositories/user.repository.js";
class UserService {
    constructor() {
        this.userRepository = userRepository
    }
    findWiththemail = async (email) => {
        try {
            return await this.userRepository.findWithMail(email);
        } catch (error) {
            console.log(error)
        }
    }
    createtheUser = async (user) => {
        try {
            return await this.userRepository.createUser(user)
        } catch (error) {
            console.log(error)
        }
    }
    findbyuserid = async (id) => {
        try {
            return await this.userRepository.findById(id)
        } catch (error) {

        }
    }
    findbytheId = async (id) => {
        try {
            return await this.userRepository.findByCartId(id);
        } catch (error) {
            console.log(error);
        }
    }
    findbytheCartUser = async (cartId) => {
        try {


            return await this.userRepository.findByCartId(cartId)
        } catch (error) {
            console.log(error)
        }
    }
    updatetheUser = async (user) => {
        try {
            return await this.userRepository.updateUser(user);
        } catch (error) {
            console.log(error)
        }
    }
    updateFunction = async (id, user) => {
        try {
          
            return await this.userRepository.updateFunction(id, user);
        } catch (error) {
            console.log("error")
        }
    }
}
export const userService = new UserService()