import { useDraggable } from "@dnd-kit/core";
import React from 'react'
import { CSS } from '@dnd-kit/utilities';

type DraggableProps = {
  id: string,
  content: string,
  color: string,
  gridSize: number
  pos: {
    x: number,
    y: number,
  }
}

const Draggable = ({ id, content, color, pos, gridSize }: DraggableProps) => {
  const {
    attributes,
    isDragging,
    transform,
    setNodeRef,
    listeners,
  } = useDraggable({
    id,
  });

  return (
    <button
      ref={setNodeRef}
      className={`${color} border-solid border-2 border-black`}
      style={{
        position: "relative",
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: CSS.Translate.toString(transform),
        boxShadow: isDragging
          ? '-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)'
          : undefined,
        width: gridSize * 6,
        height: gridSize * 6,
      }}
      {...attributes}
      {...listeners}
    >
      {content}
    </button>
  );
}

export default Draggable