
let _userService = null

class UserController{
    constructor({UserService}){
        _userService = UserService
    }

    async getDealByNum(req, res){
        const {numDeal} =  req.params
        const Deal = await _userService.getDealByNum(numDeal)
        return res.send(Deal)
    }

    async updateDealByNum(req, res){
        const {numDeal} =  req.params
        const {body} = req
        const Deal = await _userService.updateDealByNum(numDeal, body)
        return res.send(Deal)
    }
    async update(req, res){
        const {body} = req
        const {idMongo} =  req.params
        const {id} = req.user;
        if(id!=idMongo){
            const error = new Error()
            error.message = "Permiso denegado"
            error.status = 401
            throw error
        }
        const updatedUser = await _userService.update(idMongo, body)
        return res.send(updatedUser)
    }
}

module.exports = UserController