import React from 'react';

interface Step4Props {
  nextStep: () => void;
}

export const Step4: React.FC<Step4Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 4</h2>
      <p className="text-muted-foreground mb-8">Let's explore your goals.</p>
    </div>
  );
};