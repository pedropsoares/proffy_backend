import Knex from 'knex';

export const up = (knex: Knex) => knex.schema.createTable('classes', (table) => {
  table.increments('id').primary();
  table.string('subject').notNullable();
  table.string('cost').notNullable();

  table.integer('user_id')
    .notNullable()
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
});

export const down = (knex: Knex) => knex.schema.dropSchema('classes');
