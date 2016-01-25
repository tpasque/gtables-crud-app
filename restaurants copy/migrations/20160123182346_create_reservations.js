
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reservations', function(table){
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('date');
    table.integer('rating');
    table.text('review');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reservations');
};
