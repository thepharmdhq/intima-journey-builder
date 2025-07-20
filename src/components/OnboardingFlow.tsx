import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    relationshipStatus: '',
    partnerAge: '',
    partnerGender: '',
    relationshipLength: '',
    livingTogether: '',
    previousRelationships: '',
    sexualExperience: '',
    communicationStyle: '',
    intimacyGoals: [],
    specificConcerns: '',
    dealBreakers: '',
    emotionalNeeds: '',
    physicalPreferences: '',
    timeAvailability: '',
    privacyPreferences: '',
    dataConsent: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePlan = async () => {
    setIsLoading(true);
    // Simulate plan generation
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(20); // Navigate to Step 20 instead of Step 21
    }, 6000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Welcome to Your Intimacy Journey</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Let's start by getting to know you better. What's your name?</p>
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Tell us about yourself</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="age">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <Label>Gender</Label>
                <RadioGroup value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-binary" id="non-binary" />
                    <Label htmlFor="non-binary">Non-binary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                    <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Relationship Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Relationship Status</Label>
                <RadioGroup value={formData.relationshipStatus} onValueChange={(value) => updateFormData('relationshipStatus', value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single">Single</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-relationship" id="in-relationship" />
                    <Label htmlFor="in-relationship">In a Relationship</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="married" id="married" />
                    <Label htmlFor="married">Married</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="divorced" id="divorced" />
                    <Label htmlFor="divorced">Divorced</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="widowed" id="widowed" />
                    <Label htmlFor="widowed">Widowed</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Partner's Age (if applicable)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="partnerAge">Partner's Age</Label>
                <Input
                  id="partnerAge"
                  type="number"
                  value={formData.partnerAge}
                  onChange={(e) => updateFormData('partnerAge', e.target.value)}
                  placeholder="Enter partner's age"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Partner's Gender (if applicable)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Partner's Gender</Label>
                <RadioGroup value={formData.partnerGender} onValueChange={(value) => updateFormData('partnerGender', value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="partner-male" />
                    <Label htmlFor="partner-male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="partner-female" />
                    <Label htmlFor="partner-female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-binary" id="partner-non-binary" />
                    <Label htmlFor="partner-non-binary">Non-binary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="partner-prefer-not-to-say" />
                    <Label htmlFor="partner-prefer-not-to-say">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>How long have you been together? (if applicable)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="relationshipLength">Relationship Length</Label>
                <Input
                  id="relationshipLength"
                  type="text"
                  value={formData.relationshipLength}
                  onChange={(e) => updateFormData('relationshipLength', e.target.value)}
                  placeholder="e.g., 2 years, 6 months"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 7:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Do you live together? (if applicable)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Living Together</Label>
                <RadioGroup value={formData.livingTogether} onValueChange={(value) => updateFormData('livingTogether', value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="living-together-yes" />
                    <Label htmlFor="living-together-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="living-together-no" />
                    <Label htmlFor="living-together-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 8:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Previous Relationships</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="previousRelationships">Tell us about your previous relationships</Label>
                <Textarea
                  id="previousRelationships"
                  value={formData.previousRelationships}
                  onChange={(e) => updateFormData('previousRelationships', e.target.value)}
                  placeholder="e.g., Number of relationships, duration, and reasons for ending"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 9:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Sexual Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sexualExperience">Share your sexual experience</Label>
                <Textarea
                  id="sexualExperience"
                  value={formData.sexualExperience}
                  onChange={(e) => updateFormData('sexualExperience', e.target.value)}
                  placeholder="e.g., Level of experience, preferences, and any concerns"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 10:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Communication Style</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="communicationStyle">Describe your communication style</Label>
                <Textarea
                  id="communicationStyle"
                  value={formData.communicationStyle}
                  onChange={(e) => updateFormData('communicationStyle', e.target.value)}
                  placeholder="e.g., Open, direct, passive, or aggressive"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 11:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Intimacy Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>What are your intimacy goals?</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="goal-1"
                      checked={formData.intimacyGoals.includes('Increased closeness')}
                      onCheckedChange={(checked) => {
                        const goals = checked
                          ? [...formData.intimacyGoals, 'Increased closeness']
                          : formData.intimacyGoals.filter((goal) => goal !== 'Increased closeness');
                        updateFormData('intimacyGoals', goals);
                      }}
                    />
                    <Label htmlFor="goal-1">Increased closeness</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="goal-2"
                      checked={formData.intimacyGoals.includes('Improved communication')}
                      onCheckedChange={(checked) => {
                        const goals = checked
                          ? [...formData.intimacyGoals, 'Improved communication']
                          : formData.intimacyGoals.filter((goal) => goal !== 'Improved communication');
                        updateFormData('intimacyGoals', goals);
                      }}
                    />
                    <Label htmlFor="goal-2">Improved communication</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="goal-3"
                      checked={formData.intimacyGoals.includes('Enhanced sexual satisfaction')}
                      onCheckedChange={(checked) => {
                        const goals = checked
                          ? [...formData.intimacyGoals, 'Enhanced sexual satisfaction']
                          : formData.intimacyGoals.filter((goal) => goal !== 'Enhanced sexual satisfaction');
                        updateFormData('intimacyGoals', goals);
                      }}
                    />
                    <Label htmlFor="goal-3">Enhanced sexual satisfaction</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="goal-4"
                      checked={formData.intimacyGoals.includes('Deeper emotional connection')}
                      onCheckedChange={(checked) => {
                        const goals = checked
                          ? [...formData.intimacyGoals, 'Deeper emotional connection']
                          : formData.intimacyGoals.filter((goal) => goal !== 'Deeper emotional connection');
                        updateFormData('intimacyGoals', goals);
                      }}
                    />
                    <Label htmlFor="goal-4">Deeper emotional connection</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 12:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Specific Concerns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="specificConcerns">Do you have any specific concerns?</Label>
                <Textarea
                  id="specificConcerns"
                  value={formData.specificConcerns}
                  onChange={(e) => updateFormData('specificConcerns', e.target.value)}
                  placeholder="e.g., Lack of desire, erectile dysfunction, or pain during intercourse"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 13:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Deal Breakers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="dealBreakers">What are your deal breakers?</Label>
                <Textarea
                  id="dealBreakers"
                  value={formData.dealBreakers}
                  onChange={(e) => updateFormData('dealBreakers', e.target.value)}
                  placeholder="e.g., Infidelity, lack of emotional support, or different values"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 14:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Emotional Needs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="emotionalNeeds">What are your emotional needs?</Label>
                <Textarea
                  id="emotionalNeeds"
                  value={formData.emotionalNeeds}
                  onChange={(e) => updateFormData('emotionalNeeds', e.target.value)}
                  placeholder="e.g., Affection, validation, or support"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 15:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Physical Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="physicalPreferences">What are your physical preferences?</Label>
                <Textarea
                  id="physicalPreferences"
                  value={formData.physicalPreferences}
                  onChange={(e) => updateFormData('physicalPreferences', e.target.value)}
                  placeholder="e.g., Touch, kissing, or specific acts"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 16:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Time Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="timeAvailability">How much time do you have available for intimacy?</Label>
                <Textarea
                  id="timeAvailability"
                  value={formData.timeAvailability}
                  onChange={(e) => updateFormData('timeAvailability', e.target.value)}
                  placeholder="e.g., Weekends, evenings, or specific days"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 17:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Privacy Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="privacyPreferences">What are your privacy preferences?</Label>
                <Textarea
                  id="privacyPreferences"
                  value={formData.privacyPreferences}
                  onChange={(e) => updateFormData('privacyPreferences', e.target.value)}
                  placeholder="e.g., Keeping intimacy private, or sharing with trusted friends"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 18:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Almost there!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Just a few more details to ensure we tailor the perfect plan for you.</p>
            </CardContent>
          </Card>
        );

      case 19:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Data Consent & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Before we generate your personalized intimacy plan, please review our data usage policy:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2 text-sm">
                  <li>• Your responses will be used to create a personalized intimacy plan</li>
                  <li>• All data is encrypted and stored securely</li>
                  <li>• We never share personal information with third parties</li>
                  <li>• You can request data deletion at any time</li>
                </ul>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dataConsent"
                  checked={formData.dataConsent}
                  onCheckedChange={(checked) => updateFormData('dataConsent', checked)}
                />
                <Label htmlFor="dataConsent" className="text-sm">
                  I consent to the processing of my data as described above
                </Label>
              </div>
              {isLoading && (
                <div className="text-center">
                  <p className="mb-2">Generating your personalized plan...</p>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 20:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>🎉 Your Intimacy Plan is Ready!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Congratulations!</h3>
                  <p className="text-gray-600">
                    Based on your responses, we've created a personalized intimacy plan tailored just for you.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-2">Your Plan Includes:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Personalized communication strategies</li>
                    <li>• Intimacy-building exercises</li>
                    <li>• Progress tracking tools</li>
                    <li>• Expert guidance and tips</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return <div>Invalid step</div>;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.name.trim() !== '';
      case 2: return formData.age !== '' && formData.gender !== '';
      case 3: return formData.relationshipStatus !== '';
      case 4: return formData.relationshipStatus === 'single' || formData.partnerAge !== '';
      case 5: return formData.relationshipStatus === 'single' || formData.partnerGender !== '';
      case 6: return formData.relationshipStatus === 'single' || formData.relationshipLength !== '';
      case 7: return formData.relationshipStatus === 'single' || formData.livingTogether !== '';
      case 8: return formData.previousRelationships.trim() !== '';
      case 9: return formData.sexualExperience.trim() !== '';
      case 10: return formData.communicationStyle.trim() !== '';
      case 11: return formData.intimacyGoals.length > 0;
      case 12: return formData.specificConcerns.trim() !== '';
      case 13: return formData.dealBreakers.trim() !== '';
      case 14: return formData.emotionalNeeds.trim() !== '';
      case 15: return formData.physicalPreferences.trim() !== '';
      case 16: return formData.timeAvailability.trim() !== '';
      case 17: return formData.privacyPreferences.trim() !== '';
      case 19: return formData.dataConsent;
      default: return true;
    }
  };

  const progress = Math.round((currentStep / 20) * 100);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mb-6">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-600 mt-2 text-center">
          Step {currentStep} of 20
        </p>
      </div>

      {renderStep()}

      <div className="flex justify-between w-full max-w-2xl mt-6">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={isLoading}
          >
            Back
          </Button>
        )}
        
        <div className="ml-auto">
          {currentStep === 19 ? (
            <Button
              onClick={generatePlan}
              disabled={!canProceed() || isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? 'Generating...' : 'Generate Plan'}
            </Button>
          ) : currentStep === 20 ? (
            <Button
              onClick={() => onComplete(formData)}
              className="min-w-[120px]"
            >
              Continue to Dashboard
            </Button>
          ) : currentStep < 19 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
            >
              Continue
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
