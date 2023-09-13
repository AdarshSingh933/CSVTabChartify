const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');
const passport = require('passport');

router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
router.get('/sign-in',userController.signIn);
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/sign-in'}),
userController.createSession);
router.get('/sign-out',userController.destroySession);

module.exports = router;