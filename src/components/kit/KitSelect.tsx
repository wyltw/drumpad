import { useKitContext } from "@/lib/contexts/KitContextProvider";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Select, SelectContent, SelectGroup, SelectItem } from "../ui/select";
import { useKits } from "@/lib/hooks/useKits";
import KitNameEditor from "./KitNameEditor";
import { useEffect } from "react";
import { toast } from "sonner";

export default function KitSelect() {
  const { selectedKitId, selectKit } = useKitContext();
  const { kitsOptions } = useKits();

  const selectedKit = kitsOptions.find((kit) => kit.id === selectedKitId);
  const defaultKit = kitsOptions.find((kit) => kit.name === "default");

  useEffect(() => {
    if (kitsOptions.length === 0) return;
    if (!selectedKit && defaultKit) {
      selectKit(defaultKit.id);
      toast.info("Kit not found, switched to default.");
    }
  }, [defaultKit, kitsOptions.length, selectKit, selectedKit]);
  return (
    <Field className="flex">
      <FieldLabel className="text-base" htmlFor="kitName">
        Kit Selection
      </FieldLabel>
      <FieldDescription>Select Kit you want for drumpad.</FieldDescription>
      <Select
        value={selectedKitId === null ? "" : String(selectedKitId)}
        onValueChange={(value) => {
          selectKit(Number(value));
        }}
      >
        <KitNameEditor kit={selectedKit} defaultKitId={defaultKit?.id} />
        <SelectContent position="popper">
          <SelectGroup>
            {kitsOptions.map((kit) => (
              <SelectItem key={kit?.id} value={String(kit?.id)}>
                {kit?.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
