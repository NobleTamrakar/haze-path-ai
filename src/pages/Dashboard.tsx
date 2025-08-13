import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Target, 
  Zap, 
  Trophy, 
  BookOpen, 
  Calendar,
  TrendingUp,
  PlayCircle,
  RotateCcw,
  Settings,
  Clock
} from 'lucide-react';
import { useUserStore } from '@/stores/userStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, gameStats, isAuthenticated } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    if (!user?.completedOnboarding) {
      navigate('/onboarding');
      return;
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const mockStats = {
    overallProgress: 68,
    weeklyStudyTime: 14.5, // hours
    totalQuizzes: 47,
    accuracy: 78,
    streak: 5,
    nextSession: "Organic Chemistry - Hydrocarbons",
    weakTopics: [
      { name: "Thermodynamics", accuracy: 45, subject: "Physics" },
      { name: "Organic Chemistry", accuracy: 52, subject: "Chemistry" },
      { name: "Genetics", accuracy: 61, subject: "Biology" }
    ],
    todaysPlan: [
      { time: "10:00 AM", topic: "Mechanics Review", duration: "30 min", type: "video" },
      { time: "2:00 PM", topic: "Organic Chemistry Quiz", duration: "45 min", type: "quiz" },
      { time: "7:00 PM", topic: "Biology Flashcards", duration: "20 min", type: "flashcards" }
    ],
    recentMistakes: [
      { concept: "Newton's Laws", count: 3, lastQuiz: "2 days ago" },
      { concept: "Alkene Reactions", count: 5, lastQuiz: "1 day ago" },
      { concept: "Cell Division", count: 2, lastQuiz: "3 days ago" }
    ]
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Good morning, {user.name}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Ready to continue your NEET preparation?
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/profile')}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button onClick={() => navigate('/learn/physics-mechanics')}>
              <PlayCircle className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.overallProgress}%</div>
              <Progress value={mockStats.overallProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time (7 days)</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.weeklyStudyTime}h</div>
              <p className="text-xs text-muted-foreground">+2.5h from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.accuracy}%</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gameStats.streak} days</div>
              <p className="text-xs text-muted-foreground">Keep it up! 🔥</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Study Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Today's Study Plan
                </CardTitle>
                <CardDescription>
                  Your personalized schedule for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStats.todaysPlan.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <div>
                          <p className="font-medium">{session.topic}</p>
                          <p className="text-sm text-muted-foreground">
                            {session.time} • {session.duration}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{session.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weak Topics Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Areas for Improvement
                </CardTitle>
                <CardDescription>
                  Focus on these topics to boost your score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStats.weakTopics.map((topic, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{topic.name}</p>
                          <p className="text-sm text-muted-foreground">{topic.subject}</p>
                        </div>
                        <Badge variant={topic.accuracy < 50 ? "destructive" : "secondary"}>
                          {topic.accuracy}%
                        </Badge>
                      </div>
                      <Progress value={topic.accuracy} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Jump into your next session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" onClick={() => navigate('/learn/physics-mechanics')}>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Continue: {mockStats.nextSession}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Quiz (5 min)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Review Flashcards
                </Button>
              </CardContent>
            </Card>

            {/* Mistake Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Mistakes</CardTitle>
                <CardDescription>Concepts to review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockStats.recentMistakes.map((mistake, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="text-sm font-medium">{mistake.concept}</p>
                        <p className="text-xs text-muted-foreground">{mistake.lastQuiz}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {mistake.count} errors
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Practice Problem Areas
                </Button>
              </CardContent>
            </Card>

            {/* XP & Level */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Level {gameStats.level}
                </CardTitle>
                <CardDescription>
                  {gameStats.xp} XP • {1000 - (gameStats.xp % 1000)} XP to next level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={(gameStats.xp % 1000) / 10} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Complete lessons and quizzes to earn more XP!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
