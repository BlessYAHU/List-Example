import { useState } from "react";
import { useMessageStream } from "../../hooks";
import { RemoveItemMessage, EditItemMessage } from "../../types";

export function ListItem({
  itemContent,
  index,
  //onRemoveItem,
  onUpdateItem
}: //onEditItem
{
  itemContent: string;
  index: number;
  //onRemoveItem: (index: number) => () => void;
  onUpdateItem: (index: number, updatedItemContent: string) => () => void;
  onEditItem: () => void;
}) {
  const [removeData, setRemoveData] = useMessageStream<RemoveItemMessage>(
    (x) => typeof x?.index !== "undefined"
  );
  const [editData, setEditData] = useMessageStream<EditItemMessage>(
    (x) =>
      typeof x?.index !== "undefined" &&
      typeof x?.currentContent !== "undefined"
  );
  const [updatedItemContent, setUpdatedItemContent] = useState(itemContent);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleRemove = () => {
    console.log("removing..." + index);
    setRemoveData({ index: index, removeContent: itemContent });
  };
  const handleEdit = () =>
    setEditData({ index: index, currentContent: itemContent });

  const updateItem = () => {
    onUpdateItem(index, updatedItemContent)();
    setIsEditMode(false);
  };

  const editItem = () => {
    handleEdit();
    setIsEditMode(true);
  };

  return (
    <>
      {isEditMode ? (
        <li key={index}>
          <input
            type="search"
            value={updatedItemContent}
            onChange={(evt) => setUpdatedItemContent(evt.target.value)}
          />{" "}
          <button onClick={updateItem}>Update</button>
          <button onClick={() => setIsEditMode(false)}>Cancel</button>
        </li>
      ) : (
        <li key={index}>
          {itemContent} <button onClick={editItem}>Edit</button>
          <button onClick={handleRemove}>X</button>
        </li>
      )}
    </>
  );
}
