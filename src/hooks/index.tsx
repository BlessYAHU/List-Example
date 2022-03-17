import { useEffect } from "react";
import { useMessageStream } from "./";
import {
  AddItemMessage,
  EditItemMessage,
  RemoveItemMessage,
  UndoItemMeessage
} from "../types";

export function createUseItemMessageStream<T>(
  identifyMessageFun: (x: T) => boolean
) {
  return (func: (x: T) => void | null) => {
    const [itemMessage, setItemMessage] = useMessageStream<T>(
      identifyMessageFun
    );

    if (func !== null) {
      useEffect(() => {
        if (identifyMessageFun(itemMessage)) {
          func(itemMessage);
        }
      }, [itemMessage]);
    }

    return [setItemMessage];
  };
}

export const isAddItemMessage = (x: AddItemMessage) =>
  typeof x?.itemContent !== "undefined";

export const useAddItemStream = createUseItemMessageStream<AddItemMessage>(
  isAddItemMessage
);

export const isEditItemMessage = (x: EditItemMessage) =>
  typeof x?.index !== "undefined" && typeof x?.currentContent !== "undefined";

export const useEditItemStream = createUseItemMessageStream<EditItemMessage>(
  isEditItemMessage
);

export const isRemoveItemMessage = (x: RemoveItemMessage) =>
  typeof x?.index !== "undefined" && typeof x?.removeContent !== "undefined";
export const useRemoveItemStream = createUseItemMessageStream<
  RemoveItemMessage
>(isRemoveItemMessage);

export const isUndoItemMessage = (x: UndoItemMeessage) =>
  typeof x?.UndoAction !== "undefined" &&
  typeof x?.previousContent !== "undefined" &&
  typeof x?.previousIndex !== "undefined";
export const useUndoItemStream = createUseItemMessageStream<UndoItemMeessage>(
  isUndoItemMessage
);

export { useMessageStream } from "./useMessageStream";
// export { useAddItemStream } from "./useAddItemStream";
