import React, { useEffect, useState } from "react";
import { ModalPreviewCalendar } from "./ModalPreviewCalendar";
import styles from "./index.module.scss";
import BasicModal from "@/app/components/common/BasicModal";

export default function ModalPreviewDetailCalendar({
  opened,
  onClose,
  previewInfos,
}: any) {
  return (
    <BasicModal
      size={800}
      isOpen={opened}
      onCloseModal={onClose}
      footer={false}
      title="Chi tiết đặt lịch"
      style={{ position: "relative" }}
      centered={true}
      classNames={{
        root: styles.detailCalendarRoot,
        header: styles.header,
        body: styles.body,
        title: styles.title,
      }}
    >
      <ModalPreviewCalendar
        detail={previewInfos?.event?._def?.extendedProps?.orderDetail}
        onClose={onClose}
      />
    </BasicModal>
  );
}
