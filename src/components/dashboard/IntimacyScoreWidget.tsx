
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Heart } from 'lucide-react';

interface IntimacyScoreWidgetProps {
  score: number;
}

const IntimacyScoreWidget: React.FC<IntimacyScoreWidgetProps> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Attention';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="mr-2 h-5 w-5 text-primary" />
          Overall Intimacy Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-sm text-gray-500">
              {getScoreLabel(score)}
            </div>
          </div>
          <div className="relative w-24 h-24">
            {/* Speedometer visual representation */}
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${score}, 100`}
                className={getScoreColor(score)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-lg font-bold ${getScoreColor(score)}`}>
                {score}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Emotional Intimacy</span>
              <span>85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Physical Intimacy</span>
              <span>65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Communication</span>
              <span>78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
        </div>

        <div className="mt-4 flex items-center text-sm text-green-600">
          <TrendingUp className="mr-1 h-4 w-4" />
          <span>+5 points this week</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntimacyScoreWidget;
