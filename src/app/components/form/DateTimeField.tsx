import { DateTimePicker } from "@mantine/dates";
import React from "react";
import "dayjs/locale/vi";
import { IconCalendar } from "@tabler/icons-react";

export default function DateTimeField({
  valueFormat = "DD/MM/YYYY HH:mm",
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
  size = "md",
}: any) {
  return (
    <DateTimePicker
      size={size}
      defaultValue={defaultValue}
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
    />
  );
}
