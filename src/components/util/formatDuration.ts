export function formatDuration(duration: string | null): string {
  if (!duration) return '-';

  // Zuerst sicherstellen, dass es ein valides ISO-8601-Format ist
  const isoRegex =
    /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;
  const match = duration.match(isoRegex);

  if (!match) return duration;

  // Bedeutungen je nach Position vor/nach T
  const [, years, months, days, hours, minutes, seconds] = match;

  const parts: string[] = [];

  if (years) parts.push(`${years} Jahr${years !== '1' ? 'e' : ''}`);
  if (months) parts.push(`${months} Monat${months !== '1' ? 'e' : ''}`);
  if (days) parts.push(`${days} Tag${days !== '1' ? 'e' : ''}`);
  if (hours) parts.push(`${hours} Stunde${hours !== '1' ? 'n' : ''}`);
  if (minutes) parts.push(`${minutes} Minute${minutes !== '1' ? 'n' : ''}`);
  if (seconds) parts.push(`${seconds} Sekunde${seconds !== '1' ? 'n' : ''}`);

  return parts.length > 0 ? parts.join(', ') : '-';
}
