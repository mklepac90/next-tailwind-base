import { Task } from '@/types';

type TaskItemProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div className={`p-4 shadow-sm rounded-md bg-white`}>
      {task.title}
    </div>
  );
};

export default TaskItem;