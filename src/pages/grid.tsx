import Draggable from "@/components/Draggable";
import Droppable from "@/components/Droppable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { createSnapModifier, restrictToParentElement } from '@dnd-kit/modifiers';

const DROP_ID = 'grid';
const GRID_DIMENSIONS = 800; // grid h & w 
const QUADRANTS = {one: 'one', two: 'two', three: 'three', four: 'four'};
const GRID_SQUARE_SIZE = 20; // size of each square within a grid
const NOTE_SIZE = 6; // how many squares is note h & w

export type Note = {
  _id: string,
  content: string,
  categories: string[],
  color: string,
  rank: number | undefined,
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
    rank: 6,
    position: {
      x: 0,
      y: 0
    }
  },
  {
    _id: "2",
    content: "Bottom Right",
    categories: ['four'],
    color: 'bg-yellow-200',
    rank: 1,
    position: {
      x: GRID_DIMENSIONS - (GRID_SQUARE_SIZE * NOTE_SIZE),
      y: GRID_DIMENSIONS - (GRID_SQUARE_SIZE * NOTE_SIZE),
    }
  },
  {
    _id: "3",
    content: "Midpoint",
    categories: ['one', 'two', 'three', 'four'],
    color: 'bg-yellow-200',
    rank: 4,
    position: {
      x: (GRID_DIMENSIONS - (GRID_SQUARE_SIZE * NOTE_SIZE)) / 2,
      y: (GRID_DIMENSIONS - (GRID_SQUARE_SIZE * NOTE_SIZE)) / 2,
    }
  }
];

const categorizeNote = (note: Note) => {
  const categories: string[] = [];
  const axes = GRID_DIMENSIONS / 2;
  const {x, y} = note.position;
  const offset = GRID_SQUARE_SIZE * NOTE_SIZE;

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

const rankNote = (note: Note) => {
  const {x, y} = note.position;
  const zones = [1, 2, 3, 4, 5, 6];
  const zoneSize = GRID_DIMENSIONS / zones.length;
  let rank;

  for (const zone of zones) {
    if (x >= (GRID_DIMENSIONS - (zone * zoneSize)) && y >= (GRID_DIMENSIONS - (zone * zoneSize))) {
      rank = zone;
      break;
    }  
  }

  return rank;
};

export default function Grid() {
  const [notes, setNotes] = useState(notesData);

  function handleDragEnd(event: DragEndEvent) {
    const {x, y} = event.delta;

    const note: Note = notes.find((n) => n._id === event.active.id)!;

    note.position.x += x;
    note.position.y += y;
    note.categories = categorizeNote(note);
    note.rank = rankNote(note);

    const notesPositioned = notes.map((n) => {
      if (n._id === note._id) return note;
      return n;
    });

    setNotes(notesPositioned);
  }

  const snapToGrid = useMemo(() => createSnapModifier(GRID_SQUARE_SIZE), [GRID_SQUARE_SIZE]);

  return (
    <div className="mx-auto my-10 shadow-lg" style={{
      position: "relative",
      height: `${GRID_DIMENSIONS + 1}px`,
      width: `${GRID_DIMENSIONS + 1}px`,
      background: 
      `linear-gradient(#DCDCDC, #DCDCDC) no-repeat center/2px 100%, linear-gradient(#DCDCDC, #DCDCDC) no-repeat center/100% 2px`
    
    }}>
    <DndContext onDragEnd={handleDragEnd} modifiers={[snapToGrid, restrictToParentElement]}>
      <Droppable id={DROP_ID} gridSize={GRID_SQUARE_SIZE}>
        {
          notes.map((note) => (
            <Draggable key={note._id} note={note} squareSize={GRID_SQUARE_SIZE} noteSize={NOTE_SIZE}  />
          ))
        }
      </Droppable>
    </DndContext>
  </div>
  );
}