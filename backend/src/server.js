const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { shortestPath } = require("./services/dijkstra");

const app = express();
app.use(cors());
app.use(express.json());

// --- Load graph from JSON (Bengaluru sample) ---
const GRAPH_PATH = path.join(__dirname, "data", "graph.bangalore.json");
const graph = JSON.parse(fs.readFileSync(GRAPH_PATH, "utf-8"));
if (!graph?.stations || !graph?.edges) {
  throw new Error("Invalid graph JSON structure");
}

// Health
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Stations + edges
app.get("/api/graph", (_req, res) => res.json(graph));

// Shortest route
// /api/route?src=BYPL&dst=MJSK&mode=stops|time
app.get("/api/route", (req, res) => {
  const { src, dst, mode = "stops" } = req.query;
  if (!src || !dst) return res.status(400).json({ error: "src and dst required" });
  if (!graph.stations[src] || !graph.stations[dst]) {
    return res.status(400).json({ error: "invalid station code(s)" });
  }
  try {
    const result = shortestPath(graph, src, dst, mode);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Fare (simple rule)
app.get("/api/fare", (req, res) => {
  const stops = Number(req.query.stops || 0);
  const fare = 10 + 3 * Math.max(0, stops - 1);
  res.json({ stops, fare });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ API running at http://localhost:${PORT}`));