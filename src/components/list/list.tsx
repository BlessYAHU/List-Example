import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ListItemCollection } from "./ListItems";
import { ListItem } from "./listItem";
import { useEditItemStream, useRemoveItemStream } from "../../hooks";
//import { RemoveItemMessage, EditItemMessage } from "../../types";
import { useAddItemStream } from "../../hooks";

const NONE = "";

export function List({
  listItemDomain
}: {
  listItemDomain: ListItemCollection;
}) {
  const [listItems, setListItems] = useState([""]);
  const [removedItem, setRemovedItem] = useState(NONE);

  const cancelUndo = () => {
    setRemovedItem("");
  };

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
    setRemovedItem(NONE);
  });

  useEffect(() => {
    setListItems(listItemDomain.getItems());
  }, []);

  const updateItem = (index: number, updatedItemContent: string) => () => {
    listItemDomain.updateItem(index, updatedItemContent);
    setListItems(listItemDomain.getItems());
  };

  const undoRemoval = () => {
    listItemDomain.undoRemoveLastItem();
    setListItems(listItemDomain.getItems());
    cancelUndo();
  };

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
        onUndo={undoRemoval}
      />
    </>
  );
}
