export function Footer({
  itemCount,
  removedItem = "",
  handleUndo,
  handleCancelUndo
}: {
  itemCount: number;
  removedItem: string;
  handleUndo: () => void;
  handleCancelUndo: () => void;
}) {
  return (
    <>
      <div>Items: {itemCount} </div>
      {removedItem !== "" ? (
        <div>
          Just removed {removedItem} Undo?{" "}
          <a onClick={handleUndo} href="#">
            Yes
          </a>{" "}
          <a onClick={handleCancelUndo} href="#">
            No
          </a>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
