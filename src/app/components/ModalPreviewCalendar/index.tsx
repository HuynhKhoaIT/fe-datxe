'use client';
import React, { useEffect, useState } from 'react';
import BasicModal from '../basicModal/BasicModal';
import { ModalPreviewCalendar } from './ModalPreviewCalendar';

export default function ModalPreviewDetailCalendar({ opened, onClose, previewInfos }: any) {
    return (
        <BasicModal
            size={600}
            isOpen={opened}
            onCloseModal={onClose}
            footer={false}
            title="Thông tin chi tiết"
            style={{ position: 'relative' }}
        >
            <ModalPreviewCalendar previewInfos={previewInfos} />
        </BasicModal>
    );
}
