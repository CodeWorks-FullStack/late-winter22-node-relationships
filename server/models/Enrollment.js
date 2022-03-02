import { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId

export const EnrollmentSchema = new Schema({
  studentId: { type: ObjectId, required: true, ref: 'Student' },
  courseId: { type: ObjectId, required: true, ref: 'Course' },
  creatorId: { type: ObjectId, required: true, ref: 'Account' }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

EnrollmentSchema.virtual('student', {
  localField: 'studentId',
  foreignField: '_id',
  ref: 'Student',
  justOne: true
})

EnrollmentSchema.virtual('course', {
  localField: 'courseId',
  foreignField: '_id',
  ref: 'Course',
  justOne: true
})
