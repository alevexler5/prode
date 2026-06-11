const DEFAULT_DEV_JWT_SECRET = "change-me-in-development";
const DEFAULT_DEV_CORS_ORIGIN = "http://localhost:5173";

export function getJwtSecret(env: NodeJS.ProcessEnv) {
  const secret = env.JWT_SECRET?.trim();
  const nodeEnv = env.NODE_ENV?.trim() ?? "development";

  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  if (nodeEnv !== "development" && secret === DEFAULT_DEV_JWT_SECRET) {
    throw new Error("JWT_SECRET must be changed outside development");
  }

  return secret;
}

export function getCorsOrigins(env: NodeJS.ProcessEnv) {
  const rawOrigins = env.CORS_ORIGIN?.trim();

  if (!rawOrigins) {
    return [DEFAULT_DEV_CORS_ORIGIN];
  }

  return rawOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}
