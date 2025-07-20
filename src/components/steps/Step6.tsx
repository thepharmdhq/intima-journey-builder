import React from 'react';

interface Step6Props {
  nextStep: () => void;
}

export const Step6: React.FC<Step6Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 6</h2>
      <p className="text-muted-foreground mb-8">Building your profile.</p>
    </div>
  );
};