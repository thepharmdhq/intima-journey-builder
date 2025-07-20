import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
}

interface ValidationResult {
  isValid: boolean;
  errorMessage: string | null;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState(18);
  const [relationshipLength, setRelationshipLength] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to subscription page after "Your Intimacy Plan is Ready!"
    if (currentStep === 21) {
      navigate('/my-subscription');
    }

    if (currentStep > 25) {
      onComplete({ name, age, relationshipLength });
    }
  }, [currentStep, navigate, onComplete]);

  const validateName = (name: string): ValidationResult => {
    if (!name.trim()) {
      return { isValid: false, errorMessage: 'Name is required' };
    }
    if (name.length < 2) {
      return { isValid: false, errorMessage: 'Name must be at least 2 characters' };
    }
    return { isValid: true, errorMessage: null };
  };

  const validateAge = (age: number): ValidationResult => {
    if (age < 18) {
      return { isValid: false, errorMessage: 'You must be at least 18 years old' };
    }
    if (age > 99) {
      return { isValid: false, errorMessage: 'Please enter a valid age' };
    }
    return { isValid: true, errorMessage: null };
  };

  const validateRelationshipLength = (length: number): ValidationResult => {
    if (length < 0) {
      return { isValid: false, errorMessage: 'Relationship length must be positive' };
    }
    return { isValid: true, errorMessage: null };
  };

  const nextStep = () => {
    let validationResult: ValidationResult = { isValid: true, errorMessage: null };

    if (currentStep === 1) {
      validationResult = validateName(name);
    } else if (currentStep === 2) {
      validationResult = validateAge(age);
    } else if (currentStep === 3) {
      validationResult = validateRelationshipLength(relationshipLength);
    }

    if (validationResult.isValid) {
      setCurrentStep(currentStep + 1);
    } else {
      alert(validationResult.errorMessage);
    }
  };

  const generatePlan = async () => {
    setIsGenerating(true);
    
    // Simulate plan generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGenerating(false);
    setCurrentStep(20); // Changed from 21 to 20
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>What is your name?</CardTitle>
              <CardDescription>We want to know who you are!</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>How old are you?</CardTitle>
              <CardDescription>We need to know your age to generate the best plan for you!</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="age">Age</Label>
              <Input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>How long have you been in your relationship?</CardTitle>
              <CardDescription>We need to know how long you have been together to generate the best plan for you!</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="relationshipLength">Relationship Length (in months)</Label>
              <Slider
                id="relationshipLength"
                defaultValue={[relationshipLength]}
                max={100}
                step={1}
                onValueChange={(value) => setRelationshipLength(value[0])}
              />
              <div>{relationshipLength} months</div>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Data Consent</CardTitle>
              <CardDescription>Please read and accept the following data consent agreement.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We collect data to improve your experience and personalize your intimacy plan. By proceeding, you agree to our data collection and usage practices.
              </p>
              <Button onClick={generatePlan}>I Consent</Button>
            </CardContent>
          </Card>
        );
        case 20:
          return (
            <Card>
              <CardHeader>
                <CardTitle>Your Intimacy Plan is Ready!</CardTitle>
                <CardDescription>Get ready to spice things up!</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={100} />
                <p>
                  Your personalized intimacy plan is ready. Let's move on to the subscription flow!
                </p>
              </CardContent>
            </Card>
          );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStepContent()}
      {currentStep < 4 && (
        <Button onClick={nextStep}>Next</Button>
      )}
    </div>
  );
};

export default OnboardingFlow;
