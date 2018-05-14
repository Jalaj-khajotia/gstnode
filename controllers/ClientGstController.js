const ClientGST = require('../models').ClientGst;

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, clientgstObj;
    let user = req.user;
    let client_gst = req.body;
    client_gst.companyid = req.user.companyid;

    if (!req.body.clientInfoId)
        if (err) return ReE(res, err, 422);

    [err, clientgstObj] = await to(ClientGST.create(client_gst));
    if (err) return ReE(res, err, 422);

    [err, clientgstObj] = await to(clientgstObj.save());
    if (err) return ReE(res, err, 422);

    let client_json = clientgstObj.toWeb();
    //client_json.users = [{user:user.id}];

    return ReS(res, {
        client: client_json
    }, 201);
}
module.exports.create = create;

const getClientGSTStatus = async function (req, res) {
    console.log('in method post');
    res.setHeader('Content-Type', 'application/json');
    let err, clientgstObj, companyid;

    let clientId = req.body.id;
    companyid = req.user.companyid;


    [err, clientgstObj] = await to(ClientGST.findAll({
        where: {
            clientInfoId: clientId,
            companyid: companyid
        }
    }));
    if (err) return ReE(res, err, 422);

    return ReS(res, clientgstObj);
}
module.exports.getClientGSTStatus = getClientGSTStatus;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log('in get');
    let clients, err;

    [err, clients] = await to(ClientGST.findAll());

    return ReS(res, {
        clients: clients
    });
}
module.exports.getAll = getAll;

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

const update = async function (req, res) {
    let err, client, data, returnData, companyid;
    data = req.body;
    companyid = req.user.companyid;

    [err, returnData] = await to(ClientGST.update({
        "gstFormType": data.gstFormType,
        "year": data.year,
        "period": data.period,
        "gststatus": data.gststatus,
        "receiptDate": data.receiptDate,
        "fillingDate": data.fillingDate,
        "remark": data.remark
    }, {
        where: {
            id: data.id,
            companyid: companyid
        }
    }));
    if (err) {
        return ReE(res, err);
    }
    console.log(returnData);
    return ReS(res, {
        gstData: returnData
    });
}

module.exports.update = update;

const remove = async function (req, res) {
    let user, err, id, companyid;
    id = req.params.id;
    companyid = req.user.companyid;


    [err, user] = await to(ClientGST.destroy({
        where: {
            id: id,
            companyid: companyid
        }
    }));
    if (err) return ReE(res, 'error occured trying to delete the GST Record');

    return ReS(res, {
        message: 'Deleted GST Record'
    }, 204);
}
module.exports.remove = remove;