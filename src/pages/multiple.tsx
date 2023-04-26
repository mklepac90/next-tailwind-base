import React, {useState} from 'react';
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { Draggable2 } from "@/components/Draggable2";
import { Droppable2 } from "@/components/Droppable2";

export default function Multiple() {
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Draggable2 id="draggable">Drag me</Draggable2>
  );

  return (
    <div>
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        <Droppable2 key={id} id={id}>
          {parent === id ? draggableMarkup : 'Drop here'}
        </Droppable2>
      ))}
    </DndContext>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    const {over} = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
};