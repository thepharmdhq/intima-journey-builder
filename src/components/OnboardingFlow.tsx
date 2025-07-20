import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Heart, Brain, MessageSquare, Users, Calendar, CheckCircle, Check, ArrowLeft, Mail } from 'lucide-react';

interface FormData {
  firstName?: string;
  selectedPlan?: 'individual' | 'couples';
  intimacyGoals?: string[];
  conflictComfort?: number;
  sexualSatisfaction?: number;
  bodyImageRating?: number;
  email?: string;
}

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const totalSteps = 26;
  const assessmentSteps = 18; // Assessment completes at step 18 (after screen 17)
  
  // Calculate progress - reaches 100% by step 18 (screen 17 is step 18)
  const progressPercentage = currentStep <= assessmentSteps 
    ? Math.min((currentStep / assessmentSteps) * 100, 100)
    : 100;

  const handleNext = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handlePlanSelect = (plan: 'individual' | 'couples') => {
    setFormData(prev => ({ ...prev, selectedPlan: plan }));
    handleNext();
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prevGoals => {
      if (prevGoals.includes(goal)) {
        return prevGoals.filter(g => g !== goal);
      } else {
        return [...prevGoals, goal];
      }
    });
  };

  const handleGoalConfirmation = () => {
    setFormData(prev => ({ ...prev, intimacyGoals: selectedGoals }));
    handleNext();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleConflictComfortChange = (value: number) => {
    setFormData(prev => ({ ...prev, conflictComfort: value }));
    handleNext();
  };

  const handleSexualSatisfactionChange = (value: number) => {
    setFormData(prev => ({ ...prev, sexualSatisfaction: value }));
    handleNext();
  };

  const handleBodyImageRatingChange = (value: number) => {
    setFormData(prev => ({ ...prev, bodyImageRating: value }));
    handleNext();
  };

  const validateFirstName = () => {
    return formData.firstName && formData.firstName.length > 0;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Welcome to Intima</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Start your journey to a more fulfilling and connected relationship.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  What's your first name?
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.firstName || ''}
                  onChange={(e) => handleInputChange(e, 'firstName')}
                />
              </div>

              <Button 
                onClick={handleNext} 
                className="w-full h-12"
                disabled={!validateFirstName()}
              >
                Get Started
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Are you using Intima as an individual or as a couple?</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Choose the option that best fits your relationship dynamic.
              </p>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => handlePlanSelect('individual')} className="flex-1 h-12">
                Individual
              </Button>
              <Button onClick={() => handlePlanSelect('couples')} className="flex-1 h-12">
                Couples
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">What are your primary intimacy goals?</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Select all that apply to help us tailor your experience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={selectedGoals.includes('Improve Communication') ? 'default' : 'outline'}
                onClick={() => toggleGoal('Improve Communication')}
                className="h-12"
              >
                Improve Communication
              </Button>
              <Button
                variant={selectedGoals.includes('Increase Emotional Connection') ? 'default' : 'outline'}
                onClick={() => toggleGoal('Increase Emotional Connection')}
                className="h-12"
              >
                Increase Emotional Connection
              </Button>
              <Button
                variant={selectedGoals.includes('Enhance Physical Intimacy') ? 'default' : 'outline'}
                onClick={() => toggleGoal('Enhance Physical Intimacy')}
                className="h-12"
              >
                Enhance Physical Intimacy
              </Button>
              <Button
                variant={selectedGoals.includes('Resolve Conflicts Constructively') ? 'default' : 'outline'}
                onClick={() => toggleGoal('Resolve Conflicts Constructively')}
                className="h-12"
              >
                Resolve Conflicts Constructively
              </Button>
              <Button
                variant={selectedGoals.includes('Build Trust and Security') ? 'default' : 'outline'}
                onClick={() => toggleGoal('Build Trust and Security')}
                className="h-12"
              >
                Build Trust and Security
              </Button>
              <Button
                variant={selectedGoals.includes('Explore Shared Interests') ? 'default' : 'outline'}
                onClick={() => toggleGoal('Explore Shared Interests')}
                className="h-12"
              >
                Explore Shared Interests
              </Button>
            </div>

            <Button 
              onClick={handleGoalConfirmation} 
              className="w-full h-12"
              disabled={selectedGoals.length === 0}
            >
              Confirm Goals
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">How comfortable are you discussing conflicts?</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Rate your comfort level on a scale of 1 to 10.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span>1 (Not Comfortable)</span>
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="5"
                className="w-full h-1 accent-primary"
                onChange={(e) => handleConflictComfortChange(parseInt(e.target.value))}
              />
              <span>10 (Very Comfortable)</span>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">How would you rate your sexual satisfaction?</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Rate your satisfaction level on a scale of 1 to 10.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span>1 (Not Satisfied)</span>
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="5"
                className="w-full h-1 accent-primary"
                onChange={(e) => handleSexualSatisfactionChange(parseInt(e.target.value))}
              />
              <span>10 (Very Satisfied)</span>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">How do you feel about your body image?</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Rate your body image on a scale of 1 to 10.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span>1 (Negative)</span>
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="5"
                className="w-full h-1 accent-primary"
                onChange={(e) => handleBodyImageRatingChange(parseInt(e.target.value))}
              />
              <span>10 (Positive)</span>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Assessment Complete!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Thank you for completing the assessment.
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleNext} 
                className="flex-1 h-12"
              >
                Continue to Dashboard
              </Button>
            </div>
          </div>
        );

    case 24:
      return (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Save Your Progress</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter your email to save your assessment results and continue your intimacy journey.
            </p>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-foreground mb-3">What you'll get:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Personalized intimacy insights</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Daily relationship prompts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Progress tracking tools</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleNext} 
                className="flex-1 h-12"
                disabled={!formData.email?.includes('@')}
              >
                Continue to Dashboard
              </Button>
            </div>

            <Button 
              variant="ghost" 
              onClick={handleNext}
              className="w-full text-sm text-muted-foreground"
            >
              Continue as guest
            </Button>
          </div>
        </div>
      );

    case 25:
      return (
        <div>
          <h1>Thank you</h1>
        </div>
      );

    case 26:
      return (
        <div>
          <h1>Thank you</h1>
        </div>
      );

    default:
      return <div>Step not found</div>;
  }
};

return (
  <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex flex-col">
    {/* Progress Bar - only show for assessment steps */}
    {currentStep <= assessmentSteps && (
      <div className="w-full bg-secondary/30 h-2">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    )}

    {/* Main Content */}
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50 p-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>

    {/* Navigation */}
    {currentStep < totalSteps && currentStep !== 26 && (
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-border/50">
        <div className="max-w-md mx-auto flex justify-between items-center">
          {currentStep > 1 ? (
            <Button 
              variant="ghost" 
              onClick={handlePrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          ) : (
            <div />
          )}
          
          <span className="text-sm text-muted-foreground">
            {currentStep <= assessmentSteps ? `${currentStep} of ${assessmentSteps}` : ''}
          </span>
          
          <div />
        </div>
      </div>
    )}
  </div>
);
};

export default OnboardingFlow;
