import React from 'react';

interface Step1Props {
  nextStep: () => void;
}

export const Step1: React.FC<Step1Props> = ({ nextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Journey</h1>
      <p className="text-muted-foreground mb-8">Let's start by getting to know you better.</p>
      <button 
        onClick={nextStep}
        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Get Started
      </button>
    </div>
  );
};