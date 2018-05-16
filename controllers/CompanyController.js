const Company = require('../models').Company;

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, company;
    let user = req.user;

    let company_info = req.body;
    [err, company] = await to(Company.create(company_info));
    if (err) return ReE(res, err, 422);

    [err, company] = await to(company.save());
    if (err) return ReE(res, err, 422);

    let company_json = company.toWeb();
    // company_json.users = [{
    //     user: user.id
    // }];

    return ReS(res, {
        company: company_json
    }, 201);
}
module.exports.create = create;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, companies;

    [err, companies] = await to(Company.findAll());

    return ReS(res, {
        companies: companies
    });
}
module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, company, data;
    company = req.company;
    data = req.body;

    [err, company] = await to(Company.update({
        "name": data.name,
        "isActive": data.isActive
    }, {
        where: {
            id: data.id
        }
    }));
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        company: company
    });
}
module.exports.update = update;

const remove = async function (req, res) {
    let company, err, id;
    id = req.params.id;

    [err, company] = await to(Company.destroy({
        where: {
            id: id
        }
    }));
    if (err) return ReE(res, 'error occured trying to delete the company');

    return ReS(res, {
        message: 'Deleted Company'
    }, 204);
}
module.exports.remove = remove;