import mongoose, { Document, Schema } from 'mongoose';

export interface IInterview extends Document {
  userId: string;
  applicationId: mongoose.Types.ObjectId | string | Record<string, unknown>;
  interviewType: 'Online' | 'Phone' | 'Onsite';
  interviewDate: string;
  interviewTime: string;
  interviewerName?: string;
  interviewerEmail?: string;
  meetingLink?: string;
  preparationNotes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const InterviewSchema = new Schema<IInterview>(
  {
    userId: { type: String, required: true, index: true },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true, index: true },
    interviewType: { 
      type: String, 
      required: true,
      enum: ['Online', 'Phone', 'Onsite'] 
    },
    interviewDate: { type: String, required: true },
    interviewTime: { type: String, required: true },
    interviewerName: { type: String },
    interviewerEmail: { type: String },
    meetingLink: { type: String },
    preparationNotes: { type: String },
    status: {
      type: String,
      required: true,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
  },
  { timestamps: true }
);

export const Interview =
  mongoose.models.Interview ||
  mongoose.model<IInterview>('Interview', InterviewSchema);
