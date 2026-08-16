import {
  BarChart3,
  CalendarDays,
  FileText,
  KanbanSquare,
  PenTool,
  Sparkles,
} from 'lucide-react';
export const features = [
  {
    title: 'Smart Kanban Board',
    description:
      'Visually track your job applications from saved to hired. Drag and drop cards across customizable pipeline stages.',
    icon: KanbanSquare,
    color: 'text-blue-600',
    bg: 'bg-blue-600/10',
  },
  {
    title: 'AI Resume Optimization',
    description:
      'Analyze job descriptions and instantly tailor your resume keywords to beat Applicant Tracking Systems (ATS).',
    icon: Sparkles,
    color: 'text-indigo-600',
    bg: 'bg-indigo-600/10',
  },
  {
    title: 'Interview Management',
    description:
      'Keep track of upcoming interviews, log notes, and set automated reminders so you never miss a critical meeting.',
    icon: CalendarDays,
    color: 'text-emerald-600',
    bg: 'bg-emerald-600/10',
  },
  {
    title: 'AI Cover Letters',
    description:
      'Generate highly personalized, professional cover letters in seconds based on the job description and your profile.',
    icon: PenTool,
    color: 'text-purple-600',
    bg: 'bg-purple-600/10',
  },
  {
    title: 'Document Vault',
    description:
      'A centralized, secure hub to store all your resume versions, cover letters, portfolios, and offer letters.',
    icon: FileText,
    color: 'text-amber-600',
    bg: 'bg-amber-600/10',
  },
  {
    title: 'Career Analytics',
    description:
      'Gain actionable insights into your application success rates, interview conversions, and overall pipeline health.',
    icon: BarChart3,
    color: 'text-rose-600',
    bg: 'bg-rose-600/10',
  },
];
