'use client';

import { updateApplicationStatus } from '@/app/actions/application';
import { cn } from '@/lib/utils';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState, startTransition, useRef } from 'react';
import { ApplicationStatus, KanbanCard, KanbanItem } from './KanbanCard';

const COLUMNS: {
  id: ApplicationStatus;
  title: string;
  color: string;
  badge: string;
}[] = [
  {
    id: 'wishlist',
    title: 'Wishlist',
    color: 'bg-slate-50 border-slate-200/60',
    badge: 'bg-slate-200 text-slate-700',
  },
  {
    id: 'applied',
    title: 'Applied',
    color: 'bg-blue-50/30 border-blue-100',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'interviewing',
    title: 'Interviewing',
    color: 'bg-amber-50/30 border-amber-100',
    badge: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'offer',
    title: 'Offer',
    color: 'bg-emerald-50/30 border-emerald-100',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'rejected',
    title: 'Rejected',
    color: 'bg-red-50/30 border-red-100',
    badge: 'bg-red-100 text-red-700',
  },
];

interface KanbanBoardProps {
  initialItems: KanbanItem[];
  onApplicationUpdate?: (app: KanbanItem) => void;
  onApplicationDelete?: (id: string) => void;
}

export function KanbanBoard({ initialItems, onApplicationUpdate, onApplicationDelete }: KanbanBoardProps) {
  const [items, setItems] = useState<KanbanItem[]>(initialItems);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Use a ref to always have access to the absolute latest items state in DragEnd
  const itemsRef = useRef<KanbanItem[]>(initialItems);

  // Sync state with server prop changes (e.g. after revalidatePath)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(initialItems);
    itemsRef.current = initialItems;
  }, [initialItems]);

  const updateItemsState = (newItems: KanbanItem[] | ((prev: KanbanItem[]) => KanbanItem[])) => {
    setItems((prev) => {
      const next = typeof newItems === 'function' ? newItems(prev) : newItems;
      itemsRef.current = next;
      return next;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Require 5px movement before dragging starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';

    if (!isActiveTask) return;

    // Dropping a task over another task
    if (isActiveTask && isOverTask) {
      updateItemsState((prev) => {
        const activeIndex = prev.findIndex((t) => t.id === activeId);
        const overIndex = prev.findIndex((t) => t.id === overId);

        if (prev[activeIndex].status !== prev[overIndex].status) {
          const newItems = [...prev];
          newItems[activeIndex] = { ...newItems[activeIndex], status: prev[overIndex].status };
          return newItems;
        }
        return prev;
      });
    }

    // Dropping a task over an empty column
    const isOverColumn = over.data.current?.type === 'Column';
    if (isActiveTask && isOverColumn) {
      updateItemsState((prev) => {
        const activeIndex = prev.findIndex((t) => t.id === activeId);
        if (prev[activeIndex].status !== overId) {
          const newItems = [...prev];
          newItems[activeIndex] = { ...newItems[activeIndex], status: overId as ApplicationStatus };
          return newItems;
        }
        return prev;
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    
    // Determine the intended new status directly from the LATEST state!
    const latestItem = itemsRef.current.find((t) => t.id === activeId);
    const newStatus = latestItem?.status;

    const originalItem = initialItems.find((t) => t.id === activeId);
    
    if (originalItem && newStatus && newStatus !== originalItem.status) {
      const { toast } = await import('sonner');
      
      const statusTitleMap: Record<string, string> = {
        wishlist: 'Wishlist',
        applied: 'Applied',
        interviewing: 'Interviewing',
        offer: 'Offer',
        rejected: 'Rejected',
      };
      
      const newStatusTitle = statusTitleMap[newStatus] || newStatus;
      let successMessage = `Moved to ${newStatusTitle} successfully!`;
      if (newStatus === 'offer') successMessage = `Status updated to Offer!`;
      if (newStatus === 'rejected') successMessage = `Application moved to Rejected!`;

      // Optimistically ensure UI matches the final state in case dragOver missed it
      setItems((prev) => {
        const newItems = [...prev];
        const activeIndex = newItems.findIndex((t) => t.id === activeId);
        if (activeIndex !== -1) {
          newItems[activeIndex] = { ...newItems[activeIndex], status: newStatus as ApplicationStatus };
        }
        return newItems;
      });

      startTransition(() => {
        // Call API
        const updatePromise = updateApplicationStatus(activeId, newStatus).then((res) => {
          if (!res.success) throw new Error(res.error || 'Failed to update status');
          if (res.data && onApplicationUpdate) {
            onApplicationUpdate(res.data);
          }
          return res;
        });

        toast.promise(updatePromise, {
          loading: `Moving to ${newStatusTitle}...`,
          success: successMessage,
          error: (err) => err.message || 'Failed to move application',
        });
        
        updatePromise.catch(() => {
          // Revert local state on error
          setItems(initialItems);
        });
      });
    }
  };

  const activeItem = activeId ? items.find((i) => i.id === activeId) : null;

  if (!isMounted) {
    return null; // Prevent dnd-kit hydration mismatches
  }

  return (
    <div className="w-full">
      <DndContext
        id="dnd-board"
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              items={items.filter((item) => item.status === column.id)}
              onApplicationUpdate={onApplicationUpdate}
              onApplicationDelete={onApplicationDelete}
            />
          ))}
        </div>

        <DragOverlay>
          {activeItem ? <KanbanCard item={activeItem} onApplicationUpdate={onApplicationUpdate} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

// --- COLUMN COMPONENT ---

interface KanbanColumnProps {
  column: (typeof COLUMNS)[0];
  items: KanbanItem[];
  onApplicationUpdate?: (app: KanbanItem) => void;
  onApplicationDelete?: (id: string) => void;
}

function KanbanColumn({ column, items, onApplicationUpdate, onApplicationDelete }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  return (
    <div className="flex flex-col w-full h-full min-h-62.5">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          {column.title}
          <span
            className={cn(
              'text-xs font-bold px-2 py-0.5 rounded-full',
              column.badge
            )}
          >
            {items.length}
          </span>
        </h3>
      </div>

      {/* Column Body / Droppable Area */}
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 min-h-37.5 p-2.5 rounded-xl border flex flex-col gap-3 transition-colors',
          column.color
        )}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            // We pass the required type="Task" in the sortable data so the handlers know what's dragging
            <div key={item.id} data-type="Task">
              <KanbanCard 
                item={{ ...item }} 
                onApplicationUpdate={onApplicationUpdate} 
                onApplicationDelete={onApplicationDelete} 
              />
            </div>
          ))}
        </SortableContext>

        {items.length === 0 && (
          <div className="h-25 border-2 border-dashed border-slate-200/70 rounded-lg flex items-center justify-center">
            <span className="text-sm font-medium text-slate-400">
              Drop here
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
