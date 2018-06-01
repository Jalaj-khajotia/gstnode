const ClientGST = require('../models').ClientGst;
var Sequelize = require('sequelize');
const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
    port: CONFIG.db_port,
    operatorsAliases: false
});

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

const getClientGSTReport = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let clients, err, gstParams;
    gstParams = req.body;

    sequelize.query('CALL GetGSTReport (:year, :gstformtype, :period)', {
        replacements: {
            year: gstParams.year,
            gstformtype: gstParams.gstformtype,
            period: gstParams.period
        },
        type: sequelize.QueryTypes.SELECT
    }).then(projects => {
        return ReS(res, {
            report: projects
        });
    });
}
module.exports.getClientGSTReport = getClientGSTReport;

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
        "gstpendingstatus": data.gstpendingstatus,
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