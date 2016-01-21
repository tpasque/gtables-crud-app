var express = require('express');
var router = express.Router();
// var knex = require('knex')({
//   client: 'pg',
//   connection: 'postgres://localhost/restaurantsdb'
// });

var knex = require('../db/knex');

function Employees() {
  return knex('employees');
};

function Restaurants(){
  return knex('restaurants');
};

router.get("/employees", function(req, res, next){
  Employees().select().then(function(result){
    res.render("employees/index", {employees: result})
  })
})




module.exports = router;
