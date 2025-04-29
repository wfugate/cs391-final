// Ethan Key

import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch('http://ergast.com/api/f1/current/constructorStandings.json');
        const data = await res.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch constructor standings' }, { status: 500 });
    }
}
