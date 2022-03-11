import { useState } from "react";

export function ListItem({
  itemContent,
  index,
  onRemoveItem,
  onUpdateItem,
  onEditItem
}: {
  itemContent: string;
  index: number;
  onRemoveItem: (index: number) => () => void;
  onUpdateItem: (index: number, updatedItemContent: string) => () => void;
  onEditItem: () => void;
}) {
  const [updatedItemContent, setUpdatedItemContent] = useState(itemContent);
  const [isEditMode, setIsEditMode] = useState(false);
  const updateItem = () => {
    onUpdateItem(index, updatedItemContent)();
    setIsEditMode(false);
  };

  const editItem = () => {
    onEditItem();
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
          <button onClick={onRemoveItem(index)}>X</button>
        </li>
      )}
    </>
  );
}
