import Knex from 'knex';

export const up = (knex: Knex) => knex.schema.createTable('connections', (table) => {
  table.increments('id').primary();

  table.integer('user_id')
    .notNullable()
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');

  table.timestamp('created_at')
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    .notNullable();
});

export const down = (knex: Knex) => knex.schema.dropSchema('connections');
