const Client = require('../models').ClientInfo;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, client;

    let client_info = req.body;
    console.log(client_info);

    [err, client] = await to(Client.create(client_info));
    if (err) return ReE(res, err, 422);


    [err, client] = await to(client.save());
    if (err) return ReE(res, err, 422);

    let client_json = client.toWeb();
    //client_json.users = [{user:user.id}];

    return ReS(res, {
        client: client_json
    }, 201);
}
module.exports.create = create;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log('in get');
    let clients, err;

    [err, clients] = await to(Client.findAll());

    return ReS(res, {
        clients: clients
    });
}
module.exports.getAll = getAll;


const clientinfo = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    return ReS(res, clientData());
}
module.exports.clientData = clientinfo;


const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let clients, err, id;
    id = req.params.id;
    [err, clients] = await to(Client.findAll({
        where: {
            id: id
        }
    }));
    return ReS(res, {
        clients: clients
    });
}
module.exports.get = get;

const searchByName = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let clients, err, name;
    name = req.params.name;
    [err, clients] = await to(Client.findAll({
        where: {
            name: {
                [Op.like]: '%' + name + '%'
            }
        }
    }));
    return ReS(res, {
        clients: clients
    });
}
module.exports.searchByName = searchByName;

const searchByClientId = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let clients, err, name;
    name = req.params.name;
    [err, clients] = await to(Client.findAll({
        where: {
            clientid: {
                [Op.like]: name + '%'
            }
        }
    }));
    return ReS(res, {
        clients: clients
    });
}
module.exports.searchByClientId = searchByClientId;

const searchByGstId = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let clients, err, name;
    name = req.params.name;
    [err, clients] = await to(Client.findAll({
        where: {
            gstid: {
                [Op.like]: name + '%'
            }
        }
    }));
    return ReS(res, {
        clients: clients
    });
}
module.exports.searchByGstId = searchByGstId;


const update = async function (req, res) {
    let err, client, data, returnData;
    data = req.body;

    [err, returnData] = await to(Client.update({
        "clientid": data.clientid,
        "name": data.name,
        "password": data.password,
        "gstid": data.gstid,
        "gstno": data.gstno,
        "emailid": data.emailid,
        "ewaybillid": data.ewaybillid,
        "ewaypassword": data.ewaypassword,
        "mobile": data.mobile
    }, {
        where: {
            id: data.id
        }
    }));
    if (err) {
        return ReE(res, err);
    }
    console.log(returnData);
    return ReS(res, {
        client: 1
    });
}

module.exports.update = update;

const remove = async function (req, res) {
    let user, err, id;
    id = req.params.clientid;
    console.log(id);
    [err, user] = await to(Client.destroy({
        where: {
            clientid: id
        }
    }));
    if (err) return ReE(res, 'error occured trying to delete the client');

    return ReS(res, {
        message: 'Deleted user'
    }, 204);
}
module.exports.remove = remove;