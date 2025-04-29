//Kelvin Fang
export interface RaceResult {
    MRData: {
        RaceTable: {
            Races: Race[];
        };
    };
}

export interface Race {
    season: string;
    round: string;
    raceName: string;
    date: string;
    time?: string;
    Results: Result[];
}

export interface Result {
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
//Kelvin Fang
//William Fugate
export interface Driver {
    broadcast_name: string;
    country_code: string;
    driver_number: string | number;
    first_name: string;
    full_name: string;
    headshot_url: string;
    last_name: string;
    meeting_key: string;
    name_acronym: string;
    session_key: string;
    team_colour: string;
    team_name: string;
  }
//William Fugate