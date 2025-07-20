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
import { Heart, CalendarIcon, Loader2, Sparkles, Users, MessageCircle, ArrowLeft, Mail, Lock } from 'lucide-react';
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

interface LoginData {
  email: string;
  password: string;
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
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
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

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
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

  const updateLoginData = (field: keyof LoginData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    if (loginError) setLoginError(''); // Clear error when user types
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

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      setLoginError('Please enter both email and password');
      return;
    }

    setIsLoginLoading(true);
    setLoginError('');

    try {
      // TODO: Implement Supabase authentication
      // For now, simulate login process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful login - in real app this would redirect to dashboard
      console.log('Login successful for:', loginData.email);
      
    } catch (error) {
      setLoginError('Invalid email or password. Please try again.');
    } finally {
      setIsLoginLoading(false);
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

  const renderLoginForm = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <Heart className="w-16 h-16 mx-auto text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome Back
              </h1>
              <p className="text-muted-foreground mt-2">
                Sign in to continue your intimacy journey
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <Input
                id="login-email"
                type="email"
                value={loginData.email}
                onChange={(e) => updateLoginData('email', e.target.value)}
                placeholder="Email"
                className="h-14 text-base bg-white border-border rounded-2xl px-4 shadow-sm"
                disabled={isLoginLoading}
              />
              <Input
                id="login-password"
                type="password"
                value={loginData.password}
                onChange={(e) => updateLoginData('password', e.target.value)}
                placeholder="Password"
                className="h-14 text-base bg-white border-border rounded-2xl px-4 shadow-sm"
                disabled={isLoginLoading}
              />
            </div>

            {loginError && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
                <p className="text-sm text-destructive text-center">{loginError}</p>
              </div>
            )}

