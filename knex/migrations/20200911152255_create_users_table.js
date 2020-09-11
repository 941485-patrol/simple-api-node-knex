
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('username');
        table.string('password');
        table.string('token');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
