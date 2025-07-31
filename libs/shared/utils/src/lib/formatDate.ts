export const formatDate = (date: Date = new Date()): string =>
  date.toISOString();

// ✅ Benefits: Standard logging format for OpenTelemetry, Loki, and timestamps in events.
