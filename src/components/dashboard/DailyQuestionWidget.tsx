
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send } from 'lucide-react';

const DailyQuestionWidget: React.FC = () => {
  const [response, setResponse] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dailyQuestion = "What's one small gesture your partner did recently that made you feel appreciated, and how did it impact your day?";

  const handleSubmit = () => {
    if (response.trim()) {
      setIsSubmitted(true);
      // Here you would typically save the response
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="mr-2 h-5 w-5 text-primary" />
          Daily Question Prompt
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isSubmitted ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
              <p className="text-gray-800 font-medium mb-2">
                Today's Question:
              </p>
              <p className="text-gray-700">
                {dailyQuestion}
              </p>
            </div>
            
            <Textarea
              placeholder="Share your thoughts..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="min-h-[100px]"
            />
            
            <Button 
              onClick={handleSubmit}
              disabled={!response.trim()}
              className="w-full"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Response
            </Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Response Submitted!
            </h3>
            <p className="text-gray-600 text-sm">
              Thank you for sharing. Your reflection has been saved to your journal.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3"
              onClick={() => setIsSubmitted(false)}
            >
              Answer Another Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyQuestionWidget;
