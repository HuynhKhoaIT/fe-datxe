"use client";
import { Box, Grid, LoadingOverlay } from "@mantine/core";
import SimpleLineChart from "./SimpleLineChart";
import SimpleBarChart from "./SimpleBarChart";
import { DatePickerInput } from "@mantine/dates";
import "dayjs/locale/vi";
import { addMonths } from "date-fns";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import styles from "./index.module.scss";
import { ORDER_ACCEPT, ORDER_CANCEL, ORDER_DONE } from "@/constants";
export default function Chart({ isLoading, data, arrayDate }: any) {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const [selectedDate, setSelectedDate] = useState<any>();
  const router = useRouter();
  const pathname = usePathname();
  const [dataChart, setDataChart] = useState([]);
  var maxDate = selectedDate?.[0] ? addMonths(selectedDate?.[0], 1) : null;
  var minDate = selectedDate?.[0];
  if (selectedDate?.[1]) {
    maxDate = null;
    minDate = null;
  }
  // // Map các phần tử từ mảng data vào mảng mới
  const getDataChart = (data: any) => {
    const mappedData = arrayDate?.map((date: Date) => {
      const items = data?.filter(
        (item: any) => item.dateTime.slice(0, 10) === date
      );
      const countStep0 = items.filter(
        (item: any) => item.step == Number(ORDER_CANCEL)
      ).length;
      const countStep1 = items.filter(
        (item: any) => item.step == Number(ORDER_ACCEPT)
      ).length;
      const countStep2 = items.filter(
        (item: any) => item.step == Number(ORDER_DONE)
      ).length;
      return { date, countStep1, countStep2, countStep0 };
    });
    return mappedData;
  };

  useEffect(() => {
    if (arrayDate && data) {
      setDataChart(getDataChart(data));
    }
  }, [data]);

  const handleSubmit = async (formattedDates: any) => {
    router.push(
      `${pathname}?dateStart=${formattedDates?.[0]}&dateEnd=${formattedDates?.[1]}`,
      { scroll: false }
    );
  };

  useEffect(() => {
    if (selectedDate?.[1]) {
      const formattedDates = selectedDate.map((dateString: any) => {
        return dayjs(dateString).format("YYYY-MM-DD");
      });
      handleSubmit(formattedDates);
    }
  }, selectedDate);

  return (
    <Grid mih={600}>
      <Grid.Col span={{ base: 12, sm: 12, lg: 12, xs: 12 }}>
        <Box mb={30} className={styles.wrapper_filter}>
          <Grid gutter={12}>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <DatePickerInput
                label="Thời gian"
                size="lg"
                radius={0}
                placeholder="Vui lòng chọn"
                type="range"
                valueFormat="DD/MM/YYYY"
                locale="vi"
                clearable={true}
                value={selectedDate}
                defaultValue={[firstDayOfMonth, lastDayOfMonth]}
                onChange={setSelectedDate}
                minDate={minDate}
                maxDate={maxDate}
              />
            </Grid.Col>
          </Grid>
        </Box>
        <Box pos="relative">
          <LoadingOverlay visible={isLoading} loaderProps={{ type: "bars" }} />
          <div className={styles.wrapper_chart}>
            <div className={styles.headerChart}>
              <div className={styles.itemHeader}>
                <p className={styles.titleItem}>Tổng tiếp nhận</p>
                <span className={styles.valueItem}>{data?.length}</span>
              </div>
              <div className={styles.itemHeader}>
                <p className={styles.titleItem}>Nghiệm thu</p>
                <span className={styles.valueItem}>
                  {
                    data?.filter(
                      (item: any) => item?.step === Number(ORDER_ACCEPT)
                    )?.length
                  }
                </span>
              </div>
              <div className={styles.itemHeader}>
                <p className={styles.titleItem}>Xuất xưởng</p>
                <span className={styles.valueItem}>
                  {
                    data?.filter(
                      (item: any) => item?.step === Number(ORDER_DONE)
                    )?.length
                  }
                </span>
              </div>
              <div className={styles.itemHeader}>
                <p className={styles.titleItem}>Xe huỷ</p>
                <span className={styles.valueItem}>
                  {
                    data?.filter(
                      (item: any) => item?.step === Number(ORDER_CANCEL)
                    )?.length
                  }
                </span>
              </div>
            </div>
            <Box h={500}>
              <SimpleLineChart dataSource={dataChart} />
            </Box>
            <Box h={500} mt={30}>
              <SimpleBarChart dataSource={dataChart} />
            </Box>
          </div>
        </Box>
      </Grid.Col>
    </Grid>
  );
}
