import LoginForm from '../components/login/LoginForm';
import React from 'react';

export default function Login() {
    return (
        <main className="main">
            <div className="login-area py-120">
                <div className="container">
                    <div className="col-md-5 mx-auto">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
