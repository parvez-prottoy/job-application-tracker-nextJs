import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  userId: string;
  company: string;
  role: string;
  location: string;
  workMode: string;
  type: string;
  status: 'wishlist' | 'applied' | 'interviewing' | 'offer' | 'rejected';
  url?: string;
  salary?: string;
  date: string;
  deadline?: string;
  contact?: string;
  notes?: string;
  logo: string;
  color: string;
  priority?: 'High' | 'Medium' | 'Low';
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    userId: { type: String, required: true, index: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, default: '' },
    workMode: { type: String, required: true },
    type: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['wishlist', 'applied', 'interviewing', 'offer', 'rejected'],
      default: 'applied',
    },
    url: { type: String },
    salary: { type: String },
    date: { type: String, required: true },
    deadline: { type: String },
    contact: { type: String },
    notes: { type: String },
    logo: { type: String },
    color: { type: String },
    priority: { type: String, enum: ['High', 'Medium', 'Low'] },
  },
  { timestamps: true }
);

// Prevent mongoose from compiling the model multiple times during Next.js hot reload
export const Application =
  mongoose.models.Application ||
  mongoose.model<IApplication>('Application', ApplicationSchema);
