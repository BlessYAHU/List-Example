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
  itemText = ""
}: 
{
  itemCount: number;
  itemText: string;
}) {
  const [showUndoPrompt, setShowUndoPrompt] = useState(false);
  const [undoType, setUndoType] = useState('');

  const handleCancel = () => {
    setShowUndoPrompt(false);
  };

  const [setUndoItem] = useUndoItemStream((x) => {
    console.log(x);
  });

  const handleUndo = (undoType: UndoType) => () => {
    setShowUndoPrompt(false);
    setUndoItem({
      UndoAction: undoType,
      previousContent: "",
      previousIndex: 0
    });
  };

  useUpdateItemStream((x) => {
    setUndoType(UndoType[UndoType.EDIT])
    setShowUndoPrompt(true);
  });

  useRemoveItemStream((x) => {
    setUndoType(UndoType[UndoType.REMOVE])
    setShowUndoPrompt(true);
  });

  useAddItemStream((x) => {
    setUndoType(UndoType[UndoType.ADD])
    setShowUndoPrompt(true);
  });

  return (
    <>
      <div>Items: {itemCount} </div>
      {showUndoPrompt ? (
        <div>
          Just {undoType} {itemText} Undo?{" "}
          <a onClick={handleUndo(UndoType.REMOVE)} href="#">
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
