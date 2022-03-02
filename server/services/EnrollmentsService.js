import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'

class EnrollmentsService {
  async getAll(query = {}) {
    const enrollments = await dbContext.Enrollments.find(query).populate('course', 'name').populate('student', 'name')
    return enrollments
  }

  async getStudentsByCourseId(id) {
    const students = await dbContext.Enrollments.find({ courseId: id }).populate('student')
    return students
  }

  async getCoursesByStudentId(id) {
    const courses = await dbContext.Enrollments.find({ studentId: id }).populate('course')
    return courses
  }

  async create(body) {
    const enrollment = await dbContext.Enrollments.create(body)
    // NOTE populate on a create has to happen after the create
    await enrollment.populate('course', 'name')
    await enrollment.populate('student', 'name')
    return enrollment
  }

  async remove(enrollmentId, userId) {
    const enrollment = await dbContext.Enrollments.findById(enrollmentId)
    if (enrollment.creatorId.toString() !== userId) {
      throw new Forbidden('You are solemnly up to no good')
    }
    await enrollment.remove()
    return 'deleted'
  }
}

export const enrollmentsService = new EnrollmentsService()
