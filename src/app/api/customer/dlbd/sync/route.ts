import { getCustomersFromDLBD } from '@/utils/customers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const customers = await getCustomersFromDLBD('1543|PIjZCXs5AV5fUFhrj8hjlbSEVktDCYNGs5BN8pgE');
        // const car = await getCarFromDLBD()
        return NextResponse.json(customers);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

// export async function POST(request: NextRequest){
//     try {
//         const customer =
//     } catch (error) {

//     }
// }
