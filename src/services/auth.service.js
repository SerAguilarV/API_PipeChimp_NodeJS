const {sign} = require("jsonwebtoken")
const {JWT_SECRET} = require("../config");

let _userService = null

class AuthService{

    constructor({UserService}){
        _userService = UserService
    }

    async signIn(user){
        const {email, password} = user;
        const userExist = await _userService.getEmail(email)
        if (!userExist){
            const error = new Error()
            error.message = "Usuario no existe"
            error.status = 404
            throw error
        }
        const userToEncode = {
            email: userExist.email,
            id: userExist._id
        }
        const validPassword = await userExist.CheckPass(password)
        if (validPassword["NewPass"]){
            const token = sign({userToEncode}, JWT_SECRET, {expiresIn: "4h"})
            return {token, newPass:true, _id:userExist._id}
        } else if(!validPassword["Valid"]){
            const error = new Error()
            error.status = 400
            error.message = "Contraseña invalida"
            throw error
        }
        const token = sign({userToEncode}, JWT_SECRET, {expiresIn: "4h"})
        return {token, user: userToEncode}
    }


}

module.exports = AuthService