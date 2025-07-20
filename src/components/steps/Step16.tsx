import React from 'react';

interface Step16Props {
  nextStep: () => void;
}

export const Step16: React.FC<Step16Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 16</h2>
      <p className="text-muted-foreground mb-8">You're almost done!</p>
    </div>
  );
};