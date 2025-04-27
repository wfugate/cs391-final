//start code William Fugate 
export async function fetchDrivers() {
    try {
      const response = await fetch(
        "https://api.openf1.org/v1/drivers?session_key=latest", 
        { next: { revalidate: 3600 } }
      );
      
      if (!response.ok) {
        throw new Error(`Error fetching drivers: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch drivers:", error);
      return [];
    }
  }
  //end code William Fugate 


///kf
type Session = {
    session_key: number;
    date_start: string;
};
export async function fetchLatestSessionKey() {
    try {
        const response = await fetch(
            "https://api.openf1.org/v1/sessions?session_type=Race&session_name=Race",
            { next: { revalidate: 60 } }
        );

        if (!response.ok) {
            throw new Error(`Error fetching sessions: ${response.status}`);
        }

        const sessions: Session[] = await response.json();

        if (sessions.length > 0) {
            const latestSession = sessions.reduce((latest, current) =>
                new Date(current.date_start) > new Date(latest.date_start) ? current : latest
            );
            return latestSession.session_key;
        }

        return null;
    } catch (error) {
        console.error("Failed to fetch latest session:", error);
        return null;
    }
}

//kf