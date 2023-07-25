import { useEffect } from "react";
import { useMessageStream } from "./";
import {
  AddItemMessage,
  EditItemMessage,
  RemoveItemMessage,
  UndoItemMeessage,
  UpdateItemMessage,
  CompleteItemMessage
} from "../types";

export function createUseItemMessageStream<T>(
  identifyMessageFun: (x: T) => boolean
) {
  return (func?: (x: T) => void) => {
    const [itemMessage, setItemMessage] = useMessageStream<T>(
      identifyMessageFun
    );

    if (typeof func !== 'undefined') {
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
// todo: add update item stream
export const isUpdateItemMessage = (x: UpdateItemMessage) =>
  typeof x?.index !== "undefined" && typeof x?.updatedContent !== "undefined";
export const useUpdateItemStream = createUseItemMessageStream<
  UpdateItemMessage
>(isUpdateItemMessage);

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

export const isCompleteItemMessage = (x: CompleteItemMessage) =>
  typeof x?.targetIndex !== "undefined";
export const useCompleteItemStream = createUseItemMessageStream<
  CompleteItemMessage
>(isCompleteItemMessage);

export { useMessageStream } from "./useMessageStream";
// export { useAddItemStream } from "./useAddItemStream";
