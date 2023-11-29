import database from '../config/database';
import { Model } from 'objection';

Model.knex(database);

export interface IBooks {
  id?: string;
  title: string;
  author: string;
  published_year: string;
  total_copies: number;
  copies_available: number;
  genre: string;
  isbn: string;
  updatedBy?: string;
  createdBy?: string;
}

class Books extends Model {
  static get tableName() {
    return 'books';
  }

  static get idColumn() {
    return 'id';
  }
}

export default Books;
