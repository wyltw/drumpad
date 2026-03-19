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

export default function KitSelect() {
  const { selectKit, selectedKit } = useKitContext();
  return (
    <Field>
      <FieldLabel className="text-base" htmlFor="kitName">
        Kit Selection
      </FieldLabel>
      <FieldDescription>Select Kit you want for drumpad.</FieldDescription>
      <Select value={selectedKit} onValueChange={selectKit}>
        <SelectTrigger id="kitName">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectItem value="default">default</SelectItem>
            <SelectItem value="banana">banana</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
