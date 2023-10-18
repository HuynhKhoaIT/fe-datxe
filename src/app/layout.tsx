import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from './components/header/header';
import { MyFooter } from './components/footer/footer';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles.scss';
import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Provider from './Provider';
import { ReactNode } from 'react';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
    title: 'Datxe',
    description: 'Trang thương mại điện tử',
};
interface IProps {
    children: ReactNode;
}
export default function RootLayout({ children }: IProps) {
    return (
        <html lang="vi">
            <body className={inter.className}>
                <Provider>
                    <Header />
                    {children}
                    <MyFooter />
                </Provider>
            </body>
        </html>
    );
}
