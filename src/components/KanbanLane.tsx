// KanbanLane.tsx
import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";
import { Card } from "@/pages/board";

interface KanbanLaneProps {
  title: string;
  items: Card[];
};

export default function KanbanLane({ title, items }: KanbanLaneProps) {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div className="flex-1 flex-col p-5">
      {title}
      <div
        ref={setNodeRef}
        className="flex-col space-y-2 p-2 shadow-sm bg-gray-200 rounded-md min-h-[20rem]"
      >
        {items.map(({ title: cardTitle }, key) => (
          <KanbanCard title={cardTitle} key={key} index={key} parent={title} />
        ))}
      </div>
    </div>
  );
}