import { Breadcrumb } from 'antd';
import Link from 'next/link';
import React from 'react';
export default function BreadcrumbsName({ item }: { item: object }) {
    return (
        <Breadcrumb
            separator=">"
            style={{ padding: '16px 0', position: 'absolute', top: '0', left: 12 }}
            items={[
                {
                    title: (
                        <Link href="/" style={{ color: '#1890ff' }}>
                            Trang chủ
                        </Link>
                    ),
                },
                {
                    title: (
                        <Link href="./" style={{ color: '#1890ff' }}>
                            Chuyên mục
                        </Link>
                    ),
                },
            ]}
        />
    );
}
