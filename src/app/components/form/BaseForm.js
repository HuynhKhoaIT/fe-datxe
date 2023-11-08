'use client';
import React from 'react';
import { Form } from 'antd';
import { formSize } from '../../../constants/index';

export const BaseForm = (props) => {
    const { formId, onFinish, onChange, form, onValuesChange, children, size = 'normal' } = props;
    return (
        <Form
            style={formSize[size] ? { width: formSize[size] } : { width: size }}
            id={formId}
            onFinish={onFinish}
            onChange={onChange}
            form={form}
            onValuesChange={onValuesChange}
            layout="vertical"
            {...props}
        >
            {children}
        </Form>
    );
};
