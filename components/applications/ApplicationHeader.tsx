import AddApplication from './AddApplication';
import { KanbanItem } from './KanbanCard';

interface ApplicationHeaderProps {
  onApplicationAdd?: (app: KanbanItem) => void;
}

export default function ApplicationHeader({ onApplicationAdd }: ApplicationHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pb-6 border-b border-slate-100">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Applications
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Track and manage your entire job search pipeline.
        </p>
      </div>
      <div className="shrink-0 w-full sm:w-auto">
        <AddApplication onApplicationAdd={onApplicationAdd} />
      </div>
    </div>
  );
}
