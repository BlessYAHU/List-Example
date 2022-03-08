export function Content({
  items = [],
  removeItemAction
}: {
  items: Array<string>;
  removeItemAction: (itmToRemove: string) => () => void;
}) {
  const itms = items.map((item, index) => (
    <li key={index}>
      {item} <button onClick={removeItemAction(item)}>X</button>
    </li>
  ));

  return (
    <>
      {itms}
      {/* <li>Items go here</li>
      <li>Newman's own</li> */}
    </>
  );
}
