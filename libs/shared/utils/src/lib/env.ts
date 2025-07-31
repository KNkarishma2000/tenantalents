export const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] || fallback;
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

//✅ Benefits: Prevents silent misconfigurations; one place for fallback/defaults.
