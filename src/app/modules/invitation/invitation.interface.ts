import mongoose from "mongoose";

// Define interface for Invitation
export interface IInvitation extends Document {
    organization: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: Date;
  }
  