'use client';
import Image from 'next/image';
import { Button, Result } from 'antd';
import Link from 'next/link';
export default function ErrorPage() {
    return (
        <Result
            style={{ position: 'absolute', zIndex: 999, top: 0, right: 0, bottom: 0, background: '#fff', left: 0 }}
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Link href={'/'}>
                    <Button type="primary">Back Home</Button>
                </Link>
            }
        />
    );
}
