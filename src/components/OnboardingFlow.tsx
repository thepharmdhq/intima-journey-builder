import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Heart, CalendarIcon, Loader2, Sparkles, Users, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface OnboardingData {
  firstName: string;
  age: string;
  biologicalSex: string;
  genderIdentity: string;
  relationshipStatus: string;
  lastPartnership?: Date;
  sexuallyActive: boolean;
  partnersLastYear: number;
  intimacyGoals: string[];
  affectionFrequency: string;
  dataConsent: boolean;
}

const TOTAL_STEPS = 9;

const INTIMACY_GOALS = [
  'Emotional Closeness',
  'Physical Affection', 
  'Communication',
  'Trust',
  'Other'
];

const LOADING_FACTS = [
  "Did you know? Couples who show affection daily report 40% higher relationship satisfaction.",
  "Research shows that physical touch releases oxytocin, the 'bonding hormone'.",
  "Communication is the #1 predictor of relationship longevity according to relationship experts.",
  "Trust-building exercises can increase intimacy by up to 60% in just 30 days.",
  "Emotional intimacy often precedes and enhances physical intimacy in lasting relationships."
];

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    firstName: '',
    age: '',
    biologicalSex: '',
    genderIdentity: '',
    relationshipStatus: '',
    sexuallyActive: false,
    partnersLastYear: 0,
    intimacyGoals: [],
    affectionFrequency: '',
    dataConsent: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFactIndex, setLoadingFactIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Cycling loading facts
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingFactIndex((prev) => (prev + 1) % LOADING_FACTS.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 2:
        return data.firstName && data.age && data.biologicalSex && data.genderIdentity;
      case 3:
        return data.relationshipStatus && (data.relationshipStatus !== 'Single' || data.lastPartnership);
      case 4:
        return true; // Optional step
      case 5:
        return data.intimacyGoals.length > 0;
      case 6:
        return data.affectionFrequency;
      case 7:
        return data.dataConsent;
      default:
        return true;
    }
  };

  const handleGoalToggle = (goal: string) => {
    setData(prev => ({
      ...prev,
      intimacyGoals: prev.intimacyGoals.includes(goal)
        ? prev.intimacyGoals.filter(g => g !== goal)
        : [...prev.intimacyGoals, goal]
    }));
  };

  const generatePlan = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    setIsLoading(false);
    setShowResults(true);
    setCurrentStep(TOTAL_STEPS);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="space-y-2">
              <Heart className="w-16 h-16 mx-auto text-primary animate-pulse-glow" />
              <h1 className="text-4xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                Deepen Your Connection
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Answer a few questions—get your personalized intimacy plan.
              </p>
            </div>
            <Button 
              variant="gradient" 
              size="lg" 
              onClick={nextStep}
              className="text-lg px-12 py-6 h-auto"
            >
              Let's Begin
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Tell us about yourself</h2>
              <p className="text-muted-foreground">Let's start with the basics</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={data.firstName}
                  onChange={(e) => updateData('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  className="transition-all duration-300 focus:shadow-soft"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={data.age}
                  onChange={(e) => updateData('age', e.target.value)}
                  placeholder="Enter your age"
                  className="transition-all duration-300 focus:shadow-soft"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Biological Sex</Label>
                <Select value={data.biologicalSex} onValueChange={(value) => updateData('biologicalSex', value)}>
                  <SelectTrigger className="transition-all duration-300 focus:shadow-soft">
                    <SelectValue placeholder="Select biological sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="intersex">Intersex</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Gender Identity</Label>
                <Select value={data.genderIdentity} onValueChange={(value) => updateData('genderIdentity', value)}>
                  <SelectTrigger className="transition-all duration-300 focus:shadow-soft">
                    <SelectValue placeholder="Select gender identity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="man">Man</SelectItem>
                    <SelectItem value="woman">Woman</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Users className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Relationship Status</h2>
              <p className="text-muted-foreground">Help us understand your current situation</p>
            </div>
            
            <div className="space-y-4">
              <RadioGroup 
                value={data.relationshipStatus} 
                onValueChange={(value) => updateData('relationshipStatus', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="Single" id="single" />
                  <Label htmlFor="single" className="flex-1 cursor-pointer">Single</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="Partnered" id="partnered" />
                  <Label htmlFor="partnered" className="flex-1 cursor-pointer">Partnered</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="Married" id="married" />
                  <Label htmlFor="married" className="flex-1 cursor-pointer">Married</Label>
                </div>
              </RadioGroup>
              
              {data.relationshipStatus === 'Single' && (
                <div className="space-y-2 animate-slide-up">
                  <Label>When was your last partnership?</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !data.lastPartnership && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {data.lastPartnership ? format(data.lastPartnership, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={data.lastPartnership}
                        onSelect={(date) => updateData('lastPartnership', date)}
                        disabled={(date) => date > new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Sex & Intimacy History</h2>
              <p className="text-muted-foreground">This helps us personalize your recommendations</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base">Have you been sexually active?</Label>
                <RadioGroup 
                  value={data.sexuallyActive.toString()} 
                  onValueChange={(value) => updateData('sexuallyActive', value === 'true')}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="active-yes" />
                    <Label htmlFor="active-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="active-no" />
                    <Label htmlFor="active-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {data.sexuallyActive && (
                <div className="space-y-4 animate-slide-up">
                  <Label className="text-base">Number of partners in the past year</Label>
                  <div className="space-y-4">
                    <Slider
                      value={[data.partnersLastYear]}
                      onValueChange={(value) => updateData('partnersLastYear', value[0])}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className="text-2xl font-semibold text-primary">{data.partnersLastYear}</span>
                      <span className="text-muted-foreground ml-2">
                        {data.partnersLastYear === 1 ? 'partner' : 'partners'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <MessageCircle className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Intimacy Goals</h2>
              <p className="text-muted-foreground">What areas would you like to improve? (Select all that apply)</p>
            </div>
            
            <div className="space-y-3">
              {INTIMACY_GOALS.map((goal) => (
                <div 
                  key={goal}
                  className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleGoalToggle(goal)}
                >
                  <Checkbox 
                    checked={data.intimacyGoals.includes(goal)}
                    onChange={() => handleGoalToggle(goal)}
                  />
                  <Label className="flex-1 cursor-pointer">{goal}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Affection Frequency</h2>
              <p className="text-muted-foreground">How often do you currently express or receive affection?</p>
            </div>
            
            <RadioGroup 
              value={data.affectionFrequency} 
              onValueChange={(value) => updateData('affectionFrequency', value)}
              className="space-y-3"
            >
              {[
                { value: 'daily', label: 'Daily', description: 'Multiple times per day' },
                { value: 'weekly', label: 'Weekly', description: 'Several times a week' },
                { value: 'monthly', label: 'Few times per month', description: 'Occasionally throughout the month' },
                { value: 'rarely', label: 'Rarely', description: 'Very infrequently' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="cursor-pointer font-medium">{option.label}</Label>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Data Consent & AI Plan</h2>
              <p className="text-muted-foreground">Final step before generating your personalized plan</p>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-subtle rounded-lg border">
                <p className="text-center text-foreground">
                  We'll use your responses to generate an AI-driven Intimacy Health Plan tailored specifically for you.
                </p>
              </div>
              
              <div className="flex items-start space-x-3 p-4 rounded-lg border">
                <Checkbox 
                  checked={data.dataConsent}
                  onCheckedChange={(checked) => updateData('dataConsent', checked)}
                  id="consent"
                />
                <div className="space-y-1">
                  <Label htmlFor="consent" className="cursor-pointer">
                    I agree to share my data with Intima (OpenAI + Supabase).
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Your data will be used to create personalized recommendations and is stored securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-8 animate-fade-in text-center">
            <div className="space-y-4">
              <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
              <h2 className="text-2xl font-semibold">Creating Your Intimacy Plan</h2>
              <p className="text-muted-foreground">Our AI is analyzing your responses...</p>
            </div>
            
            <div className="p-6 bg-gradient-subtle rounded-lg border">
              <p className="text-foreground animate-fade-in" key={loadingFactIndex}>
                {LOADING_FACTS[loadingFactIndex]}
              </p>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-4">
              <Sparkles className="w-16 h-16 mx-auto text-primary animate-pulse-glow" />
              <h2 className="text-3xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                Your Intimacy Plan is Ready!
              </h2>
              <p className="text-muted-foreground">
                Based on your responses, we've created a personalized plan just for you.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="p-6 bg-gradient-subtle rounded-lg border">
                <h3 className="font-semibold text-lg mb-3">Recommended Assessments</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>PAIR (Personal Assessment of Intimacy in Relationships)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Gottman Relationship Modules</span>
                  </li>
                  {data.sexuallyActive && (
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>FSFI (Female Sexual Function Index)</span>
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="p-6 bg-card rounded-lg border shadow-soft">
                <h3 className="font-semibold text-lg mb-3">Next Steps</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Daily intimacy building exercises</li>
                  <li>• Weekly check-in questions</li>
                  <li>• Personalized communication tools</li>
                  <li>• Progress tracking dashboard</li>
                </ul>
              </div>
            </div>
            
            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full text-lg py-6 h-auto"
              onClick={() => {/* Handle signup */}}
            >
              Save My Plan → Sign Up
              <Heart className="ml-2 w-5 h-5" />
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-sunset flex items-center justify-center p-4">
        <Card className="w-full max-w-lg shadow-card animate-fade-in">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sunset flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-card animate-fade-in">
        <CardHeader className="text-center">
          <div className="space-y-3">
            <Progress value={(currentStep / TOTAL_STEPS) * 100} className="w-full" />
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {TOTAL_STEPS}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          {renderStep()}
          
          {currentStep > 1 && currentStep < 7 && (
            <div className="flex gap-3 mt-8">
              <Button 
                variant="outline" 
                onClick={prevStep}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          )}
          
          {currentStep === 7 && (
            <div className="flex gap-3 mt-8">
              <Button 
                variant="outline" 
                onClick={prevStep}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                variant="glow"
                onClick={generatePlan}
                disabled={!data.dataConsent}
                className="flex-1"
              >
                Generate My Plan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}