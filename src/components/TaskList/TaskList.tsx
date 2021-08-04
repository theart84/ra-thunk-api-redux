// Core
import React from 'react';
import {useSelector} from "react-redux";

// Interfaces
import {ITask} from "../../bus/tasks/interface";

// Types
import {RootState} from "../../store";

// Components
import EmptyTasks from "./EmptyTasks/EmptyTasks";
import TaskListItem from "./TaskListItem/TaskListItem";

const TaskList: React.FC = () => {
  const tasks = useSelector((store: RootState) => store.tasks.tasks);
  if (!tasks.length) {
    return (
      <EmptyTasks/>
    )
  }
  const taskList = tasks.map((task: ITask) => <TaskListItem key={task.id} id={task.id} text={task.text} price={task.price}/>);

  return (
    <>
    {taskList}
    </>
  );
}

export default TaskList;
