'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Calendar, Clock, Video, Phone, MapPin, MoreHorizontal, FileEdit, Trash2, ExternalLink, Eye } from 'lucide-react';
import { IInterviewData } from './InterviewsClient';
import { cn } from '@/lib/utils';
import EditInterview from './EditInterview';
import ViewInterview from './ViewInterview';
import { deleteInterview } from '@/app/actions/interview';
import { toast } from 'sonner';

interface InterviewCardProps {
  interview: IInterviewData;
  onUpdate: (interview: IInterviewData) => void;
  onDelete: (id: string) => void;
  applications: Record<string, unknown>[];
}

export default function InterviewCard({ interview, onUpdate, onDelete, applications }: InterviewCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const application = interview.applicationId;
  const company = (application as Record<string, any>)?.company || 'Unknown Company';
  const role = (application as Record<string, any>)?.role || 'Unknown Role';
  const logo = (application as Record<string, any>)?.logo || company.charAt(0);
  const color = (application as Record<string, any>)?.color || 'bg-slate-100 text-slate-700';

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteInterview(interview._id);
      if (res.success) {
        toast.success('Interview deleted successfully');
        onDelete(interview._id);
        setIsDeleteOpen(false);
      } else {
        toast.error(res.error || 'Failed to delete interview');
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = () => {
    if (interview.status === 'completed') {
      return <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">Completed</Badge>;
    }
    if (interview.status === 'cancelled') {
      return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Cancelled</Badge>;
    }
    return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Scheduled</Badge>;
  };

  const getTypeIcon = () => {
    if (interview.interviewType === 'Online') return <Video className="w-3.5 h-3.5" />;
    if (interview.interviewType === 'Phone') return <Phone className="w-3.5 h-3.5" />;
    return <MapPin className="w-3.5 h-3.5" />;
  };

  return (
    <>
      <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-all">
        <CardContent className="p-4 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0", color)}>
                {logo}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-slate-900 truncate text-[15px] leading-tight">
                  {company}
                </span>
                <span className="text-slate-500 text-xs font-medium truncate mt-0.5">
                  {role}
                </span>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-1 text-slate-400 hover:text-slate-900 focus-visible:ring-0" />}>
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 z-[100] bg-white border border-slate-200 shadow-lg">
                <DropdownMenuItem className="cursor-pointer" onClick={() => setIsViewOpen(true)}>
                  <Eye className="mr-2 h-4 w-4" /> View Details
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setIsEditOpen(true)}>
                  <FileEdit className="mr-2 h-4 w-4" /> Edit Interview
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50" onClick={() => setIsDeleteOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {getStatusBadge()}
              <Badge variant="outline" className="text-slate-600 bg-slate-50 border-slate-200 flex items-center gap-1">
                {getTypeIcon()} {interview.interviewType}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-slate-700 font-medium bg-slate-50/80 px-2.5 py-1.5 rounded-md border border-slate-100">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                {new Date(interview.interviewDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center text-sm text-slate-700 font-medium bg-slate-50/80 px-2.5 py-1.5 rounded-md border border-slate-100">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                {interview.interviewTime}
              </div>
            </div>
          </div>

          {interview.interviewerName && (
            <div className="text-sm text-slate-600 border-t border-slate-100 pt-3">
              <span className="font-semibold text-slate-900">Interviewer:</span> {interview.interviewerName}
            </div>
          )}

          {interview.meetingLink && (
            <div className="mt-1">
              <Button variant="outline" className="w-full text-primary border-primary/20 hover:bg-primary/5" onClick={() => window.open(interview.meetingLink, '_blank')}>
                Join Meeting <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {isViewOpen && (
        <ViewInterview open={isViewOpen} onOpenChange={setIsViewOpen} interview={interview as any} application={application as Record<string, unknown>} />
      )}

      {isEditOpen && (
        <EditInterview
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          interview={interview as any}
          applications={applications}
          onUpdate={onUpdate as any}
        />
      )}

      {isDeleteOpen && (
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Delete Interview?</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this interview? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3 mt-4">
              <DialogClose render={<Button variant="outline" disabled={isDeleting} />}>
                Cancel
              </DialogClose>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete Interview'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
