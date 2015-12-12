var express = require('express');
var request = require('request');
var router = express.Router();
var googleUrl = 'https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBC5Meb6U6VWp915mRudLIUdju6sdHOcl8&address='
var getNumOfPowerByRole = function(office){
  var powerLevel = 0
    if(office.levels){
      powerLevel+=1;
    switch (office.levels[0]) {
      case "country":
        powerLevel += 5;
      break;
      case "administrativeArea1":
        powerLevel+=4;
      break;
      case "administrativeArea2":
        powerLevel+=3;
      break;
      }
   }
   if(office.levels){
     powerLevel+=1;
    switch (office.roles[0]) {
      case "headOfState":
          powerLevel+=6;
      break;
      case "headOfGovernment":
        powerLevel+=5;
      break;
      case "deputyHeadOfGovernment":
        powerLevel+=4;
      break;
      case "legislatorUpperBody":
        powerLevel += 2;
      break;
      case "legislatorLowerBody":
        powerLevel += 1;
      break;
    }
  }
  if(office.name=== "Attorney General"){
    powerLevel+=1;
  }
  if(office.name.indexOf('state')>=0 && powerLevel < 2){
    powerLevel+=.5
  }
  return powerLevel;
};
/* GET users listing. */
router.post('/', function(req, res, next) {
  request({
      url: googleUrl+req.body.search.replace(' ','+'),
      json:true}, function(error, response, body){
        if(!body.offices){
          res.redirect('../');
        }
        else{
        body.offices = body.offices.sort(function(a,b){
          return getNumOfPowerByRole(a)>=getNumOfPowerByRole(b) ? -1: 1;
        });

    res.render('index', {officials: body.officials, offices: body.offices, title:"Your Government Officials"});
  }
  });
});

module.exports = router;
