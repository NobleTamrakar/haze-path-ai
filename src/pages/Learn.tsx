import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizEngine } from '@/components/quiz/QuizEngine';
import { FlashcardDeck } from '@/components/flashcards/FlashcardDeck';
import { BookOpen, Play, Brain, Zap, ArrowLeft } from 'lucide-react';
import { Topic, Question, Flashcard } from '@/types';
import { useUserStore } from '@/stores/userStore';
import { useToast } from '@/hooks/use-toast';

// Import mock data
import topicsData from '@/data/topics.json';
import questionsData from '@/data/questions.json';
import flashcardsData from '@/data/flashcards.json';

export default function Learn() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { addXP } = useUserStore();
  const { toast } = useToast();
  
  const [topic, setTopic] = useState<Topic | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (topicId) {
      // Find topic
      const foundTopic = topicsData.find(t => t.id === topicId);
      if (foundTopic) {
        setTopic(foundTopic as Topic);
        
        // Get related questions
        const topicQuestions = questionsData.filter(q => q.topicId === topicId);
        setQuestions(topicQuestions);
        
        // Get related flashcards
        const topicFlashcards = flashcardsData.filter(f => f.topicId === topicId);
        setFlashcards(topicFlashcards);
      }
    }
  }, [topicId]);

  const handleQuizComplete = (score: number, answers: number[], mistakes: any[]) => {
    const xpEarned = Math.floor(score * 2); // 2 XP per percentage point
    addXP(xpEarned);
    
    toast({
      title: "Quiz Complete!",
      description: `You scored ${score}% and earned ${xpEarned} XP!`,
    });
  };

  const handleFlashcardComplete = (reviewedCount: number) => {
    const xpEarned = reviewedCount * 5; // 5 XP per flashcard
    addXP(xpEarned);
    
    toast({
      title: "Flashcards Complete!",
      description: `You reviewed ${reviewedCount} cards and earned ${xpEarned} XP!`,
    });
  };

  if (!topic) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </AppLayout>
    );
  }

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics': return 'physics';
      case 'Chemistry': return 'chemistry';
      case 'Biology': return 'biology';
      default: return 'outline';
    }
  };

  const getUnsplashQuery = (subject: string, topicName: string) => {
    const queries = {
      'Physics': 'physics+laboratory+science',
      'Chemistry': 'chemistry+molecules+laboratory', 
      'Biology': 'biology+cells+microscopy'
    };
    return queries[subject as keyof typeof queries] || 'science+education';
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center space-x-3">
            <Badge variant={getSubjectColor(topic.subject) as any}>
              {topic.subject}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {topic.difficulty}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Images */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Visual Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={`https://source.unsplash.com/300x300/?${getUnsplashQuery(topic.subject, topic.name)}&sig=${index}`}
                      alt={`${topic.name} illustration ${index}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Center Content */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">{topic.name}</CardTitle>
                <CardDescription>
                  Master this {topic.subject} topic with our comprehensive learning materials
                </CardDescription>
              </CardHeader>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
                <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Topic Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Key Units:</h4>
                        <div className="flex flex-wrap gap-2">
                          {topic.units.map((unit, index) => (
                            <Badge key={index} variant="outline">
                              {unit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Learning Objectives:</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Understand fundamental concepts and principles</li>
                          <li>Apply knowledge to solve complex problems</li>
                          <li>Analyze real-world applications</li>
                          <li>Master NEET-level question patterns</li>
                        </ul>
                      </div>

                      <div className="flex space-x-4 pt-4">
                        <Button onClick={() => setActiveTab('video')}>
                          <Play className="w-4 h-4 mr-2" />
                          Watch Video
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab('quiz')}>
                          <Zap className="w-4 h-4 mr-2" />
                          Take Quiz
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="video" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${topic.videoId}`}
                        title={`${topic.name} - Video Lesson`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quiz" className="mt-6">
                <QuizEngine
                  questions={questions}
                  onComplete={handleQuizComplete}
                  timeLimit={questions.length * 90} // 90 seconds per question
                />
              </TabsContent>

              <TabsContent value="flashcards" className="mt-6">
                <FlashcardDeck
                  flashcards={flashcards}
                  onComplete={handleFlashcardComplete}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - AI Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Brain className="w-5 h-5 mr-2" />
                  AI Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Key Points:</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Focus on fundamental principles</li>
                    <li>• Practice numerical problems daily</li>
                    <li>• Understand conceptual connections</li>
                    <li>• Review common NEET patterns</li>
                  </ul>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Memory Tips:</p>
                  <p className="text-sm text-muted-foreground">
                    Use mnemonics and visual associations to remember complex formulas and processes.
                  </p>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Common Mistakes:</p>
                  <p className="text-sm text-muted-foreground">
                    Watch out for unit conversions and sign conventions in calculations.
                  </p>
                </div>

                <Badge variant="secondary" className="w-full justify-center">
                  AI in Demo Mode
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}