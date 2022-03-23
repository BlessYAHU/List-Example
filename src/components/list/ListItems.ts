interface ListItemCollection {
  addItem: (item: string) => void;
  getItems: () => string[];
  removeItem: (itemIndexToRemove: number) => void;
  undoRemoveLastItem: () => void;
  updateItem: (indexItemToUpdate: number, updatedContent: string) => void;
  undoAddItem: () => void;
  undoUpdateItem: () => void;
}

const ListItems = (initialItems: string[] = []): ListItemCollection => {
  let items: string[] = initialItems;
  let previousItems: string[] = [];
  console.log("ran constructor? ${items}", items);

  return {
    addItem: (item: string) => {
      previousItems = [...items];
      items = items.concat([item]);
    },
    getItems: (): string[] => {
      console.log(items);
      return items;
    },
    removeItem: (itemIndexToRemove: number) => {
      previousItems = [...items];
      items = items.filter((x, index) => index !== itemIndexToRemove);
    },
    undoRemoveLastItem: () => {
      items = previousItems;
    },
    undoAddItem: () => {
      items = previousItems;
    },
    undoUpdateItem: () => {
      items = previousItems;
    },
    updateItem: (indexItemToUpdate: number, updatedContent: string) => {
      previousItems = [...items];
      items = items.map(
        (item: string, index: number) =>
          (item = index === indexItemToUpdate ? updatedContent : item)
      );
    }
  };
};

export { ListItems, ListItemCollection };
