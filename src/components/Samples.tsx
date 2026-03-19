import { useSamplesContext } from "@/lib/contexts/SamplesContextProvider";
import Pad from "./Pad";

export default function Samples() {
  const { samples } = useSamplesContext();
  return (
    <>
      {samples?.map((sample, index) => (
        <Pad
          key={sample.sampleName}
          sample={sample}
          order={String(index + 1)}
        />
      ))}
    </>
  );
}
