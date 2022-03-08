import React from "react";
import { AddItem } from "./addItem";

export function Header({
  handleAddItem
}: {
  handleAddItem: (itemToAdd: string) => void;
}) {
  return (
    <>
      <h3> List Title</h3>
      <AddItem addItemAction={handleAddItem} />
    </>
  );
}
