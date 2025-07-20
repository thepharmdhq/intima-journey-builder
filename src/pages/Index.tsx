
import React, { useState, useEffect } from 'react';
import OnboardingFlow from '@/components/OnboardingFlow';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [userData, setUserData] = useState(null);

  // Check if onboarding is complete (you can implement your own logic here)
  useEffect(() => {
    // For now, we'll check if there's stored user data
    // In a real app, this would check authentication state or local storage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
        setIsOnboardingComplete(true);
      } catch (error) {
        // If parsing fails, treat as not completed
        setIsOnboardingComplete(false);
      }
    }
  }, []);

  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    setIsOnboardingComplete(true);
    // Store the completion state
    localStorage.setItem('userData', JSON.stringify(data));
  };

  // Show dashboard if onboarding is complete, otherwise show onboarding
  if (isOnboardingComplete && userData) {
    return <Dashboard userData={userData} />;
  }

  return <OnboardingFlow onComplete={handleOnboardingComplete} />;
};

export default Index;
