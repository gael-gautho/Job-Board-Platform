import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { handleRefresh } from '@/app/libs/actions';

export async function GET() {
    let accessToken = cookies().get('session_access_token')?.value;

    if (!accessToken) {
        accessToken = await handleRefresh();
    }

    return NextResponse.json({ accessToken });
}
