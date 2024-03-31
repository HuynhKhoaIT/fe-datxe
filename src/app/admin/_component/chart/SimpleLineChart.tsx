"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SimpleLineChart = ({ dataSource }: any) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      style={{ marginLeft: "-30px" }}
    >
      <LineChart
        width={500}
        height={300}
        data={dataSource}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="countStep1"
          name="Nghiệm thu"
          stroke="blue"
          label="khoa"
          activeDot={{ r: 8 }}
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="countStep2"
          name="Xuất xưởng"
          stroke="green"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          strokeWidth={3}
          dataKey="countStep0"
          name="Xe huỷ"
          stroke="red"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default SimpleLineChart;
