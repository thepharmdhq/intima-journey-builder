import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import DataConsent from './steps/DataConsent';
import Disclaimer from './steps/Disclaimer';
import Introduction from './steps/Introduction';
import AIPlan from './steps/AIPlan';
import { useToast } from "@/components/ui/use-toast"
import { useLoading } from '@/context/LoadingContext';
import { useCompletion } from 'ai/react';
import Personality from './steps/Personality';
import Skills from './steps/Skills';
import Goals from './steps/Goals';
import Summary from './steps/Summary';

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [aiPlan, setAiPlan] = useState<string>('');
  const { toast } = useToast();
  const { setLoading } = useLoading();
  const [userConsent, setUserConsent] = useState<boolean>(false);
  const [personality, setPersonality] = useState<string>('');
	const [skills, setSkills] = useState<string[]>([]);
	const [goals, setGoals] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const { complete, completion, isLoading } = useCompletion({
    api: '/api/completion',
    onFinish: (completion) => {
      setLoading(false);
      setAiPlan(completion);
      toast({
        title: "AI Plan Generated!",
        description: "Check out your AI plan.",
      })
      setShowResults(true);
    },
    onError: (error: Error) => {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      })
    }
  });

  useEffect(() => {
    const storedConsent = localStorage.getItem('userConsent');
    if (storedConsent === 'true') {
      setUserConsent(true);
    }
  }, []);

  const handleNext = async () => {
    if (currentStep === 18) {
      setLoading(true);
      await complete(`
        Skills: ${skills.join(", ")}.
        Goals: ${goals.join(", ")}.
        Personality: ${personality}.
      `);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const canProceed = (): boolean => {
    if (currentStep === 1) return true;
    if (currentStep >= 2 && currentStep <= 18) return true;
    if (currentStep === 19 && userConsent) return true;
    return false;
  };

  const getButtonText = (): string => {
    if (currentStep === 1) return 'Get Started';
    if (currentStep >= 2 && currentStep <= 17) return 'Next';
    if (currentStep === 18) return 'Generate AI Plan';
    if (currentStep === 19) return 'I Consent, Generate AI Plan';
    return 'Next';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="container max-w-2xl p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {currentStep === 1 ? 'Welcome to AI Onboarding' :
            currentStep === 19 ? 'Data Consent & AI Plan' :
              `Step ${currentStep} of 19`}
        </h1>

        {/* Step Content */}
        {currentStep === 1 && <Introduction />}
        {currentStep >= 2 && currentStep <= 6 && <Disclaimer />}
				{currentStep === 7 && <Personality setPersonality={setPersonality} />}
				{currentStep >= 8 && currentStep <= 12 && <Skills skills={skills} setSkills={setSkills} />}
				{currentStep >= 13 && currentStep <= 17 && <Goals goals={goals} setGoals={setGoals} />}
        {currentStep === 18 && <Summary personality={personality} skills={skills} goals={goals} />}
        {currentStep === 19 && <DataConsent aiPlan={aiPlan} userConsent={userConsent} setUserConsent={setUserConsent} />}
        {showResults && <AIPlan aiPlan={aiPlan} />}

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          {/* Back Button - Hidden for steps 19-23 */}
          {!isLoading && !showResults && currentStep > 1 && currentStep < 19 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}

          {/* Primary Action Button */}
          {!showResults && (
            <Button
              onClick={handleNext}
              disabled={isLoading || !canProceed()}
              className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {currentStep === 19 ? 'Generating Plan...' : 'Processing...'}
                </>
              ) : (
                <>
                  {getButtonText()}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}

          {/* Results Navigation */}
          {showResults && (
            <Button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Continue to Dashboard
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
