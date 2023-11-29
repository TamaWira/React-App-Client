import Books, { IBooks } from '../models/Books';
import { IUsers } from '../models/Users';

class RepoBooks {
  constructor() {}

  async list(params?: any) {
    const books = await Books.query().select('*').where('published', true);
    return books;
  }

  async show(id: string) {
    const books = await Books.query().findById(id);
    return books;
  }

  async create(user: IUsers, bookData: IBooks) {
    const book = await Books.query().insert({
      ...bookData,
      createdBy: user.id,
    });

    return book;
  }

  async remove(user: IUsers, id: string) {
    const books = await Books.query()
      .update({
        published: false,
        updatedBy: user.id,
        updatedAt: new Date().toISOString(),
      })
      .where('id', id);
    return books;
  }

  async update(user: IUsers, id: string, bookData: IBooks) {
    const books = await Books.query()
      .update({
        ...bookData,
        updatedBy: user.id,
        updatedAt: new Date().toISOString(),
      })
      .where('id', `${id}`);
    return books;
  }
}

export default RepoBooks;
