import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, Settings, FileText, CreditCard, LogOut, HelpCircle, Trash2, Menu, Heart, Brain, Target, Zap, Users, Calendar, Sparkles, TrendingUp, Award, Clock, BookOpen, MessageCircle, Check } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
  const [questionResponse, setQuestionResponse] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Calculate intimacy score based on user data
  const calculateIntimacyScore = () => {
    const scores = [
      userData.conflictComfort * 2,
      userData.sexualSatisfaction * 2, 
      userData.bodyImageRating * 2,
      userData.intimacyGoals.length * 2
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10);
  };

  const intimacyScore = calculateIntimacyScore();

  // Mock data for charts
  const weeklyData = [
    { day: 'Mon', score: 72 },
    { day: 'Tue', score: 75 },
    { day: 'Wed', score: 78 },
    { day: 'Thu', score: 82 },
    { day: 'Fri', score: 85 },
    { day: 'Sat', score: 83 },
    { day: 'Sun', score: intimacyScore },
  ];

  const todaysQuestion = "How did you express appreciation for yourself or your partner today?";

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
                <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-muted/50">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Welcome back, {userData.firstName}! 👋
          </h2>
          <p className="text-muted-foreground text-lg">
            Your intimacy journey continues. Here's what's happening today.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Intimacy Score Widget */}
          <Card className="lg:col-span-1 bg-white/80 border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Intimacy Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 54}`}
                    strokeDashoffset={`${2 * Math.PI * 54 * (1 - intimacyScore / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{intimacyScore}</div>
                    <div className="text-xs text-muted-foreground">out of 100</div>
                  </div>
                </div>
              </div>
              <div className="text-center space-y-1">
                <p className="font-medium text-sm">
                  {intimacyScore >= 80 ? 'Excellent' : intimacyScore >= 60 ? 'Good' : 'Developing'}
                </p>
                <p className="text-xs text-muted-foreground">
                  +3 points from last week
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Daily Question Widget */}
          <Card className="lg:col-span-2 bg-white/80 border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Daily Reflection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-5">
                <p className="text-sm font-medium mb-4">{todaysQuestion}</p>
                <Textarea
                  value={questionResponse}
                  onChange={(e) => setQuestionResponse(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="min-h-[100px] border-border/50 bg-white/80"
                />
              </div>
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Generated
                </Badge>
                <Button size="sm" className="rounded-full">
                  Save Response
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Progress Chart */}
          <Card className="lg:col-span-2 bg-white/80 border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
                    <YAxis domain={[60, 90]} hide />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Streak & Milestones */}
          <Card className="bg-white/80 border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">7</div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Completed Assessment</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>7-Day Streak</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                  <span>30-Day Challenge</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Card */}
          <Card className="lg:col-span-3 bg-gradient-to-r from-primary/10 to-accent/10 border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Today's Micro-Task</h3>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Share one thing you appreciate about yourself or your partner. Studies show daily appreciation increases relationship satisfaction by 25%.
                  </p>
                </div>
                <Button className="rounded-full">
                  <Check className="w-4 h-4 mr-2" />
                  Complete
                </Button>
              </div>
            </CardContent>
          </Card>

          {userData.selectedPlan === 'couples' && (
            /* Partner Check-In */
            <Card className="lg:col-span-2 bg-white/80 border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Partner Check-In
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Invite your partner to join your journey
                  </p>
                  <Button variant="outline" className="rounded-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Resources */}
          <Card className={`bg-white/80 border-border/50 shadow-sm ${userData.selectedPlan === 'couples' ? 'lg:col-span-1' : 'lg:col-span-2'}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Quick Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start text-sm h-8">
                Communication Guide
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm h-8">
                Intimacy Exercises
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm h-8">
                Mindfulness Practices
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;