const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config()
const fs = require('fs')
app.use(cors());

app.use('/public', express.static(__dirname + '/public'));

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port ' + listener.address().port);
  })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    const {originalname, mimetype, size, filename} = req.file
    fs.unlink(`./public/data/uploads/${filename}`, err => {
        if (err) console.log(err);
    });
    res.json({
        name: originalname,
        type: mimetype,
        size: size
    });
});