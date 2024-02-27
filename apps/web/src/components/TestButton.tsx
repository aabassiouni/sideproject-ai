'use client';

import { useState } from 'react';
import { Button } from './ui/button';

export default function TestButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500); // Reset after 500ms
  };

  return (
    <Button
      onClick={handleClick}
      className={`relative overflow-hidden p-4 border-2 border-black ${isClicked ? 'animate-pulse' : ''}`}
    >
      Click me
      {isClicked && (
        <svg className="absolute top-0 left-0 w-full h-full animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="0" y="0" width="100" height="100" fill="none" stroke="black" strokeDasharray="10 10" />
        </svg>
      )}
    </Button>
  );
}