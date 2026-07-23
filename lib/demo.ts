export function isDemoContentEnabled() {
  return process.env.NODE_ENV !== "production" && process.env.ENABLE_DEMO_CONTENT === "true";
}
