export interface TodoItem {
  id: number;
  name: string;
  detail: string;
  status: "done" | "doing";
  reminderTime?: Date | null;
}
