import { Table } from "@mantine/core";
import React from "react";
export default function TableBasic({ data = [], columns, loading }: any) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          {columns?.map((item: any, index: number) => {
            return (
              <Table.Th style={{ width: item?.width }} key={index}>
                {item.label}
              </Table.Th>
            );
          })}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody style={{ position: "relative" }}>
        {data.map((item: any, index: number) => {
          return (
            <Table.Tr key={index}>
              {columns.map((col: any, _index: number) => {
                const { render, dataIndex, name } = col;
                const data = col.dataIndex?.reduce(
                  (acc: any, current: number) => acc && acc[current],
                  item
                );
                function returnFunc(data: any) {
                  return <span>{data}</span>;
                }
                return (
                  <Table.Td style={item.styles} key={_index}>
                    {render ? render(data, item) : returnFunc(data)}
                  </Table.Td>
                );
              })}
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}
