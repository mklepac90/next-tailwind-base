import React, { useState } from 'react';
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  rectIntersection,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { BoardSections as BoardSectionsType } from '@/types';
import { getTaskById } from '@/utils/tasks';
import { findBoardSectionContainer, initializeBoard } from '@/utils/board';
import BoardSection from '@/components/cardboard/BoardSection';
import TaskItem from '@/components/cardboard/TaskItem';
import { Task } from '@/types';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Title 1',
    description: 'Desc 1',
    status: 'one-backlog',
  },
  {
    id: '2',
    title: 'Title 2',
    description: 'Desc 2',
    status: 'two-backlog',
  },
  {
    id: '3',
    title: 'Title 3',
    description: 'Desc 3',
    status: 'three-backlog',
  },
  {
    id: '4',
    title: 'Title 4',
    description: 'Desc 4',
    status: 'four-backlog',
  },
  {
    id: '5',
    title: 'Title 5',
    description: 'Desc 4',
    status: 'one-staging',
  },
  {
    id: '6',
    title: 'Title 6',
    description: 'Desc 4',
    status: 'four-staging',
  },
];

const STAGES: string[] = ['one', 'two', 'three', 'four'];

const STEPS: string[] = [
  'backlog',
  'in progress',
  'done',
  'staging',
];

const BoardSectionList = () => {
  const tasks = INITIAL_TASKS;
  const initialBoardSections = initializeBoard(STAGES, STEPS, tasks);
  const [boardSections, setBoardSections] =
    useState<BoardSectionsType>(initialBoardSections);

  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  // update containers when a draggable is moved over a new container
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const originContainer = active.data.current.sortable.containerId;

    // The actual droppable can be a container OR a sortable
    const newContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !originContainer ||
      !newContainer ||
      // don't need to do anything if moving within same container
      originContainer === newContainer
    ) {
      return;
    };

    setBoardSections((boardSection) => {
      const activeIndex = active.data.current.sortable.index;

      return {
        ...boardSection,
        // filter draggable out of origin container
        [originContainer]: [
          ...boardSection[originContainer].filter(
            (item) => item.id !== active.id
          ),
        ],

        // add draggable to new container
        [newContainer]: [
          ...boardSection[newContainer],
          boardSections[originContainer][activeIndex],
        ],
      };
    });
  };

  // reorder within container when draggable is dropped
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || !over.data.current) {
      return;
    };

    const activeIndex = active.data.current.sortable.index;
    const overIndex = over.data.current.sortable.index;
    
    if (activeIndex !== overIndex) {
      const container = over.data.current.sortable.containerId;

      setBoardSections((boardSection) => ({
        ...boardSection,
        [container]: arrayMove(
          boardSection[container],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

  return (
    <div>
      <div className={`grid grid-cols-4 place-items-center ml-16 mb-1`}>
        {STEPS.map((step) => (<span key={step} className="font-medium text-lg">{step}</span>))}
      </div>

        <div className="flex">
          <div className={`grid grid-rows-4 place-items-center mr-2`}>
              {STAGES.map((stage) => (<span key={stage} className="w-14 text-right break-words font-medium text-lg">{stage}</span>))}
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >    
            <div className={`flex-grow grid grid-rows-4 grid-cols-4 border shadow-md bg-gray-50 rounded-md`}>
              {Object.keys(boardSections).map((boardSectionKey) => (
                <div className="border" key={boardSectionKey}>
                  <BoardSection
                    id={boardSectionKey}
                    tasks={boardSections[boardSectionKey]}
                  />
                </div>
              ))}

              <DragOverlay dropAnimation={dropAnimation}>
                {task ? <TaskItem task={task} /> : null}
              </DragOverlay>
            </div>
          </DndContext>
      </div>
    </div>
  );
};

export default BoardSectionList;
