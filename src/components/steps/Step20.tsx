import React from 'react';

interface Step20Props {
  nextStep: () => void;
}

export const Step20: React.FC<Step20Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Your Intimacy Plan is Ready</h2>
      <p className="text-muted-foreground mb-8">Your personalized plan has been generated and is ready for you to explore.</p>
      
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );
};