
exports.up = function(knex) {
    return knex.schema.createTable('types', function (table) {
        table.increments();
        table.string('name');
        table.string('environment');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('types');
};
