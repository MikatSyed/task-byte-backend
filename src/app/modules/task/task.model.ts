import mongoose, { Schema } from 'mongoose';
import { ITask, PRIORITY_ENUM, STATUS_ENUM } from './task.interface';



// Define the Task Schema
const taskSchema: Schema<ITask> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: STATUS_ENUM,
      default: 'in-progress',
    },
    priority: {
      type: String,
      enum: PRIORITY_ENUM,
   
    },
    dueDate: {
      type: Date,
      required: true,
    },
    assignedTo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization', 
      required: true,
    },
  },
  { timestamps: true }
);


// Create the Task model
export const Task = mongoose.models.Task || mongoose.model<ITask>('Task', taskSchema);


