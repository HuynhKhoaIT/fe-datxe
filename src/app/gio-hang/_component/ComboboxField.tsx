"use client";
import { useState } from "react";
import { InputBase, Combobox, useCombobox, Button, Input } from "@mantine/core";

export default function ComboboxField({
  label,
  form,
  carsData,
  openModal,
  value,
  setValue,
}: any) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState("");

  const handleSetValueCar = (data: any) => {
    form.setFieldValue("carId", data?.id);
    form.setFieldValue("carBrandId", data?.carBrandId);
    form.setFieldValue("carNameId", data?.carNameId);
    form.setFieldValue("carYearId", data?.carYearId);
    form.setFieldValue("carBrandName", data?.brandName?.title);
    form.setFieldValue("carModelName", data?.modelName?.title);
    form.setFieldValue("carYear", data?.yearName?.title);
  };
  const options = carsData.map((item: any, index: number) => (
    <Combobox.Option value={item.numberPlates} key={index}>
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "10px 0",
        }}
        onClick={() => {
          handleSetValueCar(item);
        }}
      >
        {item.numberPlates}
      </div>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        setSearch(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          size="lg"
          label={label}
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          //   classNames={{ input: classes.input }}
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
          <Button
            variant="transparent"
            fullWidth
            radius="0"
            bg="#ddd"
            onClick={() => {
              combobox.toggleDropdown();
              openModal();
            }}
          >
            <span style={{ color: "#545454" }}>Thêm xe</span>
          </Button>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
