const container = require("./src/container/container")

const Server = container.resolve("ServerSB")

const {MONGO_URI} = require("./src/config")
const mongoose = require("mongoose")

mongoose.connect(MONGO_URI, 
    {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
    .then(()=>Server.start())
    .catch(console.log)