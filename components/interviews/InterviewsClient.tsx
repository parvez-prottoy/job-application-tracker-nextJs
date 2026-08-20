'use client';

import { useState, useMemo } from 'react';
import { Plus, Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AddInterview from './AddInterview';
import InterviewCard from './InterviewCard';

export interface IInterviewData {
  _id: string;
  userId: string;
  applicationId: any;
  interviewType: 'Online' | 'Phone' | 'Onsite';
  interviewDate: string;
  interviewTime: string;
  interviewerName?: string;
  interviewerEmail?: string;
  meetingLink?: string;
  preparationNotes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

interface InterviewsClientProps {
  initialInterviews: IInterviewData[];
  applications: any[];
}

export default function InterviewsClient({ initialInterviews, applications }: InterviewsClientProps) {
  const [interviews, setInterviews] = useState<IInterviewData[]>(initialInterviews);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'completed'>('upcoming');

  const updateInterviewsState = (updatedInterview: IInterviewData) => {
    setInterviews((prev) => {
      const exists = prev.find(i => i._id === updatedInterview._id);
      if (exists) {
        return prev.map(i => i._id === updatedInterview._id ? updatedInterview : i);
      }
      return [updatedInterview, ...prev];
    });
  };

  const removeInterviewState = (id: string) => {
    setInterviews((prev) => prev.filter(i => i._id !== id));
  };

  const now = new Date();
  
  // Tabs filtering logic
  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) => {
      if (interview.status === 'cancelled') return false;
      
      const interviewDateTime = new Date(`${interview.interviewDate}T${interview.interviewTime}`);
      
      if (activeTab === 'completed') {
        return interview.status === 'completed';
      }
      
      if (activeTab === 'upcoming') {
        return interview.status === 'scheduled' && interviewDateTime >= now;
      }
      
      if (activeTab === 'past') {
        return interview.status === 'scheduled' && interviewDateTime < now;
      }
      
      return false;
    }).sort((a, b) => {
      const dateA = new Date(`${a.interviewDate}T${a.interviewTime}`).getTime();
      const dateB = new Date(`${b.interviewDate}T${b.interviewTime}`).getTime();
      // Sort upcoming ascending (closest first), others descending
      return activeTab === 'upcoming' ? dateA - dateB : dateB - dateA;
    });
  }, [interviews, activeTab]);

  // Summary Metrics
  const totalInterviews = interviews.length;
  const upcomingCount = interviews.filter(i => i.status === 'scheduled' && new Date(`${i.interviewDate}T${i.interviewTime}`) >= now).length;
  const completedCount = interviews.filter(i => i.status === 'completed').length;
  const cancelledCount = interviews.filter(i => i.status === 'cancelled').length;

  return (
    <div className="flex-1 space-y-6 md:space-y-8 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Interviews
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your upcoming interviews, track interview progress, and stay prepared.
          </p>
        </div>
        <Button 
          onClick={() => setIsAddOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-slate-200/60 shadow-sm bg-white">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Interviews</p>
                <h3 className="text-2xl font-bold text-slate-900">{totalInterviews}</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-slate-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200/60 shadow-sm bg-white">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Upcoming</p>
                <h3 className="text-2xl font-bold text-amber-600">{upcomingCount}</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm bg-white">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Completed</p>
                <h3 className="text-2xl font-bold text-emerald-600">{completedCount}</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm bg-white">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Cancelled</p>
                <h3 className="text-2xl font-bold text-red-600">{cancelledCount}</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                <XCircle className="w-4 h-4 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6">
          {(['upcoming', 'past', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Interview Cards List */}
      {filteredInterviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No interviews {activeTab === 'upcoming' ? 'scheduled yet' : 'found'}</h3>
          <p className="text-sm text-slate-500 max-w-sm mb-6">
            {activeTab === 'upcoming' 
              ? 'Schedule your first interview and keep track of every opportunity.' 
              : 'There are no interviews matching this category.'}
          </p>
          {activeTab === 'upcoming' && (
            <Button onClick={() => setIsAddOpen(true)} className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" /> Schedule Interview
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredInterviews.map((interview) => (
            <InterviewCard 
              key={interview._id} 
              interview={interview} 
              onUpdate={updateInterviewsState}
              onDelete={removeInterviewState}
              applications={applications}
            />
          ))}
        </div>
      )}

      {/* Add Interview Modal */}
      {isAddOpen && (
        <AddInterview
          open={isAddOpen}
          onOpenChange={setIsAddOpen}
          applications={applications}
          onInterviewAdd={updateInterviewsState}
        />
      )}
    </div>
  );
}