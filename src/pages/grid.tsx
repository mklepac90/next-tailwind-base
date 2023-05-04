import Draggable from "@/components/Draggable";
import Droppable from "@/components/Droppable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { createSnapModifier, restrictToParentElement } from '@dnd-kit/modifiers';
import { GridQuadrants, Note } from "@/types";

const DROP_ID: string = 'grid';
const GRID_DIMENSIONS: number = 800; // grid h & w 
const QUADRANTS: GridQuadrants = {one: 'one', two: 'two', three: 'three', four: 'four'};
const GRID_SQUARE_SIZE: number = 20; // size of each square within a grid
const NOTE_SIZE: number = 6; // how many squares is note h & w

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

// assign a quadrant name/category to a dropped note
const categorizeNote = (note: Note): string[] => {
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

// assign a numerical ranking to a dropped note
const rankNote = (note: Note, noOfZones: number = 6): number => {
  const {x, y} = note.position;
  const sum = x + y;
  const buffer = ((GRID_DIMENSIONS * 2) * .1);
  const upperThreshold = (GRID_DIMENSIONS * 2) - (NOTE_SIZE * GRID_SQUARE_SIZE * 2) - buffer; // rank 1 cards go here
  const zoneSize = upperThreshold / noOfZones; // how big is each ranking zone

  // assign rank based on whatever zone a card is dropped in
  let rank;
  for (let i = 1, threshold = upperThreshold; i <= noOfZones + 1; i++, threshold -= zoneSize) {
    if (sum >= threshold) {
      rank = i;
      break;
    };
  }

  return rank;
};

export default function Grid() {
  const [notes, setNotes] = useState<Note[]>(notesData);

  // what happens when we drop a note
  function handleDragEnd(event: DragEndEvent) {
    const {x, y} = event.delta;

    // update values of note being handled
    const note: Note = notes.find((n) => n._id === event.active.id)!;

    note.position.x += x;
    note.position.y += y;
    note.categories = categorizeNote(note);
    note.rank = rankNote(note);

    // rebuild array of notes with updated note
    const notesPositioned = notes.map((n) => {
      if (n._id === note._id) return note;
      return n;
    });

    setNotes(notesPositioned);
  }

  const snapToGrid = useMemo(() => createSnapModifier(GRID_SQUARE_SIZE), [GRID_SQUARE_SIZE]);

  return (
    <div className="mx-auto my-10 shadow-lg" style={{
      borderRight: "1px solid #DCDCDC",
      borderBottom: "1px solid #DCDCDC",
      position: "relative",
      height: `${GRID_DIMENSIONS}px`,
      width: `${GRID_DIMENSIONS}px`,
      background: 
      `linear-gradient(#DCDCDC, #DCDCDC) no-repeat center/2px 100%, linear-gradient(#DCDCDC, #DCDCDC) no-repeat center/100% 2px`
    
    }}>
    <DndContext onDragEnd={handleDragEnd} modifiers={[snapToGrid, restrictToParentElement]}>
      <Droppable id={DROP_ID} gridDimensions={GRID_DIMENSIONS} squareSize={GRID_SQUARE_SIZE}>
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