import { useEffect } from "react";
import { useMessageStream } from "./";
import { AddItemMessage } from "../types";

export const isAddDataExists = (addItem: AddItemMessage) =>
  typeof addItem?.itemContent !== "undefined";

export function useAddItemStream(
  func: (x: AddItemMessage) => void = (x) => {}
) {
  const [addItemData, setAddItemData] = useMessageStream<AddItemMessage>(
    isAddDataExists
  );

  useEffect(() => {
    if (isAddDataExists(addItemData)) {
      func(addItemData);
    }
  }, [addItemData]);

  return [setAddItemData];
}
