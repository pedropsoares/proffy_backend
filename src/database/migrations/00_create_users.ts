import Knex from 'knex';

export const up = (knex: Knex) => knex.schema.createTable('users', (table) => {
  table.increments('id').primary();
  table.string('name').notNullable();
  table.string('avatar').notNullable();
  table.string('whatsapp').notNullable();
  table.string('bio').notNullable();
});

export const down = (knex: Knex) => knex.schema.dropSchema('users');
