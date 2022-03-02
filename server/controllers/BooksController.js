import { Auth0Provider } from '@bcwdev/auth0provider'
import { booksService } from '../services/BooksService'
import BaseController from '../utils/BaseController'

export class BooksController extends BaseController {
  constructor() {
    super('api/books')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const books = await booksService.getAll(req.query)
      return res.send(books)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const book = await booksService.create(req.body)
      res.send(book)
    } catch (error) {
      next(error)
    }
  }
}
