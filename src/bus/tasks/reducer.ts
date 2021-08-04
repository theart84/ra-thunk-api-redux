// Core
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {generate} from 'shortid';

// Interfaces
import {IInitialStateTask} from "./interface";

const initialState: IInitialStateTask = {
  tasks: [
    {
      id: generate(),
      text: 'Замена стекла',
      price: 10000
    },
    {
      id: generate(),
      text: 'Замена аккумулятора',
      price: 6500
    },
    {
      id: generate(),
      text: 'Замена динамика',
      price: 3000
    }
  ],
  currentEditTaskId: '',
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addNewTask(state, action: PayloadAction<{ text: string, price: number }>) {
      const {text, price} = action.payload;
      const newTask = {
        id: generate(),
        text,
        price
      };
      state.tasks.push(newTask);
    },
    editTask(state, action: PayloadAction<{ id: string, text: string, price: number }>) {
      const {id, text, price} = action.payload;
      const task = state.tasks.find(task => task.id === id);
      const editTask = {
        ...task,
        id,
        text,
        price
      }
      const newState = state.tasks.filter(task => task.id !== id);
      state.tasks = [...newState, editTask];
    },
    deleteTask(state, action: PayloadAction<{ id: string }>) {
      const {id} = action.payload;
      const newState = state.tasks.filter(task => task.id !== id);
      state.tasks = [...newState];
    },
    addCurrentTaskId(state, action: PayloadAction<{ id: string }>) {
      const {id} = action.payload;
      state.currentEditTaskId = id;
    },
    clearCurrentTaskId(state) {
      state.currentEditTaskId = '';
    }
  }
})

export const {
  addNewTask,
  editTask,
  deleteTask,
  clearCurrentTaskId,
  addCurrentTaskId
} = taskSlice.actions
export default taskSlice.reducer


