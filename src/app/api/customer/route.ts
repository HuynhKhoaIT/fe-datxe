import { getCustomers } from '@/app/libs/prisma/customer';
import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import { authOptions } from '../auth/[...nextauth]/route';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            const { searchParams } = new URL(request.url);
            let customerGroup: any = 0;
            if (searchParams.get('customerGroup')) {
                customerGroup = Number(searchParams.get('customerGroup'));
            }
            let page = 1;
            if (searchParams.get('page')) {
                page = Number(searchParams.get('page'));
            }
            const requestData = {
                s: searchParams.get('s'),
                limit: 10,
                take: 10,
                page: page,
                customerGroup: customerGroup,
                garageId: garageId,
                status: 'PUBLIC',
            };
            const customers = await getCustomers(requestData);
            return NextResponse.json(customers);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

interface formData {
    fullName: string;
    phoneNumber: string;
    cityId: Number;
    districtId: Number;
    wardId: Number;
    address: string;
    dob: Date;
    description: string;
    garageId: Number;
    sex: any;
    status: any;
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            const json: formData = await request.json();
            const errors: string[] = [];
            const validationSchame = [
                {
                    valid: validator.isLength(json.fullName, {
                        min: 4,
                    }),
                    errorMessage: 'Fullname is invalid',
                },
                {
                    valid: validator.isLength(json.phoneNumber, {
                        min: 1,
                    }),
                    errorMessage: 'phoneNumber is invalid',
                },
            ];
            validationSchame.forEach((check) => {
                if (!check.valid) {
                    errors.push(check.errorMessage);
                }
            });
            if (errors.length) {
                return NextResponse.json({ errorMessage: errors });
            }

            const customer = await prisma.customer.create({
                data: {
                    fullName: json.fullName,
                    phoneNumber: json.phoneNumber,
                    cityId: Number(json.cityId),
                    districtId: Number(json.districtId),
                    wardId: Number(json.wardId),
                    address: json.address,
                    dob: json.dob,
                    description: json.description,
                    sex: json.sex,
                    garageId: Number(garageId),
                    status: json.status,
                },
                include: {
                    cars: true,
                },
            });

            return new NextResponse(JSON.stringify(customer), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
