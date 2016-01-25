var express = require('express');
var router = express.Router();
// var knex = require('knex')({
//   client: 'pg',
//   connection: 'postgres://localhost/restaurantsdb',
// });

var knex = require('../db/knex')

function Restaurants(){
  return knex('restaurants');
};

function Employees() {
  return knex('employees');
};

// var states = ["AK", "AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID",
//     "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
//     "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
//     "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];


/* GET home page. */
router.get('/restaurants', function(req, res, next) {
  Restaurants().select().then(function(restaurants){
    res.render('restaurants/index', {restaurants: restaurants});
  })
});

/* render "new" page for restaurant upon click of "Add new restaurant"*/
router.get('/restaurants/new', function (req, res, next) {
  res.render('restaurants/new');
})


router.post('/admin', function (req, res, next) {
  Restaurants().insert(req.body).then(function (result) {
    res.redirect('/admin')
  })
})

// Render show page based on unique id
// Include nested employees to display employees that work at this restaurant
// is this the right way to write the routes?
// should it be /restaurants/:id/employees in the route?
router.get('/restaurants/:id', function (req, res, next) {
  my_id = req.params.id
  Restaurants().where('id', my_id).first().then(function(restaurant) {
    Employees().where('restaurant_id', my_id).then(function (employees) {
    res.render('restaurants/show', {restaurant: restaurant, employees: employees})
    })
  })
})

// render the edit page

  router.get('/restaurants/:id/edit', function(req, res, next) {
    Restaurants().where('id', req.params.id).first().then(function(result) {
      res.render('restaurants/edit', {restaurant: result })
    })
  })
// need to have redirect and post after the update / edit.

router.post('/restaurants/:id', function (req, res, next) {
      //  grab the id using req.params.id
      //  find the restaurant in the db using the id
      //  update the object by calling the update function and passing in req.body
  Restaurants().where('id', req.params.id).update(req.body).then(function (result) {
    res.redirect('/restaurants')
  })
})

  //the "delete" route
  router.post('/restaurants/:id/delete', function (req, res, next) {
    Restaurants().where('id', req.params.id).del().then(function (result) {
      res.redirect('/restaurants')
    })
  })



module.exports = router;
