import React from "react";

export default function HeroBlob() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-28 flex justify-center">
      <svg
        className="w-[700px] max-w-[90vw] h-auto animate-fade-in"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Decorative pink blob"
      >
        <path
          d="M629.9,352.3c-10.9,107.5-124.7,189.8-238.1,197.8c-113.3,8-208.6-49.9-258.6-140.6c-50-90.7-54.6-214.3,15.3-289.6 c69.9-75.2,215.1-102.2,327.6-69.2C588.6,84,640.8,244.8,629.9,352.3z"
          fill="hsl(var(--accent))"
        />
      </svg>
    </div>
  );
}
