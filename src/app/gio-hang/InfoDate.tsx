"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Grid, Modal, TextInput, Card, Avatar } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import {
  IconClock12,
  IconTrash,
  IconBan,
  IconChevronRight,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";
import { ActionIcon, rem } from "@mantine/core";
import dayjs from "dayjs";

export default function InfoDate({ setDate, setTime }: any) {
  const ref = useRef<HTMLInputElement>(null);
  function handleDateChange(date: any) {
    const dateString = dayjs(date).format("YYYY-MM-DD");
    setDate(dateString);
  }
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
        <Card className="bg-white mb-20 p-4">
          <Grid gutter={16}>
            <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
              <DateInput
                label="Ngày"
                valueFormat={"DD/MM/YYYY"}
                name="date"
                defaultValue={new Date()}
                style={{ width: "100%" }}
                onChange={(date) => {
                  handleDateChange(date?.toString());
                }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
              <TimeInput
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
