export default function FloatingDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, index) => (
        <span
          key={`heart-${index}`}
          className="floating-heart"
          style={{
            left: `${5 + index * 7}%`,
            animationDelay: `${index * 0.7}s`,
            animationDuration: `${8 + (index % 5)}s`
          }}
        >
          ♥
        </span>
      ))}
      {Array.from({ length: 22 }).map((_, index) => (
        <span
          key={`sparkle-${index}`}
          className="sparkle-dot"
          style={{
            left: `${(index * 13) % 100}%`,
            top: `${(index * 19) % 100}%`,
            animationDelay: `${index * 0.35}s`
          }}
        />
      ))}
    </div>
  );
}
