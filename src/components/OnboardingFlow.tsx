import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const OnboardingFlow: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState(21);
  const [selectedBilling, setSelectedBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            {/* Screen 21: Welcome */}
            {currentScreen === 21 && (
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Welcome to Our App!</h2>
                <p className="text-gray-600">Let's get you set up with a personalized experience.</p>
                <button
                  onClick={() => setCurrentScreen(22)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Screen 22: Plan Selection */}
            {currentScreen === 22 && (
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
                  <p className="text-gray-600">Select the plan that works best for you</p>
                </div>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center space-x-4 bg-gray-100 rounded-lg p-1 w-fit mx-auto">
                  <button
                    onClick={() => setSelectedBilling('monthly')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      selectedBilling === 'monthly'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setSelectedBilling('yearly')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors relative ${
                      selectedBilling === 'yearly'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Yearly
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      Save 30%
                    </span>
                  </button>
                </div>

                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  {/* Individual Plan */}
                  <div
                    onClick={() => setSelectedPlan('individual')}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPlan === 'individual'
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Individual</h3>
                        <p className="text-sm text-gray-600">Perfect for personal use</p>
                      </div>
                      
                      <div className="space-y-2">
                        {selectedBilling === 'yearly' ? (
                          <div>
                            <div className="text-3xl font-bold text-gray-900">$240<span className="text-lg text-gray-600">/year</span></div>
                            <div className="text-sm text-gray-500">($20/month)</div>
                            <div className="text-sm text-gray-400 line-through">$29/month</div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-3xl font-bold text-gray-900">$29<span className="text-lg text-gray-600">/month</span></div>
                          </div>
                        )}
                      </div>
                      
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Personal calendar management
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Smart scheduling suggestions
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Basic analytics
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Couples Plan */}
                  <div
                    onClick={() => setSelectedPlan('couples')}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all relative ${
                      selectedPlan === 'couples'
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Couples</h3>
                        <p className="text-sm text-gray-600">Share and sync together</p>
                      </div>
                      
                      <div className="space-y-2">
                        {selectedBilling === 'yearly' ? (
                          <div>
                            <div className="text-3xl font-bold text-gray-900">$408<span className="text-lg text-gray-600">/year</span></div>
                            <div className="text-sm text-gray-500">($34/month)</div>
                            <div className="text-sm text-gray-400 line-through">$49/month</div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-3xl font-bold text-gray-900">$49<span className="text-lg text-gray-600">/month</span></div>
                          </div>
                        )}
                      </div>
                      
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Everything in Individual
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Shared calendar sync
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Couple insights & analytics
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Relationship tools
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <button
                    onClick={() => setCurrentScreen(21)}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentScreen(23)}
                    disabled={!selectedPlan}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Continue to Setup
                  </button>
                </div>
              </div>
            )}

            {/* Screen 23: Personalization */}
            {currentScreen === 23 && (
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Personalize Your Experience</h2>
                <p className="text-gray-600">Tell us a bit about yourself to tailor the app to your needs.</p>
                <button
                  onClick={() => setCurrentScreen(24)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Next: Preferences
                </button>
              </div>
            )}

            {/* Screen 24: Preferences */}
            {currentScreen === 24 && (
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Set Your Preferences</h2>
                <p className="text-gray-600">Customize the app to match your personal style and workflow.</p>
                <button
                  onClick={() => setCurrentScreen(25)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Complete Setup
                </button>
              </div>
            )}

             {/* Screen 25: Complete */}
             {currentScreen === 25 && (
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Setup Complete!</h2>
                <p className="text-gray-600">Enjoy your personalized experience.</p>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
