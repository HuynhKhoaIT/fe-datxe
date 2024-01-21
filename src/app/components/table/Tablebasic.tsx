"use client";
import { Checkbox, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import PaginationBase from "../form/PaginationBase";
export default function TableBasic({
  data = [],
  columns,
  loading,
  activePage,
  setPage,
  totalPage,
  selectRow,
  props,
  selectedRows,
  setSelectedRows,
}: any) {
  console.log(selectedRows);

  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            {selectRow && <Table.Th />}
            {columns?.map((item: any, index: number) => {
              return (
                <Table.Th
                  style={{ width: item?.width, textAlign: item?.textAlign }}
                  key={index}
                >
                  {item.label}
                </Table.Th>
              );
            })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody style={{ position: "relative" }}>
          {data?.map((item: any, index: number) => {
            return (
              <Table.Tr key={index}>
                {selectRow && (
                  <Table.Td>
                    <Checkbox
                      aria-label="Select row"
                      checked={
                        selectedRows &&
                        selectedRows.some(
                          (selectedItem: { id: any }) =>
                            selectedItem.id === item.id
                        )
                      }
                      onChange={(event) => {
                        setSelectedRows(
                          event.currentTarget.checked
                            ? [...selectedRows, item]
                            : selectedRows.filter(
                                (selectedItem: any) =>
                                  selectedItem?.id !== item.id
                              )
                        );
                      }}
                    />
                  </Table.Td>
                )}
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
                    <Table.Td
                      style={{
                        width: col?.width,
                        textAlign: col?.textAlign,
                      }}
                      key={_index}
                    >
                      {render ? render(data, item) : returnFunc(data)}
                    </Table.Td>
                  );
                })}
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
      {totalPage > 1 && (
        <PaginationBase
          totalPage={totalPage}
          activePage={activePage}
          setPage={setPage}
        />
      )}
    </>
  );
}
