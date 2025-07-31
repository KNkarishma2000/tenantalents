export const safeParseJSON = <T>(str: string): T | null => {
  try {
    return JSON.parse(str) as T;
  } catch {
    return null;
  }
};

// ✅ Benefits: Prevents service crashes when receiving malformed JSON.
