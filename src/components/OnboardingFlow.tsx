import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OnboardingFlowProps {
  onComplete: () => void;
}

interface StepContentProps {
  currentStep: number;
  formData: any;
  setFormData: (data: any) => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const generatePlan = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setCurrentStep(20); // Navigate to Step 20 instead of 21
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <CardHeader>
              <CardTitle>Welcome!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Let's get started with your personalized plan.</p>
            </CardContent>
          </div>
        );
      case 2:
        return (
          <div>
            <CardHeader>
              <CardTitle>Step 2: Tell us about yourself</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Some info about you...</p>
            </CardContent>
          </div>
        );
      case 19:
        return (
          <div>
            <CardHeader>
              <CardTitle>Step 19: Last step before generating plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Almost there!</p>
            </CardContent>
          </div>
        );
      case 20:
        return (
          <div>
            <CardHeader>
              <CardTitle>Your Intimacy Plan is Ready!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Check out your plan</p>
            </CardContent>
          </div>
        );
      case 21:
        return (
          <div>
            <CardHeader>
              <CardTitle>Step 21: Plan Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Here are the details of your plan</p>
            </CardContent>
          </div>
        );
      case 22:
        return (
          <div>
            <CardHeader>
              <CardTitle>Step 22: More Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Even more details</p>
            </CardContent>
          </div>
        );
      case 23:
        return (
          <div>
            <CardHeader>
              <CardTitle>Step 23: Final Step</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is the final step</p>
            </CardContent>
          </div>
        );
      default:
        return (
          <div>
            <CardHeader>
              <CardTitle>Unknown Step</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please go back.</p>
            </CardContent>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of 23</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / 23) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 23) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Generating Your Personalized Plan</h3>
                <p className="text-gray-600">This may take a few moments...</p>
              </div>
            ) : (
              <>
                {renderStepContent()}
                
                <div className="flex justify-between mt-8">
                  {/* Back button */}
                  {currentStep > 1 && !isLoading && (
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      Back
                    </Button>
                  )}

                  <div className="ml-auto space-x-4">
                    {/* Continue button - exclude Step 19 */}
                    {currentStep < 19 && (
                      <Button 
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8"
                      >
                        Continue
                      </Button>
                    )}

                    {/* Generate Plan button - only on Step 19 */}
                    {currentStep === 19 && (
                      <Button 
                        onClick={generatePlan}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8"
                      >
                        Generate Plan
                      </Button>
                    )}

                    {/* Continue button for Step 20+ */}
                    {(currentStep >= 20 && currentStep < 23) && (
                      <Button 
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8"
                      >
                        Continue
                      </Button>
                    )}

                    {/* Complete button - final step */}
                    {currentStep === 23 && (
                      <Button 
                        onClick={onComplete}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8"
                      >
                        Complete Setup
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
