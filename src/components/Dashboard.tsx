
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  User,
  Settings,
  FileText,
  CreditCard,
  LogOut,
  HelpCircle,
  Trash2,
  Menu,
  Target,
  TrendingUp,
  Calendar,
  Award,
  Lightbulb,
  Heart,
  Bell,
  ExternalLink,
  Users,
  CheckCircle,
  Clock,
  Flame
} from 'lucide-react';
import IntimacyScoreWidget from './dashboard/IntimacyScoreWidget';
import DailyQuestionWidget from './dashboard/DailyQuestionWidget';
import WeeklyProgressChart from './dashboard/WeeklyProgressChart';

interface DashboardProps {
  userData: any;
}

const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  const [currentStreak, setCurrentStreak] = useState(7);
  const intimacyScore = 72; // This would come from actual assessment data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-gray-900">IntimateAI</h1>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden md:block">{userData.name}</span>
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                Assessments
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <TrendingUp className="mr-2 h-4 w-4" />
                My Reports
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                My Subscription
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                Support
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {userData.name}!
          </h2>
          <p className="text-gray-600">
            Here's your intimacy journey overview for today
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Widgets */}
          <div className="lg:col-span-2 space-y-6">
            {/* Intimacy Score Speedometer */}
            <IntimacyScoreWidget score={intimacyScore} />
            
            {/* Daily Question Prompt */}
            <DailyQuestionWidget />
            
            {/* Weekly Progress Chart */}
            <WeeklyProgressChart />
            
            {/* Action Card / Micro-Task */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-primary" />
                  Today's Action
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Practice Active Listening
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Spend 10 minutes today having a conversation with your partner where you focus entirely on listening without planning your response.
                  </p>
                  <Button size="sm" className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Secondary Widgets */}
          <div className="space-y-6">
            {/* Personalized Plan Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="secondary" className="w-full justify-center py-2">
                    {userData.selectedPlan === 'individual' ? 'Individual' : 'Couples'} Track
                  </Badge>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Week 1 Progress</span>
                      <span>3/7</span>
                    </div>
                    <Progress value={43} className="h-2" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Focus: Building Communication Foundation
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Streak & Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Flame className="mr-2 h-5 w-5 text-orange-500" />
                  Streak & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{currentStreak}</div>
                    <p className="text-sm text-gray-600">Day Streak</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">First Week Complete</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Assessment Master</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Library Snapshot */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Daily Check-in
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    Relationship Health
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Target className="mr-2 h-4 w-4" />
                    Goal Review
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Partner Check-In (Couples Track Only) */}
            {userData.selectedPlan === 'couples' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Users className="mr-2 h-5 w-5 text-pink-500" />
                    Partner Check-In
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      How are you feeling about your relationship today?
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">😊</Button>
                      <Button size="sm" variant="outline" className="flex-1">😐</Button>
                      <Button size="sm" variant="outline" className="flex-1">😔</Button>
                    </div>
                    <Button size="sm" className="w-full">
                      Send to Partner
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Bell className="mr-2 h-5 w-5 text-blue-500" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Evening Reflection</p>
                      <p className="text-xs text-gray-500">Today at 8:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Weekly Assessment</p>
                      <p className="text-xs text-gray-500">Tomorrow</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resource Quick-Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <ExternalLink className="mr-2 h-5 w-5 text-green-500" />
                  Quick Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Communication Guide
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    Intimacy Exercises
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Relationship Tips
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Insights & Tips Feed */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              Personalized Insights & Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Communication Tip</h3>
                <p className="text-sm text-blue-800">
                  Try the "5-minute rule" - give your full attention for 5 minutes when your partner wants to talk.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Progress Insight</h3>
                <p className="text-sm text-green-800">
                  Your emotional intimacy score has improved 15% since starting your journey!
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Daily Challenge</h3>
                <p className="text-sm text-purple-800">
                  Express one thing you appreciate about your relationship today.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
