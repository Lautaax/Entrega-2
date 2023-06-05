import { userRepository } from "../repositories/user.repository";
class UserService{
    constructor(){
        this.userRepository=userRepository
    }
    findWiththemail=async(email)=>{
        try {
            return await this.userRepository.findWithMail(email);
        } catch (error) {
            console.log(error)
        }
    }
    createtheUser=async (user)=>{
        try {
            return await this.userRepository.createUser(user)
        } catch (error) {
            console.log(error)
        }
    }
    findbytheId=async (id)=>{
        try {
            return await this.userRepository.findByCartId(id);
        } catch (error) {
            console.log(error);
        }
    }
    findbytheCartUser=async (cartId)=>{
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
}