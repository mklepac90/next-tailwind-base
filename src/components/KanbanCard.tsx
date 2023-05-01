// KanbanCard.tsx
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type KanbanCardProps = {
  title: string,
  index: number,
  parent: string,
};

const KanbanCard = ({
  title,
  index,
  parent,
}: KanbanCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
      title,
      index,
      parent,
    },
  });

  return (
    <div
    ref={setNodeRef}
    className={`p-4 shadow-md rounded-md bg-white`}
    style={{
      transform: CSS.Translate.toString(transform),
    }}
    {...attributes}
    {...listeners}
    >
      {title}
    </div>
  );
};

export default KanbanCard