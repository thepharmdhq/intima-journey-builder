import React from 'react';

interface Step13Props {
  nextStep: () => void;
}

export const Step13: React.FC<Step13Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 13</h2>
      <p className="text-muted-foreground mb-8">You're doing great!</p>
    </div>
  );
};