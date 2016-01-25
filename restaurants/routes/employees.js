var express = require('express');
var router = express.Router();

var knex = require('../db/knex');

function Employees() {
  return knex('employees');
};

function Restaurants(){
  return knex('restaurants');
};

<<<<<<< Updated upstream
function Reservations(){
  return knex('reservations');
};


=======
>>>>>>> Stashed changes
router.get('/employees', function(req, res, next){
  Employees().select().then(function(result){
    res.render('employees/index', {employees: result})
  })
})

router.get('/employees/new', function (req, res, next) {
  res.render('employees/new');
})
<<<<<<< Updated upstream

router.post('/employees', function (req, res, next) {
  Employees().insert(req.body).then(function (result) {
    res.redirect('/employees')
  })
})

router.get('/admin', function (req, res, next) {
  Restaurants().select().then(function (restaurants) {
    Employees().select().then(function (employees) {
      res.render('admin/admin', {restaurants: restaurants, employees: employees})
    })
  })
})

// show page - profile page for employee
router.get('/employees/:id', function (req, res, next) {
  my_id = req.params.id
  Employees().where('id', my_id).first().then(function (employee) {
  res.render('employees/show', {employee: employee})
  })
})

// render the edit page
  router.get('/employees/:id/edit', function(req, res, next) {
    my_id = req.params.id
    Employees().where('id', my_id).first().then(function(employee) {
      res.render('employees/edit', {employee: employee })
    })
  })

router.post('/employees/:id', function (req, res, next) {
  Employees().where('id', req.params.id).update(req.body).then(function (employee) {
    res.redirect('/restaurants/'+req.body.restaurant_id)
  })
})

//the "delete" route
router.post('/employees/:id/delete', function (req, res, next) {
  Employees().where('id', req.params.id).del().then(function (employees) {
    console.log(req.params)
    console.log(req.body)
    res.redirect('/admin')
  })
})

=======

router.post('/employees', function (req, res, next) {
  Employees().insert(req.body).then(function (result) {
    res.redirect('/employees')
  })
})

router.get('/admin', function (req, res, next) {
  Restaurants().select().then(function (restaurants) {
    Employees().select().then(function (employees) {
      res.render('admin/admin', {restaurants: restaurants, employees: employees})
    })
  })
})

// show page - profile page for employee
router.get('/employees/:id', function (req, res, next) {
  my_id = req.params.id
  Employees().where('id', my_id).first().then(function (employee) {
  res.render('employees/show', {employee: employee})
  })
})

// render the edit page
  router.get('/employees/:id/edit', function(req, res, next) {
    my_id = req.params.id
    Employees().where('id', my_id).first().then(function(employee) {
      res.render('employees/edit', {employee: employee })
    })
  })

router.post('/employees/:id', function (req, res, next) {
  Employees().where('id', req.params.id).update(req.body).then(function (employee) {
    res.redirect('/restaurants/'+req.body.restaurant_id)
  })
})

//the "delete" route
router.post('/employees/:id/delete', function (req, res, next) {
  Employees().where('id', req.params.id).del().then(function (employees) {
    console.log(req.params)
    console.log(req.body)
    res.redirect('/admin')
  })
})

>>>>>>> Stashed changes
// Add Employee to individual restaurant by id
router.get('/restaurants/:id/employees/new', function (req, res, next) {
  my_id = req.params.id
  Restaurants().where('id', my_id).first().then(function (restaurants) {
    Employees().where('restaurant_id', my_id).then(function (employees) {
      res.render('employees/new_by_id', {restaurants: restaurants, employees: employees})
    })
  })
})

// post request for individual id to add employee
router.post('/restaurants/:id/employees', function (req, res, next) {
  Employees().insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    position: req.body.position,
    restaurant_id: Number(req.params.id)
  }).then(function (result) {
    res.redirect('/restaurants/'+req.params.id)
  })
})

module.exports = router;
