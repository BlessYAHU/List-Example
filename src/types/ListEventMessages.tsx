export type RemoveItemMessage = {
  index: number;
};

export type UpdateItemMessage = {
  index: number;
  updatedContent: string;
};

export type ItemMessage = {
  index: number;
  contentToEdit: string;
  updatedContent: string;
};

export type EditItemMessage = {
  index: number;
  currentContent: string;
};
