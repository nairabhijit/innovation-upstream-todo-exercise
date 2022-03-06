export interface Task {
  id: number;
  title: string;
  description?: string;
  expiresOn: string;
  reminderDaysInAdvance: number;
  reminderDaysInterval: number;
}
