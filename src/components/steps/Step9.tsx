import React from 'react';

interface Step9Props {
  nextStep: () => void;
}

export const Step9: React.FC<Step9Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 9</h2>
      <p className="text-muted-foreground mb-8">Continuing your journey.</p>
    </div>
  );
};