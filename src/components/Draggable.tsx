import { useDraggable } from "@dnd-kit/core";
import React from 'react'
import { CSS } from '@dnd-kit/utilities';
import { DraggableProps } from "@/types";

const Draggable = ({ note, squareSize, noteSize }: DraggableProps) => {
  const {
    attributes,
    isDragging,
    transform,
    setNodeRef,
    listeners,
  } = useDraggable({
    id: note._id,
  });

  return (
    <button
      ref={setNodeRef}
      className={`${note.color} p-2 shadow-lg`}
      style={{
        position: "absolute",
        left: `${note.position.x}px`,
        top: `${note.position.y}px`,
        transform: CSS.Translate.toString(transform),
        boxShadow: isDragging
          ? '-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 5px 15px 0 rgba(34, 33, 81, 0.25)'
          : undefined,
        width: squareSize * noteSize,
        height: squareSize * noteSize,
      }}
      {...attributes}
      {...listeners}
    >
      {note.content}

      <br />

      <span className="break-words">
      {note.categories.join(',')}
      </span>

      <br />

      {note.rank ? <span>{note.rank}</span> : null}
    </button>
  );
}

export default Draggable