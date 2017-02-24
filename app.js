var express = require('express');
var app = express();
var request = require('request');
var path = require('path');
var leboncoin = require('./leboncoin.js');
var meilleuragents = require('./meilleuragent.js');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname+'/public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.post('/', function(req, res){

  	var url = req.body.url;

  	leboncoin.propertyLeboncoin(url,request,function(json){
  	var city = json.city;
  	var price = json.price;
  	var surface = json.surface;
    meilleuragents.priceSurface(json,request,function(info){

    var price_m2 = info.price_m2;
    console.log(info);
    res.render(path.join(__dirname + '/public/result'), {city: city, surface:surface, price: price, price_m2:price_m2});
    
    });
  });
});

app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})