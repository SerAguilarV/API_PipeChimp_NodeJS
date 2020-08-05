
// Parsea a enteros los querys del req, excepto el de longitud mayor a 20, que son ids de Mongo
module.exports = function(req, res, next){
    const queryStrings = req.query;
    for(const key in queryStrings){
        const length = queryStrings[key].length;
        const isValid = length > 20 ? false : !isNaN(parseInt(queryStrings[key])) //id de mongoose
        if (isValid){
            queryStrings[key] = parseInt(queryStrings[key]);
        }
    }
    req.query = queryStrings;
    next();
}