export function generateColors(count: number): string[] {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    // Espaciado uniforme en el círculo de color
    const hue = Math.round((360 / count) * i);
    colors.push(`hsl(${hue}, 70%, 55%)`);
  }
  return colors;
}