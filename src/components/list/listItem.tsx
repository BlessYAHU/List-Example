import { useState } from "react";
import {
  useEditItemStream,
  useRemoveItemStream,
  useUndoItemStream,
  useUpdateItemStream
} from "../../hooks";

export function ListItem({
  itemContent,
  index
}: 
{
  itemContent: string;
  index: number;
  //onUpdateItem: (index: number, updatedItemContent: string) => () => void;
}) {
  const [setRemoveData] = useRemoveItemStream();
  const [setEditData] = useEditItemStream();
  const [setUpdateData] = useUpdateItemStream();

  const [updatedItemContent, setUpdatedItemContent] = useState(itemContent);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleRemove = () => {
    console.log("removing..." + index);
    setRemoveData({ index: index, removeContent: itemContent });
  };
  const handleEdit = () =>
    setEditData({ index: index, currentContent: itemContent });

  const updateItem = () => {
    setUpdateData({ index: index, updatedContent: updatedItemContent });
    //onUpdateItem(index, updatedItemContent)();
    setIsEditMode(false);
  };

  const editItem = () => {
    handleEdit();
    setIsEditMode(true);
    setUpdatedItemContent(itemContent);
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
