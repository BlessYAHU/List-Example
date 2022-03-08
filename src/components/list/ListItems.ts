interface ListItemCollection {
  addItem: (item: string) => void;
  getItems: () => string[];
  removeItem: (itemIndexToRemove: number) => removeItemResults;
}

interface removeItemResults {
  undoList: string[];
  newList: string[];
}

const ListItems = (initialItems: string[] = []): ListItemCollection => {
  let items: string[] = initialItems;
  console.log('ran constructor? ${items}', items);
  
  return {
    addItem: (item: string) => {
      console.log('adding to ${items}',items)
      items = items.concat([item]);
    },
    getItems: (): string[] => {
      console.log(items); 
      return items
    },
    removeItem: (itemIndexToRemove: number): removeItemResults => {
      const undoList = [...items];
      const newList = items.filter((x, index) => index !== itemIndexToRemove);
      items = newList;
      return { undoList, newList };
    }
  };
};

export { ListItems, ListItemCollection };
