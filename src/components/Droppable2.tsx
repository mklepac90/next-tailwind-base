import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable2(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  
  return (
    <div 
    ref={setNodeRef} 
    style={{
      color: isOver ? 'orange' : undefined,
    }} 
    className={`bg-green-200 px-10 py-20 border-solid border-4 border-green-500 mt-12`}
    >
      {props.children}
    </div>
  );
}