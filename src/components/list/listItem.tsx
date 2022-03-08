export function ListItem({
  itemContent,
  index,
  onRemoveItem,
  onEditItem
}: {
  itemContent: string;
  index: number;
  onRemoveItem: () => void;
  onEditItem: () => void;
}) {
  return (
    <>
      <li key={index}>
        {itemContent} <button onClick={onEditItem}>Edit</button>
        <button onClick={onRemoveItem}>X</button>
      </li>
    </>
  );
}
