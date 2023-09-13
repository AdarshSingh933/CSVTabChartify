const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const UPLOAD_PATH = path.join('/uploads');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
      type:String,
      required:true
    },
    uploads:[{
        type:String
    }]
},{
    timestamps:true
});

let csvFileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only CSV files are allowed'), false); // Reject the file
  }
};

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',UPLOAD_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  })
userSchema.statics.uploadedCSV = multer({storage:storage,fileFilter: csvFileFilter}).single('csv-file');
userSchema.statics.uploadPath = UPLOAD_PATH;

const User = mongoose.model('User',userSchema);

module.exports = User;