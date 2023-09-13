const User = require('../models/userSchema');

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
      usernameField:'email',
      passReqToCallback:true
      },
    async function(req,email,password,done){
           try{
            const user =await User.findOne({email:email});
            if(!user || user.password !== password){
                req.flash('error',"Invalid Username/Password");
                return done(null,false);
            }
               return done(null,user);  
           }catch(err){
           
            req.flash('error',err);
            return done(err);
           }
      }
));

//Serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async function(id,done){
    try{
        const user = await User.findById(id);
        return done(null,user);
    }catch(err){
         console.log("error in establishing the identity",err);
    }  
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/sign-in');  
}

passport.setAuthenticateUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;