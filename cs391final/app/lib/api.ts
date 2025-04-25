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