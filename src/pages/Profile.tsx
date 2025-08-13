import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, User, Target, Settings, Headphones, Clock, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useUserStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    targetExam: user?.targetExam || 'NEET',
    examDate: user?.examDate ? new Date(user.examDate) : undefined,
    targetScore: user?.targetScore || 650,
    dailyMinutes: user?.dailyMinutes || 120,
    peakTime: user?.peakTime || 'morning',
    learningStyle: user?.learningStyle || 'mixed',
    vrEnabled: user?.vrEnabled || false
  });

  const handleSave = () => {
    updateUser({
      name: formData.name,
      email: formData.email,
      targetExam: formData.targetExam,
      examDate: formData.examDate?.toISOString() || '',
      targetScore: formData.targetScore,
      dailyMinutes: formData.dailyMinutes,
      peakTime: formData.peakTime,
      learningStyle: formData.learningStyle,
      vrEnabled: formData.vrEnabled
    });

    toast({
      title: "Profile Updated",
      description: "Your settings have been saved successfully.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Logged Out", 
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
          </div>
          
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your basic profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label>Target Exam</Label>
                <Select 
                  value={formData.targetExam} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, targetExam: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEET">NEET</SelectItem>
                    <SelectItem value="AIIMS">AIIMS</SelectItem>
                    <SelectItem value="JIPMER">JIPMER</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Exam Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Exam Goals
              </CardTitle>
              <CardDescription>
                Set your targets and exam schedule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Exam Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.examDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.examDate ? format(formData.examDate, "PPP") : "Select exam date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.examDate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, examDate: date }))}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetScore">Target Score</Label>
                <Input
                  id="targetScore"
                  type="number"
                  min="300"
                  max="720"
                  value={formData.targetScore}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetScore: parseInt(e.target.value) || 650 }))}
                />
                <p className="text-xs text-muted-foreground">Score out of 720</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dailyMinutes">Daily Study Time (minutes)</Label>
                <Input
                  id="dailyMinutes"
                  type="number"
                  min="30"
                  max="480"
                  value={formData.dailyMinutes}
                  onChange={(e) => setFormData(prev => ({ ...prev, dailyMinutes: parseInt(e.target.value) || 120 }))}
                />
                <p className="text-xs text-muted-foreground">Recommended: 120-240 minutes</p>
              </div>
            </CardContent>
          </Card>

          {/* Learning Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Learning Preferences
              </CardTitle>
              <CardDescription>
                Customize your learning experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Learning Style</Label>
                <Select 
                  value={formData.learningStyle} 
                  onValueChange={(value: 'video' | 'text' | 'mixed') => setFormData(prev => ({ ...prev, learningStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video-based</SelectItem>
                    <SelectItem value="text">Text-based</SelectItem>
                    <SelectItem value="mixed">Mixed (Recommended)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Peak Study Time</Label>
                <Select 
                  value={formData.peakTime} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, peakTime: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6 PM - 10 PM)</SelectItem>
                    <SelectItem value="night">Night (10 PM - 2 AM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* VR & Advanced Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Headphones className="w-5 h-5 mr-2" />
                VR & Advanced Features
              </CardTitle>
              <CardDescription>
                Enable immersive learning experiences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>VR Learning Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable virtual reality features (Meta Quest compatible)
                  </p>
                </div>
                <Switch
                  checked={formData.vrEnabled}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, vrEnabled: checked }))}
                />
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">VR Status</p>
                <div className="flex items-center space-x-2">
                  <Badge variant={formData.vrEnabled ? "default" : "outline"}>
                    {formData.vrEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  VR capsules will be available soon for immersive 3D learning experiences.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}