            <div className="space-y-4 pt-2">
              <Button 
                onClick={handleLogin}
                disabled={isLoginLoading || !loginData.email || !loginData.password}
                className="w-full h-14 text-base font-semibold rounded-2xl shadow-md"
                variant="gradient"
              >
                {isLoginLoading ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <button 
                className="text-sm text-muted-foreground hover:text-primary transition-colors block w-full text-center"
                onClick={() => {/* TODO: Implement forgot password */}}
              >
                Forgot your password?
              </button>
            </div>

            <div className="pt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={() => setIsLoginMode(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    if (isLoginMode) {
      return renderLoginForm();
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-6">
              <Heart className="w-20 h-20 mx-auto text-primary" />
              <div className="space-y-3">
                <h1 className="text-3xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                  Deepen Your Connection
                </h1>
                <p className="text-muted-foreground">
                  Answer a few questions—get your personalized intimacy plan.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                variant="gradient" 
                onClick={nextStep}
                className="w-full h-14 text-base font-semibold rounded-2xl shadow-md"
              >
                Let's Begin
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>

              <div className="pt-6">
                <p className="text-sm text-muted-foreground mb-3">
                  Already have an account?
                </p>
                <Button 
                  variant="ghost" 
                  onClick={() => setIsLoginMode(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Log In
                </Button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Tell us about yourself</h2>
              <p className="text-muted-foreground text-sm">Let's start with the basics</p>
            </div>
            
            <div className="space-y-4">
              <Input
                id="firstName"
                value={data.firstName}
                onChange={(e) => updateData('firstName', e.target.value)}
                placeholder="First Name"
                className="h-14 text-base bg-white border-border rounded-2xl px-4 shadow-sm"
              />
              
              <Input
                id="age"
                type="number"
                value={data.age}
                onChange={(e) => updateData('age', e.target.value)}
                placeholder="Age"
                className="h-14 text-base bg-white border-border rounded-2xl px-4 shadow-sm"
              />
              
              <Select value={data.biologicalSex} onValueChange={(value) => updateData('biologicalSex', value)}>
                <SelectTrigger className="h-14 text-base bg-white border-border rounded-2xl px-4 shadow-sm">
                  <SelectValue placeholder="Biological sex" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="intersex">Intersex</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={data.genderIdentity} onValueChange={(value) => updateData('genderIdentity', value)}>
                <SelectTrigger className="h-14 text-base bg-white border-border rounded-2xl px-4 shadow-sm">
                  <SelectValue placeholder="Gender identity" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="man">Man</SelectItem>
                  <SelectItem value="woman">Woman</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <Users className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Relationship Status</h2>
              <p className="text-muted-foreground text-sm">Help us understand your current situation</p>
            </div>
            
            <div className="space-y-3">
              <RadioGroup 
                value={data.relationshipStatus} 
                onValueChange={(value) => updateData('relationshipStatus', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <RadioGroupItem value="Single" id="single" />
                  <Label htmlFor="single" className="flex-1 cursor-pointer text-base">Single</Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <RadioGroupItem value="Partnered" id="partnered" />
                  <Label htmlFor="partnered" className="flex-1 cursor-pointer text-base">Partnered</Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <RadioGroupItem value="Married" id="married" />
                  <Label htmlFor="married" className="flex-1 cursor-pointer text-base">Married</Label>
                </div>
              </RadioGroup>
              
              {data.relationshipStatus === 'Single' && (
                <div className="pt-4 animate-slide-up">
                  <p className="text-sm text-muted-foreground mb-3">When was your last partnership?</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-14 justify-start text-left font-normal bg-white border-border rounded-2xl px-4 shadow-sm",
                          !data.lastPartnership && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {data.lastPartnership ? format(data.lastPartnership, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
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
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Sex & Intimacy History</h2>
              <p className="text-muted-foreground text-sm">This helps us personalize your recommendations</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-base font-medium text-center">Have you been sexually active?</p>
                <div className="space-y-3">
                  <RadioGroup 
                    value={data.sexuallyActive.toString()} 
                    onValueChange={(value) => updateData('sexuallyActive', value === 'true')}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer">
                      <RadioGroupItem value="true" id="active-yes" />
                      <Label htmlFor="active-yes" className="flex-1 cursor-pointer text-base">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer">
                      <RadioGroupItem value="false" id="active-no" />
                      <Label htmlFor="active-no" className="flex-1 cursor-pointer text-base">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              {data.sexuallyActive && (
                <div className="space-y-6 animate-slide-up">
                  <p className="text-base font-medium text-center">Number of partners in the past year</p>
                  <div className="space-y-4">
                    <Slider
                      value={[data.partnersLastYear]}
                      onValueChange={(value) => updateData('partnersLastYear', value[0])}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className="text-3xl font-bold text-primary">{data.partnersLastYear}</span>
                      <span className="text-muted-foreground ml-2 text-base">
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
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <MessageCircle className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Intimacy Goals</h2>
              <p className="text-muted-foreground text-sm">What areas would you like to improve? (Select all that apply)</p>
            </div>
            
            <div className="space-y-3">
              {INTIMACY_GOALS.map((goal) => (
                <div 
                  key={goal}
                  className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleGoalToggle(goal)}
                >
                  <Checkbox 
                    checked={data.intimacyGoals.includes(goal)}
                    onChange={() => handleGoalToggle(goal)}
                  />
                  <Label className="flex-1 cursor-pointer text-base">{goal}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Affection Frequency</h2>
              <p className="text-muted-foreground text-sm">How often do you currently express or receive affection?</p>
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
                <div key={option.value} className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="cursor-pointer font-medium text-base">{option.label}</Label>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 7:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Data Consent & AI Plan</h2>
              <p className="text-muted-foreground text-sm">Final step before generating your personalized plan</p>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-subtle rounded-2xl border shadow-sm">
                <p className="text-center text-foreground text-base">
                  We'll use your responses to generate an AI-driven Intimacy Health Plan tailored specifically for you.
                </p>
              </div>
              
              <div className="flex items-start space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm">
                <Checkbox 
                  checked={data.dataConsent}
                  onCheckedChange={(checked) => updateData('dataConsent', checked)}
                  id="consent"
                  className="mt-0.5"
                />
                <div className="space-y-2">
                  <Label htmlFor="consent" className="cursor-pointer text-base font-medium">
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

  if (isLoginMode) {
    return renderLoginForm();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Progress Bar - Fixed at top */}
      {currentStep > 1 && currentStep <= TOTAL_STEPS && !showResults && (
        <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-border/50 z-50">
          <div className="max-w-sm mx-auto px-6 py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-muted-foreground">
                {currentStep - 1} of {TOTAL_STEPS - 1}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {Math.round(((currentStep - 1) / (TOTAL_STEPS - 1)) * 100)}%
              </span>
            </div>
            <Progress 
              value={((currentStep - 1) / (TOTAL_STEPS - 1)) * 100} 
              className="h-1 bg-muted/50"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4 pt-20">
        <div className="w-full max-w-sm">
          {isLoading && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="w-20 h-20 mx-auto bg-gradient-sunset rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-10 h-10 text-white animate-spin" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Creating Your Plan</h2>
                <p className="text-muted-foreground text-sm animate-fade-in" key={loadingFactIndex}>
                  {LOADING_FACTS[loadingFactIndex]}
                </p>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2">
                <div className="bg-gradient-sunset h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
              </div>
            </div>
          )}

          {!isLoading && !showResults && renderStep()}

          {showResults && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="w-20 h-20 mx-auto bg-gradient-sunset rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                  Your Plan is Ready!
                </h2>
                <p className="text-muted-foreground">
                  We've created a personalized intimacy journey just for you, {data.firstName}.
                </p>
              </div>
              <Button 
                variant="gradient" 
                className="w-full h-14 text-base font-semibold rounded-2xl shadow-md"
              >
                View My Plan
                <Heart className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Navigation - Fixed at bottom */}
          {!isLoading && !showResults && currentStep > 1 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-border/50 p-4">
              <div className="max-w-sm mx-auto flex justify-between">
                <Button 
                  variant="ghost" 
                  onClick={prevStep}
                  className="flex items-center gap-2 text-muted-foreground"
                  size="sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                
                {currentStep < TOTAL_STEPS - 1 && (
                  <Button 
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="h-11 px-8 rounded-full shadow-sm"
                    variant="default"
                  >
                    Continue
                  </Button>
                )}
                
                {currentStep === TOTAL_STEPS - 1 && (
                  <Button 
                    onClick={generatePlan}
                    disabled={!isStepValid()}
                    className="h-11 px-8 rounded-full shadow-sm"
                    variant="gradient"
                  >
                    Generate Plan
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
