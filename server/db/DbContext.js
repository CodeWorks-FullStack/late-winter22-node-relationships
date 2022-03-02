import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BookSchema } from '../models/Book'
import { CourseSchema } from '../models/Course'
import { EnrollmentSchema } from '../models/Enrollment'
import { StudentSchema } from '../models/Student'

class DbContext {
  Enrollments = mongoose.model('Enrollment', EnrollmentSchema)
  Books = mongoose.model('Book', BookSchema)
  Students = mongoose.model('Student', StudentSchema)
  Courses = mongoose.model('Course', CourseSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
