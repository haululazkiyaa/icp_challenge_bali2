import { HttpResponse, HttpTransformArgs } from "azle/canisters/management";
import { Server, ic, query } from "azle";

import express from "express";

export default Server(
  // Server section
  () => {
    const app = express();
    app.use(express.json());

    // Endpoint for fetching weather data
    app.post("/weather", async (req, res) => {
      const { city } = req.body;

      ic.setOutgoingHttpOptions({
        maxResponseBytes: 50_000n,
        cycles: 500_000_000_000n,
        transformMethodName: "transform",
      });

      try {
        const response = await (
          await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`
          )
        ).json();
        res.json(response);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
      }
    });

    // Serve static files (if any)
    app.use(express.static("/dist"));

    return app.listen();
  },
  // Candid section
  {
    transform: query([HttpTransformArgs], HttpResponse, (args) => {
      return {
        ...args.response,
        headers: [],
      };
    }),
  }
);
