import { FileText, Construction } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DocumentsPage() {
  return (
    <div className="flex-1 space-y-6 md:space-y-8 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto w-full animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Documents
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Manage and organize your resumes, cover letters, and other career documents.
        </p>
      </div>

      {/* Placeholder Card */}
      <Card className="border-slate-200/60 shadow-sm bg-white overflow-hidden max-w-3xl mx-auto mt-12">
        <CardContent className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 shadow-sm">
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
          
          <Badge variant="outline" className="mb-4 bg-slate-50 text-slate-600 border-slate-200 uppercase tracking-widest text-[10px] font-bold px-3 py-1">
            Coming Soon
          </Badge>
          
          <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center justify-center gap-2">
            <Construction className="w-5 h-5 text-amber-500" />
            Work in Progress
          </h3>
          
          <p className="text-slate-500 max-w-md leading-relaxed">
            Document management features are currently under development. You will soon be able to manage your career documents here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}