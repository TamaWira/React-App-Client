import { Knex } from 'knex';
import { IBooks } from '../models/Books';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('books').del();

  // Inserts seed entries
  await knex('books').insert([
    {
      title: 'Belajar Fullstack Web',
      author: 'Ferry Maryadi',
      copies_available: 10,
      genre: 'Programming',
      isbn: '1234:1234',
      published_year: '2020',
      total_copies: 20,

      published: true,
    },
    {
      title: 'Frontend Development dengan ReactJS',
      author: 'Wendi',
      copies_available: 10,
      genre: 'Programming',
      isbn: '1234:1234',
      published_year: '2022',
      total_copies: 20,

      published: true,
    },
    {
      title: 'Backend Development dengan NodeJS dan Express',
      author: 'Azis Doa Ibu',
      copies_available: 15,
      genre: 'Programming',
      isbn: '1234:1234',
      published_year: '2019',
      total_copies: 20,

      published: true,
    },
  ]);
}
