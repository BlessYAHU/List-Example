import React, { useState } from "react";

export function AddItem({
  addItemAction
}: {
  addItemAction: (itemValue: string) => void;
}) {
  const [addItemValue, setAddItemValue] = useState("");
  const [isAddDisabled, setIsAddDisabled] = useState(true);

  const handleChange = (evt: React.ChangeEvent) => {
    console.log(evt.target.textContent);
    setIsAddDisabled(evt.target.textContent === "");
    setAddItemValue(evt.target.textContent ?? '');
  };
  const handleAddItem = (value: string) => () => {
    console.log(value);
    addItemAction(value);
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
