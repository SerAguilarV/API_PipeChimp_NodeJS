const axios = require("axios")
let _UserModel = null
let  _serverPipedrive = null
let _apiKey = null

class UserService{
    constructor({UserModel, config}){
        _UserModel = UserModel
        _serverPipedrive = config.SERVER_PIPEDRIVE
        _apiKey = config.APIKEY_PIPEDRIVE
    }

    async getEmail(email){
        return await _UserModel.findOne({"email":email},{})
    }

    async getDealByNum(numDeal){
        return {"Error": false, data:_serverPipedrive + "deals/" + numDeal +"?api_token="+ _apiKey}
    }
    async updateDealByNum(numDeal, entity){
        let updates = {}
        Object.keys(entity).forEach((element)=>{
            updates[element] = entity[element]
        });
        return {"Error": false, "data updated": updates}
    }
    async update (id, entity){
        return await _UserModel.findById(id, function (err, doc) {
            Object.keys(entity).forEach((element)=>{
                if(entity != "_id"){
                    console.log(element)
                    doc[element] = entity[element]
                }})
            doc.save(function(err){
                if (err){
                    console.log("Error al guardar: " + err)
                }
            })
        })
    }
}

module.exports = UserService