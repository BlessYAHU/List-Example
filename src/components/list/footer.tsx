import { useState } from "react";
import {
  useRemoveItemStream,
  useEditItemStream,
  useUndoItemStream
} from "../../hooks";
import { useAddItemStream } from "../../hooks/useAddItemStream";
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
  const [addItem, setAddItem] = useState("");

  const handleCancel = () => {
    setShowUndoPrompt(false);
    setShowAddUndoPrompt(false);
  };

  const [setUndoItem] = useUndoItemStream((x) => {
    console.log(x);
  });

  const handleUndo = () => {
    setShowUndoPrompt(false);
    setUndoItem({
      UndoAction: UndoType.REMOVE,
      previousContent: "",
      previousIndex: 0
    });
    //onUndo();
  };

  useEditItemStream((x) => {
    handleCancel();
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
    </>
  );
}
