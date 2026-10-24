/** Decorative mandala SVG that spins slowly in the background */

export function Mandala({ className = '', opacity = 0.08 }: { className?: string; opacity?: number }) {
  const petals = 12;
  const radius = 45;
  const center = 50;

  const petalPaths = Array.from({ length: petals }, (_, i) => {
    const angle = (i * 360) / petals;
    return `
      <g transform="rotate(${angle} ${center} ${center})">
        <ellipse cx="${center}" cy="${center - radius / 2}" rx="6" ry="${radius / 2}" fill="none" stroke="currentColor" stroke-width="0.8" />
        <circle cx="${center}" cy="${center - radius / 2 + 8}" r="2.5" fill="currentColor" />
        <circle cx="${center}" cy="${center - radius / 2 - 10}" r="1.5" fill="none" stroke="currentColor" stroke-width="0.6" />
      </g>
    `;
  }).join('');

  const innerPetals = Array.from({ length: petals }, (_, i) => {
    const angle = (i * 360) / petals + 15;
    return `
      <g transform="rotate(${angle} ${center} ${center})">
        <path d="M ${center} ${center} Q ${center + 3} ${center - 15} ${center} ${center - 22} Q ${center - 3} ${center - 15} ${center} ${center}" fill="none" stroke="currentColor" stroke-width="0.6" />
      </g>
    `;
  }).join('');

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ opacity }}
      fill="none"
    >
      <g dangerouslySetInnerHTML={{ __html: petalPaths }} />
      <g dangerouslySetInnerHTML={{ __html: innerPetals }} />
      <circle cx={center} cy={center} r="28" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <circle cx={center} cy={center} r="18" fill="none" stroke="currentColor" strokeWidth="0.4" />
      <circle cx={center} cy={center} r="8" fill="none" stroke="currentColor" strokeWidth="0.4" />
      <circle cx={center} cy={center} r="3" fill="currentColor" />
    </svg>
  );
}
