var express = require('express');
var router = express.Router();

var knex = require('../db/knex');

function Employees() {
  return knex('employees');
};

function Restaurants(){
  return knex('restaurants');
};

function Reservations(){
  return knex('reservations');
};

router.get('/reservations', function(req, res, next){
  Reservations().select().then(function(result){
    res.render('reservations/index', {employees: result})
  })
})

module.exports = router;
