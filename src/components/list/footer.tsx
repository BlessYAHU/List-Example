import { useState } from "react";
import {
  useRemoveItemStream,
  useUpdateItemStream,
  useUndoItemStream,
  useAddItemStream,
  useShowItemStream,
  useRemoveCompltedItemStream
} from "../../hooks";

import { UndoType } from "../../types";

export function Footer({
  itemCount,
  completedItemCount,
  itemText = ""
}: 
{
  itemCount: number;
  completedItemCount: number;
  itemText: string;
}) {
  const [showUndoPrompt, setShowUndoPrompt] = useState(false);
  const [undoType, setUndoType] = useState('');
  const [showActive, setShowActive] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);

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

  const [setShowItem] = useShowItemStream(x => {
    if(x.type === 'Active') setShowActive(x.shouldShow);
    if(x.type === 'Completed') setShowCompleted(x.shouldShow);
    if(x.type === 'All') {
      setShowActive(x.shouldShow);
      setShowCompleted(x.shouldShow);
    }
  });
  
  const toggleActive = (type: 'Active' | 'Completed' | 'All') => () => {
    if(type === 'All')  setShowItem({type: 'All', shouldShow: true});
    if(type === 'Active') setShowItem({type: type, shouldShow: !showActive})
    if(type === 'Completed') setShowItem({type: type, shouldShow: !showCompleted})
  }

  const [clearAllCompleted] = useRemoveCompltedItemStream();

  return (
    <>
      <div>
        <a href="#" onClick={toggleActive('All')}>All </a><span> | </span> 
        <a href="#" onClick={toggleActive('Active')}>Active: {itemCount} </a> <span> | </span> 
        <a href="#" onClick={toggleActive('Completed')}> Completed: {completedItemCount}</a>
        <a href="#" onClick={() =>clearAllCompleted({itemType: 'Completed'})}> Clear completed</a>

      </div>
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
