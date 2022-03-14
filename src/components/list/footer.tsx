import { useState } from "react";
import { useRemoveItemStream } from "../../hooks";

export function Footer({
  itemCount,
  removedItem = "",
  onUndo
}: {
  itemCount: number;
  removedItem: string;
  onUndo: () => void;
}) {
  const [showUndoPrompt, setShowUndoPrompt] = useState(false);

  const [removeData, setRemoveData] = useRemoveItemStream((x) => {
    setShowUndoPrompt(true);
    console.log("removing " + JSON.stringify(removeData));
  });

  const handleCancel = () => {
    console.log(removeData);
    setShowUndoPrompt(false);
  };

  const handleUndo = () => {
    setShowUndoPrompt(false);
    onUndo();
  };

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
