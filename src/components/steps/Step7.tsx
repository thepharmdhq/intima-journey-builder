import React from 'react';

interface Step7Props {
  nextStep: () => void;
}

export const Step7: React.FC<Step7Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Step 7</h2>
      <p className="text-muted-foreground mb-8">Customizing your experience.</p>
    </div>
  );
};