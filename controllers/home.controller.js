const User = require('../models/userSchema');
const path = require('path');

module.exports.home = async function(req,res){
    const users =await User.find({});

    return res.render('home',{
        users:users
    });
}




