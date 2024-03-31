"use client";
import { useEffect, useState } from "react";
import {
  ActionIcon,
  CloseButton,
  Combobox,
  Flex,
  Grid,
  Loader,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { IconCamera } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

export function AutocompleteClearable({
  debounceTime = 400,
  getOptionData,
  form,
  name,
  placeholder,
  isCamera = false,
  w,
}: any) {
  const searchParams = useSearchParams();
  const initialValues: any = searchParams.get(name);
  console.log(initialValues);

  const values = form?.values;
  const [loading, setLoading] = useState(false);
  const [groceries, setGroceries] = useState([]);
  const [value, setValue] = useState("");
  const [opened, { open: open, close: close }] = useDisclosure(false);

  useEffect(() => {
    if (values?.[name] == null) {
      setValue("");
    }
  }, [values?.[name]]);
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

  const options = groceries?.map((item: any, index: number) => (
    <Combobox.Option
      defaultValue={initialValues}
      value={item.label}
      key={index}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "10px 0",
        }}
        onClick={() => {
          form.setFieldValue(name, item.value);
          open();
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
        <Grid w={w} justify="space-between" gutter={0}>
          <Grid.Col span={isCamera ? 10 : 12}>
            <TextInput
              size="lg"
              radius={0}
              data-autofocus
              placeholder={placeholder}
              value={value}
              onChange={(event) => {
                setValue(event.currentTarget.value);
                combobox.openDropdown();
                combobox.updateSelectedOptionIndex();
              }}
              onClick={() => combobox.openDropdown()}
              onFocus={() => combobox.openDropdown()}
              onBlur={() => {
                combobox.closeDropdown();
                if (!opened) {
                  setValue("");
                }
              }}
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
            <Grid.Col
              style={{ display: "flex", justifyContent: "flex-end" }}
              span={2}
            >
              <ActionIcon
                onClick={openModalCamera}
                w={50}
                h={50}
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
