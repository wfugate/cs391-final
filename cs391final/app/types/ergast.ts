
export interface ErgastRaceResult {
    MRData: {
        RaceTable: {
            Races: ErgastRace[];
        };
    };
}

export interface ErgastRace {
    season: string;
    round: string;
    raceName: string;
    date: string;
    time?: string;
    Results: ErgastResult[];
}

export interface ErgastResult {
    number: string;
    position: string;
    points: string;
    Driver: {
        driverId: string;
        permanentNumber: string;
        code: string;
        url: string;
        givenName: string;
        familyName: string;
        dateOfBirth: string;
        nationality: string;
    };
    Constructor: {
        constructorId: string;
        url: string;
        name: string;
        nationality: string;
    };
    grid: string;
    laps: string;
    status: string;
    Time?: {
        millis?: string;
        time: string;
    };
    FastestLap?: {
        rank: string;
        lap: string;
        Time: {
            time: string;
        };
        AverageSpeed: {
            units: string;
            speed: string;
        };
    };
}