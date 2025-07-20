
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Crown, 
  Calendar, 
  CreditCard, 
  Settings, 
  Users, 
  User, 
  Check,
  AlertCircle,
  RefreshCw,
  Heart,
  FileText,
  Zap
} from 'lucide-react';

const MySubscription = () => {
  const navigate = useNavigate();
  const [subscriptionData, setSubscriptionData] = useState({
    selectedPlan: 'individual',
    selectedBilling: 'monthly'
  });
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(3);

  useEffect(() => {
    // Load subscription data from localStorage
    const savedPlan = localStorage.getItem('selectedPlan') || 'individual';
    const savedBilling = localStorage.getItem('selectedBilling') || 'monthly';
    
    setSubscriptionData({
      selectedPlan: savedPlan,
      selectedBilling: savedBilling
    });

    // Calculate trial days remaining (mock implementation)
    // In real app, this would be calculated from signup date
    const signupDate = localStorage.getItem('signupDate');
    if (signupDate) {
      const daysSinceSignup = Math.floor((Date.now() - new Date(signupDate).getTime()) / (1000 * 60 * 60 * 24));
      setTrialDaysRemaining(Math.max(0, 3 - daysSinceSignup));
    }
  }, []);

  const plans = {
    individual: {
      name: 'Individual',
      icon: User,
      features: [
        'Personal intimacy assessments',
        'Individual progress tracking',
        'Personalized insights',
        'Basic reporting',
        'Educational resources'
      ],
      pricing: {
        monthly: 29,
        yearly: 240
      }
    },
    couples: {
      name: 'Couples',
      icon: Users,
      features: [
        'Everything in Individual plan',
        'Partner assessments & tracking',
        'Relationship insights',
        'Couples exercises & activities',
        'Shared progress reports',
        'Communication tools'
      ],
      pricing: {
        monthly: 49,
        yearly: 408
      }
    }
  };

  const currentPlan = plans[subscriptionData.selectedPlan as keyof typeof plans];
  const currentPrice = currentPlan.pricing[subscriptionData.selectedBilling as keyof typeof currentPlan.pricing];
  const yearlyDiscount = subscriptionData.selectedBilling === 'yearly' ? '31% off' : null;

  // Calculate monthly equivalent for yearly plans
  const getMonthlyEquivalent = (planKey: string) => {
    const plan = plans[planKey as keyof typeof plans];
    return Math.round(plan.pricing.yearly / 12);
  };

  // Plan change handler to handle both plan and billing changes
  const handlePlanChange = (newPlan: string, newBilling: string) => {
    localStorage.setItem('selectedPlan', newPlan);
    localStorage.setItem('selectedBilling', newBilling);
    setSubscriptionData({ selectedPlan: newPlan, selectedBilling: newBilling });
  };

  const getNextBillingDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + trialDaysRemaining);
    return today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Create all plan combinations
  const getAllPlanCombinations = () => {
    const combinations = [];
    Object.entries(plans).forEach(([planKey, plan]) => {
      ['monthly', 'yearly'].forEach(billing => {
        const price = plan.pricing[billing as keyof typeof plan.pricing];
        const monthlyEquivalent = billing === 'yearly' ? getMonthlyEquivalent(planKey) : null;
        const isCurrentPlan = planKey === subscriptionData.selectedPlan && billing === subscriptionData.selectedBilling;
        
        combinations.push({
          planKey,
          billing,
          plan,
          price,
          monthlyEquivalent,
          isCurrentPlan,
          displayName: `${plan.name} ${billing === 'monthly' ? 'Monthly' : 'Yearly'}`,
          billingDisplay: billing === 'monthly' ? 'month' : 'year',
          billingShort: billing === 'monthly' ? 'mo' : 'yr'
        });
      });
    });
    return combinations;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="h-9 w-9 rounded-full"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold">My Subscription</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Trial Status Banner */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Free Trial Active</h3>
                </div>
                <p className="text-muted-foreground">
                  {trialDaysRemaining > 0 
                    ? `${trialDaysRemaining} days remaining in your free trial`
                    : 'Your free trial has ended'
                  }
                </p>
                <div className="w-full bg-muted/50 rounded-full h-2 max-w-xs">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((3 - trialDaysRemaining) / 3) * 100}%` }}
                  />
                </div>
              </div>
              {trialDaysRemaining > 0 && (
                <Badge variant="secondary" className="text-sm">
                  <Calendar className="w-3 h-3 mr-1" />
                  Ends {getNextBillingDate()}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Current Plan Information */}
        <Card className="bg-white/80 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <currentPlan.icon className="w-5 h-5 text-primary" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{currentPlan.name} Plan</h3>
                <p className="text-muted-foreground capitalize">
                  {subscriptionData.selectedBilling} billing
                  {yearlyDiscount && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {yearlyDiscount}
                    </Badge>
                  )}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  ${currentPrice}
                  {subscriptionData.selectedBilling === 'yearly' && (
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      (${getMonthlyEquivalent(subscriptionData.selectedPlan)}/month)
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  per {subscriptionData.selectedBilling === 'monthly' ? 'month' : 'year'}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3">Plan Features</h4>
              <div className="grid gap-2">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Information */}
        <Card className="bg-white/80 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Billing Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Next Billing Date</label>
                <div className="text-lg font-semibold">{getNextBillingDate()}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Amount</label>
                <div className="text-lg font-semibold">${currentPrice}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Options */}
        <Card className="bg-white/80 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Change Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getAllPlanCombinations().map((combo) => (
                <div
                  key={`${combo.planKey}-${combo.billing}`}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    combo.isCurrentPlan 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-border bg-background hover:border-primary/30 hover:shadow-sm'
                  }`}
                >
                  {combo.isCurrentPlan && (
                    <Badge className="absolute -top-3 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">
                      Current Plan
                    </Badge>
                  )}
                  
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center gap-2">
                      <combo.plan.icon className={`w-5 h-5 ${combo.isCurrentPlan ? 'text-primary' : 'text-muted-foreground'}`} />
                      <h3 className={`font-semibold ${combo.isCurrentPlan ? 'text-primary' : 'text-foreground'}`}>
                        {combo.displayName}
                      </h3>
                      {combo.billing === 'yearly' && (
                        <Badge variant="secondary" className="text-xs">
                          Save 31%
                        </Badge>
                      )}
                    </div>
                    
                    <div className={`text-2xl font-bold ${combo.isCurrentPlan ? 'text-primary' : 'text-foreground'}`}>
                      ${combo.price}
                      {combo.monthlyEquivalent && (
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          (${combo.monthlyEquivalent}/mo)
                        </span>
                      )}
                      <span className="text-sm font-normal text-muted-foreground">
                        /{combo.billingShort}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      {combo.plan.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Check className={`w-3 h-3 ${combo.isCurrentPlan ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                      {combo.plan.features.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{combo.plan.features.length - 3} more features
                        </div>
                      )}
                    </div>
                    
                    {!combo.isCurrentPlan && (
                      <Button
                        className="w-full mt-4"
                        onClick={() => handlePlanChange(combo.planKey, combo.billing)}
                        variant="default"
                      >
                        Switch to {combo.displayName}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscription Management Actions */}
        <Card className="bg-white/80 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Manage Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Update Payment
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Billing History
              </Button>
              <Button variant="outline" className="flex items-center gap-2 text-destructive hover:text-destructive">
                <AlertCircle className="w-4 h-4" />
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Usage Summary */}
        <Card className="bg-white/80 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Assessments Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Reports Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">7</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MySubscription;
