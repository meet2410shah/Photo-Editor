const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

//Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Init Upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

//Check File Type
function checkFileType(file, cb) {
    //Allowed extension
    const filetypes = /jpg|jpeg|png|gif/;
    //Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mime
    const mimetypes = filetypes.test(file.mimetype);
    if(mimetypes && extname) {
        return cb(null, true);
    } else {
        cb('Error : Images Only!');
    }
}

//Init app
const app = express();

//Ejs
app.set('view engine', 'ejs');

var data = [];
//Public folder
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            res.render('index',{
                msg : err
            });
        } else {
            if(req.file == undefined) {
                res.render('index', {
                    msg : 'Error : No file Selected'
                });
            } else {
                res.render('index', {
                    msg : 'File Uploaded!',
                    file : `uploads/${req.file.filename}`
                });
                
            }
            // res.send('test');
        }
    })
});

const port = 3000;
app.listen(port, () => console.log(`Server stared on port ${port}`));