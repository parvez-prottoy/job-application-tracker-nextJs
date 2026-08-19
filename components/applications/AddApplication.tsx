import { createApplication } from '@/app/actions/application';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ApplicationStatus } from '@/components/applications/KanbanCard';
import { toast } from 'sonner';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';
import { KanbanItem } from './KanbanCard';

interface AddApplicationProps {
  onApplicationAdd?: (app: KanbanItem) => void;
}

export default function AddApplication({ onApplicationAdd }: AddApplicationProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use state for selects since they don't natively populate FormData easily in shadcn
  const [workMode, setWorkMode] = useState<string>('remote');
  const [employmentType, setEmploymentType] = useState<string>('full-time');
  const [status, setStatus] = useState<ApplicationStatus>('applied');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      company: formData.get('company') as string,
      role: formData.get('role') as string,
      url: formData.get('url') as string,
      location: formData.get('location') as string,
      workMode: workMode,
      type: employmentType,
      salary: formData.get('salary') as string,
      status: status,
      date: formData.get('date') as string,
      deadline: formData.get('deadline') as string,
      contact: formData.get('contact') as string,
      notes: formData.get('notes') as string,
    };

    const result = await createApplication(data);

    if (result.success && result.data) {
      toast.success('Application added successfully!');
      if (onApplicationAdd) {
        onApplicationAdd(result.data);
      }
      // Reset form states
      setWorkMode('remote');
      setEmploymentType('full-time');
      setStatus('applied');
      setOpen(false);
    } else {
      setError(result.error || 'Failed to add application');
      toast.error(result.error || 'Failed to add application');
    }
    
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="h-10 bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg shadow-sm hover:shadow-[0_4px_14px_0_rgba(37,99,235,0.2)] transition-all">
            <Plus className="mr-2 h-4 w-4" strokeWidth={2.5} />
            Add Application
          </Button>
        }
      />

      <DialogContent className="sm:max-w-175 p-0 overflow-hidden bg-white gap-0 flex flex-col max-h-[90vh]">
        <DialogHeader className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <DialogTitle className="text-xl font-bold text-slate-900">
            Add New Application
          </DialogTitle>
          <DialogDescription className="text-slate-500 mt-1">
            Track a new job opportunity by entering the details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6">
            <div className="space-y-6 pb-2">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              {/* Section 1: Core Info */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Company & Role
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="company"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Company Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="e.g. Google"
                      required
                      className="h-10 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/10 transition-all rounded-lg text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="role"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Job Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="e.g. Frontend Engineer"
                      required
                      className="h-10 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/10 transition-all rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="url"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Job Posting URL
                  </Label>
                  <Input
                    id="url"
                    name="url"
                    type="url"
                    placeholder="https://..."
                    className="h-10 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/10 transition-all rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Section 2: Work Details */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Work Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="location"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. San Francisco, CA"
                      className="h-10 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/10 transition-all rounded-lg text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="workMode"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Work Mode <span className="text-red-500">*</span>
                    </Label>
                    <Select value={workMode} onValueChange={(v) => v && setWorkMode(v)}>
                      <SelectTrigger
                        id="workMode"
                        className="h-10 bg-slate-50/50 border-slate-200 focus:ring-primary/10 transition-all rounded-lg text-sm"
                      >
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="onsite">On-site</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="employmentType"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Employment Type <span className="text-red-500">*</span>
                    </Label>
                    <Select value={employmentType} onValueChange={(v) => v && setEmploymentType(v)}>
                      <SelectTrigger
                        id="employmentType"
                        className="h-10 bg-slate-50/50 border-slate-200 focus:ring-primary/10 transition-all rounded-lg text-sm"
                      >
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="salary"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Salary Range{' '}
                    <span className="text-slate-400 font-normal">
                      (Optional)
                    </span>
                  </Label>
                  <Input
                    id="salary"
                    name="salary"
                    placeholder="e.g. $120k - $150k"
                    className="h-10 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/10 transition-all rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Section 3: Status & Dates */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Tracking Info
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="status"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Status <span className="text-red-500">*</span>
                    </Label>
                    <Select value={status} onValueChange={(v) => v && setStatus(v as ApplicationStatus)}>
                      <SelectTrigger
                        id="status"
                        className="h-10 bg-slate-50/50 border-slate-200 focus:ring-primary/10 transition-all rounded-lg text-sm"
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wishlist">Wishlist</SelectItem>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="interviewing">
                          Interviewing
                        </SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="date"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Date Applied <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      required
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="h-10 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/10 transition-all rounded-lg text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Deadline{' '}
                      <span className="text-slate-400 font-normal">
                        (Optional)
                      </span>
                    </Label>
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      className="h-10 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/10 transition-all rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Contact / Recruiter{' '}
                    <span className="text-slate-400 font-normal">
                      (Optional)
                    </span>
                  </Label>
                  <Input
                    id="contact"
                    name="contact"
                    placeholder="e.g. Jane Doe (jane@company.com)"
                    className="h-10 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/10 transition-all rounded-lg text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="notes"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Notes{' '}
                    <span className="text-slate-400 font-normal">
                      (Optional)
                    </span>
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any additional notes or thoughts about this application..."
                    className="min-h-25 resize-y bg-slate-50/50 border-slate-200 focus-visible:ring-primary/10 transition-all rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3 mt-auto shrink-0">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 text-sm font-semibold border-slate-200 hover:bg-slate-50 text-slate-600"
                >
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="h-10 text-sm font-bold bg-primary hover:bg-primary/95 text-white shadow-sm transition-all min-w-40"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Adding Application...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" strokeWidth={2.5} />
                  Add Application
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
