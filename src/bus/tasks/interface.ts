export interface ITask {
  id: string
  text: string;
  price: number
}

export interface IInitialStateTask {
  tasks: ITask[];
  currentEditTaskId: string
}
