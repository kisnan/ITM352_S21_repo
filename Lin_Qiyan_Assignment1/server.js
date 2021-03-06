//*
//*
//*Project: Assignemnt1
//*ITM352
//*Author: Qiyan Lin
//*Professor: Den Port
//*This code mean to be programming a server for Assignemnt1
var express = require('express');
var app = express();
var myParser = require("body-parser");
var fs = require('fs');
var data = require('./public/camera_product.js');
var products = data.products;
//Enable any route to the server
app.all('*', function(request, response, next){
    console.log(request.method + ' to ' + request.path);
    next();
});
app.use(myParser.urlencoded({ extended: true}));
//Route for proceed to the invoice
app.post("/process_form", function (request, response) {
  //process_quantity_form(request.body, response); 
  response.send(request.body);
});
//Enable the server to loadin ./public
app.use(express.static('./public'));
//Prot8080 was hosted
app.listen(8080, () => console.log(`listening on port 8080`));
//Load in function for checking user input
function isNonNegInt(q, returnErrors=false) {
    errors = []; //Default no error
    if(Number(q) != q) errors.push('Not a number!'); // Check if the input is a number value
      if(q < 0) errors.push('Negative value!'); // Check if the input is non-negative
        if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer

return returnErrors ? errors : (errors.length == 0);
}
//Function to post the sending query string to the invoice. 
function process_quantity_form (POST, response) {
  if (typeof POST['purchase_submit_button'] != 'undefined') {
    var contents = fs.readFileSync(filename, 'utf-8');
      receipt = '';
    for(i in products) { 
      let q = POST[`quantity_textbox${i}`];

        let model = products[i]['model'];
        let model_price = products[i]['price'];
    if (isNonNegInt(q)) {
      receipt += `<h3>Thank you for purchasing: ${q} ${model}. Your total is \$${q * model_price}!</h3>`; // render template string
        } else {
          receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`;
          }
        }
        response.send(receipt);
        response.end();
    }
 }