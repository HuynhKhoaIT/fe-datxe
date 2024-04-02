"use client";
import { Checkbox, LoadingOverlay, Skeleton, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import PaginationBase from "../form/PaginationBase";
import styles from "./index.module.scss";
import classNames from "classnames";
import EmptyData from "@/assets/images/nodata.png";
export default function TableBasic({
  data = [],
  columns,
  loading = false,
  activePage,
  setPage,
  totalPage,
  selectRow,
  props,
  selectedRows,
  setSelectedRows,
  className,
}: any) {
  console.log(columns);
  return (
    <div className={classNames(styles.tableBasic, className)}>
      <LoadingOverlay
        visible={loading}
        loaderProps={{ type: "bars" }}
        zIndex={99}
      />
      <Table
        // mih={loading ? 300 : 0}
        classNames={{
          table: styles.rootTable,
          tr: styles.trTable,
          td: styles.td,
          th: styles.th,
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {selectRow && <Table.Th />}
            {columns?.map((item: any, index: number) => {
              if (!item) {
                return;
              }
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
        <Table.Tbody style={{ position: "relative", overflowX: "auto" }}>
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
                  if (!col) {
                    return;
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
      {data?.length == 0 && (
        <div className={styles.emptyData}>
          <img src={EmptyData.src} />
          <p className={styles.label}>Không có dữ liệu</p>
        </div>
      )}
      {totalPage > 1 && (
        <PaginationBase
          totalPage={totalPage}
          activePage={activePage}
          setPage={setPage}
        />
      )}
    </div>
  );
}
