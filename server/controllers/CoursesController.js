import { Auth0Provider } from '@bcwdev/auth0provider'
import { booksService } from '../services/BooksService'
import { coursesService } from '../services/CoursesService'
import { enrollmentsService } from '../services/EnrollmentsService'
import BaseController from '../utils/BaseController'

export class CoursesController extends BaseController {
  constructor() {
    super('api/courses')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/books', this.getCourseBooks)
      .get('/:id/students', this.getCourseStudents)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      // REVIEW query paramters
      const courses = await coursesService.getAll(req.query)
      return res.send(courses)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const course = await coursesService.getById(req.params.id)
      return res.send(course)
    } catch (error) {
      next(error)
    }
  }

  async getCourseBooks(req, res, next) {
    try {
      // NOTE works with special service method
      // const books = await booksService.getCourseBooks(req.params.id)
      // NOTE works with the get all already made and just passes a pre-made query object
      const books = await booksService.getAll({ courseId: req.params.id })
      return res.send(books)
    } catch (error) {
      next(error)
    }
  }

  async getCourseStudents(req, res, next) {
    try {
      // const students = await enrollmentsService.getAll({ courseId: req.params.id })
      const students = await enrollmentsService.getStudentsByCourseId(req.params.id)
      return res.send(students)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE attach creatorId from the userInfo
      req.body.creatorId = req.userInfo.id
      const course = await coursesService.create(req.body)
      return res.send(course)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // NOTE attach creatorId from the userInfo
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const updated = await coursesService.edit(req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await coursesService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}
