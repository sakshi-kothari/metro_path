/**
 * Dijkstra for two modes:
 * - "stops": each edge cost = 1
 * - "time":  edge cost = edge.time (minutes)
 */
function shortestPath(graph, src, dst, mode = "stops") {
  const weightOf = (edge) => (mode === "time" ? edge.time : 1);
  const dist = {};
  const prev = {};
  const visited = new Set();

  Object.keys(graph.stations).forEach((id) => (dist[id] = Infinity));
  dist[src] = 0;

  while (true) {
    let u = null;
    let best = Infinity;
    for (const id in dist) {
      if (!visited.has(id) && dist[id] < best) {
        best = dist[id];
        u = id;
      }
    }
    if (u === null) break;
    if (u === dst) break;
    visited.add(u);

    for (const e of graph.edges[u] || []) {
      const v = e.to;
      const alt = dist[u] + weightOf(e);
      if (alt < dist[v]) {
        dist[v] = alt;
        prev[v] = u;
      }
    }
  }

  if (dist[dst] === Infinity) throw new Error("No path found");

  const path = [];
  for (let at = dst; at !== undefined; at = prev[at]) path.push(at);
  path.reverse();

  const stops = path.length - 1;
  const totalTime = path.reduce((sum, node, i) => {
    if (i === 0) return 0;
    const from = path[i - 1];
    const edge = (graph.edges[from] || []).find((x) => x.to === node);
    return sum + (edge?.time || 0);
  }, 0);

  const fare = 10 + 3 * Math.max(0, stops - 1);

  return { src, dst, mode, path, stops, totalTime, fare };
}

module.exports = { shortestPath };