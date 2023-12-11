'use client';
import React, { useEffect, useState } from 'react';
import BasicModal from '../basicModal/BasicModal';
import { ModalPreviewCalendar } from './ModalPreviewCalendar';
import styles from './index.module.scss';
export default function ModalPreviewDetailCalendar({ opened, onClose, previewInfos }: any) {
    return (
        <BasicModal
            size={500}
            isOpen={opened}
            onCloseModal={onClose}
            footer={false}
            title="Thông tin chi tiết"
            style={{ position: 'relative' }}
            centered={true}
            classNames={{
                root: styles.detailCalendarRoot,
                header: styles.header,
                body: styles.body,
                title: styles.title,
            }}
        >
            <ModalPreviewCalendar previewInfos={previewInfos} />
        </BasicModal>
    );
}
