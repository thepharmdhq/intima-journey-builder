import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Heart, 
  Users, 
  Star, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle,
  User,
  Calendar,
  Target,
  TrendingUp,
  Clock,
  Award,
  Lightbulb,
  Mail,
  Eye,
  EyeOff
} from 'lucide-react';
import Dashboard from './Dashboard';

interface OnboardingData {
  name: string;
  age: number;
  relationshipStatus: string;
  yearsTogether?: number;
  communicationStyle: string[];
  loveLanguages: string[];
  intimacyGoals: string;
  selectedPlan: string;
  showPassword?: boolean;
  password?: string;
}

const initialData: OnboardingData = {
  name: '',
  age: 18,
  relationshipStatus: '',
  yearsTogether: 1,
  communicationStyle: [],
  loveLanguages: [],
  intimacyGoals: '',
  selectedPlan: 'individual',
  showPassword: false,
  password: '',
};

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = () => {
    if (!email.trim()) {
      setEmailError('Please enter your email address');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setCurrentStep(25);
  };

  const handleSkipEmail = () => {
    setCurrentStep(25);
  };

  const startJourney = () => {
    setShowDashboard(true);
  };

  if (showDashboard) {
    return <Dashboard userData={data} />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
  
    setData(prevData => {
      if (type === 'checkbox') {
        // Handle communicationStyle as an array of selected options
        if (checked) {
          return {
            ...prevData,
            communicationStyle: [...prevData.communicationStyle, value],
          };
        } else {
          return {
            ...prevData,
            communicationStyle: prevData.communicationStyle.filter(item => item !== value),
          };
        }
      } else if (name === 'selectedPlan') {
        return {
          ...prevData,
          selectedPlan: value,
        };
      }
       else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };
  

  const nextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const renderScreen = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4">Welcome to IntimateAI</h1>
                  <p className="text-gray-600 mb-6">Let's start with your name and age.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={data.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      type="number"
                      id="age"
                      name="age"
                      value={data.age}
                      onChange={handleInputChange}
                      placeholder="Enter your age"
                    />
                  </div>
                  <Button onClick={nextStep} className="w-full">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 2:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4">Relationship Status</h1>
                  <p className="text-gray-600 mb-6">Tell us about your current relationship status.</p>
                </div>
                <RadioGroup defaultValue={data.relationshipStatus} onValueChange={(value) => setData({ ...data, relationshipStatus: value })} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single">Single</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in_relationship" id="in_relationship" />
                    <Label htmlFor="in_relationship">In a Relationship</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="married" id="married" />
                    <Label htmlFor="married">Married</Label>
                  </div>
                </RadioGroup>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={nextStep}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 3:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4">Years Together</h1>
                  <p className="text-gray-600 mb-6">How long have you been together?</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="yearsTogether">Years Together</Label>
                    <Input
                      type="number"
                      id="yearsTogether"
                      name="yearsTogether"
                      value={data.yearsTogether || ''}
                      onChange={handleInputChange}
                      placeholder="Enter years together"
                    />
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={nextStep}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 4:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4">Communication Style</h1>
                  <p className="text-gray-600 mb-6">Select your preferred communication styles.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="verbal" value="verbal" checked={data.communicationStyle.includes('verbal')} onChange={handleInputChange} />
                    <Label htmlFor="verbal">Verbal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="written" value="written" checked={data.communicationStyle.includes('written')} onChange={handleInputChange} />
                    <Label htmlFor="written">Written</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="nonverbal" value="nonverbal" checked={data.communicationStyle.includes('nonverbal')} onChange={handleInputChange} />
                    <Label htmlFor="nonverbal">Nonverbal</Label>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={nextStep}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 5:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4">Love Languages</h1>
                  <p className="text-gray-600 mb-6">Select your love languages.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="words_of_affirmation" value="words_of_affirmation" checked={data.loveLanguages.includes('words_of_affirmation')} onChange={handleInputChange} />
                    <Label htmlFor="words_of_affirmation">Words of Affirmation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="quality_time" value="quality_time" checked={data.loveLanguages.includes('quality_time')} onChange={handleInputChange} />
                    <Label htmlFor="quality_time">Quality Time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="receiving_gifts" value="receiving_gifts" checked={data.loveLanguages.includes('receiving_gifts')} onChange={handleInputChange} />
                    <Label htmlFor="receiving_gifts">Receiving Gifts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="acts_of_service" value="acts_of_service" checked={data.loveLanguages.includes('acts_of_service')} onChange={handleInputChange} />
                    <Label htmlFor="acts_of_service">Acts of Service</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="physical_touch" value="physical_touch" checked={data.loveLanguages.includes('physical_touch')} onChange={handleInputChange} />
                    <Label htmlFor="physical_touch">Physical Touch</Label>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={nextStep}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 6:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4">Intimacy Goals</h1>
                  <p className="text-gray-600 mb-6">What are your intimacy goals?</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="intimacyGoals">Your Goals</Label>
                    <Textarea
                      id="intimacyGoals"
                      name="intimacyGoals"
                      value={data.intimacyGoals}
                      onChange={handleInputChange}
                      placeholder="Enter your intimacy goals"
                    />
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={nextStep}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 7:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4">Choose Your Track</h1>
                  <p className="text-gray-600 mb-6">Select the track that best suits your needs.</p>
                </div>
                <RadioGroup defaultValue={data.selectedPlan} onValueChange={(value) => setData({ ...data, selectedPlan: value })} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Individual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="couples" id="couples" />
                    <Label htmlFor="couples">Couples</Label>
                  </div>
                </RadioGroup>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={nextStep}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 8:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4">Create Password</h1>
                  <p className="text-gray-600 mb-6">Create a password to secure your account.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        type={data.showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setData({ ...data, showPassword: !data.showPassword })}
                      >
                        {data.showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleSubmit}>
                      Submit <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 24:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Save Your Progress
                  </h1>
                  <p className="text-gray-600">
                    Enter your email to save your assessment results and continue your intimacy journey
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-left">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      className={emailError ? 'border-red-500' : ''}
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg text-left">
                    <h3 className="font-semibold text-blue-900 mb-2">Why we need your email:</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Save your assessment results</li>
                      <li>• Send personalized recommendations</li>
                      <li>• Track your progress over time</li>
                      <li>• Access your dashboard anytime</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={handleEmailSubmit}
                    className="w-full"
                    size="lg"
                  >
                    Continue with Email
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <button
                    onClick={handleSkipEmail}
                    className="w-full text-gray-500 hover:text-gray-700 text-sm underline"
                  >
                    Skip for now (continue as guest)
                  </button>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(23)}
                    size="sm"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 25:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome, {data.name}!
                  </h1>
                  <p className="text-xl text-gray-600 mb-2">
                    Your Journey Begins Now
                  </p>
                  <p className="text-gray-500">
                    You've selected the <span className="font-semibold text-primary">
                      {data.selectedPlan === 'individual' ? 'Individual' : 'Couples'} Track
                    </span>
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 mb-8 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    What's Next?
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <Target className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Personalized Plan</h3>
                        <p className="text-sm text-gray-600">Custom recommendations based on your assessment</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Track Progress</h3>
                        <p className="text-sm text-gray-600">Monitor your intimacy growth over time</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Daily Insights</h3>
                        <p className="text-sm text-gray-600">Receive personalized tips and exercises</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={startJourney}
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  Start My Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-sm text-gray-500 mt-4">
                  Ready to transform your intimate connections
                </p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4">Assessment Complete!</h1>
                  <p className="text-gray-600 mb-6">
                    Thank you for completing the intimacy assessment. Your personalized results are being prepared.
                  </p>
                  <Button onClick={() => setCurrentStep(24)} size="lg">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return renderScreen();
};

export default OnboardingFlow;
