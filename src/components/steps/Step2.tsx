import React from 'react';

interface Step2Props {
  nextStep: () => void;
}

export const Step2: React.FC<Step2Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 2</h2>
      <p className="text-muted-foreground mb-8">Tell us about yourself.</p>
    </div>
  );
};