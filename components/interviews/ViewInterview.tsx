'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Phone, MapPin, ExternalLink, Building2, User, Mail, AlignLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IInterviewData } from './InterviewsClient';

interface ViewInterviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interview: IInterviewData;
  application: any;
}

export default function ViewInterview({ open, onOpenChange, interview, application }: ViewInterviewProps) {
  const company = application?.company || 'Unknown Company';
  const role = application?.role || 'Unknown Role';
  const logo = application?.logo || company.charAt(0);
  const color = application?.color || 'bg-slate-100 text-slate-700';

  const getTypeIcon = () => {
    if (interview.interviewType === 'Online') return <Video className="w-4 h-4 text-slate-500" />;
    if (interview.interviewType === 'Phone') return <Phone className="w-4 h-4 text-slate-500" />;
    return <MapPin className="w-4 h-4 text-slate-500" />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] flex flex-col p-0 gap-0 bg-white overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-slate-100 shrink-0 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-slate-900">Interview Details</DialogTitle>
            <Badge variant="outline" className={cn(
              "px-2.5 py-1 text-xs font-semibold capitalize border",
              interview.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
              interview.status === 'cancelled' ? 'bg-red-50 text-red-600 border-red-200' : 
              'bg-amber-50 text-amber-600 border-amber-200'
            )}>
              {interview.status}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6">
          <div className="space-y-6">
            
            {/* Application Info */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0", color)}>
                {logo}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight">{company}</h3>
                <p className="text-sm font-medium text-slate-500">{role}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center text-sm font-medium text-slate-500">
                  <Calendar className="w-4 h-4 mr-2" /> Date
                </div>
                <div className="font-semibold text-slate-900 text-base">
                  {new Date(interview.interviewDate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center text-sm font-medium text-slate-500">
                  <Clock className="w-4 h-4 mr-2" /> Time
                </div>
                <div className="font-semibold text-slate-900 text-base">
                  {interview.interviewTime}
                </div>
              </div>
            </div>

            {/* Details List */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  {getTypeIcon()}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Interview Type</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">{interview.interviewType}</p>
                </div>
              </div>

              {(interview.interviewerName || interview.interviewerEmail) && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Interviewer</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      {interview.interviewerName || 'Not specified'}
                    </p>
                    {interview.interviewerEmail && (
                      <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        <a href={`mailto:${interview.interviewerEmail}`} className="hover:text-primary transition-colors">
                          {interview.interviewerEmail}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {interview.preparationNotes && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <AlignLeft className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-500 mb-1">Preparation Notes</p>
                    <div className="text-sm text-slate-700 bg-slate-50 border border-slate-100 rounded-lg p-3 whitespace-pre-wrap leading-relaxed">
                      {interview.preparationNotes}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="p-6 pt-4 border-t border-slate-100 flex justify-end gap-3 shrink-0 bg-slate-50/50">
          <DialogClose render={<Button variant="outline" />}>
            Close
          </DialogClose>
          {interview.meetingLink && (
            <Button className="bg-primary hover:bg-primary/90 text-white min-w-32" onClick={() => window.open(interview.meetingLink, '_blank')}>
              Join Meeting <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}