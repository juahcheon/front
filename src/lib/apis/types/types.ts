export interface SmallCatItem {
  id: number;
  largeCatItemId: number;
  title: string;
  dueDate: string;
  assigneeName: string;
  statusName: string;
}

export interface LargeCatItem {
  id: number;
  checklistId: number;
  title: string;
  smallCatItems: SmallCatItem[];
}