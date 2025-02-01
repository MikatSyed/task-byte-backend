import { Schema, model } from 'mongoose';
import { IOrganization, OrganizationModel } from './Organization.interface';

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true, unique: true },
    admin: { type: Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);


export const Organization = model<IOrganization, OrganizationModel>('Organization', OrganizationSchema);


