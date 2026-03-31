import Pads from "./Pads";

export default function PadsLayout() {
  return (
    <div className="mx-auto mt-20 grid grid-cols-3 grid-rows-3 place-items-center gap-x-10 gap-y-4">
      <Pads />
    </div>
  );
}
