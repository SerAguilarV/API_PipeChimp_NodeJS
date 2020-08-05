let _pipe2mailService = null

class Pipe2MailController{
    constructor({Pipe2MailService}){
        _pipe2mailService = Pipe2MailService
    }

    async exportSector(req, res){
        console.log("Export 2 mail chimp called")
        const {body} = req
        const sectores = body["Sectores"]
        const orgs = await _pipe2mailService.Organizations()
        // console.log(orgs)
        const people = await _pipe2mailService.People(orgs)
        const sectorExported = await _pipe2mailService.exportSectors(people, sectores)
        return res.send(sectorExported)
    }
}

module.exports = Pipe2MailController