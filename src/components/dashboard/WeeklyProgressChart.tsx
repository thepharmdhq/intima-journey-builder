
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';

const WeeklyProgressChart: React.FC = () => {
  const data = [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 68 },
    { day: 'Wed', score: 72 },
    { day: 'Thu', score: 70 },
    { day: 'Fri', score: 75 },
    { day: 'Sat', score: 78 },
    { day: 'Sun', score: 72 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          Weekly Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value) => [`${value}%`, 'Intimacy Score']}
              />
              <Bar 
                dataKey="score" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-600">Average this week:</span>
          <span className="font-semibold text-primary">71%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyProgressChart;
