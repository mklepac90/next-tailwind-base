import { useDroppable } from '@dnd-kit/core'

type DroppableProps = {
  id: string,
  gridSize: number,
  children: React.ReactNode
}

const Droppable = ({id, gridSize, children}: DroppableProps) => {
  const {setNodeRef} = useDroppable({id});

  return (
    <div
    ref={setNodeRef}
    className="bg-black w-full h-full"
    style={{
      backgroundSize: `${gridSize}px ${gridSize}px`,
      backgroundImage: "linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)"
    }}
    >
      {children}
    </div>
  );
}

export default Droppable