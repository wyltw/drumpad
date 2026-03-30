import Pad from "./Pad";
import usePadsStore from "@/lib/stores/PadsStore";

export default function Pads() {
  // samples should come from liveQuery
  const pads = usePadsStore((state) => state.pads);

  return (
    <>
      {pads.map((pad) => (
        <Pad key={pad.id || pad.order} pad={pad} onClick={() => {}} />
      ))}
    </>
  );
}
