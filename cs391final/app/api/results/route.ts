//Kelvin Fang
import { NextResponse } from 'next/server';
import { ErgastRaceResult } from '../../types/ergast';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const season = searchParams.get('season') || 'current';
    const round = searchParams.get('round') || 'last';

    try {
        const response = await fetch(
            `https://ergast.com/api/f1/${season}/${round}/results.json`
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: `Error: ${response.status}` },
                { status: response.status }
            );
        }

        const data: ErgastRaceResult = await response.json();
        return NextResponse.json(data);
    } catch  {
        return NextResponse.json(
            { error: 'Failed to fetch race results' },
            { status: 500 }
        );
    }
}
//Kelvin Fang