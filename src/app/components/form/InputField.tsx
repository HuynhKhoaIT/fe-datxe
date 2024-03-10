import { TextInput, Textarea } from "@mantine/core";
import styles from "./InputField.module.scss";
export default function InputField({
  type,
  label,
  placeholder,
  form,
  name,
  withAsterisk = false,
  ...props
}: any) {
  return (
    <TextInput
      size="lg"
      radius={0}
      withAsterisk={withAsterisk}
      label={label}
      placeholder={placeholder}
      classNames={{
        root: styles.textInputRoot,
        label: styles.label,
        input: styles.input,
      }}
      {...form.getInputProps(name)}
    />
  );
}
