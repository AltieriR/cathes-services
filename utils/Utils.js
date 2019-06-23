var Utils = {};

//Bind object with the requested body - Prevent from violating the database structure
/**
  * @param Model Model object to be saved in the database. eg: Professor
  * @param body Body of the request. req.body
  */
 Utils.getReqBody = function(Model, body){
    let obj = {};
    Object.keys(Model.schema.obj).forEach(function(key){
        obj[key] = body[key];
    });
    return new Model(obj);
};

//What is conflicting * Refactor
Utils.reqErrorHandling = function(err, conf, res){
    console.log(err.errmsg);
    switch(err.code){
        case 11000:
            if(conf) {
                res.status(400).send(conf +' já existente!');
            } else {
                res.status(400).send('Já existente!');
            }
            break;
        default:
            res.status(500).send('Internal error!');
            break;
    }
    
}

module.exports = {getReqBody: Utils.getReqBody, reqErrorHandling: Utils.reqErrorHandling};