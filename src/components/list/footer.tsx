import { useState } from "react";
import {
  useRemoveItemStream,
  useUpdateItemStream,
  useUndoItemStream,
  useAddItemStream
} from "../../hooks";

import { UndoType } from "../../types";

export function Footer({
  itemCount,
  removedItem = ""
}: //onUndo
{
  itemCount: number;
  removedItem: string;
  // onUndo: () => void;
}) {
  const [showUndoPrompt, setShowUndoPrompt] = useState(false);
  const [showAddUndoPrompt, setShowAddUndoPrompt] = useState(false);
  const [showEditUndoPrompt, setShowEditUndoPrompt] = useState(false);
  const [editItem, setEditItem] = useState("");
  const [addItem, setAddItem] = useState("");

  const handleCancel = () => {
    setShowUndoPrompt(false);
    setShowAddUndoPrompt(false);
    setShowEditUndoPrompt(false);
  };

  const [setUndoItem] = useUndoItemStream((x) => {
    console.log(x);
  });

  const handleUndo = () => {
    setShowUndoPrompt(false);
    setShowAddUndoPrompt(false);
    setUndoItem({
      UndoAction: UndoType.REMOVE,
      previousContent: "",
      previousIndex: 0
    });
    //onUndo();
  };

  useUdateItemStream((x) => {
    setEditItem(x.currentContent);
    setShowEditUndoPrompt(true);
    // handleCancel();
  });

  useRemoveItemStream((x) => {
    setShowUndoPrompt(true);
    console.log("removing " + JSON.stringify(x));
  });

  useAddItemStream((x) => {
    setAddItem(x.itemContent);
    setShowAddUndoPrompt(true);
  });

  return (
    <>
      <div>Items: {itemCount} </div>
      {showUndoPrompt ? (
        <div>
          Just removed {removedItem} Undo?{" "}
          <a onClick={handleUndo} href="#">
            Yes
          </a>{" "}
          <a onClick={handleCancel} href="#">
            No
          </a>
        </div>
      ) : (
        ""
      )}
      {showAddUndoPrompt ? (
        <div>
          Just Added {addItem} Undo?{" "}
          <a onClick={handleUndo} href="#">
            Yes
          </a>{" "}
          <a onClick={handleCancel} href="#">
            No
          </a>
        </div>
      ) : (
        ""
      )}
      {showEditUndoPrompt ? (
        <div>
          Just Edited {editItem} Undo?{" "}
          <a onClick={handleUndo} href="#">
            Yes
          </a>{" "}
          <a onClick={handleCancel} href="#">
            No
          </a>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
