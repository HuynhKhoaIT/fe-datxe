"use client";
import { Autocomplete } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
export default function AutocompleteField({
  form,
  placeholder,
  name,
  value,
  onChange,
  onOptionSubmit,
  size = "lg",
  radius = 0,
  w = { base: "100%", sm: "25%", md: "25%", lg: "25%" },
  label,
  debounceTime = 400,
  getOptionData,
  props,
  limit = 10,
}: any) {
  const [optionsData, setOptionsData] = useState([]);
  const [debounced] = useDebouncedValue(value, debounceTime);

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await getOptionData({ s: debounced });
      setOptionsData(data);
      return data;
    };
    if (debounced?.length >= 3) {
      fetchData();
    }
  }, [debounced]);

  return (
    <Autocomplete
      {...form.getInputProps(name)}
      label={label}
      size={size}
      radius={radius}
      w={w}
      placeholder={placeholder}
      data={optionsData}
      //   value={value}
      limit={limit}
      onChange={onChange}
      onOptionSubmit={onOptionSubmit}
      {...props}
    />
  );
}
