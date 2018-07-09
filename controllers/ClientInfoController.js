const Client = require('../models').ClientInfo;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, client;
    let client_info = req.body;

    client_info.companyid = req.user.companyid;
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
    let clients, err, companyid;

    console.log('in client info');
    companyid = req.user.companyid;
    [err, clients] = await to(Client.findAll({
        where: {
            companyid: companyid
        }
    }));

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
    let clients, err, id, companyid;
    companyid = req.user.companyid;

    id = req.params.id;
    [err, clients] = await to(Client.findAll({
        where: {
            id: id,
            companyid: companyid
        }
    }));
    return ReS(res, {
        clients: clients
    });
}
module.exports.get = get;

const searchByTradeName = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let clients, err, key, companyid;
    key = req.params.key;
    companyid = req.user.companyid;

    [err, clients] = await to(Client.findAll({
        where: {
            tradename: {
                [Op.like]: '%' + key + '%'
            },
            companyid: companyid
        }
    }));
    return ReS(res, {
        clients: clients
    });
}
module.exports.searchByTradeName = searchByTradeName;

const searchByLegalName = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let clients, err, key, companyid;
    companyid = req.user.companyid;

    key = req.params.key;
    [err, clients] = await to(Client.findAll({
        where: {
            legalname: {
                [Op.like]: '%' + key + '%'
            },
            companyid: companyid
        }
    }));
    return ReS(res, {
        clients: clients
    });
}
module.exports.searchByLegalName = searchByLegalName;

const searchByGSTIN = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let clients, err, key, companyid;
    companyid = req.user.companyid;

    key = req.params.key;
    [err, clients] = await to(Client.findAll({
        where: {
            gstin: {
                [Op.like]: key + '%'
            },
            companyid: companyid
        }
    }));
    return ReS(res, {
        clients: clients
    });
}
module.exports.searchByGSTIN = searchByGSTIN;

const searchByCodeNo = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let clients, err, key, companyid;
    companyid = req.user.companyid;

    key = req.params.key;
    [err, clients] = await to(Client.findAll({
        where: {
            codeno: {
                [Op.like]: key + '%'
            },
            companyid: companyid
        }
    }));
    return ReS(res, {
        clients: clients
    });
}
module.exports.searchByCodeNo = searchByCodeNo;

const searchByUserId = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let clients, err, key, companyid;
    companyid = req.user.companyid;

    key = req.params.key;
    [err, clients] = await to(Client.findAll({
        where: {
            userid: {
                [Op.like]: key + '%'
            },
            companyid: companyid
        }
    }));
    return ReS(res, {
        clients: clients
    });
}
module.exports.searchByUserId = searchByUserId;


const update = async function (req, res) {
    let err, client, data, returnData, companyid;
    data = req.body;
    companyid = req.user.companyid;

    [err, returnData] = await to(Client.update({
        codeno: data.codeno,
        tradename: data.tradename,
        legalname: data.legalname,
        address: data.address,
        gstin: data.gstin,
        regdate: data.regdate,
        dealertype: data.dealertype,
        userid: data.userid,
        password: data.password,
        mobile: data.mobile,
        emailid: data.emailid,
        ewayuserid: data.ewayuserid,
        ewaypassword: data.ewaypassword,
        cancellationdate: data.cancellationdate
    }, {
        where: {
            id: data.id,
            companyid: companyid
        }
    }));
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        client: 1
    });
}

module.exports.update = update;



const updateClientRemarks = async function (req, res) {
    let err, client, data, returnData, companyid;
    data = req.body;
    companyid = req.user.companyid;

    [err, returnData] = await to(Client.update({
        remark: data.remark
    }, {
        where: {
            id: data.id,
            companyid: companyid
        }
    }));
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        client: 1
    });
}

module.exports.updateClientRemarks = updateClientRemarks;


const remove = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    let err, id, companyid, usr;
    id = req.params.id;
    companyid = req.user.companyid;
    [err, usr] = await to(Client.destroy({
        where: {
            id: id,
            companyid: companyid
        }
    }));

    if (err) {
        return ReE(res, 'error occured trying to delete the client');
    } else {
        res.statusCode = 204;
        return res.json({
            "userdeleted": usr
        });
    }



}
module.exports.remove = remove;