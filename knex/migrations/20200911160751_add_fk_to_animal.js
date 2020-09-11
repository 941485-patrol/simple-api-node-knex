
exports.up = function(knex) {
    return knex.schema.table('animals', function(table) {
        table.integer('type_id').unsigned();
        table.foreign('type_id').references('types.id').onDelete('SET NULL');
        table.integer('status_id').unsigned();
        table.foreign('status_id').references('status.id').onDelete('SET NULL');
    });
};

exports.down = function(knex) {
    return knex.schema.table('animals', function(table) {
        table.dropColumn('type_id');
        table.dropColumn('status_id');
    });
};
