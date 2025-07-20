import React from 'react';

interface Step3Props {
  nextStep: () => void;
}

export const Step3: React.FC<Step3Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 3</h2>
      <p className="text-muted-foreground mb-8">Your preferences matter.</p>
    </div>
  );
};