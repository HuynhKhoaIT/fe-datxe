import { DateInput } from "@mantine/dates";
import React from "react";
import "dayjs/locale/vi";

export default function DateField({
  valueFormat = "DD/MM/YYYY",
  placeholder = "",
  label = "",
  value,
  onChange,
  clearable = true,
  minDate,
  maxDate,
  disabled = false,
  locale = "vi",
  required = false,
  defaultValue,
}: any) {
  return (
    <DateInput
      value={value}
      onChange={onChange}
      label={label}
      placeholder={placeholder}
      valueFormat={valueFormat}
      clearable={clearable}
      minDate={minDate}
      maxDate={maxDate}
      disabled={disabled}
      locale={locale}
      required={required}
      defaultValue={defaultValue}
    />
  );
}
