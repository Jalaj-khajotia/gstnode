const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('./../controllers/UserController');
const CompanyController = require('./../controllers/CompanyController');
const HomeController 	= require('./../controllers/HomeController');
const ClientInfoController = require('./../controllers/ClientInfoController');
const ClientGstController = require('./../controllers/ClientGstController');


const custom 	        = require('./../middleware/custom');

const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post('/client',passport.authenticate('jwt', {session:false}), ClientInfoController.create);                                                    // C
router.get('/clients', passport.authenticate('jwt', {session:false}), ClientInfoController.getAll);        // R
router.get('/client/:id', passport.authenticate('jwt', {session:false}), ClientInfoController.get);        // R
router.put('/clients', passport.authenticate('jwt', {session:false}), ClientInfoController.update);     // U
router.delete('/client/:id', passport.authenticate('jwt', {session:false}), ClientInfoController.remove);     // D
router.get('/clients/gstdata', passport.authenticate('jwt', {session:false}), ClientInfoController.clientData);   

//search api
router.get('/clients/tname/:key', passport.authenticate('jwt', {session:false}), ClientInfoController.searchByTradeName);        // R
router.get('/clients/lname/:key', passport.authenticate('jwt', {session:false}), ClientInfoController.searchByLegalName);        // R
router.get('/clients/gstid/:key', passport.authenticate('jwt', {session:false}), ClientInfoController.searchByGSTIN);        // R
router.get('/clients/codeno/:key', passport.authenticate('jwt', {session:false}), ClientInfoController.searchByCodeNo);        // R
router.get('/clients/userid/:key', passport.authenticate('jwt', {session:false}), ClientInfoController.searchByUserId);        // R

// gst api
router.post( '/clientgst', passport.authenticate('jwt', {session:false}), ClientGstController.create);                                                 // C
router.post( '/fetchclientgst', passport.authenticate('jwt', {session:false}), ClientGstController.getClientGSTStatus);        // R
router.put(  '/clientgst', passport.authenticate('jwt', {session:false}), ClientGstController.update);     // U
router.delete('/clientgst/:id', passport.authenticate('jwt', {session:false}), ClientGstController.remove);     // D

//company api
router.get( '/companies', passport.authenticate('jwt', {session:false}), CompanyController.getAll);                                                 // C
router.post( '/company', passport.authenticate('jwt', {session:false}), CompanyController.create);        // R
router.put(  '/company', passport.authenticate('jwt', {session:false}), CompanyController.update);     // U
router.delete('/company/:id', passport.authenticate('jwt', {session:false}), CompanyController.remove);     // D

//user api
router.post('/users',UserController.create);
router.post('/users/login', UserController.login);

router.put('/user',passport.authenticate('jwt', {session:false}),UserController.update);
router.get('/users', passport.authenticate('jwt', {session:false}), UserController.getAll); 
router.delete('/user/:id',passport.authenticate('jwt', {session:false}),UserController.remove);

//data
router.get('/users/data', passport.authenticate('jwt', {session:false}), UserController.get); 
// router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
// router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
// router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D

router.post(    '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.create);                  // C

// router.get(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.get);     // R
// router.put(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.update);  // U
// router.delete(  '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.remove);  // D

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
