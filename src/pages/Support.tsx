
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Search, 
  HelpCircle, 
  Send, 
  Phone, 
  Mail, 
  MessageCircle, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ChevronDown,
  FileText,
  Video,
  Book,
  Users,
  Zap,
  Shield,
  Upload,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({
    category: '',
    subject: '',
    description: '',
    attachment: null as File | null
  });

  // FAQ Data
  const faqCategories = [
    {
      category: 'Account & Getting Started',
      items: [
        {
          question: 'How do I get started with my intimacy assessments?',
          answer: 'After signing up, you\'ll be guided through our onboarding flow where you\'ll answer questions about your relationship goals, comfort levels, and preferences. This helps us create personalized assessments and recommendations for you.'
        },
        {
          question: 'Can I change my plan type from Individual to Couples later?',
          answer: 'Yes! You can upgrade from Individual to Couples plan at any time from your subscription page. The change will take effect immediately and you\'ll have access to couples-specific assessments and features.'
        },
        {
          question: 'How often should I take assessments?',
          answer: 'We recommend taking core assessments every 2-3 months to track your progress. Daily check-ins and mini-assessments can be done as often as you like to maintain awareness of your intimacy journey.'
        }
      ]
    },
    {
      category: 'Billing & Subscriptions',
      items: [
        {
          question: 'What\'s the difference between monthly and yearly billing?',
          answer: 'Yearly billing offers a 31% discount compared to monthly billing. You\'ll be charged once per year instead of monthly, and you get access to all the same features with significant savings.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time from your account settings. You\'ll continue to have access to all features until the end of your current billing period.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee for all new subscriptions. If you\'re not satisfied within the first 30 days, contact our support team for a full refund.'
        }
      ]
    },
    {
      category: 'Technical Support',
      items: [
        {
          question: 'My assessment results aren\'t loading. What should I do?',
          answer: 'First, try refreshing your browser. If the issue persists, clear your browser cache and cookies. If you\'re still having trouble, please submit a support ticket with details about your browser and device.'
        },
        {
          question: 'Can I access Intima on my mobile device?',
          answer: 'Yes! Intima is fully responsive and works great on mobile devices. Simply visit our website through your mobile browser for the best experience.'
        },
        {
          question: 'Is my data secure and private?',
          answer: 'Absolutely. We use industry-standard encryption and security measures to protect your data. Your assessment results and personal information are never shared with third parties and are stored securely.'
        }
      ]
    }
  ];

  // Filter FAQs based on search
  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  // System status data
  const systemStatus = [
    { service: 'Website', status: 'operational', uptime: '99.9%' },
    { service: 'Assessments', status: 'operational', uptime: '99.8%' },
    { service: 'User Accounts', status: 'operational', uptime: '99.9%' },
    { service: 'Payment Processing', status: 'operational', uptime: '99.7%' }
  ];

  // Tutorials data
  const tutorials = [
    {
      title: 'Getting Started Guide',
      description: 'Complete walkthrough of setting up your account and taking your first assessment',
      type: 'video',
      duration: '5 min',
      category: 'Beginner'
    },
    {
      title: 'Understanding Your Intimacy Score',
      description: 'Learn how your intimacy score is calculated and what it means for your relationship',
      type: 'article',
      duration: '3 min read',
      category: 'Core Features'
    },
    {
      title: 'Couples Assessment Best Practices',
      description: 'Tips for getting the most accurate and helpful results from couples assessments',
      type: 'video',
      duration: '8 min',
      category: 'Advanced'
    },
    {
      title: 'Privacy and Data Security',
      description: 'Understanding how we protect your sensitive information and assessment data',
      type: 'article',
      duration: '4 min read',
      category: 'Security'
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Ticket submitted:', ticketForm);
    // Reset form
    setTicketForm({ category: '', subject: '', description: '', attachment: null });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTicketForm(prev => ({ ...prev, attachment: file }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Support Center
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">How can we help you?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get the support you need for your intimacy journey. Find answers, submit tickets, or connect with our community.
          </p>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white/50">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="help">Help Widget</TabsTrigger>
            <TabsTrigger value="ticket">Submit Ticket</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card className="bg-white/80 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Search Knowledge Base
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {filteredFAQs.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="bg-white/80 border-border/50 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <Collapsible key={itemIndex}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                          <span className="text-left font-medium">{item.question}</span>
                          <ChevronDown className="w-4 h-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-3 text-muted-foreground">
                          {item.answer}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Help Widget Tab */}
          <TabsContent value="help" className="space-y-6">
            <Card className="bg-white/80 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Contextual Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                    <h3 className="font-semibold mb-2">Taking Your First Assessment</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ready to get started? Here's a quick guide to taking your first intimacy assessment.
                    </p>
                    <Button variant="outline" size="sm">
                      Start Guide
                    </Button>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                    <h3 className="font-semibold mb-2">Understanding Your Results</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn how to interpret your intimacy score and what the results mean.
                    </p>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                    <h3 className="font-semibold mb-2">Account Settings</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Customize your profile, notification preferences, and privacy settings.
                    </p>
                    <Button variant="outline" size="sm">
                      View Settings
                    </Button>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                    <h3 className="font-semibold mb-2">Couples Features</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Discover how to invite your partner and use couples-specific assessments.
                    </p>
                    <Button variant="outline" size="sm">
                      Explore
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submit Ticket Tab */}
          <TabsContent value="ticket" className="space-y-6">
            <Card className="bg-white/80 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Submit Support Ticket
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <select 
                        className="w-full p-2 border border-input rounded-md bg-background"
                        value={ticketForm.category}
                        onChange={(e) => setTicketForm(prev => ({ ...prev, category: e.target.value }))}
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing Question</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        placeholder="Brief description of your issue"
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Please provide detailed information about your issue or question"
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={6}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Attachment (Optional)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".png,.jpg,.jpeg,.pdf,.txt"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                      {ticketForm.attachment && (
                        <span className="text-sm text-muted-foreground">
                          {ticketForm.attachment.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Status Tab */}
          <TabsContent value="status" className="space-y-6">
            <Card className="bg-white/80 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">All systems operational</span>
                </div>
                <div className="space-y-3">
                  {systemStatus.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">{service.service}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Uptime: {service.uptime}</span>
                        <Badge variant="secondary" className="text-green-700 bg-green-100">
                          {service.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">New Feature Release</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    We've added new couples assessment tools and improved personalized recommendations.
                  </p>
                  <span className="text-xs text-blue-600">2 days ago</span>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-900">Maintenance Complete</span>
                  </div>
                  <p className="text-sm text-green-800">
                    Scheduled maintenance has been completed. All services are running smoothly.
                  </p>
                  <span className="text-xs text-green-600">1 week ago</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">Get detailed help via email</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>support@intima.app</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Response within 24 hours</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Live Chat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">Chat with our support team</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Mon-Fri, 9AM-6PM PST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-600">Available now</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Business Hours & Response Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Live Chat</h3>
                    <p className="text-sm text-muted-foreground">Immediate response</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Send className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Support Ticket</h3>
                    <p className="text-sm text-muted-foreground">Within 48 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <Card className="bg-white/80 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Join Our Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Discord Community</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with other users, share experiences, and get peer support in our Discord community.
                  </p>
                  <Button className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Join Discord
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold">Community Guidelines</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Be respectful and supportive of all community members
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Share experiences constructively and maintain privacy
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      No spam, promotional content, or inappropriate material
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Follow Discord's Terms of Service and Community Guidelines
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Feedback & Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">What would you like to see improved?</label>
                    <Textarea 
                      placeholder="Share your ideas, suggestions, or feedback to help us improve Intima"
                      rows={4}
                    />
                  </div>
                  <Button className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tutorials Tab */}
          <TabsContent value="tutorials" className="space-y-6">
            <Card className="bg-white/80 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5 text-primary" />
                  Tutorials & Guides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {tutorials.map((tutorial, index) => (
                    <div key={index} className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {tutorial.type === 'video' ? (
                            <Video className="w-5 h-5 text-primary" />
                          ) : (
                            <FileText className="w-5 h-5 text-primary" />
                          )}
                          <Badge variant="secondary" className="text-xs">
                            {tutorial.category}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{tutorial.duration}</span>
                      </div>
                      <h3 className="font-semibold mb-2">{tutorial.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{tutorial.description}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        {tutorial.type === 'video' ? 'Watch Video' : 'Read Article'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Quick Start Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Complete your profile setup',
                    'Take your first intimacy assessment',
                    'Review your personalized results',
                    'Set up daily check-in reminders',
                    'Explore couples features (if applicable)',
                    'Join our Discord community'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Support;
