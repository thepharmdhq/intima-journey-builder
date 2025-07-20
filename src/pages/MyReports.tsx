
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, TrendingUp, Target, RefreshCw, FileText, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReportCard from '@/components/ReportCard';

interface Report {
  id: string;
  assessmentName: string;
  assessmentType: string;
  completedDate: string;
  overallScore: number;
  domainScores: { [key: string]: number };
  executiveSummary: string;
  topStrengths: string[];
  areasForGrowth: string[];
  recommendations: string[];
  nextActionDays: number;
  category: string;
}

const MyReports: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Generate mock historical reports based on completed assessments
    const mockReports: Report[] = [
      {
        id: 'pair-report-1',
        assessmentName: 'PAIR Assessment',
        assessmentType: 'pair',
        completedDate: '2024-01-15',
        overallScore: 8.2,
        domainScores: {
          'Emotional Intimacy': 8.5,
          'Social Intimacy': 7.8,
          'Sexual Intimacy': 8.0,
          'Intellectual Intimacy': 8.4,
          'Recreational Intimacy': 8.1
        },
        executiveSummary: 'Your relationship shows strong intimacy across all domains, with particularly high emotional and intellectual connection. Areas for growth include enhancing social intimacy and shared recreational activities.',
        topStrengths: ['Deep emotional connection', 'Strong intellectual compatibility', 'Good sexual communication'],
        areasForGrowth: ['Social activities together', 'Shared hobbies and interests'],
        recommendations: [
          'Schedule weekly date nights to strengthen social intimacy',
          'Try new recreational activities together',
          'Continue nurturing your strong emotional bond'
        ],
        nextActionDays: 90,
        category: 'Relationship Health'
      },
      {
        id: 'fsfi-report-1',
        assessmentName: 'Female Sexual Function Index (FSFI)',
        assessmentType: 'fsfi',
        completedDate: '2024-01-08',
        overallScore: 7.8,
        domainScores: {
          'Desire': 7.5,
          'Arousal': 8.2,
          'Lubrication': 7.9,
          'Orgasm': 8.0,
          'Satisfaction': 7.6,
          'Pain': 8.1
        },
        executiveSummary: 'Your sexual function assessment indicates healthy sexual functioning with some areas for enhancement. Desire and satisfaction showed the most potential for improvement.',
        topStrengths: ['Good arousal response', 'Minimal pain concerns', 'Positive orgasmic function'],
        areasForGrowth: ['Sexual desire levels', 'Overall satisfaction'],
        recommendations: [
          'Explore mindfulness practices for desire enhancement',
          'Communicate openly about satisfaction with your partner',
          'Consider sensate focus exercises'
        ],
        nextActionDays: 60,
        category: 'Physical Intimacy'
      },
      {
        id: 'body-image-report-1',
        assessmentName: 'Body Image Scale',
        assessmentType: 'body-image',
        completedDate: '2024-01-01',
        overallScore: 6.9,
        domainScores: {
          'Body Appreciation': 7.2,
          'Body Confidence': 6.5,
          'Body Comfort': 6.8,
          'Self Acceptance': 7.1
        },
        executiveSummary: 'Your body image assessment reveals moderate to good self-perception with room for building confidence. You show strong appreciation for your body but could benefit from increased confidence.',
        topStrengths: ['Body appreciation', 'Self-acceptance mindset'],
        areasForGrowth: ['Body confidence', 'Comfort in intimate situations'],
        recommendations: [
          'Practice daily body appreciation exercises',
          'Challenge negative self-talk about appearance',
          'Engage in activities that make you feel strong and capable'
        ],
        nextActionDays: 45,
        category: 'Self-Assessment'
      }
    ];

    setReports(mockReports);
  }, []);

  const categories = ['all', 'Relationship Health', 'Physical Intimacy', 'Emotional Connection', 'Self-Assessment'];
  const filteredReports = selectedCategory === 'all' 
    ? reports 
    : reports.filter(r => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">My Reports</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Your Premium Assessment Reports
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive insights and personalized recommendations from your completed assessments.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category === 'all' ? 'All Reports' : category}
            </Button>
          ))}
        </div>

        {/* Reports Grid */}
        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="bg-white/80 border-border/50 shadow-sm">
            <CardContent className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Reports Yet</h3>
              <p className="text-muted-foreground mb-6">
                Complete some assessments to see your premium reports here.
              </p>
              <Button onClick={() => navigate('/assessments')}>
                <Target className="w-4 h-4 mr-2" />
                Take Assessments
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default MyReports;
