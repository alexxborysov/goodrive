export function delay(ms: number = 120): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
