export enum ToDoPriority {
  Low = 2,
  Medium = 1,
  High = 0,
}

export const TO_DO_PRIORITY_LABEL: Record<ToDoPriority, string> = {
  [ToDoPriority.Low]: 'Low',
  [ToDoPriority.Medium]: 'Medium',
  [ToDoPriority.High]: 'High',
}

export enum ToDoStatus {
  ToDo = 0,
  InProgress = 1,
  Done = 2,
}

export const TO_DO_STATUS_LABEL: Record<ToDoStatus, string> = {
  [ToDoStatus.ToDo]: 'To Do',
  [ToDoStatus.InProgress]: 'In Progress',
  [ToDoStatus.Done]: 'Done',
}

export interface ToDo {
  id: string
  name: string
  priority: ToDoPriority
  status: ToDoStatus
  createdAt: Date
}
