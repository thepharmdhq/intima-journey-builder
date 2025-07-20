import React from 'react';

export const Results: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Your Plan is Complete!</h2>
      <p className="text-muted-foreground mb-8">
        Congratulations! Your personalized intimacy plan has been created based on your responses.
      </p>
      
      <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-8">
        <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
        View Your Plan
      </button>
    </div>
  );
};