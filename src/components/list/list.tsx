import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ListItemCollection } from "./ListItems";
import { ListItem } from "./listItem";
import { useMessageStream } from "../../hooks";
import {
  AddItemMessage,
  RemoveItemMessage,
  EditItemMessage
} from "../../types";

const NONE = "";

export function List({
  listItemDomain
}: {
  listItemDomain: ListItemCollection;
}) {
  const [addItemData, setAddItemData] = useMessageStream<AddItemMessage>(
    (x) => typeof x?.itemContent !== "undefined"
  );
  const [removeData]: [RemoveItemMessage] = useMessageStream<RemoveItemMessage>(
    (x: RemoveItemMessage) =>
      typeof x?.index !== "undefined" && typeof x?.removeContent !== "undefined"
  );
  const [editData]: [EditItemMessage] = useMessageStream<EditItemMessage>(
    (x) =>
      typeof x?.index !== "undefined" &&
      typeof x?.currentContent !== "undefined"
  );
  const [listItems, setListItems] = useState([""]);
  const [removedItem, setRemovedItem] = useState(NONE);

  const cancelUndo = () => {
    setRemovedItem("");
  };

  useEffect(() => {
    setListItems(listItemDomain.getItems());
  }, []);

  useEffect(() => {
    setRemovedItem(listItems[removeData.index]);
    listItemDomain.removeItem(removeData.index);
    setListItems(listItemDomain.getItems());
  }, [removeData]);

  useEffect(() => {
    cancelUndo();
  }, [editData]);

  useEffect(() => {
    console.log("adding " + addItemData.itemContent);
    listItemDomain.addItem(addItemData.itemContent);
    setListItems(listItemDomain.getItems());
    setRemovedItem(NONE);
  }, [addItemData]);
  // const removeItem = (itemIndexToRemove: number) => () => {
  //   setRemovedItem(listItems[itemIndexToRemove]);
  //   listItemDomain.removeItem(itemIndexToRemove);
  //   setListItems(listItemDomain.getItems());
  // };

  const updateItem = (index: number, updatedItemContent: string) => () => {
    listItemDomain.updateItem(index, updatedItemContent);
    setListItems(listItemDomain.getItems());
  };

  const addItem = (itemToAdd: string) => {
    listItemDomain.addItem(itemToAdd);
    setListItems(listItemDomain.getItems());
    setRemovedItem(NONE);
  };

  const undoRemoval = () => {
    listItemDomain.undoRemoveLastItem();
    setListItems(listItemDomain.getItems());
    cancelUndo();
  };

  const itms = listItems.map((item, index) => (
    <ListItem
      onUpdateItem={updateItem}
      //onRemoveItem={removeItem}
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
