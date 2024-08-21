import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchWeather = () => {
    fetch(`${import.meta.env.VITE_CANISTER_URL}/weather`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city }),
    })
      .then((response) => response.json())
      .then((json) => {
        setWeather(json);
        setError(null);
      })
      .catch((error) => {
        setError("Failed to fetch weather data");
        setWeather(null);
      });
  };

  return (
    <main>
      <div className="container mt-5">
        <h1 className="mb-4">Weather App</h1>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City:
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={handleFetchWeather}>
          Get Weather
        </button>

        {/* Displaying weather data */}
        {error && <div className="mt-4 text-danger">{error}</div>}
        {weather && (
          <div className="mt-4">
            <h2>Weather Data:</h2>
            <pre>{JSON.stringify(weather, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
