import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ListItemCollection } from "./ListItems";
import { ListItem } from "./listItem";
import {
  useEditItemStream,
  useRemoveItemStream,
  useUndoItemStream,
  useAddItemStream,
  useUpdateItemStream
} from "../../hooks";
//import { RemoveItemMessage, EditItemMessage } from "../../types";
//import { useAddItemStream } from "../../hooks";
import { UndoType } from "../../types";

const NONE = "";

export function List({
  listItemDomain
}: {
  listItemDomain: ListItemCollection;
}) {
  const [listItems, setListItems] = useState([""]);
  const [removedItem, setRemovedItem] = useState(NONE);

  const cancelUndo = () => {
    setRemovedItem(NONE);
  };

  useEditItemStream((x) => {
    cancelUndo();
  });

  useUpdateItemStream((x) => {
    listItemDomain.updateItem(x.index, x.updatedContent);
    setListItems(listItemDomain.getItems());
  });
  useRemoveItemStream((x) => {
    console.log("removing " + JSON.stringify(x));
    setRemovedItem(listItems[x.index]);
    listItemDomain.removeItem(x.index);
    setListItems(listItemDomain.getItems());
  });

  useAddItemStream((x) => {
    console.log("adding useeffect " + x + JSON.stringify(x));
    cancelUndo();
    listItemDomain.addItem(x.itemContent);
    setListItems(listItemDomain.getItems());
  });

  useEffect(() => {
    setListItems(listItemDomain.getItems());
  }, []);

  const updateItem = (index: number, updatedItemContent: string) => () => {
    listItemDomain.updateItem(index, updatedItemContent);
    setListItems(listItemDomain.getItems());
  };

  const [setUndoItem] = useUndoItemStream((x) => {
    console.log(JSON.stringify(x));
    // const undoRemoval = () => {
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
    }
    // listItemDomain.undoRemoveLastItem();
    // setListItems(listItemDomain.getItems());
    // cancelUndo();
  });

  const itms = listItems.map((item, index) => (
    <ListItem
      onUpdateItem={updateItem}
      index={index}
      itemContent={item}
      key={index}
      //onEditItem={cancelUndo}
    />
  ));

  return (
    <>
      <Header />

      <ul>{itms}</ul>
      <Footer
        itemCount={listItems.length}
        removedItem={removedItem}
        //onUndo={undoRemoval}
      />
    </>
  );
}
