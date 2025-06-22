import clsx from "clsx";
import styles from "./Background.module.scss";

function Background() {
  return (
    <div className={clsx(styles.wrapper)}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#0f0f23", stopOpacity: 1 }}
            />
            <stop
              offset="30%"
              style={{ stopColor: "#1a1a2e", stopOpacity: 1 }}
            />
            <stop
              offset="70%"
              style={{ stopColor: "#16213e", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#0e4b57", stopOpacity: 1 }}
            />
          </linearGradient>

          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              style={{ stopColor: "#00f5ff", stopOpacity: 0.1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#7928ca", stopOpacity: 0.05 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#000000", stopOpacity: 0 }}
            />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern
            id="gridPattern"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="#00f5ff"
              strokeWidth="0.5"
              opacity="0.08"
            />
          </pattern>

          <pattern
            id="dotPattern"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="50" cy="50" r="1" fill="#00d4aa" opacity="0.1" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#bgGradient)" />
        <rect width="100%" height="100%" fill="url(#centerGlow)" />
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
        <rect width="100%" height="100%" fill="url(#dotPattern)" />

        <circle
          cx="200"
          cy="200"
          r="120"
          fill="#00f5ff"
          opacity="0.03"
          filter="url(#glow)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 200 200;360 200 200"
            dur="30s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="1720"
          cy="300"
          r="80"
          fill="#7928ca"
          opacity="0.04"
          filter="url(#glow)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 1720 300;-360 1720 300"
            dur="45s"
            repeatCount="indefinite"
          />
        </circle>
        <polygon
          points="1600,150 1750,100 1800,250 1650,300"
          fill="#00d4aa"
          opacity="0.03"
          filter="url(#glow)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 1700 200;360 1700 200"
            dur="40s"
            repeatCount="indefinite"
          />
        </polygon>
        <rect
          x="100"
          y="800"
          width="150"
          height="150"
          fill="#7928ca"
          opacity="0.02"
          transform="rotate(45 175 875)"
          filter="url(#glow)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="45 175 875;405 175 875"
            dur="35s"
            repeatCount="indefinite"
          />
        </rect>
        <circle
          cx="1500"
          cy="800"
          r="100"
          fill="#00f5ff"
          opacity="0.02"
          filter="url(#glow)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 1500 800;360 1500 800"
            dur="50s"
            repeatCount="indefinite"
          />
        </circle>
        <polygon
          points="300,900 400,850 450,950 350,1000"
          fill="#00d4aa"
          opacity="0.03"
          filter="url(#glow)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 375 925;-360 375 925"
            dur="25s"
            repeatCount="indefinite"
          />
        </polygon>
        <ellipse
          cx="800"
          cy="150"
          rx="200"
          ry="50"
          fill="#7928ca"
          opacity="0.02"
          filter="url(#glow)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 800 150;360 800 150"
            dur="60s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse
          cx="400"
          cy="600"
          rx="80"
          ry="160"
          fill="#00f5ff"
          opacity="0.02"
          filter="url(#glow)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 400 600;-360 400 600"
            dur="55s"
            repeatCount="indefinite"
          />
        </ellipse>
        <g opacity="0.4">
          <circle cx="300" cy="400" r="2" fill="#00f5ff">
            <animate
              attributeName="cy"
              values="400;300;400"
              dur="8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="1650" cy="600" r="3" fill="#7928ca">
            <animate
              attributeName="cy"
              values="600;500;600"
              dur="10s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.7;0.3"
              dur="5s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="800" cy="700" r="1.5" fill="#00d4aa">
            <animate
              attributeName="cy"
              values="700;600;700"
              dur="6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.5;0.9;0.5"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="1200" cy="300" r="2.5" fill="#00f5ff">
            <animate
              attributeName="cy"
              values="300;200;300"
              dur="12s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.2;0.6;0.2"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="600" cy="900" r="2" fill="#7928ca">
            <animate
              attributeName="cy"
              values="900;800;900"
              dur="9s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        <path
          d="M0,540 Q480,480 960,540 T1920,540 L1920,580 Q1440,620 960,580 T0,580 Z"
          fill="#00f5ff"
          opacity="0.02"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0;100,0;0,0"
            dur="20s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M0,600 Q480,640 960,600 T1920,600 L1920,640 Q1440,560 960,640 T0,640 Z"
          fill="#7928ca"
          opacity="0.015"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0;-80,0;0,0"
            dur="25s"
            repeatCount="indefinite"
          />
        </path>
        <polygon points="0,0 200,0 0,200" fill="#00d4aa" opacity="0.02" />
        <polygon
          points="1920,0 1720,0 1920,200"
          fill="#7928ca"
          opacity="0.02"
        />
        <polygon points="0,1080 200,1080 0,880" fill="#00f5ff" opacity="0.02" />
        <polygon
          points="1920,1080 1720,1080 1920,880"
          fill="#00d4aa"
          opacity="0.02"
        />
      </svg>
    </div>
  );
}

export default Background;
