var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';


var apartments = {"apartments":[
        { id: 1, name: "TRIBECA", price: "Q.600,000", address: "zona 11", size: "61mts", parts: ["pool", "Gym", "Garden", "BBQ"]},
        { id: 2, name: "BARI", price: "Q.1,100,000", address: "zona 10", size: "80mts", parts: ["2 parking spots", "2 bathrooms", "1 living room"]},
        { id: 3, name: "DORM", price: "Q.80,000", address: "zona 16", size: "60mts", parts: ["1 parking spots", "1 bathrooms", "2 rooms"]}
    ]
};

router.get('/', function(req, res, next) {
    var resultArray = [];
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        var index = db.collection('apartments-data').find();
        index.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });

    //res.send(apartments);
});

router.get('/api/v1/apartments/', function(req, res, next) {
    res.send(apartments);
});

router.get('/api/v1/apartments/:id', function(req, res, next) {
    var id = req.params.id;
    const apartment = apartments.apartments.find(f => f.id == id);
    if(!apartment) {
        res.status(404).send('El apartamento seleccionado no existe..!');
    } else {
        res.status(200).send(apartment);
    }
});

router.post('/api/v1/apartments/', function(req, res, next) {
    const apartment = {
        id: apartments.apartments.length + 1,
        name: req.body.name,
        price: req.body.price,
        address: req.body.address,
        size: req.body.size,
        parts: req.body.parts
    };
    mongo.connect(url,function (err, db) {
        assert.equal(null, err);
        db.collection('apartments-data').insertOne(apartment, function (err, result) {
            assert.equal(null, err);
            console.log('apartment inserted');
            db.close();
        });
    });

    apartments.apartments.push(apartment);
    res.status(201).send(apartment);
});

router.delete('/api/v1/apartments/:id', function(req, res, next) {
    var id = req.params.id;
    const apartment = apartments.apartments.find(f => f.id == id);
    if(!apartment) {
        res.status(404).send('No se encontro el apartamento seleccionado...!');
    } else {
        const index = apartments.apartments.indexOf(apartment);
        apartments.apartments.splice(index,1);
        res.status(204).send(apartment);
    }
});

router.put('/api/v1/apartments/:id', function(req, res, next) {
    var id = req.params.id;
    const apartment = apartments.apartments.find(f => f.id == id);
    if(!apartment) {
        res.status(404).send('El apartamento seleccionado no existe..!');
    } else {
        apartment.name = req.body.name,
        apartment.price = req.body.price,
        apartment.address = req.body.address,
        apartment.size = req.body.size,
        apartment.parts = req.body.parts
        res.status(204).send(apartment);
    }
});

module.exports = router;
