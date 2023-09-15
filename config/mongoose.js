const mongoose= require('mongoose');

mongoose.connect(`mongodb+srv://adarshsingh933:iDF9W3SNmDzpDk4a@cluster0.a38g0f6.mongodb.net/CSV_Upload_App`,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db=mongoose.connection;

db.on('error',console.error.bind('console',"database is not running"));

db.once('open',function(){
    console.log("Connect to database :: MongoDB")
});

module.exports = db;