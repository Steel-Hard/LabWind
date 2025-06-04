import React from 'react';

interface WaveProps {
  percent: number;
  color: string;
}

const Wave: React.FC<WaveProps> = ({ percent }) => {
  const y = 100 - (percent / 100) * 100;

  return (
    <svg className="wave-svg" viewBox="0 0 200 100" preserveAspectRatio="none">
      <path
        className="wave-path"
        d={`M0,${y} Q25,${y - 8} 50,${y} T100,${y} T150,${y} T200,${y} V100 H0 Z`}
      />
    </svg>
  );
};

export default Wave;
