export interface Todo {
  activities_no: string;
  userId: string;
  subject: string;
  description: string;
  status: 'Unmarked' | 'Done' | 'Canceled';
}

export const todos: Todo[] = [];

let activityCount = 1;

export const generateActivityNo = () =>
  `AC-${String(activityCount++).padStart(4, '0')}`;
