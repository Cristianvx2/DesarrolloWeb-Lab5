var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
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
           //res.render('index', {items: doc});
           res.status(202);
           res.send(doc);
       })
       .then(undefined, function (err) {
           res.send('can\'t show data ')
       })
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
    console.log("hello request: " + data);
    data.save()
        .then(function (result) {
            console.log(result)
            res.status(200);
        });
    res.status(500);
    res.send('{NO inserted}')
    //res.redirect('/');
    //res.render(data);
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
        if (err) {
            console.error('error, no entry found');
        }
        doc.name = req.body.name;
        doc.price = req.body.price;
        doc.address = req.body.address;
        doc.size = req.body.size;
        doc.parts = req.body.parts;
        doc.save()
            .then(function (result) {
                console.log('updated: ' + result)
                res.status(200)
                res.send('updated');
            })
    })
});

router.post('/delete', function (req, res, next) {
   var id = req.body.id;
   UserData.findOneAndDelete(id)
       .then(function (result) {
           console.log('Deleted: ' + result.name);
           res.status(200);
           res.send('Delete it..!')
       });

   console.log(res.body.id);
});


module.exports = router;


//set DEBUG=myapp:* & npm start
//set PORT=3001 && node bin/www