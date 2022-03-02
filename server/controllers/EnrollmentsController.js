import { Auth0Provider } from '@bcwdev/auth0provider'
import { enrollmentsService } from '../services/EnrollmentsService'
import BaseController from '../utils/BaseController'

export class EnrollmentsController extends BaseController {
  constructor() {
    super('api/enrollments')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const enrollments = await enrollmentsService.getAll(req.query)
      return res.send(enrollments)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const enrollment = await enrollmentsService.create(req.body)
      return res.send(enrollment)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const message = await enrollmentsService.remove(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
