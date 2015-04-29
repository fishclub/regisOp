var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var OrganizationSchema = new Schema({
	orgName : String,
    orgType  : String
});

var Organization = mongoose.model('organization', OrganizationSchema);

var initObj = new Organization();
initObj.orgName='';
initObj.orgType='';

router.get('/listorganization', isLoggedIn, function (req, res){
	Organization.find(function(err, organizations){
		if (err) return console.error(err);
		res.render( 'organizations', {
			organization : initObj,
			organizations : organizations,
			message : req.flash('success')
		});
    });
});

router.get('/listorganizationselect', isLoggedIn, function (req, res){
	Organization.find(function(err, organizations){
		if (err) return console.error(err);
		return organizations;
    });
});

router.post('/addorganization', function(req, res){
	var objAdd = new Organization();
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
	Organization.find(function(err, organizations){
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
	organization.orgName=req.body.orgName;
	organization.orgType=req.body.orgType;
	organization.save(function(err, organization){
		if (err) return console.error(err);
			Organization.find(function(err, organizations){
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

router.getOrgList = function() {
  Organization.find(function(err, organizations){
		if (err) return console.error(err);
		return organizations;
    });
};

module.exports = router;
