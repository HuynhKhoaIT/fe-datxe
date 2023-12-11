import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
    try {
        const { phone } = await request.json();
        let url = `${process.env.SMS_GENOTP_URL}?Phone=${phone}&ApiKey=${process.env.SMS_APIKEY}&SecretKey=${process.env.SMS_SECRET}&TimeAlive=15&Brandname=${process.env.SMS_BRANDNAME}&Type=2&message=${process.env.SMS_MESSAGE_OTP}&IsNumber=1`;
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) {
            throw new Error('Failed to fetch OTP');
        }

        return new NextResponse(JSON.stringify(data));
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình gửi OTP');
    }
}
