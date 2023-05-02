import { BoardSections, Task } from '@/types';
import { getTasksByStatus } from './tasks';


export const initializeBoard = (stages:string[], steps:string[], tasks: Task[]) => {
  const sections = stages.flatMap((stage) => {
    return steps.map(step => {
      return `${stage}-${step}`
    });
  });

  const boardSections: BoardSections = {};

  sections.forEach((boardSectionKey) => {
    boardSections[boardSectionKey] = getTasksByStatus(
      tasks,
      boardSectionKey
    );
  });

  return boardSections;
};

export const findBoardSectionContainer = (
  boardSections: BoardSections,
  id: string
) => {
  // useSortable also creates a droppable... id can be a sortable or a section
  if (id in boardSections) {
    return id;
  };

  // if id belongs to a sortable
  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id)
  );

  return container;
};