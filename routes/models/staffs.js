var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var StaffSchema = new Schema({
	userId : String,
	staffId : String,
    name  : String,
    surName  : String,
    gender  : String,
    extPhone  : String
});

var Staff = mongoose.model('staff', StaffSchema);

var initObj = new Staff();
initObj.userId='';
initObj.staffId='';
initObj.name='';
initObj.surName='';
initObj.gender='';
initObj.extPhone='';

router.get('/liststaff', isLoggedIn, function (req, res){
	Staff.find({ 'userId' :  req.user._id }, function(err, staffs){
		if (err) return console.error(err);
		res.render( 'staffs', {
			staff : initObj,
			staffs : staffs,
			message : req.flash('success')
		});
    });
});

router.post('/addstaff', function(req, res){
	var objAdd = new Staff();
		objAdd.userId = req.user._id;
		objAdd.staffId = req.body.staffId;
		objAdd.name = req.body.name;
		objAdd.surName = req.body.surName;
		objAdd.gender = req.body.gender;
		objAdd.extPhone = req.body.extPhone;
		objAdd.save(function(err, staff) {
			if (err) return console.error(err);
			req.flash('success', 'Save success');
			res.redirect('./editStaff/'+staff._id);
		});
});

router.get('/delstaff/:id', function (req, res){
	Staff.findById(req.params.id, function(err, staff){
    staff.remove(function(err, staff){
		if (err) return console.error(err);
		req.flash('success', 'Delete success');
		res.redirect('/staffs/liststaff');
    });
  });
});

router.get('/editstaff/:id', function (req, res){
	Staff.findById(req.params.id, function(err, staff){
    if (err) return console.error(err);
	Staff.find({ 'userId' :  req.user._id }, function(err, staffs){
		if (err) return console.error(err);
		res.render( 'staffs', {
			staff : staff,
			staffs : staffs,
			message: req.flash('success')
		});
    });
  });
});

router.post('/updatestaff', function (req, res){
	Staff.findById(req.body._id, function(err, staff){
    if (err) return console.error(err);
    staff.userId = req.user._id;
	staff.staffId=req.body.staffId;
	staff.name=req.body.name;
	staff.surName=req.body.surName;
	staff.gender=req.body.gender;
	staff.extPhone=req.body.extPhone;
	staff.save(function(err, staff){
		if (err) return console.error(err);
			Staff.find(function(err, staffs){
			if (err) return console.error(err);
			req.flash('success', 'Update success');
			res.render( 'staffs', {
				staff : staff,
				staffs : staffs,
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
