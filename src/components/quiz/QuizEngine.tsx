import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { Question } from '@/types';
import { cn } from '@/lib/utils';

interface QuizEngineProps {
  questions: Question[];
  onComplete: (score: number, answers: number[], mistakes: any[]) => void;
  timeLimit?: number; // in seconds
}

export function QuizEngine({ questions, onComplete, timeLimit = 300 }: QuizEngineProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
  }, [timeLeft, showResults]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishQuiz = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
    
    const mistakes = questions.map((q, index) => ({
      questionId: q.id,
      selectedAnswer: selectedAnswers[index] ?? -1,
      correctAnswer: q.answer,
      concept: q.topicId
    })).filter(m => m.selectedAnswer !== m.correctAnswer);

    onComplete(finalScore, selectedAnswers, mistakes);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Quiz Complete!</CardTitle>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Score: {score}%
            </Badge>
            <Badge variant={score >= 70 ? "default" : "destructive"} className="text-lg px-4 py-2">
              {score >= 70 ? "Pass" : "Needs Improvement"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.answer;
              
              return (
                <div key={question.id} className="p-4 border rounded-lg">
                  <div className="flex items-start space-x-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{question.question}</p>
                      <div className="mt-2 text-sm">
                        <p className="text-muted-foreground">
                          Your answer: {userAnswer !== undefined ? question.options[userAnswer] : "Not answered"}
                        </p>
                        <p className="text-success">
                          Correct answer: {question.options[question.answer]}
                        </p>
                        <p className="mt-2 text-foreground">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
        <CardTitle className="mt-4">{question.question}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
              className={cn(
                "w-full justify-start text-left h-auto p-4",
                selectedAnswers[currentQuestion] === index && "ring-2 ring-primary"
              )}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined}
        >
          {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}