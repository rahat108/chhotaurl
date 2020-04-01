const express = require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser'); 

const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/key').uri;

mongoose.connect(db, (err) => {
 if (err) {
  return err;
 }
 return console.log("MongoDB Connected");
});


const shorten = require('./routes/api/shorten');
app.use('/api/shorten',shorten);

const redirect = require('./routes/api/redirect');
app.use('/api/redirect',redirect);


app.get('/:hash', function(req, res) {
        const id = req.params.hash;
        URL.findOne({ _id: id }, function(err, doc) {
            if(doc) {
                res.redirect(doc.url);
            } else {
                res.redirect('/');
            }
        });
    });


app.get('/',(req, res) => {
	res.send('Hello ok');
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server is running on port '+port));