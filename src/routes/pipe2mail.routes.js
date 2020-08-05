const {Router} = require("express")
const {AuthMiddleware, ParseMiddleware} = require("../middleware")

module.exports = function UserRoutes({Pipe2MailController}){
    const router = Router()
    router.post("/export", [AuthMiddleware, ParseMiddleware], Pipe2MailController.exportSector)
    return router
}