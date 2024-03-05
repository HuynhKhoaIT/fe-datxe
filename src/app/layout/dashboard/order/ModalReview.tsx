"use client";
import React from "react";
import BasicModal from "@/app/components/common/BasicModal";
export default function ModalReview({
  openedModal,
  onCloseModal,
  title,
  onOkModal,
  onCancelModal,
  dataDetail,
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
    >
      <div>
        {dataDetail?.map((item: any, index: number) => {
          return (
            <div>
              <img src={item.product.images[0]} />
              <div>
                <span>{item?.product?.name}</span>
              </div>
            </div>
          );
        })}
        <div>
          <span>Chất lượng sản phẩm</span>
        </div>
      </div>
    </BasicModal>
  );
}
