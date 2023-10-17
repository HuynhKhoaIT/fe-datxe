import { type NextRequest } from 'next/server';

export function GET() {
    return Response.json('h1');
    // query is "hello" for /api/search?query=hello
}
