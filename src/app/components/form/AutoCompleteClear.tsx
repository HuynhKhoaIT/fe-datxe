"use client";
import { useEffect, useState } from "react";
import {
  ActionIcon,
  CloseButton,
  Combobox,
  Grid,
  Loader,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { IconCamera } from "@tabler/icons-react";
import dynamic from "next/dynamic";

export function AutocompleteClearable({
  debounceTime = 400,
  getOptionData,
  form,
  name,
  placeholder,
  isCamera = false,
}: any) {
  const values = form.values;
  const [loading, setLoading] = useState(false);
  const [groceries, setGroceries] = useState([]);
  const [value, setValue] = useState("");
  console.log("value", value);
  useEffect(() => {
    if (values[name] == null) {
      setValue("");
    }
  }, [values[name]]);
  const [debounced] = useDebouncedValue(value, debounceTime);
  useEffect(() => {
    const fetchData = async () => {
      const data: any = await getOptionData({ s: debounced });
      setGroceries(data);
      setLoading(false);

      return data;
    };
    if (debounced?.length >= 3) {
      setLoading(true);
      fetchData();
    }
  }, [debounced]);
  const combobox = useCombobox();
  const [
    openedModalCamera,
    { open: openModalCamera, close: closeModalCamera },
  ] = useDisclosure(false);

  const options = groceries.map((item: any) => (
    <Combobox.Option value={item.label} key={item}>
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "10px 0",
        }}
        onClick={() => {
          form.setFieldValue(name, item.value);
        }}
      >
        {item.label}
      </div>
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
      withinPortal={false}
    >
      <Combobox.Target>
        <Grid gutter={12}>
          <Grid.Col span={isCamera ? 9 : 12}>
            <TextInput
              size="lg"
              radius={0}
              placeholder={placeholder}
              value={value}
              onChange={(event) => {
                setValue(event.currentTarget.value);
                combobox.openDropdown();
                combobox.updateSelectedOptionIndex();
              }}
              onClick={() => combobox.openDropdown()}
              onFocus={() => combobox.openDropdown()}
              onBlur={() => combobox.closeDropdown()}
              rightSection={
                loading ? (
                  <Loader size={18} />
                ) : (
                  value !== "" && (
                    <CloseButton
                      size="sm"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => setValue("")}
                      aria-label="Clear value"
                    />
                  )
                )
              }
            />
          </Grid.Col>
          {isCamera && (
            <Grid.Col span={2}>
              <ActionIcon
                onClick={openModalCamera}
                size="lg"
                h={50}
                w={50}
                variant="filled"
                aria-label="Settings"
              >
                <IconCamera
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Grid.Col>
          )}
        </Grid>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length === 0 ? (
            <Combobox.Empty>Không có kết quả</Combobox.Empty>
          ) : (
            options
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
      <DynamicModalCamera
        openModal={openedModalCamera}
        close={closeModalCamera}
        setNumberPlate={setValue}
        openDropdown={() => combobox.openDropdown()}
      />
    </Combobox>
  );
}

const DynamicModalCamera = dynamic(
  () => import("@/app/admin/order-manager/_component/ModalCamera"),
  {
    ssr: false,
  }
);
