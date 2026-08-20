'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateInterview } from '@/app/actions/interview';
import { toast } from 'sonner';

interface EditInterviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applications: Record<string, unknown>[];
  interview: Record<string, unknown> | null;
  onUpdate: (interview: Record<string, unknown>) => void;
}

export default function EditInterview({ open, onOpenChange, applications, interview, onUpdate }: EditInterviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    applicationId: '',
    interviewType: 'Online',
    interviewDate: '',
    interviewTime: '',
    interviewerName: '',
    interviewerEmail: '',
    meetingLink: '',
    preparationNotes: '',
    status: 'scheduled',
  });

  useEffect(() => {
    if (interview && open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        applicationId: ((interview.applicationId as Record<string, unknown>)?._id as string) || (interview.applicationId as string) || '',
        interviewType: (interview.interviewType as string) || 'Online',
        interviewDate: (interview.interviewDate as string) || '',
        interviewTime: (interview.interviewTime as string) || '',
        interviewerName: (interview.interviewerName as string) || '',
        interviewerEmail: (interview.interviewerEmail as string) || '',
        meetingLink: (interview.meetingLink as string) || '',
        preparationNotes: (interview.preparationNotes as string) || '',
        status: (interview.status as string) || 'scheduled',
      });
    }
  }, [interview, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.applicationId || !formData.interviewDate || !formData.interviewTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updateInterview(interview!._id as string, formData);
      if (result.success) {
        toast.success('Interview updated successfully');
        
        // Attach the full application object to the updated interview so it renders correctly
        const selectedApp = applications.find(a => (a._id as string) === formData.applicationId);
        const completeInterview = {
          ...result.data,
          applicationId: selectedApp
        };
        
        onUpdate(completeInterview as Record<string, unknown>);
        onOpenChange(false);
      } else {
        toast.error(result.error || 'Failed to update interview');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] flex flex-col p-0 gap-0 bg-white overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-slate-100 shrink-0">
          <DialogTitle className="text-xl font-bold text-slate-900">Edit Interview</DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Update the details for this interview.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6">
          <form id="edit-interview-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="applicationId">Related Application <span className="text-red-500">*</span></Label>
              <Select value={formData.applicationId} onValueChange={(val) => val && handleSelectChange('applicationId', val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an application" />
                </SelectTrigger>
                <SelectContent className="max-h-64 z-[110]">
                  {applications.length === 0 ? (
                    <div className="p-2 text-sm text-slate-500 text-center">No applications found</div>
                  ) : (
                    applications.map((app) => (
                      <SelectItem key={app._id as string} value={app._id as string}>
                        {app.company as string} - {app.role as string}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interviewType">Interview Type <span className="text-red-500">*</span></Label>
                <Select value={formData.interviewType} onValueChange={(val) => val && handleSelectChange('interviewType', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="z-[110]">
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Onsite">Onsite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(val) => val && handleSelectChange('status', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="z-[110]">
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interviewDate">Date <span className="text-red-500">*</span></Label>
                <Input type="date" id="interviewDate" name="interviewDate" value={formData.interviewDate} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interviewTime">Time <span className="text-red-500">*</span></Label>
                <Input type="time" id="interviewTime" name="interviewTime" value={formData.interviewTime} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interviewerName">Interviewer Name</Label>
                <Input id="interviewerName" name="interviewerName" placeholder="e.g. John Doe" value={formData.interviewerName} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interviewerEmail">Interviewer Email</Label>
                <Input type="email" id="interviewerEmail" name="interviewerEmail" placeholder="john@company.com" value={formData.interviewerEmail} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetingLink">Meeting Link</Label>
              <Input type="url" id="meetingLink" name="meetingLink" placeholder="https://zoom.us/j/..." value={formData.meetingLink} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preparationNotes">Preparation Notes</Label>
              <Textarea id="preparationNotes" name="preparationNotes" placeholder="Topics to prepare, portfolio links, etc." value={formData.preparationNotes} onChange={handleChange} className="resize-none h-24" />
            </div>
          </form>
        </div>

        <div className="p-6 pt-4 border-t border-slate-100 flex justify-end gap-3 shrink-0 bg-slate-50/50">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" form="edit-interview-form" className="bg-primary hover:bg-primary/90 text-white min-w-32" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
