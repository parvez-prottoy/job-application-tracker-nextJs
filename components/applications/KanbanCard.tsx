'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  AlertCircle,
  FileEdit,
  MapPin,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';

export type ApplicationStatus =
  | 'wishlist'
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'rejected';

export interface KanbanItem {
  id: string;
  company: string;
  role: string;
  location: string;
  workMode: string;
  type: string;
  status: ApplicationStatus;
  url?: string;
  salary?: string;
  date: string;
  deadline?: string;
  contact?: string;
  notes?: string;
  logo?: string;
  color?: string;
  priority?: 'High' | 'Medium' | 'Low';
  createdAt?: string;
}

interface KanbanCardProps {
  item: KanbanItem;
  onApplicationUpdate?: (app: KanbanItem) => void;
  onApplicationDelete?: (id: string) => void;
}

import EditApplication from '@/components/applications/EditApplication';
import ViewApplication from '@/components/applications/ViewApplication';
import { useState } from 'react';

export function KanbanCard({
  item,
  onApplicationUpdate,
  onApplicationDelete,
}: KanbanCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, data: { type: 'Task', item } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    High: 'bg-red-50 text-red-600 border-red-200',
    Medium: 'bg-amber-50 text-amber-600 border-amber-200',
    Low: 'bg-slate-50 text-slate-600 border-slate-200',
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          'group touch-none', // touch-none is important for mobile dnd
          isDragging && 'opacity-50 scale-105 z-50 cursor-grabbing'
        )}
        {...attributes}
        {...listeners}
      >
        <Card
          onClick={(e) => {
            // Check if we are currently dragging via the style transform - dnd-kit normally swallows drag clicks, but just to be safe:
            if (!isDragging) setIsViewOpen(true);
          }}
          className={cn(
            'border-slate-200/60 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all',
            isDragging && 'ring-2 ring-primary/20 shadow-xl'
          )}
        >
          <CardContent className="p-4 flex flex-col gap-3">
            {/* Header Row: Logo, Company & Menu */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0',
                    item.color
                  )}
                >
                  {item.logo}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-slate-900 truncate text-[15px] leading-tight">
                    {item.company}
                  </span>
                  <span className="text-slate-500 text-xs font-medium truncate mt-0.5">
                    {item.date}
                  </span>
                </div>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 -mr-2 -mt-1 text-slate-400 hover:text-slate-900 focus-visible:ring-0 relative z-50"
                      />
                    }
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-40 z-100 bg-white border border-slate-200 shadow-lg"
                  >
                    <DropdownMenuItem
                      className="cursor-pointer text-slate-700 focus:bg-slate-50 focus:text-slate-900"
                      onClick={() => setIsEditOpen(true)}
                    >
                      <FileEdit className="mr-2 h-4 w-4" />
                      Edit Application
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50"
                      onClick={() => setIsDeleteOpen(true)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Application
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Role & Badges */}
            <div>
              <h4 className="font-semibold text-slate-800 text-sm mb-2 line-clamp-2 leading-snug">
                {item.role}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                <Badge
                  variant="outline"
                  className="px-1.5 py-0 text-[10px] font-semibold text-slate-600 bg-slate-50 border-slate-200"
                >
                  {item.type}
                </Badge>
                {item.priority && (
                  <Badge
                    variant="outline"
                    className={cn(
                      'px-1.5 py-0 text-[10px] font-semibold',
                      priorityColors[item.priority]
                    )}
                  >
                    {item.priority}
                  </Badge>
                )}
              </div>
            </div>

            {/* Footer Info */}
            <div className="flex flex-col gap-1.5 mt-1 pt-3 border-t border-slate-100">
              <div className="flex items-center text-xs text-slate-500 font-medium">
                <MapPin className="h-3 w-3 mr-1.5 shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>
              {item.deadline && (
                <div className="flex items-center text-xs text-red-600 font-semibold bg-red-50/50 w-fit px-1.5 py-0.5 rounded-sm -ml-1">
                  <AlertCircle className="h-3 w-3 mr-1 shrink-0" />
                  <span>Deadline: {item.deadline}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      {isViewOpen && (
        <ViewApplication
          item={item}
          open={isViewOpen}
          onOpenChange={setIsViewOpen}
        />
      )}
      {isEditOpen && (
        <EditApplication
          item={item}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onApplicationUpdate={onApplicationUpdate}
        />
      )}
      {isDeleteOpen && (
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="sm:max-w-md p-6 bg-white gap-6">
            <DialogHeader className="gap-2">
              <DialogTitle className="text-xl font-bold text-slate-900">
                Delete Application?
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-500">
                Are you sure you want to delete this application? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-end gap-3 mt-2">
              <DialogClose
                render={
                  <Button
                    variant="outline"
                    className="text-slate-600 border-slate-200"
                  >
                    Cancel
                  </Button>
                }
              />
              <Button
                variant="destructive"
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white min-w-32"
                onClick={async () => {
                  setIsDeleting(true);
                  const { deleteApplication } =
                    await import('@/app/actions/application');
                  const { toast } = await import('sonner');
                  const result = await deleteApplication(item.id);
                  if (result.success) {
                    toast.success('Application deleted successfully');
                    if (onApplicationDelete) {
                      onApplicationDelete(item.id);
                    }
                    setIsDeleteOpen(false);
                  } else {
                    toast.error(result.error || 'Failed to delete');
                  }
                  setIsDeleting(false);
                }}
              >
                {isDeleting ? 'Deleting...' : 'Delete Application'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
