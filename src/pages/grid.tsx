import Draggable from "@/components/Draggable";
import Droppable from "@/components/Droppable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { createSnapModifier, restrictToParentElement } from '@dnd-kit/modifiers';

const DROP_ID = 'grid';
const GRID_SIZE = 30;

type Note = {
  _id: string,
  content: string,
  color: string,
  position: {
    x: number,
    y: number
  }
};

const notesData: Note[] = [
  {
    _id: "1",
    content: "Yesh",
    color: 'bg-yellow-200',
    position: {
      x: 0,
      y: 0
    }
  },
  {
    _id: "2",
    content: "Michael",
    color: 'bg-blue-200',
    position: {
      x: 1560,
      y: 720
    }
  }
];

export default function Grid() {
  const [notes, setNotes] = useState(notesData);

  function handleDragEnd(event: DragEndEvent) {
    const {x, y} = event.delta;

    const note: Note = notes.find((n) => n._id === event.active.id)!;

    note.position.x += x;
    note.position.y += y;

    const notesPositioned = notes.map((n) => {
      if (n._id === note._id) return note;
      return n;
    });

    setNotes(notesPositioned);
  }

  const snapToGrid = useMemo(() => createSnapModifier(GRID_SIZE), [GRID_SIZE]);

  return (
    <div className="flex flex-col h-full">
    <DndContext onDragEnd={handleDragEnd} modifiers={[snapToGrid, restrictToParentElement]}>
      <Droppable id={DROP_ID} gridSize={GRID_SIZE}>
        {
          notes.map((note) => (
            <Draggable key={note._id} id={note._id} gridSize={GRID_SIZE} content={note.content} color={note.color} pos={note.position} />
          ))
        }
      </Droppable>
    </DndContext>
    </div>
  );
}