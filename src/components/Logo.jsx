export default function Logo({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoBg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4a9e8e" />
          <stop offset="1" stopColor="#2d8b7a" />
        </linearGradient>
      </defs>
      {/* Rounded square background */}
      <rect width="48" height="48" rx="14" fill="url(#logoBg)" />
      {/* Stylized swirl/link icon — similar to the reference */}
      <path
        d="M28 14C23.6 14 20 17.6 20 22L20 24C20 26.2 18.2 28 16 28C13.8 28 12 26.2 12 24L12 22"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 34C24.4 34 28 30.4 28 26L28 24C28 21.8 29.8 20 32 20C34.2 20 36 21.8 36 24L36 26"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Small accent dot */}
      <circle cx="12" cy="19" r="2" fill="white" opacity="0.8" />
      <circle cx="36" cy="29" r="2" fill="white" opacity="0.8" />
    </svg>
  );
}
