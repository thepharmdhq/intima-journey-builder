import React from 'react';

interface Step11Props {
  nextStep: () => void;
}

export const Step11: React.FC<Step11Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 11</h2>
      <p className="text-muted-foreground mb-8">Making progress!</p>
    </div>
  );
};