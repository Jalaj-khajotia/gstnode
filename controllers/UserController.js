const User = require('../models').User;
const authService = require('./../services/AuthService');
const Company = require('../models').Company;

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if (!body.unique_key && !body.email && !body.phone) {
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user, company = [];

        [err, company] = await to(Company.findAll({
            where: {
                id: body.companyid
            }
        }));
        if (company.length == 0) {
            return ReE(res, 'Given company id is not created');
        } else {
            [err, user] = await to(authService.createUser(body));

            if (err) return ReE(res, err, 422);
            return ReS(res, {
                message: 'Successfully created new user.',
                user: user.toWeb(),
                token: user.getJWT()
            }, 201);
        }
    }
}
module.exports.create = create;

const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    // console.log('in user');
    let user = req.user;
    user.password = "";
    return ReS(res, {
        user: user.toWeb()
    });
}
module.exports.get = get;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    // console.log('in user');
    let user = req.user;
    var err, users;

    [err, users] = await to(User.findAll());

    return ReS(res, {
        users: users
    });
}
module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, user, data, checkUser;
    user = req.user;
    data = req.body;
    user.set(data);

    [err, checkUser] = await to(User.findAll({
        where: {
            email: data.email
        }
    }));
    if (checkUser.length > 0 && checkUser[0].id != data.id) {
        err = 'The email address or phone number is already in use';
        return ReE(res, err);
    } else {
        console.log(data.role);
        [err, user] = await to(User.update({
            "role": data.role,
            "email": data.email,
            "companyid": data.companyid
        }, {
            where: {
                id: data.id
            }
        }));
    }

    if (err) {

    }
    return ReS(res, {
        message: 'Updated User: ' + data.email
    });
}
module.exports.update = update;

const remove = async function (req, res) {
    let id, err;
    id = req.params.id;

    [err, user] = await to(User.destroy({
        where: {
            id: id
        }
    }));
    if (err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, {
        message: 'Deleted User'
    }, 204);
}
module.exports.remove = remove;


const login = async function (req, res) {
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if (err) return ReE(res, err, 422);

    return ReS(res, {
        token: user.getJWT(),
        user: user.toWeb()
    });
}
module.exports.login = login;