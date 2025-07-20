import React from 'react';

interface Step14Props {
  nextStep: () => void;
}

export const Step14: React.FC<Step14Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 14</h2>
      <p className="text-muted-foreground mb-8">Almost at the finish line!</p>
    </div>
  );
};