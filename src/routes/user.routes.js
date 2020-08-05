const {Router} = require("express")
const {AuthMiddleware, ParseMiddleware} = require("../middleware")
module.exports = function UserRoutes({UserController}){
    const router = Router()
    router.patch("/:idMongo", [AuthMiddleware, ParseMiddleware] ,UserController.update)
    router.get("/deals/:numDeal", [AuthMiddleware, ParseMiddleware], UserController.getDealByNum)
    router.put("/deals/:numDeal", [AuthMiddleware, ParseMiddleware], UserController.updateDealByNum)
    return router
}