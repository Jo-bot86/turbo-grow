// Formatiert ISO-8601-Dauer in Tage
export function formatDuration(
  duration: string | null,
  withString: boolean
): string {
  if (!duration) return '';

  const match = duration.match(/^P(\d+)D$/);
  if (!match) return duration;

  const days = parseInt(match[1], 10);
  return withString ? `${days} Tag${days !== 1 ? 'e' : ''}` : `${days}`;
}

// Wandelt wieder in ISO-8601
export function parseDuration(formatted: string | null): string | null {
  const days = parseInt(formatted ?? '');
  return days ? `P${days}D` : '';
}
