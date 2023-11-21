import { ReactNode, Suspense } from 'react';

interface IProps {
    children: ReactNode;
}
export default function RegisterLayout({ children }: IProps) {
    return (
        <main className="main">
            <div className="login-area pd-50">
                <div className="container">
                    <div className="col-md-5 mx-auto">{children}</div>
                </div>
            </div>
        </main>
    );
}
