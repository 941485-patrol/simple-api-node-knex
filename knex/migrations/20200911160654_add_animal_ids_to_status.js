
exports.up = function(knex) {
    return knex.schema.raw("ALTER TABLE status ADD COLUMN animal_ids INTEGER[] DEFAULT '{}' ");
};

exports.down = function(knex) {
    return knex.schema.table('status', function(table) {
        table.dropColumn('animal_ids');
    });
};
