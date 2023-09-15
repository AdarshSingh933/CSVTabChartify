const User = require('../models/userSchema');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');

module.exports.csvForm = async function(req,res){
    return res.render('csvUploadForm');
}

module.exports.uploads = async function(req, res){
   
  try{
      let user = await User.findById(req.params.id);
      User.uploadedCSV(req, res, function(err){
          if (err) {console.log('*****Multer Error: ', err)}
      
          if (req.file){
              // this is saving the path of the uploaded file into the uploads array field in the user
              let filePath = User.uploadPath + '/' + req.file.filename;
              user.uploads.push(filePath);
          }
          user.save();
          return res.redirect('/');
      });

  }catch(err){
      return res.redirect('back');
  }
}
//pagination of the record only 100 record per page 
const ITEMS_PER_PAGE = 100; // Number of items per page

module.exports.viewFile = function (req, res) {
    const requestedFilePath = req.query.file;
    const filePath = path.join(__dirname, '..', requestedFilePath);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  const data = [];
  const headers = []; // Define headers here

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('headers', (headerList) => {
      // Store the headers when the 'headers' event is emitted
      headers.push(...headerList);
    })
    .on('data', (row) => {
      // Process each row and add it to the data array
      data.push(row);
    })
    .on('end', () => {
      // Paginate the data
      const page = req.query.page || 1; // Get the requested page or default to page 1
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = page * ITEMS_PER_PAGE;
      const paginatedData = data.slice(startIndex, endIndex);

      // Calculate the total number of pages
      const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

      // Render the view with the paginated data and pagination information
      res.render('csvFileView', {
        requestedFilePath,
        headers,
        data: paginatedData,
        currentPage: parseInt(page),
        totalPages,
      });
    });
};


