import * as Comp from "../components";

const testItms = [
  "temp 1",
  "temp 2",
  "temp 3",
  "temporary",
  "Galmorous",
  "General Items"
];

export default function Home() {
  return (
    <div className="App">
      <Comp.List listItemDomain={Comp.ListItems(testItms)} />
    </div>
  );
}
