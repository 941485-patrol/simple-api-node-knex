
exports.up = function(knex) {
    return knex.schema.table('status', function(table) {
        table.specificType('animal_ids', 'integer[]');
    });
};

exports.down = function(knex) {
    return knex.schema.table('status', function(table) {
        table.dropColumn('animal_ids');
    });
};
