import { NextFunction, Request, Response } from 'express';
import { IRestController } from '../../interfaces/IRest';
import ServiceBooks from '../../services/ServiceBooks';
import { IUsers } from '../../models/Users';
import { IBooks } from '../../models/Books';
import { IRequestWithAuth } from '../../middlewares/Auth';

class ControllerBooks {
  private _serviceBooks: ServiceBooks;

  constructor(serviceBooks: ServiceBooks) {
    this._serviceBooks = serviceBooks;
  }

  create() {
    const serviceBooks = this._serviceBooks;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        serviceBooks.setUser = req.user as IUsers;

        const result = await serviceBooks.create(req.body as IBooks);
        res.status(201).json({
          message: 'success create a new book',
          data: result,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  update() {
    const serviceBooks = this._serviceBooks;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        const id = req.params?.id;
        serviceBooks.setUser = req.user as IUsers;

        const result = await serviceBooks.update(id, req.body as IBooks);
        res.status(200).json({
          message: 'success update a book',
          data: result,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  list() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this._serviceBooks.list();
        res.status(200).json({
          message: 'success fetch books',
          data: result,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  remove() {
    const serviceBooks = this._serviceBooks;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        serviceBooks.setUser = req.user as IUsers;
        const id = req.params?.id;
        const result = await this._serviceBooks.remove(id);
        res.status(200).json({
          message: 'success remove book',
          data: result,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  show() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params?.id;
        const result = await this._serviceBooks.show(id);
        res.status(200).json({
          message: 'success get one book',
          data: result,
        });
      } catch (error) {
        next(error);
      }
    };
  }
}

export default ControllerBooks;
