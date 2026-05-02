import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useAudioContext } from "../contexts/AudioContextProvider";
import { updatePad } from "../services/PadsService";
import { toast } from "sonner";

export const usePadDropzone = (
  padId: number,
  onAudioDecoded: (buffer: AudioBuffer) => void,
) => {
  const { audioContext } = useAudioContext();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const name = file.name.replace(/\.[^.]+$/, "");
        await updatePad(padId, { arrayBuffer, sampleName: name, label: name });
        const decoded = await audioContext.decodeAudioData(arrayBuffer.slice(0));
        onAudioDecoded(decoded);
      };
      try {
        fileReader.readAsArrayBuffer(file);
      } catch (error) {
        console.error(error);
      }
    },
    [padId, onAudioDecoded, audioContext],
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
    if (fileRejections.length === 0) return;
    toast.error(fileRejections[0]?.errors[0].message);
  }, [fileRejections]);

  return { getRootProps, getInputProps, isDragActive, open };
};
