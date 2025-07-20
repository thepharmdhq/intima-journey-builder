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
import { Textarea } from '@/components/ui/textarea';
import { Heart, CalendarIcon, Loader2, Sparkles, Users, MessageCircle, ArrowLeft, Mail, Lock, Brain, Zap, Shield, Star, Clock, Activity, Eye, Target, Crown, Bell, BellRing, Check } from 'lucide-react';
import Dashboard from './Dashboard';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface OnboardingData {
  // Basic Demographics (Steps 2-4)
  firstName: string;
  age: string;
  biologicalSex: string;
  genderIdentity: string;
  relationshipStatus: string;
  lastPartnership?: Date;
  sexuallyActive: boolean;
  partnersLastYear: number;
  
  // Attachment & Emotional Security (Steps 5-6)
  anxietyAttachment: number;
  avoidanceAttachment: number;
  reachesOutWhenUpset: boolean;
  
  // Love Languages (Step 7)
  loveLanguagesRanked: string[];
  
  // Communication & Conflict (Step 8)
  conflictComfort: number;
  conflictStyle: string;
  
  // Sexual Desire & Patterns (Steps 9-10)
  desireFrequency: string;
  arousalTriggers: string[];
  sexualSatisfaction: number;
  sexualBlocks: string[];
  sexualBlocksDescription: string;
  
  // Body Awareness & Boundaries (Steps 11-12)
  bodyExplorationComfort: number;
  enjoysSensateFocus: string;
  consentPreferences: string[];
  activitiesToAvoid: string[];
  activitiesToAvoidOther: string;
  
  // Fantasy & Exploration (Step 13)
  fantasyOpenness: number;
  explorationInterests: string[];
  
  // Lifestyle & Wellbeing (Steps 14-16)
  weeklyCheckIns: number;
  preferredIntimacyTime: string;
  currentStressLevel: number;
  sleepQuality: string;
  bodyImageRating: number;
  hasBodyImageConcerns: boolean;
  bodyImageConcernsDescription: string;
  
  // Existing Goals & Final Steps (Steps 17-18)
  intimacyGoals: string[];
  affectionFrequency: string;
  dataConsent: boolean;
  
  // Subscription Flow
  selectedPlan: 'individual' | 'couples';
  selectedBilling: 'monthly' | 'yearly';
  
  // Progress Save & Welcome
  email: string;
}

interface LoginData {
  email: string;
  password: string;
}

const TOTAL_STEPS = 26;

const INTIMACY_GOALS = [
  'Emotional Closeness',
  'Physical Affection', 
  'Communication',
  'Trust',
  'Other'
];

const LOVE_LANGUAGES = [
  'Words of Affirmation',
  'Quality Time',
  'Physical Touch',
  'Acts of Service',
  'Gifts'
];

const AROUSAL_TRIGGERS = [
  'Physical Touch',
  'Verbal Affirmations',
  'Visual Stimuli',
  'Romantic Scenarios',
  'Spontaneous Moments',
  'Planned Intimacy',
  'Other'
];

const SEXUAL_BLOCKS = [
  'Physical Pain',
  'Performance Anxiety',
  'Stress/Fatigue',
  'Body Image Concerns',
  'Communication Issues',
  'Time Constraints',
  'Other'
];

const CONSENT_PREFERENCES = [
  'Verbal Check-ins',
  'Nonverbal Cues',
  'Safe Words',
  'Written Agreements',
  'Other'
];

const ACTIVITIES_TO_AVOID = [
  'Rough Play',
  'Role Playing',
  'Toys/Accessories',
  'Public Displays',
  'Extended Sessions',
  'Other'
];

const EXPLORATION_INTERESTS = [
  'Role-play',
  'Sensory Play',
  'Toys & Accessories',
  'Tantra/Mindfulness',
  'New Positions',
  'Fantasy Exploration',
  'Other'
];

const LOADING_FACTS = [
  "Did you know? Couples who show affection daily report 40% higher relationship satisfaction.",
  "Research shows that physical touch releases oxytocin, the 'bonding hormone'.",
  "Communication is the #1 predictor of relationship longevity according to relationship experts.",
  "Trust-building exercises can increase intimacy by up to 60% in just 30 days.",
  "Emotional intimacy often precedes and enhances physical intimacy in lasting relationships.",
  "Secure attachment styles are associated with higher relationship satisfaction and intimacy.",
  "Understanding your love language can improve relationship communication by 70%.",
  "Conflict resolution skills are learnable and can transform relationship dynamics.",
  "Sexual satisfaction is strongly linked to overall relationship happiness.",
  "Body awareness practices can significantly enhance intimate connections."
];

