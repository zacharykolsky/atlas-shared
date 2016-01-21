var express             = require('express')
var bodyParser          = require('body-parser');
var methodOverride      = require('method-override');
var passport            = require('passport');

var usersController     = require('../controllers/usersController');
var locationsController = require('../controllers/locationsController');
var router              = express.Router();

router.route('/locations.json')
  .get(locationsController.getLocations)
  .post(locationsController.addLocation);

router.get('/auth/validate', usersController.validateUser);

// router.route('/signup')
//   .get(usersController.getSignup)
//   .post(usersController.postSignup);
//
// router.route('/login')
//   .get(usersController.getLogin)
//   .post(usersController.postLogin);
//
// router.route("/logout")
//   .get(usersController.getLogout);

// Facebook login
router.route('/auth/facebook')
  .get(passport.authenticate('facebook'));

router.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

router.get("/user/index.:format?", usersController.getUserIndex);
router.get("/user/:id.:format?", usersController.getUserShow);
// router.delete("/user/:id", usersController.deleteUserProfile);
// router.patch("/user/:id", usersController.patchUserEdit);
router.get("/user/:id/edit", usersController.getUserEdit);


module.exports = router;
