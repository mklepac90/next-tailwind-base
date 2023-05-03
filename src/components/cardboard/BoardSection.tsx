import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '@/types';
import TaskItem from './TaskItem';
import SortableTaskItem from './SortableTaskItem';

type BoardSectionProps = {
  id: string;
  tasks: Task[];
};

const BoardSection = ({ id, tasks }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex-col p-2 h-[14rem] space-y-2 overflow-y-auto">
          {tasks.map((task) => (
            <div key={task.id}>
              <SortableTaskItem id={task.id}>
                <TaskItem task={task} />
              </SortableTaskItem>
            </div>
          ))}
        </div>
      </SortableContext>
  );
};

export default BoardSection;
