import { useDroppable } from '@dnd-kit/core'

type DroppableProps = {
  id: string,
  gridDimensions: number,
  squareSize: number,
  children: React.ReactNode
}

const Droppable = ({id, gridDimensions, squareSize, children}: DroppableProps) => {
  const {setNodeRef} = useDroppable({id});

  return (
    <div
    ref={setNodeRef}
    style={{
      height: `${gridDimensions}px`,
      width: `${gridDimensions}px`,
      backgroundSize: `${squareSize}px ${squareSize}px`,
      backgroundImage: "linear-gradient(to right, #DCDCDC 1px, transparent 1px), linear-gradient(to bottom, #DCDCDC 1px, transparent 1px)"
    }}
    >
      {children}
    </div>
  );
}

export default Droppable