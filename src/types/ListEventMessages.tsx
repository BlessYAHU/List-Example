export type RemoveItemMessage = {
  index: number;
  removeContent: string;
};

export type UpdateItemMessage = {
  index: number;
  updatedContent: string;
};

export type AddItemMessage = {
  itemContent: string;
};

export type EditItemMessage = {
  index: number;
  currentContent: string;
};
