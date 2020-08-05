const axios = require("axios")
let _apiKeyMail = null
let  _serverMail = null
let  _serverPipe = null
let _apiKeyPipe = null

class Pipe2MailService{
    constructor({config}){
        _serverPipe = config.SERVER_PIPEDRIVE
        _apiKeyPipe = config.APIKEY_PIPEDRIVE
        _serverMail = config.SERVER_MAILCHIMP
        _apiKeyMail = config.APIKEY_MAILCHIMP
    }

    async exportSectors(people, sectors){
        const headers = {"Authorization": _apiKeyMail}
        let added = []
        let notAdded = []
        let cont = 0
        while (cont != people.length){
            let person = people[cont]
            if(person["organization"]){
            if (this.isSectorChecked(person["organization"]["sector"], sectors)) {
                let jsonPD = {
                    "email_address": person["email"],
                    "status" : "subscribed",
                    "merge_fields" : {
                    "FNAME": person["first_name"],
                    "LNAME": person["last_name"]}
                }
                await axios.post(_serverMail + "lists/89c8eb6e41/members/", jsonPD, {headers: headers})
                .then(response=>{
                    if(response.status == 200){
                        added.push(jsonPD)
                    } else{
                        notAdded.push(jsonPD)
                    }
                }).catch(error=>{
                    notAdded.push(jsonPD)
                    // console.log(error);
                })
            }}
            cont+=1
            console.log(cont)
        }
        return {"people added": added, "people not added" : notAdded}
    }

    isSectorChecked(personSector, Sectors){
        let flag = false
        Sectors.forEach(sector=>{
            if(personSector == sector){
                flag = true
            }
        })
        return flag
    }

    async People(organizations){
        let People = []
        let flag = 500
        let cont = 0
        while (flag == 500) {
            let params_PIPE = {
                "api_token": _apiKeyPipe,
                "limit": "500",
                "start" : (cont * 500).toString()
                }
            var url = _serverPipe + "persons/"
            await axios.get(url,{params:params_PIPE})
                .then(response =>{
                    this.data = response.data
                    if (response.status == 200){
                        const peoplePD = this.data["data"]
                        peoplePD.forEach(person => {
                            if(person["org_id"]){
                            if(this.searchValue(organizations, person["org_id"]["value"] )){
                                People.push({
                                    "id": person["id"],
                                    "first_name" : person["first_name"],
                                    "last_name" : person["last_name"],
                                    "email" : person["email"][0]["value"],
                                    "organization" : organizations[person["org_id"]["value"]]
                                })
                            }}
                        })
                    }
                    flag = this.data["data"].length
                    cont+=1
                })
                .catch(error=>{
                    console.log("Error: "+ error)
                })
        }
        return People
    }
    searchValue(organizations,id){
        try {
            let d = organizations[id]
            return true
        } catch (error) {
            return false
        }
    }
    async Organizations(){
        let organizations = {}
        let flag = 500
        let cont = 0
        while (flag == 500) {
            let params_PIPE = {
                "api_token": _apiKeyPipe,
                "limit": "500",
                "start" : (cont * 500).toString()
                }
            var url = _serverPipe + "organizations/"
            await axios.get(url,{params:params_PIPE})
                .then(response =>{
                    this.data = response.data
                    if (response.status == 200){
                        const orgs = this.data["data"]
                        orgs.forEach(org => {
                            if(org["db1de7f663b5ba7cedfb927dd811b0c7693c33b6"]){
                                organizations[org["id"]] = {
                                    "name" : org["name"],
                                    "sector" : this.Sector(org["db1de7f663b5ba7cedfb927dd811b0c7693c33b6"]),
                                    "web" : org["8c2356d53aa262f0eabc4b5c7b6d957fd7714861"]
                                }
                            }
                        })
                    }
                    flag = this.data["data"].length
                    cont+=1
                })
                .catch(error=>{
                    console.log("Error: "+ error)
                })
        }
        return organizations
    }

    Sector(SectorsOrgs){
        const sector = {
            "28":	"Operador",
            "15":	"Park / Other",
            "16":	"Parking Company",
            "78":	"Hotel",
            "13":	"Real Estate / Constructora",
            "72":	"Retailer",
            "65":	"Shopping Malls",
            "64":	"Supermercados",
            "29":	"Supplier",
            "69":	"Universidades",
            "11":	"Promotor/Desarrollador",
            "12":	"Firma Architectura",
            "17":	"Office Tower",
            "66":	"Mix Use",
            "26":	"Integración",
            "70":	"Hospitales",
            "14":	"Association",
            "71":	"Aeropuertos"
        }
        var sectorFinal = ""
        SectorsOrgs.split(",").forEach(sec => {
            sectorFinal += sector[sec] + ", "
        });
        return sectorFinal.substr(0, sectorFinal.length -2);
    }

}

module.exports = Pipe2MailService
