import Draggable from "@/components/Draggable";
import Droppable from "@/components/Droppable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { createSnapModifier, restrictToParentElement } from '@dnd-kit/modifiers';

const DROP_ID = 'grid';
const GRID_DIMENSIONS = 800; // grid h & w 
const QUADRANTS = {one: 'one', two: 'two', three: 'three', four: 'four'};
const GRID_SIZE = 20; // size of each square within a grid
const NOTE_SIZE_MULTIPLIER = 6; // how many squares is note h & w

type Note = {
  _id: string,
  content: string,
  categories: string[],
  color: string,
  position: {
    x: number,
    y: number
  }
};

const notesData: Note[] = [
  {
    _id: "1",
    content: "Top Left",
    categories: ['one'],
    color: 'bg-yellow-200',
    position: {
      x: 0,
      y: 0
    }
  },
  {
    _id: "2",
    content: "Bottom Right",
    categories: ['four'],
    color: 'bg-blue-200',
    position: {
      x: GRID_DIMENSIONS - (GRID_SIZE * NOTE_SIZE_MULTIPLIER),
      y: GRID_DIMENSIONS - (GRID_SIZE * NOTE_SIZE_MULTIPLIER),
    }
  },
  {
    _id: "3",
    content: "Midpoint",
    categories: ['one', 'two', 'three', 'four'],
    color: 'bg-green-200',
    position: {
      x: (GRID_DIMENSIONS - (GRID_SIZE * NOTE_SIZE_MULTIPLIER)) / 2,
      y: (GRID_DIMENSIONS - (GRID_SIZE * NOTE_SIZE_MULTIPLIER)) / 2,
    }
  }
];

const categorizeNote = (note: Note) => {
  const categories: string[] = [];
  const axes = GRID_DIMENSIONS / 2;
  const {x, y} = note.position;
  const offset = GRID_SIZE * NOTE_SIZE_MULTIPLIER;

  const coords: [number, number][] = [[x, y], [x + offset , y], [x , y + offset], [x + offset, y + offset]];

  coords.forEach(coord => {
    if (coord[0] < axes && coord[1] < axes) {
      categories.push(QUADRANTS.one);
    };
  
    if (coord[0] > axes && coord[1] < axes) {
      categories.push(QUADRANTS.two);
    };
  
    if (coord[0] < axes && coord[1] > axes) {
      categories.push(QUADRANTS.three);
    };
  
    if (coord[0] > axes && coord[1] > axes) {
      categories.push(QUADRANTS.four);
    };
  })
 
  return [...new Set(categories)];
};

export default function Grid() {
  const [notes, setNotes] = useState(notesData);

  function handleDragEnd(event: DragEndEvent) {
    const {x, y} = event.delta;
    console.log(`x:${x}, y:${y}`);

    const note: Note = notes.find((n) => n._id === event.active.id)!;

    note.position.x += x;
    note.position.y += y;
    note.categories = categorizeNote(note);

    const notesPositioned = notes.map((n) => {
      if (n._id === note._id) return note;
      return n;
    });

    setNotes(notesPositioned);
  }

  const snapToGrid = useMemo(() => createSnapModifier(GRID_SIZE), [GRID_SIZE]);

  return (
    <div className="mx-auto mt-6" style={{
      position: "relative",
      height: `${GRID_DIMENSIONS}px`,
      width: `${GRID_DIMENSIONS}px`,
    }}>
    <DndContext onDragEnd={handleDragEnd} modifiers={[snapToGrid, restrictToParentElement]}>
      <Droppable id={DROP_ID} gridSize={GRID_SIZE}>
        {
          notes.map((note) => (
            <Draggable key={note._id} id={note._id} gridSize={GRID_SIZE} sizeMultiplier={NOTE_SIZE_MULTIPLIER} content={note.content} color={note.color} pos={note.position} categories={note.categories} />
          ))
        }
      </Droppable>
    </DndContext>
  </div>
  );
}