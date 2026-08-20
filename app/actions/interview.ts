'use server';

import { auth } from '@/lib/auth/auth';
import { connectDB } from '@/lib/dbConnect';
import { Application } from '@/lib/models/Application';
import { Interview } from '@/lib/models/Interview';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  return session.user;
}

export async function createInterview(data: Record<string, unknown>) {
  try {
    const user = await requireAuth();
    await connectDB();

    // Verify application belongs to user
    const application = await Application.findOne({
      _id: data.applicationId,
      userId: user.id,
    });

    if (!application) {
      throw new Error('Application not found or unauthorized');
    }

    const newInterview = new Interview({
      ...data,
      userId: user.id,
    });

    await newInterview.save();

    // If setting status to 'interviewing' is supported, update application
    if (application.status !== 'interviewing' && application.status !== 'offer' && application.status !== 'rejected') {
      application.status = 'interviewing';
      await application.save();
    }

    revalidatePath('/dashboard', 'layout');
    
    return { success: true, data: JSON.parse(JSON.stringify(newInterview)) };
  } catch (error: unknown) {
    console.error('Error creating interview:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getInterviews() {
  try {
    const user = await requireAuth();
    await connectDB();

    const interviews = await Interview.find({ userId: user.id })
      .populate('applicationId')
      .sort({ interviewDate: 1, interviewTime: 1 })
      .lean();

    return { success: true, data: JSON.parse(JSON.stringify(interviews)) };
  } catch (error: unknown) {
    console.error('Error fetching interviews:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateInterview(id: string, data: Record<string, unknown>) {
  try {
    const user = await requireAuth();
    await connectDB();

    const interview = await Interview.findOneAndUpdate(
      { _id: id, userId: user.id },
      { $set: data },
      { new: true }
    ).populate('applicationId').lean();

    if (!interview) {
      throw new Error('Interview not found or unauthorized');
    }

    revalidatePath('/dashboard', 'layout');
    return { success: true, data: JSON.parse(JSON.stringify(interview)) };
  } catch (error: unknown) {
    console.error('Error updating interview:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteInterview(id: string) {
  try {
    const user = await requireAuth();
    await connectDB();

    const interview = await Interview.findOneAndDelete({
      _id: id,
      userId: user.id,
    });

    if (!interview) {
      throw new Error('Interview not found or unauthorized');
    }

    revalidatePath('/dashboard', 'layout');
    return { success: true };
  } catch (error: unknown) {
    console.error('Error deleting interview:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
