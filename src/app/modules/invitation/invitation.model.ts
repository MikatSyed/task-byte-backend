import mongoose, { Document, Schema } from 'mongoose';
import { IInvitation } from './invitation.interface';


// Define the Invitation Schema
const invitationSchema: Schema<IInvitation> = new Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
const Invitation = mongoose.model<IInvitation>('Invitation', invitationSchema);

export default Invitation;
