interface ListItemCollection {
  addItem: (item: string) => void;
  getItems: () => string[];
  removeItem: (itemIndexToRemove: number) => void;
  undoRemoveLastItem: () => void;
}

interface removeItemResults {
  undoList: string[];
  newList: string[];
}

const ListItems = (initialItems: string[] = []): ListItemCollection => {
  let items: string[] = initialItems;
  let previousItems: string[] = [];
  console.log("ran constructor? ${items}", items);

  return {
    addItem: (item: string) => {
      console.log("adding to ${items}", items);
      items = items.concat([item]);
    },
    getItems: (): string[] => {
      console.log(items);
      return items;
    },
    removeItem: (itemIndexToRemove: number) => {
      previousItems = [...items];
      items = items.filter((x, index) => index !== itemIndexToRemove);

      //return newList };
    },
    undoRemoveLastItem: () => {
      items = previousItems;
    }
  };
};

export { ListItems, ListItemCollection };
