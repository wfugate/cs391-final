import { fetchDrivers } from "../lib/api";
import DriversClient from "../components/DriversClient";
import { Driver } from "../types";

export default async function DriversPage() {
  const drivers = await fetchDrivers() as Driver[];
  
  return <DriversClient drivers={drivers} />;
}