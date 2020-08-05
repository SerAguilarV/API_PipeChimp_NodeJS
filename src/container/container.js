const {createContainer, asClass, asFunction, asValue} = require("awilix")
const config = require("../config")

// Export server (Exist in this folder in "index.js" file)
const ServerSB = require(".")

// Export models
const {UserModel} = require("../models")
// Export Routes
const {RoutesAuth, UserRoutes, Pipe2MailRoutes} = require("../routes/index.routes")
// Export Controllers
const {AuthController, UserController, Pipe2MailController} = require("../controllers")
// Export service
const {AuthService, UserService, Pipe2MailService} = require("../services")
// export Router
const RoutesFunction = require("../routes")
// Create Container Awilix
const container = createContainer()

// Models
container.register({
    UserModel: asValue(UserModel)
})
.register({
    RoutesAuth : asClass(RoutesAuth).singleton(),
    UserRoutes : asClass(UserRoutes).singleton(),
    Pipe2MailRoutes : asClass(Pipe2MailRoutes).singleton(),
})
.register({
    AuthService : asClass(AuthService).singleton(),
    UserService : asClass(UserService).singleton(),
    Pipe2MailService : asClass(Pipe2MailService).singleton()
})
.register({
    AuthController : asClass(AuthController).singleton(),
    UserController : asClass(UserController).singleton(),
    Pipe2MailController: asClass(Pipe2MailController).singleton(),
})
.register({
    config : asValue(config),
    ServerSB: asClass(ServerSB).singleton(),
    RoutesFunction: asFunction(RoutesFunction).singleton()
})
module.exports = container
