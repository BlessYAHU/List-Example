import React, { useState } from "react";
import { useAddItemStream } from "../../hooks";

export function AddItem() {
  // const [addItemData, setAddItemData] = useMessageStream<AddItemMessage>(
  //   (x) => typeof x?.itemContent !== "undefined"
  // );
  const [setAddItemData] = useAddItemStream(null);
  const [addItemValue, setAddItemValue] = useState("");
  const [isAddDisabled, setIsAddDisabled] = useState(true);

  const handleChange = (evt: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log(evt.target.value);
    setIsAddDisabled(evt.target.value === "");
    setAddItemValue(evt.target.value);
  };
  const handleAddItem = (value: string) => () => {
    console.log("Adding " + value);
    setAddItemData({ itemContent: value });
    setAddItemValue("");
    setIsAddDisabled(true);
  };

  return (
    <>
      <input type="search" onChange={handleChange} value={addItemValue}></input>
      <button onClick={handleAddItem(addItemValue)} disabled={isAddDisabled}>
        {" "}
        Add{" "}
      </button>
    </>
  );
}
