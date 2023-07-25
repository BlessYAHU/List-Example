export interface ListItemCollection {
  addItem: (item: string) => void;
  getItems: () => string[];
  getCompletedItems: () => string[];
  removeItem: (itemIndexToRemove: number) => void;
  undoRemoveLastItem: () => void;
  updateItem: (indexItemToUpdate: number, updatedContent: string) => void;
  undoAddItem: () => void;
  undoUpdateItem: () => void;
  completeItem: (itemIndexToRemove: number) => void;
  undoCompleteItem: () => void;
}

const ListItems = (initialItems: string[] = []): ListItemCollection => {
  let activeItems: string[] = initialItems;
  let previousActiveItems: string[] = [];
  let completedItems: string[] = [];
  let previousCompletedItems: string[] = [];

  console.log("ran constructor? ${items}", activeItems);

  return {

    completeItem: (itemIndexToRemove: number) => {
      const itemToComplete = activeItems.find((x, index) => index === itemIndexToRemove) || '';
      if(itemToComplete === '') return;
      activeItems = activeItems.filter((x, index) => index !== itemIndexToRemove);
      completedItems = [...completedItems, itemToComplete];
    },

    undoCompleteItem: () => {
      activeItems = previousActiveItems;
    },

    addItem: (item: string) => {
      previousActiveItems = [...activeItems];
      activeItems = activeItems.concat([item]);
    },
    getItems: (): string[] => {
      console.log(activeItems);
      return activeItems;
      // return [...activeItems, ...completedItems];
    },
    getCompletedItems: (): string[] => {
      console.log(completedItems);
      return completedItems;
    },
    removeItem: (itemIndexToRemove: number) => {
      previousActiveItems = [...activeItems];
      activeItems = activeItems.filter((x, index) => index !== itemIndexToRemove);
    },
    undoRemoveLastItem: () => {
      activeItems = previousActiveItems;
    },
    undoAddItem: () => {
      activeItems = previousActiveItems;
    },
    undoUpdateItem: () => {
      activeItems = previousActiveItems;
    },
    updateItem: (indexItemToUpdate: number, updatedContent: string) => {
      previousActiveItems = [...activeItems];
      activeItems = activeItems.map(
        (item: string, index: number) =>
          (item = index === indexItemToUpdate ? updatedContent : item)
      );
    }
  };
};

export { ListItems };