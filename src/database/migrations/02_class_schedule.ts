import Knex from 'knex';

export const up = (knex: Knex) => knex.schema.createTable('class_schedule', (table) => {
  table.increments('id').primary();

  table.integer('week_day').notNullable();
  table.integer('from').notNullable();
  table.integer('to').notNullable();

  table.integer('class_id')
    .notNullable()
    .references('id')
    .inTable('class')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
});

export const down = (knex: Knex) => knex.schema.dropSchema('class_schedule');
