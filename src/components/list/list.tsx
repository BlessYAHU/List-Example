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
  const isRemoveDataExists = (removeItem: RemoveItemMessage) =>
    typeof removeItem?.index !== "undefined" &&
    typeof removeItem?.removeContent !== "undefined";
  const isAddDataExists = (addItem: AddItemMessage) =>
    typeof addItem?.itemContent !== "undefined";
  const isEditDataExists = (x: EditItemMessage) =>
    typeof x?.index !== "undefined" && typeof x?.currentContent !== "undefined";

  const [addItemData] = useMessageStream<AddItemMessage>(isAddDataExists);
  const [removeData] = useMessageStream<RemoveItemMessage>(isRemoveDataExists);
  //   (x: RemoveItemMessage) =>
  //     typeof x?.index !== "undefined" && typeof x?.removeContent !== "undefined"
  // );
  const [editData] = useMessageStream<EditItemMessage>(isEditDataExists);
  const [listItems, setListItems] = useState([""]);
  const [removedItem, setRemovedItem] = useState(NONE);

  const cancelUndo = () => {
    setRemovedItem("");
  };

  useEffect(() => {
    setListItems(listItemDomain.getItems());
  }, []);

  useEffect(() => {
    if (isRemoveDataExists(removeData)) {
      console.log("removing " + JSON.stringify(removeData));
      setRemovedItem(listItems[removeData.index]);
      listItemDomain.removeItem(removeData.index);
      setListItems(listItemDomain.getItems());
    }
  }, [removeData]);

  useEffect(() => {
    if (isEditDataExists(editData)) {
      cancelUndo();
    }
  }, [editData]);

  useEffect(() => {
    if (isAddDataExists(addItemData)) {
      console.log("adding " + addItemData.itemContent);
      //listItemDomain.addItem(addItemData.itemContent);
      setListItems(listItemDomain.getItems());
      setRemovedItem(NONE);
    }
  }, [addItemData]);

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
      index={index}
      itemContent={item}
      key={index}
      //onEditItem={cancelUndo}
    />
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
