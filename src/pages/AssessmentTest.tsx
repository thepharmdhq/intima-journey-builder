import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question_number: number;
  question_text: string;
  question_type: 'scale' | 'multiple_choice' | 'yes_no';
  options: any;
  domain: string;
}

interface Assessment {
  id: string;
  name: string;
  description: string;
  estimated_time: number;
}

interface UserResponse {
  questionId: string;
  value: string;
}

export default function AssessmentTest() {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (assessmentId) {
      loadAssessmentData();
      createSession();
    }
  }, [assessmentId]);

  const createSession = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('user_sessions')
        .insert({
          user_id: user.id,
          session_type: 'assessment',
          started_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      setSessionId(data.id);
    } catch (error) {
      console.error('Error creating session:', error);
      toast({
        title: "Error",
        description: "Failed to start assessment session",
        variant: "destructive"
      });
    }
  };

  const loadAssessmentData = async () => {
    try {
      setLoading(true);
      
      // Load assessment details
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', assessmentId)
        .single();

      if (assessmentError) throw assessmentError;
      setAssessment(assessmentData);

      // Load questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('assessment_questions')
        .select('*')
        .eq('assessment_id', assessmentId)
        .order('question_number');

      if (questionsError) throw questionsError;
      setQuestions(questionsData || []);
    } catch (error) {
      console.error('Error loading assessment:', error);
      toast({
        title: "Error",
        description: "Failed to load assessment",
        variant: "destructive"
      });
      navigate('/assessments');
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = (value: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const existingResponseIndex = responses.findIndex(r => r.questionId === currentQuestion.id);
    
    if (existingResponseIndex >= 0) {
      const updatedResponses = [...responses];
      updatedResponses[existingResponseIndex] = { questionId: currentQuestion.id, value };
      setResponses(updatedResponses);
    } else {
      setResponses([...responses, { questionId: currentQuestion.id, value }]);
    }
  };

  const getCurrentResponse = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return responses.find(r => r.questionId === currentQuestion.id)?.value || '';
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitAssessment = async () => {
    if (!sessionId || responses.length !== questions.length) {
      toast({
        title: "Incomplete Assessment",
        description: "Please answer all questions before submitting",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Save all responses
      const responsePromises = responses.map(response => {
        return supabase
          .from('user_assessment_responses')
          .insert({
            user_id: user.id,
            assessment_id: assessmentId,
            session_id: sessionId,
            question_id: response.questionId,
            response_value: response.value
          });
      });

      await Promise.all(responsePromises);

      // Update session as completed
      await supabase
        .from('user_sessions')
        .update({ completed_at: new Date().toISOString() })
        .eq('id', sessionId);

      // Calculate and save results (simplified scoring)
      const overallScore = calculateScore();
      const domainScores = calculateDomainScores();

      await supabase
        .from('assessment_results')
        .insert({
          user_id: user.id,
          assessment_id: assessmentId,
          session_id: sessionId,
          overall_score: overallScore,
          domain_scores: domainScores,
          executive_summary: generateSummary(overallScore),
          top_strengths: generateStrengths(domainScores),
          areas_for_growth: generateGrowthAreas(domainScores),
          recommendations: generateRecommendations(domainScores)
        });

      toast({
        title: "Assessment Complete!",
        description: "Your results have been saved and your report is ready",
      });

      navigate(`/assessment/${assessmentId}/report/${sessionId}`);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast({
        title: "Error",
        description: "Failed to submit assessment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const calculateScore = () => {
    const totalScore = responses.reduce((sum, response) => sum + parseInt(response.value), 0);
    const maxPossibleScore = questions.length * 5; // Assuming max scale of 5
    return (totalScore / maxPossibleScore) * 100;
  };

  const calculateDomainScores = () => {
    const domains: { [key: string]: { total: number; count: number } } = {};
    
    responses.forEach(response => {
      const question = questions.find(q => q.id === response.questionId);
      if (question && question.domain) {
        if (!domains[question.domain]) {
          domains[question.domain] = { total: 0, count: 0 };
        }
        domains[question.domain].total += parseInt(response.value);
        domains[question.domain].count++;
      }
    });

    const domainScores: { [key: string]: number } = {};
    Object.keys(domains).forEach(domain => {
      domainScores[domain] = (domains[domain].total / (domains[domain].count * 5)) * 100;
    });

    return domainScores;
  };

  const generateSummary = (score: number) => {
    if (score >= 80) return "Your assessment shows strong relationship satisfaction across most areas.";
    if (score >= 60) return "Your assessment reveals moderate satisfaction with some areas for improvement.";
    return "Your assessment indicates several opportunities for growth in your relationship.";
  };

  const generateStrengths = (domainScores: { [key: string]: number }) => {
    return Object.entries(domainScores)
      .filter(([_, score]) => score >= 75)
      .map(([domain, _]) => domain);
  };

  const generateGrowthAreas = (domainScores: { [key: string]: number }) => {
    return Object.entries(domainScores)
      .filter(([_, score]) => score < 60)
      .map(([domain, _]) => domain);
  };

  const generateRecommendations = (domainScores: { [key: string]: number }) => {
    const recommendations = [];
    Object.entries(domainScores).forEach(([domain, score]) => {
      if (score < 60) {
        recommendations.push(`Focus on improving ${domain} through targeted exercises and communication.`);
      }
    });
    return recommendations;
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentResponse = getCurrentResponse();

    if (currentQuestion.question_type === 'scale') {
      const options = currentQuestion.options;
      const scale = Array.from({ length: options.max - options.min + 1 }, (_, i) => i + options.min);

      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {scale.map((value) => (
              <Button
                key={value}
                variant={currentResponse === value.toString() ? "default" : "outline"}
                onClick={() => handleResponse(value.toString())}
                className="h-16 flex flex-col items-center justify-center"
              >
                <div className="text-lg font-bold">{value}</div>
                <div className="text-xs text-center">
                  {options.labels?.[value.toString()] || ''}
                </div>
              </Button>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessment || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Assessment not found</p>
            <Button onClick={() => navigate('/assessments')} className="mt-4">
              Back to Assessments
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = getCurrentResponse() !== '';
  const allQuestionsAnswered = responses.length === questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/assessments')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Assessments
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">{assessment.name}</h1>
            <p className="text-muted-foreground mb-4">{assessment.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg leading-relaxed">
              {questions[currentQuestionIndex]?.question_text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderQuestion()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-4">
            {!isLastQuestion ? (
              <Button
                onClick={goToNext}
                disabled={!canProceed}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={submitAssessment}
                disabled={!allQuestionsAnswered || submitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Assessment
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}