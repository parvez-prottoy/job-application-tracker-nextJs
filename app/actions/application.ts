'use server';

import {
  ApplicationStatus,
  KanbanItem,
} from '@/components/applications/KanbanCard';
import { auth } from '@/lib/auth/auth';
import { connectDB } from '@/lib/dbConnect';
import { Application } from '@/lib/models/Application';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

// Helper to check auth
async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  return session.user.id;
}

export async function createApplication(data: Partial<KanbanItem>) {
  try {
    const userId = await requireAuth();
    await connectDB();

    // Generate a basic logo from company name if not provided
    const logo = data.company ? data.company.charAt(0).toUpperCase() : '💼';
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-indigo-100 text-indigo-700',
      'bg-purple-100 text-purple-700',
      'bg-rose-100 text-rose-700',
      'bg-amber-100 text-amber-700',
      'bg-emerald-100 text-emerald-700',
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const newApplication = new Application({
      ...data,
      userId,
      logo,
      color,
    });

    await newApplication.save();

    revalidatePath('/dashboard', 'layout');
    
    // Format the application to match KanbanItem
    const createdApp = {
      id: newApplication._id.toString(),
      company: newApplication.company,
      role: newApplication.role,
      location: newApplication.location || '',
      workMode: newApplication.workMode,
      type: newApplication.type,
      status: newApplication.status,
      date: newApplication.date,
      logo: newApplication.logo,
      color: newApplication.color,
      deadline: newApplication.deadline,
      priority: newApplication.priority,
      url: newApplication.url,
      salary: newApplication.salary,
      contact: newApplication.contact,
      notes: newApplication.notes,
    };

    return { success: true, data: createdApp as KanbanItem };
  } catch (error: any) {
    console.error('Error creating application:', error);
    return { success: false, error: error.message };
  }
}

export async function getApplications(): Promise<{
  success: boolean;
  data?: KanbanItem[];
  error?: string;
}> {
  try {
    const userId = await requireAuth();
    await connectDB();

    const apps = await Application.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    const formattedApps = apps.map((app: any) => ({
      id: app._id.toString(),
      company: app.company,
      role: app.role,
      location: app.location || '',
      workMode: app.workMode,
      type: app.type,
      status: app.status,
      date: app.date,
      logo: app.logo || '💼',
      color: app.color || 'bg-slate-100 text-slate-700',
      deadline: app.deadline,
      priority: app.priority,
      url: app.url,
      salary: app.salary,
      contact: app.contact,
      notes: app.notes,
    }));

    return { success: true, data: formattedApps as KanbanItem[] };
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    return { success: false, error: error.message };
  }
}

export async function updateApplicationStatus(
  id: string,
  newStatus: ApplicationStatus
) {
  try {
    const userId = await requireAuth();
    await connectDB();

    const app = await Application.findOneAndUpdate(
      { _id: id, userId },
      { status: newStatus },
      { new: true }
    ).lean();

    if (!app) {
      throw new Error('Application not found or unauthorized');
    }

    revalidatePath('/dashboard', 'layout');
    
    // Format the application to match KanbanItem
    const updatedApp = {
      id: (app as any)._id.toString(),
      company: (app as any).company,
      role: (app as any).role,
      location: (app as any).location || '',
      workMode: (app as any).workMode,
      type: (app as any).type,
      status: (app as any).status,
      date: (app as any).date,
      logo: (app as any).logo || '💼',
      color: (app as any).color || 'bg-slate-100 text-slate-700',
      deadline: (app as any).deadline,
      priority: (app as any).priority,
      url: (app as any).url,
      salary: (app as any).salary,
      contact: (app as any).contact,
      notes: (app as any).notes,
    };

    return { success: true, data: updatedApp as KanbanItem };
  } catch (error: any) {
    console.error('Error updating status:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteApplication(id: string) {
  try {
    const userId = await requireAuth();
    await connectDB();

    const app = await Application.findOneAndDelete({ _id: id, userId });

    if (!app) {
      throw new Error('Application not found or unauthorized');
    }

    revalidatePath('/dashboard', 'layout');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting application:', error);
    return { success: false, error: error.message };
  }
}

export async function updateApplication(id: string, data: Partial<KanbanItem>) {
  try {
    const userId = await requireAuth();
    await connectDB();

    const app = await Application.findOneAndUpdate(
      { _id: id, userId },
      { $set: data },
      { new: true }
    ).lean();

    if (!app) {
      throw new Error('Application not found or unauthorized');
    }

    revalidatePath('/dashboard', 'layout');
    
    // Format the application to match KanbanItem
    const updatedApp = {
      id: (app as any)._id.toString(),
      company: (app as any).company,
      role: (app as any).role,
      location: (app as any).location || '',
      workMode: (app as any).workMode,
      type: (app as any).type,
      status: (app as any).status,
      date: (app as any).date,
      logo: (app as any).logo || '💼',
      color: (app as any).color || 'bg-slate-100 text-slate-700',
      deadline: (app as any).deadline,
      priority: (app as any).priority,
      url: (app as any).url,
      salary: (app as any).salary,
      contact: (app as any).contact,
      notes: (app as any).notes,
    };

    return { success: true, data: updatedApp as KanbanItem };
  } catch (error: any) {
    console.error('Error updating application:', error);
    return { success: false, error: error.message };
  }
}
