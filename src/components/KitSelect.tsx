import { useKitContext } from "@/lib/contexts/KitContextProvider";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useKits } from "@/lib/hooks/useKits";

export default function KitSelect() {
  const { selectedKit, selectKit } = useKitContext();
  const { kitOptions } = useKits();
  return (
    <Field>
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
              kitOptions.find((option) => String(option.id) === value)?.name ||
              "",
          });
        }}
      >
        <SelectTrigger id="kitName">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {kitOptions.map((kit) => (
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
