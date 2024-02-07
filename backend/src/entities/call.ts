import mongoose, { ObjectId } from 'mongoose'

export interface ICall {
  _id: ObjectId
  createdAt: Date
  date: Date
  presences: {
    student: ObjectId
    present: boolean
  }
}

const callSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  date: { type: Date, default: Date.now },
  presences: [
    {
      student: {
        type: 'ObjectId',
        ref: 'User',
      },
      present: { type: Boolean, default: false },
    },
  ],
})

export const CallModel = mongoose.model<ICall>('Call', callSchema)
