const mongoose = require("mongoose")
const {Schema} = mongoose;
const {compareSync, hashSync, genSaltSync} = require("bcryptjs");

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    fullname: {type: String, required: true},
}, {collection: "users"})

UserSchema.methods.toJSON = function(){
    let usuario = this.toObject()
    delete usuario.password
    return usuario
}
UserSchema.methods.CheckPass = function(password){
    if (password == this.password){
        return {"NewPass": true, "Valid": false}
    }
    if(compareSync(password, this.password )){
        return {"NewPass": false, "Valid": true}
    }
    return {"NewPass": false, "Valid": false}
}

UserSchema.pre('save', async function(next){
    const usuario = this
    if (!usuario.isModified("password")){
        return next()
    }
    else{
        const salt = genSaltSync(10)
        const hashedPASS = hashSync(usuario.password, salt)
        usuario.password = hashedPASS
        next()
    }
})

UserSchema.post("save", function (doc) {
    console.log('%s has been saved', doc._id)
})

module.exports = mongoose.model("Users", UserSchema)