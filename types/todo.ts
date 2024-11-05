export interface ITodoPayload {
  subject: string;
  description: string;
  userId?: string;
  activities_no?: string;
}

export interface IMarkPayload {
  activities_no: string;
  status: string;
}

export interface ITodo {
  activities_no: string;
  userId: string;
  subject: string;
  description: string;
  status: string;
}
