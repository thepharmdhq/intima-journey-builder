import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, Settings, FileText, CreditCard, LogOut, HelpCircle, Trash2, Menu, Heart, Brain, Target, Zap, Award, Clock, BookOpen, MessageCircle, Check, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  userData: {
    firstName: string;
    selectedPlan: 'individual' | 'couples';
    intimacyGoals: string[];
    conflictComfort: number;
    sexualSatisfaction: number;
    bodyImageRating: number;
    [key: string]: any;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dailyResponse, setDailyResponse] = useState<string>('');
  const [actionCompleted, setActionCompleted] = useState(false);

  // Calculate intimacy score (decimal format)
  const calculateIntimacyScore = () => {
    const scores = [
      userData.conflictComfort * 2,
      userData.sexualSatisfaction * 2, 
      userData.bodyImageRating * 2,
      userData.intimacyGoals.length * 2
    ];
    const score = scores.reduce((a, b) => a + b, 0) / scores.length;
    return (score / 10).toFixed(1);
  };

  const intimacyScore = calculateIntimacyScore();
  const streakDays = 7;
  const todaysQuestion = "How did you express appreciation for yourself or your partner today?";
  const todaysAction = "Try a 5-minute sensate focus exercise with your partner";

  // Mock data for recent assessments
  const recentAssessments = [
    { name: 'PAIR Assessment', icon: Heart, date: '2 days ago', score: 8.2 },
    { name: 'FSFI Scale', icon: Brain, date: '1 week ago', score: 7.8 },
    { name: 'Body Image', icon: Target, date: '2 weeks ago', score: 6.9 }
  ];

  // Mock data for personalized plan
  const focusAreas = [
    { area: 'Communication', progress: 75, priority: 'High' },
    { area: 'Physical Intimacy', progress: 60, priority: 'Medium' },
    { area: 'Emotional Connection', progress: 85, priority: 'High' }
  ];

  const recommendedAssessments = [
    'Conflict Resolution Scale',
    'Intimacy Frequency Assessment'
  ];

  const handleDailyResponse = (response: string) => {
    setDailyResponse(response);
    // Here you would typically save the response
  };

  const handleActionComplete = () => {
    setActionCompleted(true);
    // Here you would typically save the completion
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Intima
              </h1>
            </div>

            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full bg-muted">
                  <Menu className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border border-border/50 shadow-lg">
                <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-muted/50">
                  <User className="w-4 h-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer"
                  onClick={() => navigate('/assessments')}
                >
                  <FileText className="w-4 h-4" />
                  Assessments
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-muted/50">
                  <FileText className="w-4 h-4" />
                  My Reports
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-muted/50">
                  <CreditCard className="w-4 h-4" />
                  My Subscription
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-muted/50">
                  <HelpCircle className="w-4 h-4" />
                  Support
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-muted/50">
                  <LogOut className="w-4 h-4" />
                  Log Out
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-destructive/10 text-destructive">
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Welcome back, {userData.firstName}! 👋
          </h2>
          <p className="text-muted-foreground text-lg">
            Your intimacy journey continues. Here's what's happening today.
          </p>
        </div>

        {/* Hero: Intimacy Score */}
        <div className="flex justify-center">
          <Card className="bg-white/80 border-border/50 shadow-lg max-w-md w-full">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl flex items-center justify-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Your Intimacy Score
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="relative w-40 h-40 mx-auto">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    stroke="hsl(var(--primary))"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 72}`}
                    strokeDashoffset={`${2 * Math.PI * 72 * (1 - parseFloat(intimacyScore) / 10)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{intimacyScore}</div>
                    <div className="text-sm text-muted-foreground">out of 10</div>
                  </div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="font-medium">
                  {parseFloat(intimacyScore) >= 8 ? 'Excellent' : parseFloat(intimacyScore) >= 6 ? 'Good' : 'Developing'}
                </p>
                <p className="text-sm text-muted-foreground">
                  +0.3 points from last week
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Question Prompt */}
        <Card className="bg-white/80 border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Daily Question
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-5">
              <p className="text-sm font-medium mb-4">{todaysQuestion}</p>
              <div className="flex flex-wrap gap-2">
                {['Great', 'Good', 'Could be better', 'Challenging'].map((response) => (
                  <Button
                    key={response}
                    variant={dailyResponse === response ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleDailyResponse(response)}
                    className="rounded-full"
                  >
                    {response}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="text-xs">
                <Brain className="w-3 h-3 mr-1" />
                AI Generated
              </Badge>
              {dailyResponse && (
                <Badge variant="default" className="text-xs">
                  <Check className="w-3 h-3 mr-1" />
                  Answered
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-border/50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Today's Action</h3>
                </div>
                <p className="text-sm text-muted-foreground max-w-md">
                  {todaysAction}
                </p>
              </div>
              <Button 
                className="rounded-full" 
                onClick={handleActionComplete}
                disabled={actionCompleted}
              >
                {actionCompleted ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Completed
                  </>
                ) : (
                  'Mark Complete'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Streak Counter */}
        <Card className="bg-white/80 border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Your Streak
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold text-primary">{streakDays}</div>
              <p className="text-sm text-muted-foreground">
                You've answered {streakDays} days in a row! 🔥
              </p>
              <div className="w-full bg-muted/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(streakDays % 30) * 3.33}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {30 - (streakDays % 30)} days until next milestone
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Assessments */}
        <Card className="bg-white/80 border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Recent Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssessments.map((assessment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <assessment.icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{assessment.name}</p>
                      <p className="text-xs text-muted-foreground">{assessment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{assessment.score}</span>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Retake
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personalized Plan Snapshot */}
        <Card className="bg-white/80 border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Your Focus Areas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {focusAreas.map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{area.area}</span>
                  <Badge variant={area.priority === 'High' ? 'default' : 'secondary'} className="text-xs">
                    {area.priority}
                  </Badge>
                </div>
                <Progress value={area.progress} className="h-2" />
              </div>
            ))}
            <div className="pt-2 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Recommended Next:</p>
              {recommendedAssessments.map((assessment, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{assessment}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Floating Action Button - Only show on dashboard */}
      <Button
        onClick={() => navigate('/assessments')}
        className="fixed bottom-6 right-6 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        size="lg"
      >
        <FileText className="w-5 h-5 mr-2" />
        Go to Assessments
      </Button>
    </div>
  );
};

export default Dashboard;
