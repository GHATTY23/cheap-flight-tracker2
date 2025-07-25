import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FlightTracker() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState(600);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/mockFlights");
      const cheapFlights = response.data.filter(flight => flight.price <= alertThreshold);
      setFlights(cheapFlights);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 3600000);
    return () => clearInterval(interval);
  }, [alertThreshold]);

  return (
    <>
      <Head>
        <title>Cheap Flight Tracker - SFO to Peru</title>
        <meta name="description" content="Track cheap flights from San Francisco to Peru." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Cheap Flight Tracker: San Francisco to Peru
        </h1>
        <div style={{ marginBottom: '1rem' }}>
          <label>Price Alert Threshold ($)</label>
          <input
            type="number"
            value={alertThreshold}
            onChange={(e) => setAlertThreshold(Number(e.target.value))}
            style={{ display: 'block', padding: '0.5rem', marginTop: '0.5rem', width: '100%' }}
          />
        </div>
        <button onClick={fetchFlights} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
          {loading ? "Checking..." : "Refresh Now"}
        </button>
        <div style={{ marginTop: '2rem' }}>
          {flights.length > 0 ? (
            flights.map((flight, idx) => (
              <div key={idx} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                <p><strong>Airline:</strong> {flight.airline}</p>
                <p><strong>Price:</strong> ${flight.price}</p>
                <p><strong>Departure:</strong> {flight.departure}</p>
                <p><strong>Return:</strong> {flight.return}</p>
                <a href={flight.link} target="_blank" rel="noopener noreferrer">View Deal</a>
              </div>
            ))
          ) : (
            <p>No cheap flights found below ${alertThreshold}.</p>
          )}
        </div>
      </main>
    </>
  );
}
