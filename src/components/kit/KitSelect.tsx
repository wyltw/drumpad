import { useKitContext } from "@/lib/contexts/KitContextProvider";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Select, SelectContent, SelectGroup, SelectItem } from "../ui/select";
import { useKits } from "@/lib/hooks/useKits";
import KitNameEditor from "./KitNameEditor";
import { useEffect } from "react";
import { toast } from "sonner";

export default function KitSelect() {
  const { selectedKit, selectKit } = useKitContext();
  const { kitsOptions } = useKits();

  const isKitExsit = kitsOptions.find((kit) => kit.id === selectedKit?.id);
  const defaultKit = kitsOptions.find((kit) => kit.name === "default")!;

  useEffect(() => {
    if (kitsOptions.length === 0) return;
    if (!isKitExsit) {
      selectKit(defaultKit);
      toast.info("Kit not found, switched to default.");
    }
  }, [defaultKit, isKitExsit, kitsOptions.length, selectKit]);
  return (
    <Field className="flex">
      <FieldLabel className="text-base" htmlFor="kitName">
        Kit Selection
      </FieldLabel>
      <FieldDescription>Select Kit you want for drumpad.</FieldDescription>
      <Select
        value={String(selectedKit?.id)}
        onValueChange={(value) => {
          selectKit({
            id: Number(value),
            name:
              kitsOptions.find((option) => String(option.id) === value)?.name ||
              "",
          });
        }}
      >
        <KitNameEditor />
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
