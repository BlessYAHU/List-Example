import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ListItemCollection } from "./ListItems";

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
    <li key={index}>
      {item} <button onClick={removeItem(index)}>X</button>
    </li>
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
