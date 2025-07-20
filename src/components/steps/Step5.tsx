import React from 'react';

interface Step5Props {
  nextStep: () => void;
}

export const Step5: React.FC<Step5Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 5</h2>
      <p className="text-muted-foreground mb-8">Understanding your needs.</p>
    </div>
  );
};