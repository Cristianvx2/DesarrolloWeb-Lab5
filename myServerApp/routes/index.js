var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/test', {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

mongoose.Promise = global.Promise;
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
           //console.log(doc);
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
    //console.log("hello request: " + data);
    data.save()
        .then(function (result) {
            console.log(result)
            res.status(200);
        })
        .then(undefined, function (err) {
            res.status(500);
            res.send('{NO inserted}')
        })
    
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

    UserData.findOneAndUpdate({"_id": req.body.id}, {$set: apartment}, function(err, result){
        console.log(result)
        console.log(apartment)
        if(err) return res.status(500).send(err)
        return res.status(200).send(apartment);
    })
});

router.post('/delete', function (req, res, next) {
   console.log("this is the server")
   console.log(req.body);
   UserData.findOneAndDelete({"_id": req.body._id}, (err, result)=>{
       console.log(result);
        if(err) return res.status(500).send(err);
        return res.status(200).send("successfully deleted");
   })
   
});


module.exports = router;


//set DEBUG=myapp:* & npm start
//set PORT=3001 && node bin/www