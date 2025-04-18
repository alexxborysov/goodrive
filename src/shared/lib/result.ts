export function success<Payload>(payload: Payload) {
  return { success: payload };
}

export function error<Payload>(payload: Payload) {
  return { error: payload };
}