interface OnboardingFlowProps {
  onComplete?: (data: any) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const [data, setData] = useState<OnboardingData>({
    // Basic Demographics
    firstName: '',
    age: '',
    biologicalSex: '',
    genderIdentity: '',
    relationshipStatus: '',
    sexuallyActive: false,
    partnersLastYear: 0,
    
    // Attachment & Emotional Security
    anxietyAttachment: 3,
    avoidanceAttachment: 3,
    reachesOutWhenUpset: false,
    
    // Love Languages
    loveLanguagesRanked: [],
    
    // Communication & Conflict
    conflictComfort: 3,
    conflictStyle: '',
    
    // Sexual Desire & Patterns
    desireFrequency: '',
    arousalTriggers: [],
    sexualSatisfaction: 3,
    sexualBlocks: [],
    sexualBlocksDescription: '',
    
    // Body Awareness & Boundaries
    bodyExplorationComfort: 3,
    enjoysSensateFocus: '',
    consentPreferences: [],
    activitiesToAvoid: [],
    activitiesToAvoidOther: '',
    
    // Fantasy & Exploration
    fantasyOpenness: 3,
    explorationInterests: [],
    
    // Lifestyle & Wellbeing
    weeklyCheckIns: 2,
    preferredIntimacyTime: '',
    currentStressLevel: 3,
    sleepQuality: '',
    bodyImageRating: 3,
    hasBodyImageConcerns: false,
    bodyImageConcernsDescription: '',
    
    // Existing Goals & Final Steps
    intimacyGoals: [],
    affectionFrequency: '',
    dataConsent: false,
    
    // Subscription Flow
    selectedPlan: 'individual',
    selectedBilling: 'monthly',
    
    // Progress Save & Welcome
    email: ''
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
    if (loginError) setLoginError('');
  };

  const nextStep = () => {
    if (currentStep === 25) {
      // Final step - complete onboarding
      if (onComplete) {
        onComplete(data);
      }
    } else if (currentStep < TOTAL_STEPS) {
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
      await new Promise(resolve => setTimeout(resolve, 2000));
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
        return true; // Sexual activity is optional
      case 5:
        return true; // Attachment sliders always have values
      case 6:
        return true; // Secure attachment check always has value
      case 7:
        return data.loveLanguagesRanked.length === 5;
      case 8:
        return data.conflictStyle;
      case 9:
        return data.desireFrequency && data.arousalTriggers.length > 0;
      case 10:
        return true; // Sexual satisfaction always has value
      case 11:
        return data.enjoysSensateFocus;
      case 12:
        return data.consentPreferences.length > 0;
      case 13:
        return data.explorationInterests.length > 0;
      case 14:
        return data.preferredIntimacyTime;
      case 15:
        return data.sleepQuality;
      case 16:
        return true; // Body image always has value
      case 17:
        return data.intimacyGoals.length > 0;
      case 18:
        return data.affectionFrequency;
      case 19:
        return data.dataConsent;
      case 20:
        return true; // Results page
      case 21:
        return true; // Free trial details
      case 22:
        return data.selectedPlan; // Plan selection
      case 23:
        return true; // Notification setup
      case 24:
        return data.email && /\S+@\S+\.\S+/.test(data.email); // Email validation
      case 25:
        return true; // Welcome screen
      case 26:
        return true; // Dashboard
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

  const handleArrayToggle = (field: keyof OnboardingData, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const handleLoveLanguageRank = (language: string) => {
    setData(prev => {
      const newRanked = [...prev.loveLanguagesRanked];
      if (newRanked.includes(language)) {
        // Remove if already selected
        return { ...prev, loveLanguagesRanked: newRanked.filter(l => l !== language) };
      } else if (newRanked.length < 5) {
        // Add if less than 5 selected
        return { ...prev, loveLanguagesRanked: [...newRanked, language] };
      }
      return prev;
    });
  };

  const generatePlan = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    setIsLoading(false);
    setCurrentStep(21); // Start subscription flow
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
                variant="default"
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
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Deepen Your Connection
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed px-2">
                  Expert-led assessment to create your personalized intimacy plan
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={nextStep}
                className="w-full h-14 text-base font-semibold rounded-2xl shadow-md bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                Begin Assessment
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
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Users className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Tell us about yourself</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">Let's start with the basics</p>
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
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Users className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Relationship Status</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">Help us understand your current situation</p>
            </div>
            
            <div className="space-y-3">
              <RadioGroup 
                value={data.relationshipStatus} 
                onValueChange={(value) => updateData('relationshipStatus', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                  <RadioGroupItem value="Single" id="single" className="flex-shrink-0" />
                  <Label htmlFor="single" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Single</Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                  <RadioGroupItem value="Partnered" id="partnered" className="flex-shrink-0" />
                  <Label htmlFor="partnered" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Partnered</Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                  <RadioGroupItem value="Married" id="married" className="flex-shrink-0" />
                  <Label htmlFor="married" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Married</Label>
                </div>
              </RadioGroup>
              
              {data.relationshipStatus === 'Single' && (
                <div className="pt-4 animate-slide-up">
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">When was your last partnership?</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-14 justify-start text-left font-normal bg-white border-border rounded-2xl px-4 shadow-sm",
                          !data.lastPartnership && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="break-words">
                          {data.lastPartnership ? format(data.lastPartnership, "PPP") : "Pick a date"}
                        </span>
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
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Sexual Activity History</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">This helps us personalize your recommendations</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-base font-medium text-center leading-relaxed">Have you been sexually active?</p>
                <div className="space-y-3">
                  <RadioGroup 
                    value={data.sexuallyActive.toString()} 
                    onValueChange={(value) => updateData('sexuallyActive', value === 'true')}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                      <RadioGroupItem value="true" id="active-yes" className="flex-shrink-0" />
                      <Label htmlFor="active-yes" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                      <RadioGroupItem value="false" id="active-no" className="flex-shrink-0" />
                      <Label htmlFor="active-no" className="flex-1 cursor-pointer text-base leading-relaxed break-words">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              {data.sexuallyActive && (
                <div className="space-y-6 animate-slide-up">
                  <p className="text-base font-medium text-center leading-relaxed">Number of partners in the past year</p>
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
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Brain className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Attachment Style</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">Understanding your emotional patterns in relationships</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">I worry my partner doesn't care as much as I do</p>
                <div className="space-y-2">
                  <Slider
                    value={[data.anxietyAttachment]}
                    onValueChange={(value) => updateData('anxietyAttachment', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Strongly Disagree</span>
                    <span>Neutral</span>
                    <span>Strongly Agree</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">I prefer not to depend too much on people</p>
                <div className="space-y-2">
                  <Slider
                    value={[data.avoidanceAttachment]}
                    onValueChange={(value) => updateData('avoidanceAttachment', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Strongly Disagree</span>
                    <span>Neutral</span>
                    <span>Strongly Agree</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Shield className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Emotional Security</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">How do you handle emotional challenges?</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-base font-medium text-center leading-relaxed">When I feel upset, I reach out to my partner</p>
              <div className="space-y-3">
                <RadioGroup 
                  value={data.reachesOutWhenUpset.toString()} 
                  onValueChange={(value) => updateData('reachesOutWhenUpset', value === 'true')}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="true" id="reaches-yes" className="flex-shrink-0" />
                    <Label htmlFor="reaches-yes" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Yes, I reach out for support</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="false" id="reaches-no" className="flex-shrink-0" />
                    <Label htmlFor="reaches-no" className="flex-1 cursor-pointer text-base leading-relaxed break-words">No, I prefer to handle it alone</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Heart className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Love Languages</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">Rank these in order of importance to you (select 1st, 2nd, 3rd, 4th, 5th)</p>
            </div>
            
            <div className="space-y-3">
              {LOVE_LANGUAGES.map((language) => {
                const rank = data.loveLanguagesRanked.indexOf(language) + 1;
                return (
                  <div 
                    key={language}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]",
                      rank > 0 && "border-primary bg-primary/5"
                    )}
                    onClick={() => handleLoveLanguageRank(language)}
                  >
                    <span className="text-base leading-relaxed">{language}</span>
                    {rank > 0 && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-semibold">
                        {rank}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Selected: {data.loveLanguagesRanked.length}/5
              </p>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <MessageCircle className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Communication & Conflict</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">How do you handle difficult conversations?</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">How comfortable are you discussing difficult topics?</p>
                <div className="space-y-2">
                  <Slider
                    value={[data.conflictComfort]}
                    onValueChange={(value) => updateData('conflictComfort', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Very Uncomfortable</span>
                    <span>Neutral</span>
                    <span>Very Comfortable</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">When disagreements happen, which best fits?</p>
                <RadioGroup 
                  value={data.conflictStyle} 
                  onValueChange={(value) => updateData('conflictStyle', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="calm-both" id="calm-both" className="flex-shrink-0" />
                    <Label htmlFor="calm-both" className="flex-1 cursor-pointer text-base leading-relaxed break-words">I calm us both down</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="need-space" id="need-space" className="flex-shrink-0" />
                    <Label htmlFor="need-space" className="flex-1 cursor-pointer text-base leading-relaxed break-words">I need space before talking</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="get-heated" id="get-heated" className="flex-shrink-0" />
                    <Label htmlFor="get-heated" className="flex-1 cursor-pointer text-base leading-relaxed break-words">I get heated but work through it</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Zap className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Sexual Desire & Patterns</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">Understanding your desires and what turns you on</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">What's your typical desire frequency?</p>
                <RadioGroup 
                  value={data.desireFrequency} 
                  onValueChange={(value) => updateData('desireFrequency', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="daily" id="daily" className="flex-shrink-0" />
                    <Label htmlFor="daily" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Daily</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="weekly" id="weekly" className="flex-shrink-0" />
                    <Label htmlFor="weekly" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Weekly</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="monthly" id="monthly" className="flex-shrink-0" />
                    <Label htmlFor="monthly" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Monthly</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">What turns you on most? (Select all that apply)</p>
                <div className="space-y-3">
                  {AROUSAL_TRIGGERS.map((trigger) => (
                    <div 
                      key={trigger}
                      className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]"
                      onClick={() => handleArrayToggle('arousalTriggers', trigger)}
                    >
                      <Checkbox 
                        checked={data.arousalTriggers.includes(trigger)}
                        className="flex-shrink-0"
                      />
                      <Label className="flex-1 cursor-pointer text-base leading-relaxed break-words">{trigger}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Star className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Sexual Satisfaction</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">Understanding your satisfaction and any barriers</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">Overall, how satisfied are you with your sex life?</p>
                <div className="space-y-2">
                  <Slider
                    value={[data.sexualSatisfaction]}
                    onValueChange={(value) => updateData('sexualSatisfaction', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Very Unsatisfied</span>
                    <span>Neutral</span>
                    <span>Very Satisfied</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">Do you experience any recurring blocks? (Select all that apply)</p>
                <div className="space-y-3">
                  {SEXUAL_BLOCKS.map((block) => (
                    <div 
                      key={block}
                      className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]"
                      onClick={() => handleArrayToggle('sexualBlocks', block)}
                    >
                      <Checkbox 
                        checked={data.sexualBlocks.includes(block)}
                        className="flex-shrink-0"
                      />
                      <Label className="flex-1 cursor-pointer text-base leading-relaxed break-words">{block}</Label>
                    </div>
                  ))}
                </div>
                
                {data.sexualBlocks.length > 0 && (
                  <div className="pt-2">
                    <Textarea
                      value={data.sexualBlocksDescription}
                      onChange={(e) => updateData('sexualBlocksDescription', e.target.value)}
                      placeholder="Tell us more about these challenges (optional)"
                      className="min-h-[80px] bg-white border-border rounded-2xl px-4 py-3 text-base resize-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Activity className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Body & Sensual Awareness</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">Understanding your comfort with body exploration</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">How comfortable are you exploring your body?</p>
                <div className="space-y-2">
                  <Slider
                    value={[data.bodyExplorationComfort]}
                    onValueChange={(value) => updateData('bodyExplorationComfort', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Very Uncomfortable</span>
                    <span>Neutral</span>
                    <span>Very Comfortable</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">Do you enjoy guided sensate focus exercises?</p>
                <RadioGroup 
                  value={data.enjoysSensateFocus} 
                  onValueChange={(value) => updateData('enjoysSensateFocus', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="yes" id="sensate-yes" className="flex-shrink-0" />
                    <Label htmlFor="sensate-yes" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Yes, I enjoy them</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="no" id="sensate-no" className="flex-shrink-0" />
                    <Label htmlFor="sensate-no" className="flex-1 cursor-pointer text-base leading-relaxed break-words">No, not for me</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="not-sure" id="sensate-not-sure" className="flex-shrink-0" />
                    <Label htmlFor="sensate-not-sure" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Not sure, would like to try</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 12:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Shield className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Boundaries & Consent</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">Your preferences for communication and boundaries</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">How do you prefer to signal consent? (Select all that apply)</p>
                <div className="space-y-3">
                  {CONSENT_PREFERENCES.map((preference) => (
                    <div 
                      key={preference}
                      className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]"
                      onClick={() => handleArrayToggle('consentPreferences', preference)}
                    >
                      <Checkbox 
                        checked={data.consentPreferences.includes(preference)}
                        className="flex-shrink-0"
                      />
                      <Label className="flex-1 cursor-pointer text-base leading-relaxed break-words">{preference}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">Are there activities you'd prefer to avoid? (Select all that apply)</p>
                <div className="space-y-3">
                  {ACTIVITIES_TO_AVOID.map((activity) => (
                    <div 
                      key={activity}
                      className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]"
                      onClick={() => handleArrayToggle('activitiesToAvoid', activity)}
                    >
                      <Checkbox 
                        checked={data.activitiesToAvoid.includes(activity)}
                        className="flex-shrink-0"
                      />
                      <Label className="flex-1 cursor-pointer text-base leading-relaxed break-words">{activity}</Label>
                    </div>
                  ))}
                </div>
                
                {data.activitiesToAvoid.includes('Other') && (
                  <div className="pt-2">
                    <Textarea
                      value={data.activitiesToAvoidOther}
                      onChange={(e) => updateData('activitiesToAvoidOther', e.target.value)}
                      placeholder="Please specify other activities you'd prefer to avoid"
                      className="min-h-[80px] bg-white border-border rounded-2xl px-4 py-3 text-base resize-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 13:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Eye className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Fantasy & Exploration</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">Your comfort with exploring new experiences</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">How open are you to exploring new fantasies?</p>
                <div className="space-y-2">
                  <Slider
                    value={[data.fantasyOpenness]}
                    onValueChange={(value) => updateData('fantasyOpenness', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Not Open</span>
                    <span>Neutral</span>
                    <span>Very Open</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">Which of these interest you? (Select all that apply)</p>
                <div className="space-y-3">
                  {EXPLORATION_INTERESTS.map((interest) => (
                    <div 
                      key={interest}
                      className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]"
                      onClick={() => handleArrayToggle('explorationInterests', interest)}
                    >
                      <Checkbox 
                        checked={data.explorationInterests.includes(interest)}
                        className="flex-shrink-0"
                      />
                      <Label className="flex-1 cursor-pointer text-base leading-relaxed break-words">{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 14:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Clock className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Lifestyle & Availability</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">Planning your intimacy journey</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">How many intimate check-ins can you commit to per week?</p>
                <div className="space-y-4">
                  <Slider
                    value={[data.weeklyCheckIns]}
                    onValueChange={(value) => updateData('weeklyCheckIns', value[0])}
                    max={7}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center">
                    <span className="text-3xl font-bold text-primary">{data.weeklyCheckIns}</span>
                    <span className="text-muted-foreground ml-2 text-base">
                      {data.weeklyCheckIns === 1 ? 'check-in' : 'check-ins'} per week
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">Best time of day for intimacy work?</p>
                <RadioGroup 
                  value={data.preferredIntimacyTime} 
                  onValueChange={(value) => updateData('preferredIntimacyTime', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="morning" id="morning" className="flex-shrink-0" />
                    <Label htmlFor="morning" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Morning (6AM - 12PM)</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="afternoon" id="afternoon" className="flex-shrink-0" />
                    <Label htmlFor="afternoon" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Afternoon (12PM - 6PM)</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="evening" id="evening" className="flex-shrink-0" />
                    <Label htmlFor="evening" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Evening (6PM - 12AM)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 15:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Activity className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Stress & Well-Being</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">Understanding your current well-being</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">Current stress level</p>
                <div className="space-y-2">
                  <Slider
                    value={[data.currentStressLevel]}
                    onValueChange={(value) => updateData('currentStressLevel', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Very Low</span>
                    <span>Moderate</span>
                    <span>Very High</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">Sleep quality last week</p>
                <RadioGroup 
                  value={data.sleepQuality} 
                  onValueChange={(value) => updateData('sleepQuality', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="poor" id="poor" className="flex-shrink-0" />
                    <Label htmlFor="poor" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Poor - Frequent disruptions, feeling tired</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="average" id="average" className="flex-shrink-0" />
                    <Label htmlFor="average" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Average - Some good nights, some bad</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="excellent" id="excellent" className="flex-shrink-0" />
                    <Label htmlFor="excellent" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Excellent - Restful and consistent</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 16:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Target className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Self-Esteem & Body Image</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">Understanding your relationship with your body</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">Rate how attractive you feel in your skin</p>
                <div className="space-y-2">
                  <Slider
                    value={[data.bodyImageRating]}
                    onValueChange={(value) => updateData('bodyImageRating', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Not Attractive</span>
                    <span>Neutral</span>
                    <span>Very Attractive</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed">Do you have any body image concerns you'd like support with?</p>
                <RadioGroup 
                  value={data.hasBodyImageConcerns.toString()} 
                  onValueChange={(value) => updateData('hasBodyImageConcerns', value === 'true')}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="true" id="concerns-yes" className="flex-shrink-0" />
                    <Label htmlFor="concerns-yes" className="flex-1 cursor-pointer text-base leading-relaxed break-words">Yes, I'd like support</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="false" id="concerns-no" className="flex-shrink-0" />
                    <Label htmlFor="concerns-no" className="flex-1 cursor-pointer text-base leading-relaxed break-words">No, I'm comfortable</Label>
                  </div>
                </RadioGroup>
                
                {data.hasBodyImageConcerns && (
                  <div className="pt-4 animate-slide-up">
                    <Textarea
                      value={data.bodyImageConcernsDescription}
                      onChange={(e) => updateData('bodyImageConcernsDescription', e.target.value)}
                      placeholder="Tell us about any specific concerns you'd like support with (optional)"
                      className="min-h-[80px] bg-white border-border rounded-2xl px-4 py-3 text-base resize-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 17:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <MessageCircle className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Intimacy Goals</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">What areas would you like to improve? (Select all that apply)</p>
            </div>
            
            <div className="space-y-3">
              {INTIMACY_GOALS.map((goal) => (
                <div 
                  key={goal}
                  className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[60px]"
                  onClick={() => handleGoalToggle(goal)}
                >
                  <Checkbox 
                    checked={data.intimacyGoals.includes(goal)}
                    className="flex-shrink-0"
                  />
                  <Label className="flex-1 cursor-pointer text-base leading-relaxed break-words">{goal}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 18:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Affection Frequency</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">How often do you currently express or receive affection?</p>
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
                <div key={option.value} className="flex items-start space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[80px]">
                  <RadioGroupItem value={option.value} id={option.value} className="flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0 overflow-visible">
                    <Label htmlFor={option.value} className="cursor-pointer font-medium text-base leading-relaxed break-words block">{option.label}</Label>
                    <p className="text-sm text-muted-foreground leading-relaxed break-words mt-1">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 19:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Data Consent & AI Plan</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">Final step before generating your personalized plan</p>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border shadow-sm">
                <p className="text-center text-foreground text-base leading-relaxed">
                  We'll use your responses to generate an AI-driven Intimacy Health Plan tailored specifically for you.
                </p>
              </div>
              
              <div className="flex items-start space-x-3 p-4 rounded-2xl bg-white border border-border shadow-sm min-h-[80px]">
                <Checkbox 
                  checked={data.dataConsent}
                  onCheckedChange={(checked) => updateData('dataConsent', checked)}
                  id="consent"
                  className="mt-1 flex-shrink-0"
                />
                <div className="space-y-2 min-w-0 overflow-visible">
                  <Label htmlFor="consent" className="cursor-pointer text-base font-medium leading-relaxed break-words block">
                    I agree to share my data with Intima (OpenAI + Supabase).
                  </Label>
                  <p className="text-sm text-muted-foreground leading-relaxed break-words">
                    Your data will be used to create personalized recommendations and is stored securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 20:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-4">
              <Sparkles className="w-16 h-16 mx-auto text-primary animate-pulse" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Your Intimacy Plan is Ready!
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Based on your comprehensive assessment, we've created a personalized plan just for you.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border">
                <h3 className="font-semibold text-lg mb-3">Recommended Assessments</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="break-words leading-relaxed">PAIR (Personal Assessment of Intimacy in Relationships)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="break-words leading-relaxed">Gottman Relationship Modules</span>
                  </li>
                  {data.sexuallyActive && (
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="break-words leading-relaxed">FSFI (Female Sexual Function Index)</span>
                    </li>
                  )}
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="break-words leading-relaxed">Attachment Style Deep Dive</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 bg-card rounded-lg border shadow-sm">
                <h3 className="font-semibold text-lg mb-3">Next Steps</h3>
                <ul className="space-y-2 text-sm">
                  <li className="leading-relaxed">• Daily intimacy building exercises</li>
                  <li className="leading-relaxed">• Weekly check-in questions</li>
                  <li className="leading-relaxed">• Personalized communication tools</li>
                  <li className="leading-relaxed">• Progress tracking dashboard</li>
                  <li className="leading-relaxed">• Expert-guided exploration activities</li>
                </ul>
              </div>
            </div>
            
            <Button 
              className="w-full text-lg py-6 h-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              onClick={nextStep}
            >
              Continue to Subscription
              <Heart className="ml-2 w-5 h-5" />
            </Button>
          </div>
        );

      case 21:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Clock className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Start Your 3-Day FREE Trial</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">
                Experience the full Daily Intimacy journey with no payment due now
              </p>
            </div>

            <div className="space-y-4">
              {/* What They'll Experience */}
              <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
                <h3 className="font-semibold mb-4 text-center">Your free trial includes:</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Complete access to your personalized intimacy plan</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Daily guided exercises and activities</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Progress tracking and insights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Expert-guided communication tools</span>
                  </div>
                </div>
              </div>

              {/* Trial Timeline */}
              <div className="space-y-3">
                <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl border">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Today</h4>
                    <p className="text-sm text-muted-foreground">Start your journey and unlock your plan</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl border">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Days 1-3</h4>
                    <p className="text-sm text-muted-foreground">Experience real progress and deeper connection</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl border">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-muted-foreground text-sm font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Day 4 & Beyond</h4>
                    <p className="text-sm text-muted-foreground">Continue your transformation (only if you choose to stay)</p>
                  </div>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="p-4 bg-muted/30 rounded-2xl text-center">
                <p className="text-sm font-semibold text-primary mb-1">✨ No Payment Due Now ✨</p>
                <p className="text-xs text-muted-foreground">Cancel anytime during your trial with zero charges</p>
              </div>
            </div>
          </div>
        );

      case 22:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Crown className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Choose Your Plan to Continue</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">
                After your free trial, unlock your ongoing intimacy journey
              </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 p-4 bg-muted/30 rounded-2xl">
              <span className={cn("text-sm font-medium", data.selectedBilling === 'monthly' ? 'text-foreground' : 'text-muted-foreground')}>
                Monthly
              </span>
              <button
                onClick={() => updateData('selectedBilling', data.selectedBilling === 'monthly' ? 'yearly' : 'monthly')}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  data.selectedBilling === 'yearly' ? 'bg-primary' : 'bg-muted'
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    data.selectedBilling === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
              <span className={cn("text-sm font-medium", data.selectedBilling === 'yearly' ? 'text-foreground' : 'text-muted-foreground')}>
                Yearly
                <span className="ml-1 text-xs text-primary font-semibold">Save 30%</span>
              </span>
            </div>

            <div className="space-y-4">
              {/* Individual Plan */}
              <div 
                className={cn(
                  "p-6 rounded-2xl border-2 cursor-pointer transition-all",
                  data.selectedPlan === 'individual' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border bg-white hover:border-primary/50'
                )}
                onClick={() => updateData('selectedPlan', 'individual')}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Individual Journey</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Perfect for personal growth and self-discovery
                    </p>
                    <div className="flex items-baseline space-x-2">
                      {data.selectedBilling === 'monthly' ? (
                        <>
                          <span className="text-3xl font-bold text-primary">$29</span>
                          <span className="text-muted-foreground text-sm">/month</span>
                        </>
                      ) : (
                        <>
                          <span className="text-3xl font-bold text-primary">$240</span>
                          <span className="text-muted-foreground text-sm">/year</span>
                          <span className="text-sm text-muted-foreground">($20/month)</span>
                          <span className="text-xs text-muted-foreground line-through ml-2">$29/month</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      First charge after your free trial
                    </p>
                  </div>
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                    data.selectedPlan === 'individual' ? 'border-primary bg-primary' : 'border-muted'
                  )}>
                    {data.selectedPlan === 'individual' && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </div>

              {/* Couples Plan - Only show if partnered or married */}
              {(data.relationshipStatus === 'Partnered' || data.relationshipStatus === 'Married') && (
                <div 
                  className={cn(
                    "p-6 rounded-2xl border-2 cursor-pointer transition-all relative",
                    data.selectedPlan === 'couples' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border bg-white hover:border-primary/50'
                  )}
                  onClick={() => updateData('selectedPlan', 'couples')}
                >
                  <div className="absolute -top-3 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Best Value
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">Couples Journey</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Designed for deeper connection with your partner
                      </p>
                      <div className="flex items-baseline space-x-2">
                        {data.selectedBilling === 'monthly' ? (
                          <>
                            <span className="text-3xl font-bold text-primary">$49</span>
                            <span className="text-muted-foreground text-sm">/month</span>
                          </>
                        ) : (
                          <>
                            <span className="text-3xl font-bold text-primary">$408</span>
                            <span className="text-muted-foreground text-sm">/year</span>
                            <span className="text-sm text-muted-foreground">($34/month)</span>
                            <span className="text-xs text-muted-foreground line-through ml-2">$49/month</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        First charge after your free trial
                      </p>
                    </div>
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                      data.selectedPlan === 'couples' ? 'border-primary bg-primary' : 'border-muted'
                    )}>
                      {data.selectedPlan === 'couples' && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center text-xs text-muted-foreground">
              Remember: You're still in your FREE trial • Cancel anytime before day 4
            </div>
          </div>
        );

      case 23:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <BellRing className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">Stay Connected</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">
                Get gentle reminders to maintain your intimacy journey
              </p>
            </div>

            <div className="space-y-4">
              {/* Notification Benefits */}
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20">
                <h3 className="font-semibold mb-4 text-center">Daily reminders help you:</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Stay consistent with your intimacy practices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Remember important check-ins and exercises</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Celebrate progress and milestones</span>
                  </div>
                </div>
              </div>

              {/* Notification Permission */}
              <Button 
                className="w-full h-14 text-base font-semibold rounded-2xl shadow-md bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                onClick={() => {
                  // Request notification permission
                  if ('Notification' in window) {
                    Notification.requestPermission().then(() => {
                      nextStep();
                    });
                  } else {
                    nextStep();
                  }
                }}
              >
                <Bell className="mr-2 w-5 h-5" />
                Enable Notifications
              </Button>

              <Button 
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={nextStep}
              >
                Skip for now
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              You can change notification settings anytime in your profile
            </div>
          </div>
        );

      case 24:
        return (
          <div className="space-y-8 animate-fade-in max-w-md mx-auto">
            <div className="text-center space-y-4">
              <Mail className="w-16 h-16 mx-auto text-primary" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Save Your Progress</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Enter your email to save your personalized intimacy assessment and access your dashboard
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => updateData('email', e.target.value)}
                    placeholder="your@email.com"
                    className="h-12 rounded-xl bg-white border-2 focus:border-primary"
                  />
                </div>
                
                <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Your data is encrypted and secure</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Access personalized insights anytime</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Continue your 7-day free trial</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={nextStep}
                disabled={!isStepValid()}
                className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                Save & Continue
              </Button>

              <Button 
                variant="ghost"
                className="w-full text-muted-foreground text-sm"
                onClick={nextStep}
              >
                Continue as guest
              </Button>
            </div>
          </div>
        );

      case 25:
        return (
          <div className="space-y-8 animate-fade-in max-w-md mx-auto text-center">
            <div className="space-y-6">
              <div className="relative">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-3xl font-bold">Welcome, {data.firstName}!</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your personalized {data.selectedPlan === 'couples' ? 'couples' : 'individual'} intimacy journey begins now
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-lg">What's Next?</h3>
              <div className="space-y-3 text-sm text-left">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>View your personalized intimacy score</span>
                </div>
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Get daily AI-powered question prompts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Track your progress over time</span>
                </div>
                {data.selectedPlan === 'couples' && (
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Connect with your partner</span>
                  </div>
                )}
              </div>
            </div>

            <Button 
              onClick={nextStep}
              className="w-full h-14 text-base font-semibold rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              Start My Journey
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
      {/* Progress Bar - Fixed at top, only show for assessment steps */}
      {currentStep > 1 && currentStep <= 18 && !showResults && (
        <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-border/50 z-50">
          <div className="max-w-sm mx-auto px-6 py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-muted-foreground">
                {currentStep - 1} of 17
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {Math.round(Math.min(((currentStep - 1) / 17) * 100, 100))}%
              </span>
            </div>
            <Progress 
              value={Math.min(((currentStep - 1) / 17) * 100, 100)} 
              className="h-1 bg-muted/50"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4 pt-20 pb-28">
        <div className="w-full max-w-sm">
          {isLoading && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-10 h-10 text-white animate-spin" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Creating Your Plan</h2>
                <p className="text-muted-foreground text-sm animate-fade-in leading-relaxed" key={loadingFactIndex}>
                  {LOADING_FACTS[loadingFactIndex]}
                </p>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
              </div>
            </div>
          )}

          {!isLoading && !showResults && renderStep()}

          {showResults && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Welcome to Daily Intimacy!
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your personalized journey begins now, {data.firstName}.
                </p>
              </div>
              <Button 
                className="w-full h-14 text-base font-semibold rounded-2xl shadow-md bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                Start My Journey
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
                  className="flex items-center gap-2 text-muted-foreground min-h-[44px]"
                  size="sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                
                {currentStep < 20 && (
                  <Button 
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="h-11 px-8 rounded-full shadow-sm min-h-[44px]"
                    variant="default"
                  >
                    Continue
                  </Button>
                )}
                
                {currentStep === 19 && (
                  <Button 
                    onClick={generatePlan}
                    disabled={!isStepValid()}
                    className="h-11 px-8 rounded-full shadow-sm min-h-[44px] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    Generate Plan
                  </Button>
                )}

                {(currentStep >= 20 && currentStep < 23) && (
                  <Button 
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="h-11 px-8 rounded-full shadow-sm min-h-[44px] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    Continue
                  </Button>
                )}

                {currentStep === 23 && (
                  <Button 
                    onClick={nextStep}
                    className="h-11 px-8 rounded-full shadow-sm min-h-[44px] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    Continue
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
