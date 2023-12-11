import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
    try {
        const { phone, code } = await request.json();
        let url = `${process.env.SMS_CHECKOTP_URL}?Phone=${phone}&ApiKey=${process.env.SMS_APIKEY}&SecretKey=${process.env.SMS_SECRET}&Code=${code}`;
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) {
            throw new Error('Failed to check OTP');
        }
        return new NextResponse(JSON.stringify(data));
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình check OTP');
    }
}
