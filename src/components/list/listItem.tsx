import { useState } from "react";

export function ListItem({
  itemContent,
  index,
  onRemoveItem,
  onUpdateItem
}: {
  itemContent: string;
  index: number;
  onRemoveItem: (index: number) => () => void;
  onUpdateItem: (index: number, updatedItemContent: string) => () => void;
}) {
  const [updatedItemContent, setUpdatedItemContent] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const updateItem = () => {
    onUpdateItem(index, updatedItemContent)();
    setIsEditMode(false);
  };
  return (
    <>
      {isEditMode ? (
        <li key={index}>
          <input
            type="search"
            value={itemContent}
            onChange={(evt) => setUpdatedItemContent(evt.target.value)}
          />{" "}
          <button onClick={updateItem}>Update</button>
          <button onClick={() => setIsEditMode(false)}>Cancel</button>
        </li>
      ) : (
        <li key={index}>
          {itemContent}{" "}
          <button onClick={() => setIsEditMode(true)}>Edit</button>
          <button onClick={onRemoveItem(index)}>X</button>
        </li>
      )}
    </>
  );
}
