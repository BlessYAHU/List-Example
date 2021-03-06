export type UpdateItemMessage = {
  index: number;
  updatedContent: string;
};

export type RemoveItemMessage = {
  index: number;
  removeContent: string;
};

export type AddItemMessage = {
  itemContent: string;
};

export type EditItemMessage = {
  index: number;
  currentContent: string;
};

export enum UndoType {
  EDIT = "EDIT",
  ADD = "ADD",
  REMOVE = "REMOVE"
}
export type UndoItemMeessage = {
  UndoAction: UndoType;
  previousIndex: number;
  previousContent: string;
};
