import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ListItemCollection } from "./ListItems";
import { ListItem } from "./listItem";

const NONE = "";

export function List({
  listItemDomain
}: {
  listItemDomain: ListItemCollection;
}) {
  const [listItems, setListItems] = useState([""]);
  const [removedItem, setRemovedItem] = useState(NONE);

  useEffect(() => {
    setListItems(listItemDomain.getItems());
  }, []);

  const removeItem = (itemIndexToRemove: number) => () => {
    setRemovedItem(listItems[itemIndexToRemove]);
    listItemDomain.removeItem(itemIndexToRemove);
    setListItems(listItemDomain.getItems());
  };

  const updateItem = (index: number, updatedItemContent: string) => () => {
    listItemDomain.updateItem(index, updatedItemContent);
    setListItems(listItemDomain.getItems());
  };

  const addItem = (itemToAdd: string) => {
    listItemDomain.addItem(itemToAdd);
    setListItems(listItemDomain.getItems());
    setRemovedItem(NONE);
  };

  const cancelUndo = () => {
    setRemovedItem("");
  };

  const undoRemoval = () => {
    listItemDomain.undoRemoveLastItem();
    setListItems(listItemDomain.getItems());
    cancelUndo();
  };

  const itms = listItems.map((item, index) => (
    <ListItem
      onUpdateItem={updateItem}
      onRemoveItem={removeItem}
      index={index}
      itemContent={item}
      key={index}
      onEditItem={cancelUndo}
    />
    // <li key={index}>
    //   {item} <button onClick={editItem(index)}>Edit</button>
    //   <button onClick={removeItem(index)}>X</button>
    // </li>
  ));

  return (
    <>
      <Header handleAddItem={addItem} />

      <ul>{itms}</ul>
      <Footer
        itemCount={listItems.length}
        removedItem={removedItem}
        handleUndo={undoRemoval}
        handleCancelUndo={cancelUndo}
      />
    </>
  );
}
