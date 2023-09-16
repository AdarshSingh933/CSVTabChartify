const User = require('../models/userSchema');

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signUp');
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signIn');
}

module.exports.create =async function(req,res){
    //checking password of user if password is incorrect
      if(req.body.password != req.body['confirm-password']){
        return res.redirect('back');
      }
      try{
          //find user with given email
        let user =await User.findOne({email:req.body.email});
          //if user not found
        if(!user){
          user = await User.create(req.body);
          return res.redirect('/user/sign-in');
        }else{
            // if user found
          return res.redirect('back');
        }
      }catch(err){
          console.log("Error in creating user",err);
          return;
      }
}

module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
     req.logout(req.user,function(err){
     if(err){
         console.log("error",err);
     }
      return res.redirect('/');
  });
}
