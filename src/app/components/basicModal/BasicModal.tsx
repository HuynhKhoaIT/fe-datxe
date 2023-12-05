'use client';
import React from 'react';
import { useState } from 'react';
import { Modal } from '@mantine/core';
import styles from './Modal.module.scss';
const BasicModal = ({
    top,
    children,
    title,
    onCloseModal,
    style,
    isOpen,
    onOkModal,
    onCancelModal,
    size = '600',
    footer,
    classNames,
}: any) => {
    return (
        <Modal
            size={size}
            style={{ top: top || 'auto', zIndex: 9999 }}
            opened={isOpen}
            onClose={onCloseModal}
            title={title}
            classNames={classNames}
        >
            <div className={styles.modalContent}>{children}</div>
            {footer && (
                <div className={styles.modalFooter}>
                    <button
                        className={styles.cancelButton}
                        onClick={() => {
                            onCancelModal();
                            onCloseModal();
                        }}
                    >
                        Cancel
                    </button>
                    <button className={styles.okButton} onClick={onOkModal}>
                        Ok
                    </button>
                </div>
            )}
        </Modal>
    );
};

export default BasicModal;
