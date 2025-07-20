import React from 'react';

interface Step10Props {
  nextStep: () => void;
}

export const Step10: React.FC<Step10Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 10</h2>
      <p className="text-muted-foreground mb-8">Halfway through!</p>
    </div>
  );
};