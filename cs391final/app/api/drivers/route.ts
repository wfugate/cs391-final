//William Fugate
import { NextResponse } from 'next/server';
import { Driver } from '../../types/ergast';

//cache initialization
let cachedData: Driver[] | null = null;
let cacheTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute cache

export async function GET() { //get drivers from OpenF1 API
  try {
    //return cached data if available and fresh
    if (cachedData && Date.now() - cacheTime < CACHE_DURATION) {
      return NextResponse.json(cachedData);
    }
    
    const response = await fetch(
      "https://api.openf1.org/v1/drivers?session_key=latest", //fetch the latest drivers
    );
    
    if (!response.ok) { //ensure response is ok
      //if rate limited but we have cached data, return it even if expired
      if (response.status === 429 && cachedData) {
        return NextResponse.json(cachedData);
      }
      throw new Error(`Error fetching drivers: ${response.status}`);
    }
    
    const drivers = await response.json() as Driver[];
    //update cache
    cachedData = drivers;
    cacheTime = Date.now();
    
    return NextResponse.json(drivers); //return the drivers as JSON
  } catch (error) {
    console.error("Failed to fetch drivers:", error);
    return NextResponse.json({ error: 'Failed to fetch drivers' }, { status: 500 }); //log and return error message if there is one
  }
}
//William Fugate