import { Document, Model, Schema, Types, model } from 'mongoose';


export interface IOrganization extends Document {
    name: string;
    admin: Types.ObjectId;
    members: Types.ObjectId[];
  }
  

  export interface OrganizationModel extends Model<IOrganization> {}

