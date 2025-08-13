import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppLayout } from '@/components/layout/AppLayout';
import { Brain, Target, Zap, Trophy, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized study paths adapted to your learning style and weak areas"
    },
    {
      icon: Target,
      title: "NEET Focused",
      description: "Comprehensive coverage of Physics, Chemistry, and Biology syllabus"
    },
    {
      icon: Zap,
      title: "Interactive Quizzes",
      description: "Thousands of practice questions with detailed explanations"
    },
    {
      icon: Trophy,
      title: "Gamified Experience",
      description: "Earn XP, maintain streaks, and unlock achievements"
    }
  ];

  const testimonials = [
    {
      name: "Priya Singh",
      score: "680/720",
      text: "The AI tutor identified my weak areas in organic chemistry and helped me improve significantly!"
    },
    {
      name: "Rahul Kumar", 
      score: "695/720",
      text: "The personalized study plan and VR sessions made learning so much more engaging."
    },
    {
      name: "Ananya Patel",
      score: "710/720",
      text: "Best NEET prep platform! The mistake analysis feature was a game-changer for me."
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-12 mb-16">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
            🚀 VR-Ready Learning Platform
          </Badge>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI VR Tutor for NEET
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Master Physics, Chemistry, and Biology with our AI-powered personalized learning platform. 
            Get ready for NEET 2025 with adaptive quizzes, flashcards, and immersive VR experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={() => navigate('/auth')}
            >
              Start Free Assessment
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-3"
            >
              Watch Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              50,000+ Students
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              4.9/5 Rating
            </div>
            <div className="flex items-center">
              <Trophy className="w-4 h-4 mr-1" />
              95% Success Rate
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <Card className="mb-16 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">15,000+</h3>
                <p className="text-muted-foreground">Practice Questions</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">500+</h3>
                <p className="text-muted-foreground">Video Lessons</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">95%</h3>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <Badge variant="default">{testimonial.score}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="text-center py-12 bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardContent>
            <h2 className="text-3xl font-bold mb-4">Ready to Ace NEET 2025?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of students who've transformed their NEET preparation with AI-powered learning.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-3"
              onClick={() => navigate('/auth')}
            >
              Start Your Journey Today
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}