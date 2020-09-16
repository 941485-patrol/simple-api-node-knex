
exports.up = function(knex) {
    return knex.schema.raw("ALTER TABLE types ADD COLUMN animal_ids integer[] DEFAULT '{}' ");
};

exports.down = function(knex) {
    return knex.schema.table('types', function(table) {
        table.dropColumn('animal_ids');
    });
};
