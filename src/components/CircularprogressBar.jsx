import React, { useEffect, useState } from 'react';

const CircularProgressBar = ({ progress, size = 100, strokeWidth = 10, color = '#293b61' }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0); // state to animate progress
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  // Animate progress on component load
  useEffect(() => {
    const animation = setInterval(() => {
      setAnimatedProgress((prev) => {
        if (prev < progress) return prev + 1; // increment progress smoothly
        clearInterval(animation); // stop animation at the target progress
        return progress;
      });
    }, 10); // Adjust the speed by changing the interval time

    return () => clearInterval(animation); // Clean up interval on unmount
  }, [progress]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{
          transition: 'stroke-dashoffset 0.5s ease',
        }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        stroke="#4b5563"
        strokeWidth="1px"
        dy=".3em"
        fontSize="18"
        fontWeight="bold"
      >
        {animatedProgress}%
      </text>
    </svg>
  );
};

export default CircularProgressBar;
