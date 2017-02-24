var fs = require('fs');
var cheerio = require('cheerio');

var propertyLeboncoin = function(url,request,callback){
    var price, city, surface;
    var json = { price : "", city : "", surface : "", type : ""};

      request(url, function(error, response, html){
        if(!error){
          var $ = cheerio.load(html);

                $('.value').filter(function(){
                    city = $('div.line:nth-child(6) > h2:nth-child(1) > span:nth-child(2)').text();
                    city = city.trim();            
                    json.city = city;
                })

                $('.value').filter(function(){
                    price = $('.item_price').attr('content');
                    price=price.trim();
                    json.price = price; 
                })

               $('div.line.line_city').filter(function(){
                    var data = $(this);
                    while(data.children().children().first().text() != "Surface" ){
                      data = data.next();
                    }
                    surface =  data.children().children().next().text();
                    json.surface = surface;
                })

                $('div.line.line_city').filter(function(){
                    var data = $(this);
                    while(data.children().children().first().text() != "Type de bien" ){
                        data = data.next();
                    }
                    json.type =  data.children().children().next().text();
                })
            }
            callback(json);
          })
};
exports.propertyLeboncoin = propertyLeboncoin;