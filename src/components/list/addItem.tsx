import React, { useState } from "react";
import { useAddItemStream } from "../../hooks";
import { executeOnEnter } from "./utils";

export function AddItem() {
  const [setAddItemData] = useAddItemStream(() => {
    setAddItemValue("");
    setIsAddDisabled(true);
  });
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
  };

  return (
    <>
      <input type="search" onChange={handleChange} value={addItemValue} 
            onKeyDown={ executeOnEnter( () => setAddItemData({ itemContent: addItemValue })) } ></input>
      <button onClick={handleAddItem(addItemValue)} disabled={isAddDisabled}>
        Add
      </button>
    </>
  );
}
