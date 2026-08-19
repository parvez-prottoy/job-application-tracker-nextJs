import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ApplicationStatus, KanbanItem } from '@/components/applications/KanbanCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Building2,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Banknote,
  FileText,
  User,
  AlertCircle,
  Briefcase
} from 'lucide-react';

interface ViewApplicationProps {
  item: KanbanItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewApplication({ item, open, onOpenChange }: ViewApplicationProps) {
  const statusColors: Record<ApplicationStatus, string> = {
    wishlist: 'bg-slate-100 text-slate-700',
    applied: 'bg-blue-100 text-blue-700',
    interviewing: 'bg-amber-100 text-amber-700',
    offer: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-175 p-0 overflow-hidden bg-white gap-0 flex flex-col max-h-[90vh]">
        <DialogHeader className="p-6 pb-6 border-b border-slate-100 bg-slate-50/50 flex flex-row justify-between items-start shrink-0">
          <div className="flex gap-4 items-start w-full">
            <div
              className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl shrink-0 shadow-sm',
                item.color || 'bg-slate-100 text-slate-700'
              )}
            >
              {item.logo || '💼'}
            </div>
            <div className="flex flex-col gap-1.5 mt-0.5">
              <DialogTitle className="text-2xl font-bold text-slate-900 leading-none">
                {item.company}
              </DialogTitle>
              <DialogDescription className="text-lg font-medium text-slate-700">
                {item.role}
              </DialogDescription>
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge className={cn('capitalize px-2.5 py-0.5 shadow-none font-semibold text-xs border-none', statusColors[item.status])}>
                  {item.status}
                </Badge>
                {item.priority && (
                  <Badge variant="outline" className="text-xs bg-white">
                    {item.priority} Priority
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-8 pb-8">
            
            {/* Grid details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* Location & Work Mode */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Location & Mode
                </h4>
                <div className="text-sm font-medium text-slate-900 flex flex-col gap-1.5">
                  <span className="flex items-center gap-2">
                    <span className="text-slate-500 w-16">Location:</span> 
                    {item.location || 'Not specified'}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-slate-500 w-16">Mode:</span> 
                    <span className="capitalize">{item.workMode || 'Not specified'}</span>
                  </span>
                </div>
              </div>

              {/* Employment Type & Salary */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  Role Details
                </h4>
                <div className="text-sm font-medium text-slate-900 flex flex-col gap-1.5">
                  <span className="flex items-center gap-2">
                    <span className="text-slate-500 w-16">Type:</span> 
                    <span className="capitalize">{item.type || 'Not specified'}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-slate-500 w-16 flex items-center gap-1">
                      <Banknote className="h-3.5 w-3.5" /> Salary:
                    </span> 
                    {item.salary || 'Not specified'}
                  </span>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Timeline
                </h4>
                <div className="text-sm font-medium text-slate-900 flex flex-col gap-1.5">
                  <span className="flex items-center gap-2">
                    <span className="text-slate-500 w-16">Applied:</span> 
                    {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  {item.deadline && (
                    <span className="flex items-center gap-2 text-red-600">
                      <span className="text-red-400 w-16 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" /> Deadline:
                      </span> 
                      {new Date(item.deadline).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>

              {/* Contact / Links */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  Contact & Links
                </h4>
                <div className="text-sm font-medium text-slate-900 flex flex-col gap-1.5">
                  <span className="flex items-center gap-2 truncate">
                    <span className="text-slate-500 w-16">Contact:</span> 
                    {item.contact || 'Not specified'}
                  </span>
                  {item.url && (
                    <span className="flex items-center gap-2">
                      <span className="text-slate-500 w-16 flex items-center gap-1">
                        <ExternalLink className="h-3.5 w-3.5" /> URL:
                      </span> 
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate max-w-[200px] inline-block align-bottom">
                        {item.url}
                      </a>
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Notes */}
            {item.notes && (
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Notes
                </h4>
                <div className="text-sm text-slate-700 bg-slate-50/80 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap leading-relaxed">
                  {item.notes}
                </div>
              </div>
            )}
            
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end mt-auto shrink-0">
          <DialogClose
            render={
              <Button
                type="button"
                className="h-10 text-sm font-semibold border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm"
              >
                Close
              </Button>
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
