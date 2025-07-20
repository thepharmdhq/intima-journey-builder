import React from 'react';

interface Step17Props {
  nextStep: () => void;
}

export const Step17: React.FC<Step17Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 17</h2>
      <p className="text-muted-foreground mb-8">Nearly there!</p>
    </div>
  );
};