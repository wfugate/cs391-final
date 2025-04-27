import { fetchLatestSessionKey } from "../lib/api";
import TelemetryClient from "../components/TelemetryClient";

export default async function TelemetryPage() {
    const sessionKey = await fetchLatestSessionKey();

    if (sessionKey === null) {
        return <div>Could not determine the current race session.</div>;
    }

    return <TelemetryClient sessionKey={sessionKey} drivers={[]} />;
}
