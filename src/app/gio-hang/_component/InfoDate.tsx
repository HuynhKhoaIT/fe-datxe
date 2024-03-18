"use client";
import React, { useRef } from "react";
import { Grid, Card } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock12 } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import dayjs from "dayjs";
import DateField from "../../components/form/DateField";

export default function InfoDate({ setDate, setTime }: any) {
  const ref = useRef<HTMLInputElement>(null);
  function handleTimeChange(time: any) {
    setTime(time);
  }
  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <IconClock12 size={16} />
    </ActionIcon>
  );
  return (
    <Grid>
      <Grid.Col span={12}>
        <Card>
          <Grid gutter={16}>
            <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
              <DateField label="Ngày" name="date" defaultValue={new Date()} />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
              <TimeInput
                size="lg"
                radius={0}
                withSeconds
                defaultValue={new Date().toLocaleTimeString("en-US", {
                  hour12: false,
                })}
                label="Thời gian"
                ref={ref}
                onChange={(e) => handleTimeChange(e.target.value)}
                rightSection={pickerControl}
              />
            </Grid.Col>
          </Grid>
        </Card>
      </Grid.Col>
    </Grid>
  );
}
