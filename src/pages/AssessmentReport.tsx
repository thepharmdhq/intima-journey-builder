import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, Share, TrendingUp, Target, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AssessmentResult {
  id: string;
  assessment_id: string;
  overall_score: number;
  domain_scores: any;
  executive_summary: string;
  top_strengths: string[];
  areas_for_growth: string[];
  recommendations: string[];
  completed_at: string;
  next_action_days: number;
}

interface Assessment {
  id: string;
  name: string;
  description: string;
}

export default function AssessmentReport() {
  const { assessmentId, sessionId } = useParams<{ assessmentId: string; sessionId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (assessmentId && sessionId) {
      loadReport();
    }
  }, [assessmentId, sessionId]);

  const loadReport = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      // Load assessment result
      const { data: resultData, error: resultError } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('assessment_id', assessmentId)
        .eq('session_id', sessionId)
        .eq('user_id', user.id)
        .single();

      if (resultError) throw resultError;
      setResult(resultData);

      // Load assessment details
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', assessmentId)
        .single();

      if (assessmentError) throw assessmentError;
      setAssessment(assessmentData);

    } catch (error) {
      console.error('Error loading report:', error);
      toast({
        title: "Error",
        description: "Failed to load assessment report",
        variant: "destructive"
      });
      navigate('/my-reports');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return "Strong";
    if (score >= 50) return "Moderate";
    return "Needs Attention";
  };

  const retakeAssessment = () => {
    navigate(`/assessment/${assessmentId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your report...</p>
        </div>
      </div>
    );
  }

  if (!result || !assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Report not found</p>
            <Button onClick={() => navigate('/my-reports')} className="mt-4">
              Back to Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/my-reports')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reports
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{assessment.name} Report</h1>
              <p className="text-muted-foreground">
                Completed on {new Date(result.completed_at).toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button onClick={retakeAssessment} size="sm">
                Retake Assessment
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Overall Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-primary">
                  {Math.round(result.overall_score)}
                </div>
                <div className="flex-1">
                  <Progress value={result.overall_score} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {getScoreLabel(result.overall_score)} performance across all areas
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Executive Summary</h4>
                <p className="text-muted-foreground">{result.executive_summary}</p>
              </div>
            </CardContent>
          </Card>

          {/* Domain Scores */}
          <Card>
            <CardHeader>
              <CardTitle>Domain Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(result.domain_scores || {}).map(([domain, score]) => {
                  const numericScore = typeof score === 'number' ? score : 0;
                  return (
                    <div key={domain} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{domain}</span>
                          <span className={`font-bold ${getScoreColor(numericScore)}`}>
                            {Math.round(numericScore)}%
                          </span>
                        </div>
                        <Progress value={numericScore} className="h-2" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-5 h-5" />
                  Top Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result.top_strengths.length > 0 ? (
                  <div className="space-y-2">
                    {result.top_strengths.map((strength, index) => (
                      <Badge key={index} variant="secondary" className="w-full justify-start p-3">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Continue working on all areas to develop stronger relationship patterns.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Areas for Growth */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-600">
                  <Target className="w-5 h-5" />
                  Areas for Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result.areas_for_growth.length > 0 ? (
                  <div className="space-y-2">
                    {result.areas_for_growth.map((area, index) => (
                      <Badge key={index} variant="outline" className="w-full justify-start p-3">
                        {area}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Great job! Your results show strong performance across all measured areas.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.recommendations.length > 0 ? (
                <div className="space-y-3">
                  {result.recommendations.map((recommendation, index) => (
                    <div key={index} className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Keep up the excellent work! Consider retaking this assessment in 3-6 months to track your continued progress.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Review Your Results</p>
                    <p className="text-sm text-muted-foreground">
                      Take time to discuss these results with your partner and reflect on the insights.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Take Additional Assessments</p>
                    <p className="text-sm text-muted-foreground">
                      Consider taking other assessments to get a more comprehensive view of your relationship.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Schedule Follow-up</p>
                    <p className="text-sm text-muted-foreground">
                      Plan to retake this assessment in {result.next_action_days} days to track your progress.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button onClick={() => navigate('/assessments')} variant="outline">
                  Take Another Assessment
                </Button>
                <Button onClick={retakeAssessment}>
                  Retake This Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}