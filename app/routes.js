// External dependencies
const express = require('express');
const router = express.Router();
const request = require('request');



// User chooses how to provide image of ID (take photo or upload) - service-access-photo-id-instructions.html

router.post('/registration/choice-id-capture', function (req, res) {

  var id_how = req.session.data['idHow']

  if (id_how == "upload") {
    res.redirect('service-access-photo-id-upload')
  } else {
    res.redirect('service-access-photo-id-camera')
  }
})



// User chooses how they want to do the face match (iProov face scan or video selfie) - service-access-video-selfie.html

router.post('/registration/choice-face-match', function (req, res) {

  var face_how = req.session.data['faceHow']

  if (face_how == "video") {
    res.redirect('service-access-video-selfie-triage')
  } else {
    res.redirect('service-access-iproov-enrolment')
  }
})


// nhs-number.html routing

router.post('/registration/nhs-number-checking', function (req, res) {

  var nhs_number_choice = req.session.data['nhs-number-choice']

  if (nhs_number_choice == "yes") {
    res.redirect('dob-enter')
  } else {
    res.redirect('name-enter')
  }
})


// Error message route here

router.get('/registration/sdk-errors/error-doc-capture-reroute', (req, res) => {
  var errormessage = req.param('errormessage')
  res.render('registration/sdk-errors/error-doc-capture-reroute', {errormessage: errormessage},function(err,html){res.send(html)})
})


// user-profile.html routing

router.post('/registration/p5-p9-uplift/user-profile-choice', function (req, res) {
  
  // Make a variable and give it the value from 'confirm-details-radio'
  var confDetails = req.session.data['confirm-details-radio']

  //Check whether the variable matches a condition below
  if (confDetails == "yes") {
    // Send user to start of PYI journey
    res.redirect('/registration/service-access-start')
  } else if (confDetails == "no") {
    res.redirect('error-p5-p9-uplift-hc-wrong-details')
  } else if (confDetails == "incorrect") {
    res.redirect('error-p5-p9-uplift-hc-incorrect-details')
  }
})


// Clear all session data
router.get('/clear', (req, res) => {
  req.session.data = {}
  res.redirect('/index')
})

module.exports = router;