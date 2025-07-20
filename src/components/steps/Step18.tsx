import React from 'react';

interface Step18Props {
  nextStep: () => void;
}

export const Step18: React.FC<Step18Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 18</h2>
      <p className="text-muted-foreground mb-8">Just a couple more steps!</p>
    </div>
  );
};