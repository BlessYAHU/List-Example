import React, { useState, useEffect } from "react";
import { useMessageStream } from "../../hooks";
import { AddItemMessage } from "../../types";

export const isAddDataExists = (addItem: AddItemMessage) =>
  typeof addItem?.itemContent !== "undefined";

export function useTestingStream(func: (x: AddItemMessage) => void) {
  const [addItemData, setAddItemData] = useMessageStream<AddItemMessage>(
    isAddDataExists
  );

  useEffect(() => {
    if (isAddDataExists(addItemData)) {
      func(addItemData);
    }
  }, [addItemData]);

  return [addItemData, setAddItemData];
}
