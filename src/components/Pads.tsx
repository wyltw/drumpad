import { usePadsContextContext } from "@/lib/contexts/PadsContextProvider";
import Pad from "./Pad";

export default function Pads() {
  const { samplePack } = usePadsContextContext();
  return (
    <>
      {samplePack?.map((sample, index) => (
        <Pad
          key={sample.sampleName}
          sample={sample}
          order={String(index + 1)}
        />
      ))}
    </>
  );
}
