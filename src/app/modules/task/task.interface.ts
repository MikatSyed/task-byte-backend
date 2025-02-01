import { Types } from "mongoose";

export const STATUS_ENUM = ['in-progress', 'completed'] as const;
export const PRIORITY_ENUM = ['low', 'medium', 'high'] as const;

export interface ITask extends Document {
    title: string;
    description: string;
    status: typeof STATUS_ENUM[number]; 
    priority: typeof PRIORITY_ENUM[number];  
    dueDate: Date;
    assignedTo: Types.ObjectId[];  
    createdAt: Date;
    updatedAt: Date;
    organization: Types.ObjectId;  
    markAsComplete: () => Promise<void>;  
  }