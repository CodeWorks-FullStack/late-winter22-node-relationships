import { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId

export const BookSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  courseId: { type: ObjectId, required: true, ref: 'Course' }
},
// NOTE dont forget this line
{ timestamps: true, toJSON: { virtuals: true } }
)

// NOTE puts the information of the course on the book when the book is returned
BookSchema.virtual('course', {
  localField: 'courseId',
  foreignField: '_id',
  ref: 'Course',
  justOne: true
})
