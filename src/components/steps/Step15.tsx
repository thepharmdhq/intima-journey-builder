import React from 'react';

interface Step15Props {
  nextStep: () => void;
}

export const Step15: React.FC<Step15Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 15</h2>
      <p className="text-muted-foreground mb-8">Final stretch!</p>
    </div>
  );
};