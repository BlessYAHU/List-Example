import { useState } from "react";
import {
  useEditItemStream,
  useRemoveItemStream,
  useUpdateItemStream,
  useCompleteItemStream
} from "../../hooks";

import { executeOnEnter } from "./utils";

export function ListItem({
  isCompleted = false,
  itemContent,
  index
}: 
{
  isCompleted: boolean;
  itemContent: string;
  index: number;
}) {
  const [setRemoveData] = useRemoveItemStream();
  const [setEditData] = useEditItemStream();
  const [setUpdateData] = useUpdateItemStream();
  const [setCompleteData] = useCompleteItemStream();

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
    setIsEditMode(false);
  };

  const editItem = () => {
    handleEdit();
    setIsEditMode(true);
    setUpdatedItemContent(itemContent);
  };

  const editOnDblClick = (evt: React.MouseEvent) => {
    if(evt.detail === 2) {
      editItem();
    }
  }

  const completeItem = () => {
    setCompleteData({targetIndex: index});
  };

  return (
    <>
      {isEditMode ? (
        <li key={index}>
          <input
            type="search"
            value={updatedItemContent}
            onChange={(evt) => setUpdatedItemContent(evt.target.value)}
            onKeyDown={ executeOnEnter(updateItem) }
          />
          <button onClick={updateItem}>Update</button>
          <button onClick={() => setIsEditMode(false)}>Cancel</button>
        </li>
      ) : (
        <li key={index}>
          <input type="checkbox" checked={isCompleted} onChange={completeItem} /><span onClick={editOnDblClick}>{itemContent}</span>  <button onClick={editItem}>Edit</button>
          <button onClick={handleRemove}>X</button>
        </li>
      )}
    </>
  );
}
