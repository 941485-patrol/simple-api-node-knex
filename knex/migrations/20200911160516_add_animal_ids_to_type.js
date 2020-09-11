
exports.up = function(knex) {
    return knex.schema.table('types', function(table) {
        table.specificType('animal_ids', 'integer[]');
    });
};

exports.down = function(knex) {
    return knex.schema.table('types', function(table) {
        table.dropColumn('animal_ids');
    });
};
