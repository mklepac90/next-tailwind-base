import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function Draggable2(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  
  return (
    <button ref={setNodeRef} className={`bg-blue-200 p-5 border-solid border-4 border-blue-500`} style={{transform: CSS.Translate.toString(transform), }} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}