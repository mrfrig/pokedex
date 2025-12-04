export function cleanInput(input: string): string[] {
  const trimmed = input.trim();
  if (trimmed.length > 0) {
    return trimmed
      .split(/\s+/)
      .map((word) => word.toLowerCase());
  }
  return [];
}