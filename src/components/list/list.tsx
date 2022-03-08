import React, { useState, useEffect } from "react";
//import { Content } from "./content";
import { Header } from "./header";
import { Footer } from "./footer";
//import { AddItem } from "./addItem";
import { ListItems, ListItemCollection } from "./ListItems";

const NONE = "";

export function List({ items }: { items: string[] }) {
  const [listItemDomain, setListItemDomain] = useState(ListItems());
  const [listItems, setListItems] = useState([""]);
  const [previousList, setPreviousList] = useState([""]);
  const [removedItem, setRemovedItem] = useState(NONE);

  useEffect(() => {
    setListItemDomain(ListItems(items));
    setListItems(listItemDomain.getItems());
  }, []);
  //const undoAvailable =
  const removeItem = (itemIndexToRemove: number) => () => {
    // console.log("you what?");
    const { undoList, newList } = listItemDomain.removeItem(itemIndexToRemove);
    // setPreviousList([...listItems]);
    setPreviousList(undoList);
    // const newItemArray = listItems.filter(
    //   (x, index) => index !== itemIndexToRemove
    // );
    // setListItems(newItemArray);
    setRemovedItem(listItems[itemIndexToRemove]);
    setListItems(listItemDomain.getItems());
    // setListItems(listItemDomain.getItems());
  };
  const addItem = (itemToAdd: string) => {
    listItemDomain.addItem(itemToAdd);
    setListItems(listItemDomain.getItems());
    //setListItems(listItems.concat([itemToAdd]));
    setRemovedItem(NONE);
  };

  const itms = listItems.map((item, index) => (
    <li key={index}>
      {item} <button onClick={removeItem(index)}>X</button>
    </li>
  ));

  const undoRemoval = () => {
    setListItems(previousList);
    cancelUndo();
  };

  const cancelUndo = () => {
    setRemovedItem("");
  };

  return (
    <>
      <Header handleAddItem={addItem} />
      {/* <AddItem addItemAction={addItem} /> */}
      <ul>
        {itms}
        {/* <Content items={listItems} removeItemAction={removeItem} /> */}
      </ul>
      <Footer
        itemCount={listItems.length}
        removedItem={removedItem}
        handleUndo={undoRemoval}
        handleCancelUndo={cancelUndo}
      />
    </>
  );
}
