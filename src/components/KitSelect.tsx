import { useKitContext } from "@/lib/contexts/KitContextProvider";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { Select, SelectContent, SelectGroup, SelectItem } from "./ui/select";
import { useKits } from "@/lib/adapters/KitsAdapter";
import KitNameEditor from "./KitNameEditor";

export default function KitSelect() {
  const { selectedKit, selectKit } = useKitContext();
  const { kitsOptions } = useKits();
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
        <KitNameEditor kitName={selectedKit?.name ?? ""} />
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
