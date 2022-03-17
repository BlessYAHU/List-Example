import { useState } from "react";
import {
  useRemoveItemStream,
  useEditItemStream,
  useUndoItemStream
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

  const handleCancel = () => {
    setShowUndoPrompt(false);
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
    </>
  );
}
