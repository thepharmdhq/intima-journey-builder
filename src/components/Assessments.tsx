import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, FileText, Clock, Star, CheckCircle, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Assessment {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedTime: number;
  isRecommended: boolean;
  isCompleted: boolean;
  lastScore?: number;
  icon: React.ComponentType<any>;
  sexSpecific?: 'male' | 'female';
}

const Assessments: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userBiologicalSex, setUserBiologicalSex] = useState<string>('');

  // Get user's biological sex from stored onboarding data
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserBiologicalSex(parsedData.biologicalSex || '');
      } catch (error) {
        console.log('Could not parse user data for biological sex');
      }
    }
  }, []);

  const assessments: Assessment[] = [
    {
      id: 'pair',
      name: 'PAIR Assessment',
      description: '17-item scale covering emotional, social, sexual, intellectual & recreational intimacy',
      category: 'Relationship Health',
      estimatedTime: 15,
      isRecommended: true,
      isCompleted: true,
      lastScore: 8.2,
      icon: FileText
    },
    {
      id: 'fsfi',
      name: 'Female Sexual Function Index (FSFI)',
      description: '19 items on desire, arousal, lubrication, orgasm, satisfaction, and pain',
      category: 'Physical Intimacy',
      estimatedTime: 12,
      isRecommended: true,
      isCompleted: true,
      lastScore: 7.8,
      icon: FileText,
      sexSpecific: 'female'
    },
    {
      id: 'body-image',
      name: 'Body Image Scale',
      description: 'Assess comfort and confidence with physical self-perception',
      category: 'Self-Assessment',
      estimatedTime: 8,
      isRecommended: false,
      isCompleted: true,
      lastScore: 6.9,
      icon: FileText
    },
    {
      id: 'conflict-resolution',
      name: 'Conflict Resolution Scale',
      description: 'Evaluate how you and your partner handle disagreements and conflicts',
      category: 'Relationship Health',
      estimatedTime: 12,
      isRecommended: true,
      isCompleted: false,
      icon: FileText
    },
    {
      id: 'intimacy-frequency',
      name: 'Intimacy Frequency Assessment',
      description: 'Track patterns and satisfaction with physical and emotional intimacy',
      category: 'Physical Intimacy',
      estimatedTime: 7,
      isRecommended: true,
      isCompleted: false,
      icon: FileText
    },
    {
      id: 'emotional-intimacy',
      name: 'Emotional Intimacy Scale',
      description: 'Measure emotional connection and vulnerability in your relationship',
      category: 'Emotional Connection',
      estimatedTime: 10,
      isRecommended: false,
      isCompleted: false,
      icon: FileText
    },
    {
      id: 'communication-patterns',
      name: 'Communication Patterns',
      description: 'Analyze how you and your partner communicate during daily interactions',
      category: 'Emotional Connection',
      estimatedTime: 9,
      isRecommended: false,
      isCompleted: false,
      icon: FileText
    },
    {
      id: 'self-esteem',
      name: 'Self-Esteem Inventory',
      description: 'Assess personal confidence and self-worth in relationship context',
      category: 'Self-Assessment',
      estimatedTime: 6,
      isRecommended: false,
      isCompleted: false,
      icon: FileText
    },
    // New assessments
    {
      id: 'rfs',
      name: 'Relationship Flourishing Scale (RFS)',
      description: 'Assesses overall relationship health and thriving across multiple domains',
      category: 'Relationship Health',
      estimatedTime: 10,
      isRecommended: true,
      isCompleted: false,
      icon: FileText
    },
    {
      id: 'sssw',
      name: 'Sexual Satisfaction Scale for Women (SSSW)',
      description: 'Multi-dimensional measure of female sexual satisfaction',
      category: 'Physical Intimacy',
      estimatedTime: 12,
      isRecommended: true,
      isCompleted: false,
      icon: FileText,
      sexSpecific: 'female'
    },
    {
      id: 'iief-5',
      name: 'International Index of Erectile Function (IIEF-5)',
      description: '5-item male sexual function screener',
      category: 'Physical Intimacy',
      estimatedTime: 5,
      isRecommended: true,
      isCompleted: false,
      icon: FileText,
      sexSpecific: 'male'
    },
    {
      id: 'ecr-r',
      name: 'Experiences in Close Relationships—Revised (ECR-R)',
      description: 'Adult attachment anxiety & avoidance assessment',
      category: 'Emotional Connection',
      estimatedTime: 18,
      isRecommended: true,
      isCompleted: false,
      icon: FileText
    },
    {
      id: 'das',
      name: 'Dyadic Adjustment Scale (DAS)',
      description: 'Gold-standard 32-item assessment for satisfaction, cohesion, consensus, and affection',
      category: 'Relationship Health',
      estimatedTime: 20,
      isRecommended: true,
      isCompleted: false,
      icon: FileText
    },
    {
      id: 'csi-16',
      name: 'Couple Satisfaction Index (CSI-16)',
      description: 'Brief, highly sensitive 16-item satisfaction scale',
      category: 'Relationship Health',
      estimatedTime: 8,
      isRecommended: true,
      isCompleted: false,
      icon: FileText
    },
    {
      id: 'ras',
      name: 'Relationship Assessment Scale (RAS)',
      description: '7-item global relationship satisfaction assessment',
      category: 'Relationship Health',
      estimatedTime: 5,
      isRecommended: false,
      isCompleted: false,
      icon: FileText
    },
    {
      id: 'gottman-checkup',
      name: 'Gottman Relationship Checkup Modules',
      description: 'Short screens on friendship, conflict, values, and intimacy',
      category: 'Relationship Health',
      estimatedTime: 15,
      isRecommended: true,
      isCompleted: false,
      icon: FileText
    },
    {
      id: 'emotional-openness',
      name: 'Emotional Openness & Self-Disclosure Scale',
      description: 'Willingness to share thoughts & feelings with your partner',
      category: 'Emotional Connection',
      estimatedTime: 10,
      isRecommended: false,
      isCompleted: false,
      icon: FileText
    },
    {
      id: 'passion-intimacy',
      name: 'Passion and Intimacy Scale',
      description: 'Separately measures romantic passion, sexual passion & intimacy',
      category: 'Emotional Connection',
      estimatedTime: 12,
      isRecommended: false,
      isCompleted: false,
      icon: FileText
    },
    {
      id: 'sexual-satisfaction',
      name: 'Sexual Satisfaction (SS)',
      description: 'Brief scale for quick satisfaction snapshots',
      category: 'Physical Intimacy',
      estimatedTime: 3,
      isRecommended: false,
      isCompleted: false,
      icon: FileText
    },
    {
      id: 'attachment-screening',
      name: 'Attachment Style Screening',
      description: 'Brief check on secure, anxious, and avoidant tendencies',
      category: 'Self-Assessment',
      estimatedTime: 5,
      isRecommended: false,
      isCompleted: false,
      icon: FileText
    }
  ];

  const categories = ['all', 'Relationship Health', 'Physical Intimacy', 'Emotional Connection', 'Self-Assessment'];

  // Filter assessments based on biological sex
  const filteredByBiologicalSex = assessments.filter(assessment => {
    if (!assessment.sexSpecific) return true;
    return assessment.sexSpecific === userBiologicalSex;
  });

  const recommendedAssessments = filteredByBiologicalSex.filter(a => a.isRecommended);
  const filteredAssessments = selectedCategory === 'all' 
    ? filteredByBiologicalSex 
    : filteredByBiologicalSex.filter(a => a.category === selectedCategory);

  const getActionButton = (assessment: Assessment) => {
    if (assessment.isCompleted) {
      return (
        <Button variant="outline" size="sm" className="rounded-full">
          <CheckCircle className="w-3 h-3 mr-1" />
          Retake
        </Button>
      );
    }
    return (
      <Button size="sm" className="rounded-full">
        <PlayCircle className="w-3 h-3 mr-1" />
        Start
      </Button>
    );
  };

  const AssessmentCard: React.FC<{ assessment: Assessment }> = ({ assessment }) => (
    <Card className={`bg-white/80 border-border/50 shadow-sm hover:shadow-md transition-all duration-200 ${
      assessment.isRecommended ? 'ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-accent/5' : ''
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <assessment.icon className="w-5 h-5 text-primary" />
            <div>
              <CardTitle className="text-lg">{assessment.name}</CardTitle>
              <div className="flex gap-2 mt-1">
                {assessment.isRecommended && (
                  <Badge variant="default" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Recommended
                  </Badge>
                )}
                {assessment.sexSpecific && (
                  <Badge variant="secondary" className="text-xs">
                    {assessment.sexSpecific === 'female' ? 'Female-specific' : 'Male-specific'}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {getActionButton(assessment)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{assessment.description}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {assessment.estimatedTime} minutes
          </div>
          {assessment.isCompleted && assessment.lastScore && (
            <div className="flex items-center gap-1">
              <span>Last Score: {assessment.lastScore}</span>
            </div>
          )}
        </div>

        {assessment.isCompleted && assessment.lastScore && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{assessment.lastScore}/10</span>
            </div>
            <Progress value={assessment.lastScore * 10} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );

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
              <h1 className="text-xl font-bold">Assessments</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Discover Your Intimacy Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take science-backed assessments to understand your relationship better and receive personalized insights.
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
              {category === 'all' ? 'All Categories' : category}
            </Button>
          ))}
        </div>

        {/* Recommended Assessments */}
        {selectedCategory === 'all' && recommendedAssessments.length > 0 && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
                <Star className="w-6 h-6 text-primary" />
                Recommended for You
              </h3>
              <p className="text-muted-foreground">
                Based on your intimacy goals and current progress
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedAssessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
          </section>
        )}

        {/* All Assessments */}
        <section className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">
              {selectedCategory === 'all' ? 'All Assessments' : selectedCategory}
            </h3>
            <p className="text-muted-foreground">
              {selectedCategory === 'all' 
                ? 'Explore our complete library of relationship assessments'
                : `Assessments in the ${selectedCategory} category`
              }
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssessments.map((assessment) => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Assessments;
