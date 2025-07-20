
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, Target, RefreshCw, Star, CheckCircle } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface ReportCardProps {
  report: {
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
  };
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getNextActionText = (days: number) => {
    if (days < 30) {
      return `${days} days`;
    } else if (days < 90) {
      return `${Math.round(days / 30)} months`;
    } else {
      return `${Math.round(days / 30)} months`;
    }
  };

  const radarData = Object.entries(report.domainScores).map(([domain, score]) => ({
    domain: domain.length > 15 ? domain.substring(0, 12) + '...' : domain,
    score: score,
    fullDomain: domain
  }));

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 8) return 'default';
    if (score >= 6) return 'secondary';
    return 'destructive';
  };

  return (
    <Card className="bg-white/80 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Cover Section */}
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl mb-2">{report.assessmentName}</CardTitle>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Completed {formatDate(report.completedDate)}
              </span>
            </div>
            <Badge variant={getScoreBadgeVariant(report.overallScore)} className="text-sm">
              <Star className="w-3 h-3 mr-1" />
              Overall Score: {report.overallScore}/10
            </Badge>
          </div>
          <Badge variant="outline" className="text-xs">
            {report.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Executive Summary */}
        <div>
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
            Executive Summary
          </h4>
          <p className="text-sm leading-relaxed">{report.executiveSummary}</p>
        </div>

        {/* Mini Radar Chart */}
        <div>
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
            Domain Breakdown
          </h4>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis 
                  dataKey="domain" 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 10]} 
                  tick={{ fontSize: 8, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Domain Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-green-600 mb-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Top Strengths
            </h5>
            <ul className="space-y-1">
              {report.topStrengths.map((strength, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-amber-600 mb-2 flex items-center gap-1">
              <Target className="w-4 h-4" />
              Areas for Growth
            </h5>
            <ul className="space-y-1">
              {report.areasForGrowth.map((area, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <Target className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div>
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
            Personalized Recommendations
          </h4>
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 space-y-2">
            {report.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                {recommendation}
              </div>
            ))}
          </div>
        </div>

        {/* Next Action CTA */}
        <div className="border-t border-border/50 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Next Assessment Recommended</p>
              <p className="text-xs text-muted-foreground">
                Retake in {getNextActionText(report.nextActionDays)} for updated insights
              </p>
            </div>
            <Button variant="outline" size="sm" className="rounded-full">
              <RefreshCw className="w-3 h-3 mr-2" />
              Retake Assessment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
