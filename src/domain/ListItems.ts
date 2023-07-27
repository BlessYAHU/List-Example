export interface ListItemCollection {
  addItem: (item: string) => void;
  getItems: () => string[];
  getCompletedItems: () => string[];
  removeItem: (itemIndexToRemove: number) => void;
  undoRemoveLastItem: () => void;
  updateItem: (indexItemToUpdate: number, updatedContent: string) => void;
  undoAddItem: () => void;
  undoUpdateItem: () => void;
  completeItem: (itemIndex: number) => void;
  undoCompleteItem: (completeItemIndex: number) => void;
  removeCompletedItems: () => void;
}

const ListItems = (initialItems: string[] = []): ListItemCollection => {
  let activeItems: string[] = initialItems;
  let previousActiveItems: string[] = [];
  let completedItems: string[] = [];
  let previousCompletedItems: string[] = [];

  console.log("ran constructor? ${items}", activeItems);

  const removeActiveItem= (itemIndexToRemove: number) => {
    previousActiveItems = [...activeItems];
    activeItems = activeItems.filter((x, index) => index !== itemIndexToRemove);
  };

  const removeCompletedItem= (itemIndexToRemove: number) => {
    previousCompletedItems = [...completedItems];
    completedItems = completedItems.filter((x, index) => index !== itemIndexToRemove);

  }

  return {

    completeItem: (itemIndex: number) => {
      const itemToComplete = activeItems.find((x, index) => index === itemIndex) || '';
      if(itemToComplete === '') return;
      activeItems = activeItems.filter((x, index) => index !== itemIndex);
      completedItems = [itemToComplete, ...completedItems];
    },

    undoCompleteItem: (completeItemIndex: number) => {
      const itemToMakeActive = completedItems.find((x, index) => index === completeItemIndex) || '';
      if(itemToMakeActive === '') return;
      activeItems = [itemToMakeActive, ...activeItems];
      completedItems = completedItems.filter((x, index) => index !== completeItemIndex);
    },

    addItem: (item: string) => {
      previousActiveItems = [...activeItems];
      activeItems = activeItems.concat([item]);
    },
    getItems: (): string[] => {
      console.log(activeItems);
      return activeItems;
    },
    getCompletedItems: (): string[] => {
      console.log(completedItems);
      return completedItems;
    },
    removeItem: (itemIndexToRemove: number) => {
      previousActiveItems = [...activeItems];
      activeItems = activeItems.filter((x, index) => index !== itemIndexToRemove);
    },
    removeCompletedItems: () => {
        previousCompletedItems = [...completedItems];
        completedItems = [];
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