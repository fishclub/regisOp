var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var DoctorSchema = new Schema({
	userId : String,
	doctorId : String,
    name  : String,
    surName  : String,
    gender  : String,
    extPhone  : String
});

var Doctor = mongoose.model('doctor', DoctorSchema);

var initObj = new Doctor();
initObj.userId='';
initObj.doctorId='';
initObj.name='';
initObj.surName='';
initObj.gender='';
initObj.extPhone='';

router.get('/listdoctor', isLoggedIn, function (req, res){
	Doctor.find({ 'userId' :  req.user._id }, function(err, doctors){
		if (err) return console.error(err);
		res.render( 'doctors', {
			doctor : initObj,
			doctors : doctors,
			message : req.flash('success')
		});
    });
});

router.post('/adddoctor', function(req, res){
	var objAdd = new Doctor();
		objAdd.userId = req.user._id;
		objAdd.doctorId = req.body.doctorId;
		objAdd.name = req.body.name;
		objAdd.surName = req.body.surName;
		objAdd.gender = req.body.gender;
		objAdd.extPhone = req.body.extPhone;
		objAdd.save(function(err, doctor) {
			if (err) return console.error(err);
			req.flash('success', 'Save success');
			res.redirect('./editDoctor/'+doctor._id);
		});
});

router.get('/deldoctor/:id', function (req, res){
	Doctor.findById(req.params.id, function(err, doctor){
    doctor.remove(function(err, doctor){
		if (err) return console.error(err);
		req.flash('success', 'Delete success');
		res.redirect('/doctors/listdoctor');
    });
  });
});

router.get('/editdoctor/:id', function (req, res){
	Doctor.findById(req.params.id, function(err, doctor){
    if (err) return console.error(err);
	Doctor.find({ 'userId' :  req.user._id }, function(err, doctors){
		if (err) return console.error(err);
		res.render( 'doctors', {
			doctor : doctor,
			doctors : doctors,
			message: req.flash('success')
		});
    });
  });
});

router.post('/updatedoctor', function (req, res){
	Doctor.findById(req.body._id, function(err, doctor){
    if (err) return console.error(err);
    doctor.userId = req.user._id;
	doctor.doctorId=req.body.doctorId;
	doctor.name=req.body.name;
	doctor.surName=req.body.surName;
	doctor.gender=req.body.gender;
	doctor.extPhone=req.body.extPhone;
	doctor.save(function(err, doctor){
		if (err) return console.error(err);
			Doctor.find(function(err, doctors){
			if (err) return console.error(err);
			req.flash('success', 'Update success');
			res.render( 'doctors', {
				doctor : doctor,
				doctors : doctors,
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
