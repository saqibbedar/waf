const blockedIPs = new Set(["192.168.1.100"]); // Add any abusive IPs here

const trustedIPs = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]); // Whitelisted/trusted IPs

const requestTracker = new Map();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 60; // 60 requests per minute
const MAX_DELETE_REQUESTS = 5; // Max 5 deletes per minute

export default function rateLimiter(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress;

  // 1. Block known abusive IPs
  if (blockedIPs.has(ip)) {
    return res
      .status(403)
      .send("<h1>403 - Forbidden</h1><p>Your IP address has been blocked.</p>");
  }

  // 2. Bypass limits for trusted IPs
  if (trustedIPs.has(ip)) {
    return next();
  }

  const now = Date.now();
  if (!requestTracker.has(ip)) {
    requestTracker.set(ip, { count: 0, deleteCount: 0, windowStart: now });
  }

  const client = requestTracker.get(ip);

  // Reset counts after time window expires
  if (now - client.windowStart > WINDOW_MS) {
    client.count = 0;
    client.deleteCount = 0;
    client.windowStart = now;
  }

  client.count += 1;

  // Stricter limit on DELETE operations
  if (req.method === "DELETE") {
    client.deleteCount += 1;
    if (client.deleteCount > MAX_DELETE_REQUESTS) {
      return res
        .status(429)
        .send(
          "<h1>429 - Rate Limit Exceeded</h1><p>Too many delete requests. Please wait a minute.</p>",
        );
    }
  }

  // General request limit
  if (client.count > MAX_REQUESTS) {
    return res
      .status(429)
      .send(
        "<h1>429 - Rate Limit Exceeded</h1><p>Too many requests. Please wait a minute.</p>",
      );
  }

  next();
}
