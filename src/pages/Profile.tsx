import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Heart, Target, Settings, Edit3, Save, X, Calendar, Mail, Users, MessageCircle, Clock, Star, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileSection from '@/components/ProfileSection';
import EditableField from '@/components/EditableField';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
        setEditedData({ ...parsedData });
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleSave = () => {
    if (editedData) {
      localStorage.setItem('userData', JSON.stringify(editedData));
      setUserData(editedData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedData({ ...userData });
    setIsEditing(false);
  };

  const calculateProfileCompletion = () => {
    if (!userData) return 0;
    const requiredFields = [
      'firstName', 'email', 'age', 'biologicalSex', 'genderIdentity', 'relationshipStatus',
      'intimacyGoals', 'conflictComfort', 'sexualSatisfaction', 'bodyImageRating'
    ];
    const completedFields = requiredFields.filter(field => userData[field] !== undefined && userData[field] !== '');
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const getAttachmentStyle = () => {
    if (!userData?.anxietyAttachment || !userData?.avoidanceAttachment) return 'Unknown';
    const anxiety = userData.anxietyAttachment;
    const avoidance = userData.avoidanceAttachment;
    
    if (anxiety < 3 && avoidance < 3) return 'Secure';
    if (anxiety >= 3 && avoidance < 3) return 'Anxious';
    if (anxiety < 3 && avoidance >= 3) return 'Avoidant';
    return 'Disorganized';
  };

  const getIntimacyScore = () => {
    if (!userData) return 0;
    const scores = [
      userData.conflictComfort * 2,
      userData.sexualSatisfaction * 2, 
      userData.bodyImageRating * 2,
      (userData.intimacyGoals?.length || 0) * 2
    ];
    const score = scores.reduce((a, b) => a + b, 0) / scores.length;
    return (score / 10).toFixed(1);
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/')} className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold">My Profile</h1>
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} size="sm">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profile Header */}
        <Card className="bg-white/80 border-border/50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{userData.firstName}</h2>
                  <p className="text-muted-foreground capitalize">{userData.relationshipStatus?.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{getIntimacyScore()}</div>
                <p className="text-sm text-muted-foreground">Intimacy Score</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-lg font-semibold">{userData.age}</div>
                <p className="text-xs text-muted-foreground">Age</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold capitalize">{userData.biologicalSex}</div>
                <p className="text-xs text-muted-foreground">Sex</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{getAttachmentStyle()}</div>
                <p className="text-xs text-muted-foreground">Attachment</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{calculateProfileCompletion()}%</div>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profile Completion</span>
                <span>{calculateProfileCompletion()}%</span>
              </div>
              <Progress value={calculateProfileCompletion()} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Core Identity Section */}
        <ProfileSection
          title="Core Identity"
          icon={User}
          isEditing={isEditing}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableField
              label="First Name"
              value={isEditing ? editedData.firstName : userData.firstName}
              isEditing={isEditing}
              onChange={(value) => setEditedData({...editedData, firstName: value})}
            />
            <EditableField
              label="Email"
              value={isEditing ? (editedData.email || '') : (userData.email || '')}
              isEditing={isEditing}
              type="text"
              onChange={(value) => setEditedData({...editedData, email: value})}
            />
            <EditableField
              label="Age"
              value={isEditing ? editedData.age : userData.age}
              isEditing={isEditing}
              type="number"
              onChange={(value) => setEditedData({...editedData, age: parseInt(value)})}
            />
            <EditableField
              label="Biological Sex"
              value={isEditing ? editedData.biologicalSex : userData.biologicalSex}
              isEditing={isEditing}
              type="select"
              options={['male', 'female', 'intersex']}
              onChange={(value) => setEditedData({...editedData, biologicalSex: value})}
            />
            <EditableField
              label="Gender Identity"
              value={isEditing ? editedData.genderIdentity : userData.genderIdentity}
              isEditing={isEditing}
              onChange={(value) => setEditedData({...editedData, genderIdentity: value})}
            />
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Love Languages (Ranked by Importance)
            </h4>
            {userData.loveLanguagesRanked && userData.loveLanguagesRanked.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {userData.loveLanguagesRanked.map((lang: string, index: number) => {
                  let badgeVariant: "default" | "secondary" | "outline" = "outline";
                  if (index === 0) badgeVariant = "default"; // Most important
                  else if (index <= 2) badgeVariant = "secondary"; // Moderately important
                  
                  return (
                    <Badge key={index} variant={badgeVariant}>
                      #{index + 1} {lang}
                    </Badge>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Complete your onboarding to see your love language preferences
              </p>
            )}
          </div>
        </ProfileSection>

        {/* Relationship Snapshot Section */}
        <ProfileSection
          title="Relationship Snapshot"
          icon={Users}
          isEditing={isEditing}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableField
              label="Relationship Status"
              value={isEditing ? editedData.relationshipStatus : userData.relationshipStatus}
              isEditing={isEditing}
              type="select"
              options={['single', 'dating', 'committed_relationship', 'married', 'complicated']}
              onChange={(value) => setEditedData({...editedData, relationshipStatus: value})}
            />
            <div>
              <Label className="text-sm font-medium">Conflict Comfort</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-primary">{userData.conflictComfort}/5</span>
                <Progress value={(userData.conflictComfort / 5) * 100} className="flex-1 h-2" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label className="text-sm font-medium">Affection Frequency</Label>
              <p className="text-sm text-muted-foreground capitalize mt-1">{userData.affectionFrequency?.replace('_', ' ')}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Preferred Intimacy Time</Label>
              <p className="text-sm text-muted-foreground capitalize mt-1">{userData.preferredIntimacyTime?.replace('_', ' ')}</p>
            </div>
          </div>
        </ProfileSection>

        {/* Intimacy Baseline Section */}
        <ProfileSection
          title="Intimacy Baseline"
          icon={Target}
          isEditing={isEditing}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium">Sexual Satisfaction</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-primary">{userData.sexualSatisfaction}/5</span>
                <Progress value={(userData.sexualSatisfaction / 5) * 100} className="flex-1 h-2" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Body Image Rating</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-primary">{userData.bodyImageRating}/5</span>
                <Progress value={(userData.bodyImageRating / 5) * 100} className="flex-1 h-2" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Body Exploration Comfort</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-primary">{userData.bodyExplorationComfort}/5</span>
                <Progress value={(userData.bodyExplorationComfort / 5) * 100} className="flex-1 h-2" />
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Arousal Triggers
            </h4>
            <div className="flex flex-wrap gap-2">
              {userData.arousalTriggers?.map((trigger: string, index: number) => (
                <Badge key={index} variant="outline">
                  {trigger}
                </Badge>
              ))}
            </div>
          </div>
        </ProfileSection>

        {/* Goals & Reminders Section */}
        <ProfileSection
          title="Goals & Reminders"
          icon={Star}
          isEditing={isEditing}
        >
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Intimacy Goals
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {userData.intimacyGoals?.map((goal: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Exploration Interests
            </h4>
            <div className="flex flex-wrap gap-2">
              {userData.explorationInterests?.map((interest: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Weekly Check-ins</Label>
              <p className="text-sm text-muted-foreground mt-1 capitalize">
                {userData.weeklyCheckIns ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Current Stress Level</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-semibold">{userData.currentStressLevel}/5</span>
                <Progress value={(userData.currentStressLevel / 5) * 100} className="flex-1 h-2" />
              </div>
            </div>
          </div>
        </ProfileSection>
      </main>
    </div>
  );
};

export default Profile;
