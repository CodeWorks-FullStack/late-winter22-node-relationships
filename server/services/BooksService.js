import { dbContext } from '../db/DbContext'
import { logger } from '../utils/Logger'

class BooksService {
  async getAll(query = {}) {
    logger.log(query)
    // NOTE populate tells the dbContext to also get the courses information for the book
    const books = await dbContext.Books.find(query).populate('course', 'name description')
    return books
  }

  // NOTE get all books that belong to a course special function
  async getCourseBooks(id) {
    const books = await dbContext.Books.find({ courseId: id })
    return books
  }

  async create(body) {
    const book = await dbContext.Books.create(body)
    return book
  }
}

export const booksService = new BooksService()
