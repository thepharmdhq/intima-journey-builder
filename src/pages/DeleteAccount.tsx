import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, ArrowLeft, Shield, FileText, Trash2, Check, X, Key, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [reasonForDeletion, setReasonForDeletion] = useState('');
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Mock user email - in real app would come from auth context
  const userEmail = 'user@example.com';

  const handleReauthentication = () => {
    setAuthError('');
    
    // Basic validation
    if (!email || !password) {
      setAuthError('Please enter both email and password');
      return;
    }
    
    if (email !== userEmail) {
      setAuthError('Email does not match your account');
      return;
    }
    
    // Simulate auth check - in real app would validate with backend
    if (password.length < 3) {
      setAuthError('Invalid password');
      return;
    }
    
    setCurrentStep(2);
  };

  const handleDeleteAccount = async () => {
    if (confirmText !== 'DELETE') {
      toast({
        title: "Confirmation Required",
        description: "Please type 'DELETE' to confirm account deletion",
        variant: "destructive",
      });
      return;
    }
    
    if (!isAcknowledged) {
      toast({
        title: "Acknowledgment Required",
        description: "Please acknowledge that you understand the consequences",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(3);
    }, 2000);
  };

  const handleFinalDeletion = () => {
    // Clear all user data
    localStorage.removeItem('userData');
    
    toast({
      title: "Account Deleted",
      description: "Your account has been successfully deleted. We're sorry to see you go.",
    });
    
    // Redirect to home
    navigate('/');
  };

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 border-border/50 shadow-lg">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Account Deletion Complete</h2>
              <p className="text-muted-foreground">
                Your account and all associated data have been permanently deleted. 
                We're sorry to see you go, and we hope Intima was helpful during your journey.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                If you change your mind in the future, you're always welcome to create a new account.
              </p>
              <Button onClick={handleFinalDeletion} className="w-full">
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/')} className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-destructive">Delete Account</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="w-4 h-4" />
              Step {currentStep} of 2
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 1 && (
          <div className="space-y-8">
            {/* Re-Authentication */}
            <Card className="bg-white/80 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Key className="w-5 h-5" />
                  Verify Your Identity
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  For security purposes, please confirm your credentials to proceed with account deletion.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                {authError && (
                  <Alert variant="destructive">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}
                <Button onClick={handleReauthentication} className="w-full">
                  Verify Identity
                </Button>
              </CardContent>
            </Card>

            {/* Data Impact Warning */}
            <Card className="bg-destructive/5 border-destructive/20 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  Important: What Will Be Deleted
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Deleting your account is permanent and cannot be undone. The following data will be permanently removed:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Personal profile information',
                    'Assessment results and scores',
                    'Intimacy plans and recommendations',
                    'Progress tracking data',
                    'Subscription and billing information',
                    'Support conversations',
                    'Account preferences and settings',
                    'All associated user content'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            {/* Feedback Section */}
            <Card className="bg-white/80 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Help Us Improve (Optional)</CardTitle>
                <p className="text-sm text-muted-foreground">
                  We'd appreciate your feedback to help us improve Intima for other users.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reason">What's your main reason for leaving?</Label>
                  <select
                    id="reason"
                    value={reasonForDeletion}
                    onChange={(e) => setReasonForDeletion(e.target.value)}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="">Select a reason (optional)</option>
                    <option value="not_using">Not using the app enough</option>
                    <option value="privacy_concerns">Privacy concerns</option>
                    <option value="cost">Cost/pricing issues</option>
                    <option value="features">Missing features</option>
                    <option value="technical">Technical problems</option>
                    <option value="found_alternative">Found a better alternative</option>
                    <option value="no_longer_needed">No longer need this service</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback">Additional feedback (optional)</Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us more about your experience or suggestions for improvement..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Final Confirmation */}
            <Card className="bg-destructive/5 border-destructive/20 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 className="w-5 h-5" />
                  Final Confirmation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert variant="destructive">
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                    <strong>This action cannot be undone.</strong> Your account and all data will be permanently deleted within 24 hours.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="confirm">Type "DELETE" to confirm</Label>
                    <Input
                      id="confirm"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder="Type DELETE in capital letters"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="acknowledge" 
                      checked={isAcknowledged}
                      onCheckedChange={(checked) => setIsAcknowledged(checked === true)}
                    />
                    <Label htmlFor="acknowledge" className="text-sm leading-relaxed">
                      I understand that this action is permanent and irreversible. I acknowledge that all my data, 
                      including assessment results, progress tracking, and personal information will be permanently deleted.
                    </Label>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/')}
                    className="flex-1 order-2 sm:order-1"
                  >
                    Cancel & Keep Account
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                    disabled={isLoading || confirmText !== 'DELETE' || !isAcknowledged}
                    className="flex-1 order-1 sm:order-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Deleting Account...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete My Account
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Legal */}
            <Card className="bg-muted/30 border-border/50 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Privacy & Data Protection</h4>
                    <p className="text-xs text-muted-foreground">
                      Your data deletion is processed according to our Privacy Policy and applicable data protection laws. 
                      Some anonymized data may be retained for legal compliance and security purposes.
                    </p>
                    <div className="flex gap-4 text-xs">
                      <button className="text-primary hover:underline">Privacy Policy</button>
                      <button className="text-primary hover:underline">Terms of Service</button>
                      <button className="text-primary hover:underline">Data Retention Policy</button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeleteAccount;