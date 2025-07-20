import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, FileText, Clock, Star, CheckCircle, PlayCircle, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Assessment {
  id: string;
  name: string;
  description: string;
  category: string;
  estimated_time: number;
  is_recommended: boolean;
  sex_specific?: 'male' | 'female';
  isCompleted?: boolean;
  lastScore?: number;
  lastCompletedAt?: string;
}

const Assessments: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userBiologicalSex, setUserBiologicalSex] = useState<string>('');
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [userResults, setUserResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssessments();
    getUserBiologicalSex();
  }, []);

  const getUserBiologicalSex = () => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserBiologicalSex(parsedData.biologicalSex || '');
      } catch (error) {
        console.log('Could not parse user data for biological sex');
      }
    }
  };

  const loadAssessments = async () => {
    try {
      setLoading(true);
      
      // Load assessments
      const { data: assessmentsData, error: assessmentsError } = await supabase
        .from('assessments')
        .select('*')
        .order('name');

      if (assessmentsError) throw assessmentsError;

      // Load user's assessment results
      const { data: { user } } = await supabase.auth.getUser();
      let resultsData = [];
      
      if (user) {
        const { data, error: resultsError } = await supabase
          .from('assessment_results')
          .select('*')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false });

        if (resultsError) {
          console.error('Error loading results:', resultsError);
        } else {
          resultsData = data || [];
        }
      }

      // Merge assessment data with user results
      const assessmentsWithResults = assessmentsData?.map(assessment => {
        const latestResult = resultsData.find(result => result.assessment_id === assessment.id);
        return {
          ...assessment,
          isCompleted: !!latestResult,
          lastScore: latestResult?.overall_score,
          lastCompletedAt: latestResult?.completed_at
        };
      }) || [];

      setAssessments(assessmentsWithResults);
      setUserResults(resultsData);
    } catch (error) {
      console.error('Error loading assessments:', error);
      toast({
        title: "Error",
        description: "Failed to load assessments",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from assessments
  const categories = ['all', ...Array.from(new Set(assessments.map(a => a.category)))];

  // Filter assessments based on biological sex
  const filteredByBiologicalSex = assessments.filter(assessment => {
    if (!assessment.sex_specific) return true;
    return assessment.sex_specific === userBiologicalSex;
  });

  // Filter by category
  const filteredAssessments = selectedCategory === 'all' 
    ? filteredByBiologicalSex 
    : filteredByBiologicalSex.filter(assessment => assessment.category === selectedCategory);

  // Separate recommended vs all assessments
  const recommendedAssessments = filteredAssessments.filter(a => a.is_recommended);

  const startAssessment = (assessmentId: string) => {
    navigate(`/assessment/${assessmentId}`);
  };

  const getActionButton = (assessment: Assessment): JSX.Element => {
    if (assessment.isCompleted) {
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => startAssessment(assessment.id)}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Retake
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const latestResult = userResults.find(r => r.assessment_id === assessment.id);
              if (latestResult) {
                navigate(`/assessment/${assessment.id}/report/${latestResult.session_id}`);
              }
            }}
          >
            View Report
          </Button>
        </div>
      );
    }

    return (
      <Button
        onClick={() => startAssessment(assessment.id)}
        className="flex items-center gap-2"
      >
        <PlayCircle className="w-4 h-4" />
        Start
      </Button>
    );
  };

  const AssessmentCard: React.FC<{ assessment: Assessment }> = ({ assessment }) => (
    <Card key={assessment.id} className="transition-all duration-300 hover:shadow-lg border-l-4 border-l-primary/20 hover:border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground leading-tight">
                {assessment.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {assessment.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {assessment.is_recommended && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                Recommended
              </Badge>
            )}
            {assessment.isCompleted && (
              <Badge variant="outline" className="flex items-center gap-1 border-green-200 text-green-700">
                <CheckCircle className="w-3 h-3" />
                Completed
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {assessment.estimated_time} min
            </div>
            <Badge variant="outline" className="text-xs">
              {assessment.category}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            {assessment.isCompleted && assessment.lastScore && (
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  Score: {Math.round(assessment.lastScore)}%
                </div>
                {assessment.lastCompletedAt && (
                  <div className="text-xs text-muted-foreground">
                    {new Date(assessment.lastCompletedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            )}
            {getActionButton(assessment)}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading assessments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Relationship Assessments
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Take evidence-based assessments to gain deeper insights into your relationship health. 
              Track your progress over time and receive personalized recommendations.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
                size="sm"
              >
                {category === 'all' ? 'All Categories' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Recommended Assessments */}
        {recommendedAssessments.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-2xl font-bold text-foreground">Recommended for You</h2>
            </div>
            <div className="grid gap-4">
              {recommendedAssessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
          </div>
        )}

        {/* All Assessments */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {selectedCategory === 'all' ? 'All Assessments' : `${selectedCategory} Assessments`}
          </h2>
          <div className="grid gap-4">
            {filteredAssessments.map((assessment) => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </div>

        {filteredAssessments.length === 0 && !loading && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Assessments Available</h3>
            <p className="text-muted-foreground">
              {selectedCategory === 'all' 
                ? "No assessments are currently available." 
                : `No assessments found in the ${selectedCategory} category.`}
            </p>
            {selectedCategory !== 'all' && (
              <Button
                variant="outline"
                onClick={() => setSelectedCategory('all')}
                className="mt-4"
              >
                View All Assessments
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessments;