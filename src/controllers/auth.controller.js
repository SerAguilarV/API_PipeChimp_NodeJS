let _authService = null

class AuthController{
    constructor({AuthService}){
        _authService = AuthService
    }

    async signIn(req, res){
        const {body} = req
        const creds = await _authService.signIn(body)
        return res.status(301).send(creds)
    }
}

module.exports = AuthController