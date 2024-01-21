"use client";
import React, { useState } from "react";
import styles from "./index.module.scss";
import {
  Button,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  Pagination,
  Tabs,
  Image,
  Tooltip,
  Space,
  Badge,
} from "@mantine/core";
import {
  IconBan,
  IconChevronRight,
  IconEye,
  IconPencil,
  IconTrash,
  IconPlayerTrackNext,
  IconPlus,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import Typo from "@/app/components/elements/Typo";
import { notifications } from "@mantine/notifications";
import TableBasic from "@/app/components/table/Tablebasic";
export const revalidate = 0;
import { useRouter, useSearchParams } from "next/navigation";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import PaginationBase from "@/app/components/form/PaginationBase";
import SearchForm from "@/app/components/form/SearchForm";
import dynamic from "next/dynamic";
import { statusOptions, kindProductOptions } from "@/constants/masterData";
import classNames from "classnames";

export default function ListPage({
  dataSource,
  setPage,
  activePage,
  className,
  columns,
  searchData,
  initialValuesSearch,
  brandFilter,
  isCreate = false,
}: any) {
  return (
    <div className={classNames(className, styles.listPage)}>
      <SearchForm
        searchData={searchData}
        brandFilter={brandFilter}
        initialValues={initialValuesSearch}
      />
      <Space h={20} />
      {isCreate && (
        <Flex justify={"end"} align={"center"}>
          <Link
            href={{
              pathname: `/admin/products/create`,
            }}
          >
            <Button leftSection={<IconPlus size={14} />}>Thêm mới</Button>
          </Link>
        </Flex>
      )}

      <Space h={20} />
      <TableBasic data={dataSource} columns={columns} loading={true} />
      <PaginationBase activePage={activePage} setPage={setPage} />
    </div>
  );
}
