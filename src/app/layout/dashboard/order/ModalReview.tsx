"use client";
import React from "react";
import BasicModal from "@/app/components/common/BasicModal";
export default function ModalReview({
  openedModal,
  onCloseModal,
  title,
  onOkModal,
  onCancelModal,
}: any) {
  return (
    <BasicModal
      isOpen={openedModal}
      onCloseModal={onCloseModal}
      title={title}
      onOkModal={onOkModal}
      footer={true}
      size={800}
      centered={true}
      onCancelModal={onCancelModal}
    ></BasicModal>
  );
}
