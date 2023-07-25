import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ListItemCollection } from "../../domain/ListItems";
import { ListItem } from "./listItem";
import {
  useEditItemStream,
  useRemoveItemStream,
  useUndoItemStream,
  useAddItemStream,
  useUpdateItemStream,
  useCompleteItemStream
} from "../../hooks";
import { UndoType } from "../../types";

const NONE = '';

export function List({
  listItemDomain
}: {
  listItemDomain: ListItemCollection;
}) {
  const [listItems, setListItems] = useState(['']);
  const [completedListItems, setCompletedListItems] = useState(['']);
  const [targetItem, setTargetItem] = useState(NONE);

  const cancelUndo = () => {
    setTargetItem(NONE);
  };

  const setItems = () => {
    setListItems(listItemDomain.getItems());
    setCompletedListItems(listItemDomain.getCompletedItems());
  }

  useEditItemStream((x) => {
    cancelUndo();
  });

  useCompleteItemStream((x) => {
    console.log("completing " + JSON.stringify(x));
    listItemDomain.completeItem(x.targetIndex);
    // setListItems(listItemDomain.getItems());
    setItems();
  });

  useUpdateItemStream((x) => {
    listItemDomain.updateItem(x.index, x.updatedContent);
    setTargetItem(listItems[x.index]);
    // setListItems(listItemDomain.getItems());
    setItems();
  });

  useRemoveItemStream((x) => {
    console.log("removing " + JSON.stringify(x));
    setTargetItem(listItems[x.index]);
    listItemDomain.removeItem(x.index);
    // setListItems(listItemDomain.getItems());
    setItems();
  });

  useAddItemStream((x) => {
    console.log("adding useeffect " + x + JSON.stringify(x));
    cancelUndo();
    listItemDomain.addItem(x.itemContent);
    setTargetItem(x.itemContent);
    // setListItems(listItemDomain.getItems());
    setItems();
  });

  useEffect(() => {
    // setListItems(listItemDomain.getItems());
    setItems();
  }, []);

  useUndoItemStream((x) => {
    console.log(JSON.stringify(x));
    switch (x.UndoAction) {
      case UndoType.REMOVE:
        listItemDomain.undoRemoveLastItem();
        setListItems(listItemDomain.getItems());
        cancelUndo();
        break;
      case UndoType.ADD:
        listItemDomain.undoAddItem();
        setListItems(listItemDomain.getItems());
        cancelUndo();
        break;
      case UndoType.EDIT:
        listItemDomain.undoUpdateItem();
        setListItems(listItemDomain.getItems());
        cancelUndo();
        break;
    }
  });

  const itms = listItems.map((item, index) => (
    <ListItem
      index={index}
      itemContent={item}
      key={index}
      isCompleted={false}
    />
  ));

  const completedItems = completedListItems.map((item, index) => (
    <ListItem
      index={index}
      itemContent={item}
      key={index}
      isCompleted={true}
    />
  ));

  return (
    <>
      <Header />
      <ul>
        {itms}
        {completedItems}
      </ul>
      <Footer
        itemCount={listItems.length}
        itemText={targetItem}
      />
    </>
  );
}
