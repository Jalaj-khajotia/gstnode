const Client = require('./../models').ClientInfo;

let user = async function (req, res, next) {
    let client_id, err, user;
    console.log('in customjs');
    user = req.user;
    //client_id = req.params.client_id;

    //[err, client] = await to(Client.findOne({where:{id:clientid}}));
    //if(err) return ReE(res, "err finding Client");

    if(!user) return ReE(res, "client not found with id: "+user.email);
    /*let user, users_array, users;
    user = req.user;
    [err, users] = await to(company.getUsers());

    users_array = users.map(obj=>String(obj.user));

    if(!users_array.includes(String(user._id))) return ReE(res, "User does not have permission to read app with id: "+app_id);
*/
    req.user = user;
    next();
}
module.exports.client = user;