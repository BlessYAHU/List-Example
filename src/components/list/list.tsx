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
  const [previousList, setPreviousList] = useState([""]);
  const [removedItem, setRemovedItem] = useState(NONE);

  useEffect(() => {
    setListItems(listItemDomain.getItems());
  }, []);

  const removeItem = (itemIndexToRemove: number) => () => {
    const { undoList, newList } = listItemDomain.removeItem(itemIndexToRemove);
    setPreviousList(undoList);
    setRemovedItem(listItems[itemIndexToRemove]);
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
    setListItems(previousList);
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
