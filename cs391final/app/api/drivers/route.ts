//William Fugate
import { NextResponse } from 'next/server';

export async function GET() { //get drivers from OpenF1 API
  try {
    const response = await fetch(
      "https://api.openf1.org/v1/drivers?session_key=latest", //fetch the latest drivers
    );
    
    if (!response.ok) { //ensure response is ok
      throw new Error(`Error fetching drivers: ${response.status}`);
    }
    
    const drivers = await response.json();
    return NextResponse.json(drivers); //return the drivers as JSON
  } catch (error) {
    console.error("Failed to fetch drivers:", error);
    return NextResponse.json({ error: 'Failed to fetch drivers' }, { status: 500 }); //log and return error message if there is one
  }
}
//William Fugate