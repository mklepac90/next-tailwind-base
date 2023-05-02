import React, { useState } from 'react';
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
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
  const initialBoardSections = initializeBoard(STAGES, STEPS, INITIAL_TASKS);
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

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
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
    <div className="max-w-screen-xl mx-auto my-10">
      <div className={`grid grid-cols-${STEPS.length} place-items-center ml-16 mb-1`}>
        {STEPS.map((step) => (<span className="font-medium text-lg">{step}</span>))}
      </div>

        <div className="flex">
          <div className={`grid grid-rows-${STAGES.length} place-items-center mr-2`}>
              {STAGES.map((stage) => (<span className="w-14 text-right break-words font-medium text-lg">{stage}</span>))}
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >    
            <div className={`flex-grow grid grid-rows-${STAGES.length} grid-cols-${STEPS.length} shadow-md bg-gray-100 rounded-md`}>
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
