import React from 'react';

export default function Loading() {
  return (
    <svg
      className={'cartLoading'}
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      viewBox="0 0 128 128">
      <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
      <g>
        <path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#fad26a"
        />
        <path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#fef4da"
          transform="rotate(45 64 64)"
        />
        <path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#fef4da"
          transform="rotate(90 64 64)"
        />
        <path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#fef4da"
          transform="rotate(135 64 64)"
        />
        <path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#fef4da"
          transform="rotate(180 64 64)"
        />
        <path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#fef4da"
          transform="rotate(225 64 64)"
        />
        <path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#fef4da"
          transform="rotate(270 64 64)"
        />
        <path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#fef4da"
          transform="rotate(315 64 64)"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 64 64;45 64 64;90 64 64;135 64 64;180 64 64;225 64 64;270 64 64;315 64 64"
          calcMode="discrete"
          dur="720ms"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}
