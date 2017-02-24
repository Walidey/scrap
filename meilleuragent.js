var fs = require('fs-extra');
var cheerio = require('cheerio');
var path = require('path');


var info = {
  "price_m2": 0 ,
};

function getCleanString(indexStart, textCut, stringToBeClean){
  stringToBeClean = stringToBeClean.substring(indexStart, stringToBeClean.length);
  var index = stringToBeClean.indexOf(textCut);
  stringToBeClean = stringToBeClean.substring(0, index);
  return stringToBeClean;
}

var priceSurface = function(json,request,callback){
    var elem;   
    var city;
    var postal;
    elem = json.city.split(' ');
    city = elem[0].toLowerCase();
    postal = elem[1];
  var url= 'https://www.meilleursagents.com/prix-immobilier/'+ city + '-' +postal;
  request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

        $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.columns.prices-summary__cell--median').filter(function(){
        var price_m2 = $(this);
        info.price_m2 = price_m2.text();
        info.price_m2 = getCleanString(14, "\n", info.price_m2);
        })
    }
    callback && callback(info);
    /*fs.writeFile('meilleuragent.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the meilleuragent.json file');
    })*/
})
};

exports.priceSurface = priceSurface;