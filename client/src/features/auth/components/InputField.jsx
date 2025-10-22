import { Label, TextInput } from "flowbite-react";

export default function InputField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <TextInput
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
