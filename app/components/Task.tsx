"use client"

import { ITask } from "@/types/task";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { v4 as uuidv4 } from 'uuid';

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler <HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh(); 
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();  
  }

  return (
    <tr key={task.id} className="bg-base-200">
        <td className="w-full">{task.text}</td>
        <td className="flex gap-5">
          {/* Edit Task Component */}
          <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={18} />
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
              <h3 className="font-bold text-lg">Edit task</h3>
              <div className="modal-action">
                <input 
                  value={taskToEdit}
                  onChange={e => setTaskToEdit(e.target.value)}
                  type="text" 
                  placeholder="Type here" 
                  className="input input-bordered w-full" 
                />
                <button type="submit" className="btn">Submit</button>
              </div>
            </form>
          </Modal>

          {/* Delete Task Component? */}
          <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={18} />
          <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
            <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
            <div className="modal-action">
              <button
                onClick={() => handleDeleteTask(task.id)}
              >
                Yes
              </button>
            </div>
          </Modal>
        </td>
    </tr>
  )
}

export default Task 