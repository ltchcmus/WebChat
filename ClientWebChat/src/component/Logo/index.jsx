function Logo({ ...props }) {
  return (
    <svg viewBox="0 0 214 53" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Background gradient */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#667eea", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#764ba2", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#00f5ff", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#7928ca", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#00d4aa", stopOpacity: 1 }}
          />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Chat bubble icon */}
      <g transform="translate(8, 15)">
        <circle
          cx="8"
          cy="8"
          r="6"
          fill="rgba(0,245,255,0.1)"
          stroke="#00f5ff"
          strokeWidth="1"
        />
        <circle
          cx="16"
          cy="12"
          r="4"
          fill="rgba(121,40,202,0.1)"
          stroke="#7928ca"
          strokeWidth="1"
        />
        <circle cx="3" cy="4" r="1.5" fill="#00f5ff" />
        <circle cx="8" cy="4" r="1.5" fill="#7928ca" />
        <circle cx="13" cy="4" r="1.5" fill="#00d4aa" />
      </g>

      {/* Main text */}
      <text
        x="35"
        y="25"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="bold"
        fill="url(#textGradient)"
        filter="url(#glow)"
      >
        WebChat
      </text>

      {/* LTC text with different styling */}
      <text
        x="35"
        y="40"
        fontFamily="Arial, sans-serif"
        fontSize="9"
        fontWeight="600"
        fill="#00d4aa"
      >
        LTC
      </text>

      {/* Decorative elements */}
      <circle cx="185" cy="12" r="2" fill="#00f5ff" opacity="0.4" />
      <circle cx="192" cy="20" r="1.5" fill="#7928ca" opacity="0.3" />
      <circle cx="198" cy="15" r="1.8" fill="#00d4aa" opacity="0.5" />

      {/* Connection lines */}
      <line
        x1="28"
        y1="22"
        x2="33"
        y2="22"
        stroke="#00f5ff"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="28"
        y1="25"
        x2="33"
        y2="25"
        stroke="#7928ca"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export default Logo;
