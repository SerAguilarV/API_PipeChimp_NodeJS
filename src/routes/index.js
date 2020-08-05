const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const compression = require("compression")
require("express-async-errors")
const {ErrorMiddleware} = require("../middleware")

function RoutesFunction({RoutesAuth, UserRoutes, Pipe2MailRoutes}){
    const router = express.Router()
    const apiRoutes = express.Router()
    apiRoutes.use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression())
    apiRoutes.use("/user", RoutesAuth)
    apiRoutes.use("/user", UserRoutes)
    apiRoutes.use("/pipe2mail", Pipe2MailRoutes)
    // concat the url 
    router.use("/api/SB", apiRoutes)
    router.use(ErrorMiddleware)
    return router
}

module.exports = RoutesFunction;