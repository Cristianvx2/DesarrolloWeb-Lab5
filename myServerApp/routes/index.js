var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    name: String,
    price: String,
    address: String,
    size: String,
    parts: [String],
}, {collection: 'user-data'});

var UserData = mongoose.model('UserData', userDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-data', function (req, res, next) {
   UserData.find()
       .then(function (doc) {
           res.render('index', {items: doc});
       });
});

router.post('/insert', function (req, res, next) {
    const item = {
        name: req.body.name,
        price: req.body.price,
        address: req.body.address,
        size: req.body.size,
        parts: req.body.parts
    };

    var data = new UserData(item);
    data.save();
    res.redirect('/');
});

router.post('/update', function (req, res, next) {
    const apartment = {
        name: req.body.name,
        price: req.body.price,
        address: req.body.address,
        size: req.body.size,
        parts: req.body.parts
    };
    var id = req.body.id;

    UserData.findById(id, function (err, doc) {
        if (err){
          console.error('error, no entry found');
        }
        doc.name = req.body.name;
        doc.price = req.body.price;
        doc.address = req.body.address;
        doc.size = req.body.size;
        doc.parts = req.body.parts;
        doc.save();
    })
    res.redirect('/');
});

router.post('/delete', function (req, res, next) {
   var id = req.body.id;
   UserData.findByIdAndRemove(id).exec();
    res.redirect('/');
});


module.exports = router;


//set DEBUG=myapp:* & npm start
//set PORT=3001 && node bin/www