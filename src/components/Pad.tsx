import { useCallback, useEffect, useState } from "react";
import { KitPad } from "@/lib/types/kit";
import { playback } from "@/lib/audio/audio-utils";
import { getAudioContext } from "@/lib/audio/audioContext";
import { updatePadLabel, updatePad } from "@/lib/services/PadsService";
import { EditableText } from "./EditableText";
import { PadButton } from "./pad/PadButton";
import { PadFace } from "./pad/PadFace";
import { PadMask } from "./pad/PadMask";
import { usePadKeybind } from "@/lib/hooks/usePadKeybind";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

type PadProps = {
  pad: KitPad;
};

export default function Pad({ pad }: PadProps) {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const { isActive, padMaskIds, addPadMask, removePadMask } = usePadKeybind(
    pad,
    audioBuffer,
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const name = file.name.replace(/\.[^.]+$/, "");
        await updatePad(pad.id, {
          arrayBuffer,
          sampleName: name,
          label: name,
        });
        const audioContext = getAudioContext();
        const decoded = await audioContext.decodeAudioData(
          arrayBuffer.slice(0),
        );
        setAudioBuffer(decoded);
      };
      try {
        fileReader.readAsArrayBuffer(file);
      } catch (error) {
        console.error(error);
      }
    },
    [pad.id],
  );

  const { getRootProps, getInputProps, isDragActive, open, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "audio/mpeg": [],
        "audio/wav": [],
      },
    });

  useEffect(() => {
    const hasFileError = fileRejections.length === 0;
    if (hasFileError) return;
    toast.error(fileRejections[0]?.errors[0].message);
  }, [fileRejections]);

  useEffect(() => {
    const audioContext = getAudioContext();
    audioContext.decodeAudioData(pad.arrayBuffer.slice(0)).then(setAudioBuffer);
    // pad.id is the correct dependency — arrayBuffer has no stable reference equality
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pad.id]);

  const handleEditLabel = (value: string) => {
    updatePadLabel(pad.id, value);
  };

  const handleClick = async () => {
    if (audioBuffer) playback(audioBuffer);
    addPadMask();
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <PadButton
          {...getRootProps()}
          onClick={handleClick}
          isActive={isActive}
        >
          <PadFace
            label={pad.label}
            isActive={isActive}
            isDragActive={isDragActive}
          />
          <PadMask padMaskIds={padMaskIds} removePadMask={removePadMask} />
        </PadButton>
        <div className="mt-2 flex">
          <EditableText
            buttonText={`pad ${pad.slot}`}
            initialValue={pad.label}
            onSave={handleEditLabel}
            openFileDialog={open}
          />
        </div>
      </div>
      <input
        {...getInputProps()}
        className="hidden"
        type="file"
        multiple={false}
      />
    </>
  );
}
