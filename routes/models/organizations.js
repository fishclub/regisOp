var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var OrganizationSchema = new Schema({
	userId : String,
	orgName : String,
    orgType  : String
});

var Organization = mongoose.model('organization', OrganizationSchema);

var initObj = new Organization();
initObj.userId='';
initObj.orgName='';
initObj.orgType='';

router.get('/listorganization', isLoggedIn, function (req, res){
	Organization.find({ 'userId' :  req.user._id }, function(err, organizations){
		if (err) return console.error(err);
		res.render( 'organizations', {
			organization : initObj,
			organizations : organizations,
			message : req.flash('success')
		});
    });
});

router.post('/addorganization', function(req, res){
	var objAdd = new Organization();
		objAdd.userId = req.user._id;
		objAdd.orgName = req.body.orgName;
		objAdd.orgType = req.body.orgType;
		objAdd.save(function(err, organization) {
			if (err) return console.error(err);
			req.flash('success', 'Save success');
			res.redirect('./editorganization/'+organization._id);
		});
});

router.get('/delorganization/:id', function (req, res){
	Organization.findById(req.params.id, function(err, organization){
    organization.remove(function(err, organization){
		if (err) return console.error(err);
		req.flash('success', 'Delete success');
		res.redirect('/organizations/listorganization');
    });
  });
});

router.get('/editorganization/:id', function (req, res){
	Organization.findById(req.params.id, function(err, organization){
    if (err) return console.error(err);
	Organization.find({ 'userId' :  req.user._id }, function(err, organizations){
		if (err) return console.error(err);
		res.render( 'organizations', {
			organization : organization,
			organizations : organizations,
			message: req.flash('success')
		});
    });
  });
});

router.post('/updateorganization', function (req, res){
	Organization.findById(req.body._id, function(err, organization){
    if (err) return console.error(err);
    organization.userId = req.user._id;
	organization.orgName=req.body.orgName;
	organization.orgType=req.body.orgType;
	organization.save(function(err, organization){
		if (err) return console.error(err);
			Organization.find({ 'userId' :  req.user._id }, function(err, organizations){
			if (err) return console.error(err);
			req.flash('success', 'Update success');
			res.render( 'organizations', {
				organization : organization,
				organizations : organizations,
				message: req.flash('success')
			});
		});
	});
  });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    req.flash('loginMessage', 'Please login or signup');
    res.redirect('/login');
}

module.exports = router;
