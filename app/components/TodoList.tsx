import { ITask } from "@/types/task"
import Task from "./Task"

interface TodoListProps {
  tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto rounded-md">
        <table className="table">
            {/* head */}
            <thead className="bg-base-300 text-primary">
              <tr>
                  <th>Task</th>
                  <th>Actions </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => <Task key={task.id} task={task} />)}
            </tbody>
        </table>
    </div>
  )
}

export default TodoList