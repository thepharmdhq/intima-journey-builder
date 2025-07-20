import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';
import { Step5 } from './steps/Step5';
import { Step6 } from './steps/Step6';
import { Step7 } from './steps/Step7';
import { Step8 } from './steps/Step8';
import { Step9 } from './steps/Step9';
import { Step10 } from './steps/Step10';
import { Step11 } from './steps/Step11';
import { Step12 } from './steps/Step12';
import { Step13 } from './steps/Step13';
import { Step14 } from './steps/Step14';
import { Step15 } from './steps/Step15';
import { Step16 } from './steps/Step16';
import { Step17 } from './steps/Step17';
import { Step18 } from './steps/Step18';
import { Step19 } from './steps/Step19';
import { Step20 } from './steps/Step20';
import { Results } from './Results';

export const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [consentToDataSharing, setConsentToDataSharing] = useState(false);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

	const generatePlan = async () => {
		setIsLoading(true);
		// Simulate loading
		await new Promise((resolve) => setTimeout(resolve, 3000));
		setIsLoading(false);
		setShowResults(true);
	};

  return (
    <div className="flex flex-col h-full">
      {currentStep === 1 && <Step1 nextStep={nextStep} />}
      {currentStep === 2 && <Step2 nextStep={nextStep} />}
      {currentStep === 3 && <Step3 nextStep={nextStep} />}
      {currentStep === 4 && <Step4 nextStep={nextStep} />}
      {currentStep === 5 && <Step5 nextStep={nextStep} />}
      {currentStep === 6 && <Step6 nextStep={nextStep} />}
      {currentStep === 7 && <Step7 nextStep={nextStep} />}
      {currentStep === 8 && <Step8 nextStep={nextStep} />}
      {currentStep === 9 && <Step9 nextStep={nextStep} />}
      {currentStep === 10 && <Step10 nextStep={nextStep} />}
      {currentStep === 11 && <Step11 nextStep={nextStep} />}
      {currentStep === 12 && <Step12 nextStep={nextStep} />}
      {currentStep === 13 && <Step13 nextStep={nextStep} />}
      {currentStep === 14 && <Step14 nextStep={nextStep} />}
      {currentStep === 15 && <Step15 nextStep={nextStep} />}
      {currentStep === 16 && <Step16 nextStep={nextStep} />}
      {currentStep === 17 && <Step17 nextStep={nextStep} />}
      {currentStep === 18 && <Step18 nextStep={nextStep} />}
      {currentStep === 19 && <Step19 nextStep={nextStep} consentToDataSharing={consentToDataSharing} setConsentToDataSharing={setConsentToDataSharing} />}
      {currentStep === 20 && <Step20 nextStep={nextStep} />}
      {showResults && <Results />}

          {/* Navigation - Fixed at bottom */}
          {!isLoading && !showResults && currentStep > 1 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-border/50 p-4">
              <div className={`max-w-sm mx-auto flex ${currentStep >= 19 ? 'justify-center' : 'justify-between'}`}>
                {currentStep < 19 && (
                  <Button 
                    variant="ghost" 
                    onClick={prevStep}
                    className="flex items-center gap-2 text-muted-foreground min-h-[44px]"
                    size="sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                )}
                
                {currentStep < 19 && (
                  <Button 
                    onClick={nextStep}
                    className="min-h-[44px] font-medium shadow-soft"
                    size="sm"
                  >
                    Continue
                  </Button>
                )}
                
                {currentStep === 19 && (
                  <Button 
                    onClick={generatePlan}
                    disabled={!consentToDataSharing}
                    className="min-h-[44px] font-medium shadow-soft"
                    size="sm"
                  >
                    {isGeneratingPlan ? 'Generating...' : 'Generate Plan'}
                  </Button>
                )}

                {currentStep >= 20 && (
                  <Button 
                    onClick={nextStep}
                    className="min-h-[44px] font-medium shadow-soft"
                    size="sm"
                  >
                    Continue
                  </Button>
                )}
              </div>
            </div>
          )}
    </div>
  );
};
