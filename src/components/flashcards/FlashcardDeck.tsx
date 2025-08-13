import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RotateCcw, Check, X, Brain } from 'lucide-react';
import { Flashcard } from '@/types';
import { cn } from '@/lib/utils';

interface FlashcardDeckProps {
  flashcards: Flashcard[];
  onComplete?: (reviewedCount: number) => void;
}

export function FlashcardDeck({ flashcards, onComplete }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<Set<number>>(new Set());
  const [difficulty, setDifficulty] = useState<Record<number, 'easy' | 'hard'>>({});

  if (flashcards.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No flashcards available for this topic.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentCard = flashcards[currentIndex];
  const progress = (reviewedCards.size / flashcards.length) * 100;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDifficulty = (level: 'easy' | 'hard') => {
    setDifficulty(prev => ({ ...prev, [currentIndex]: level }));
    setReviewedCards(prev => new Set([...prev, currentIndex]));
    
    // Move to next card or complete
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      onComplete?.(reviewedCards.size + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const isCompleted = reviewedCards.size === flashcards.length;

  if (isCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Flashcards Complete!</CardTitle>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <Badge variant="default" className="text-lg px-4 py-2">
              Reviewed: {reviewedCards.size} cards
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Brain className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-4">
              Great job! You've reviewed all flashcards in this deck.
            </p>
            <Button onClick={() => window.location.reload()}>
              Review Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline">
            Card {currentIndex + 1} of {flashcards.length}
          </Badge>
          <Badge variant="secondary">
            Reviewed: {reviewedCards.size}/{flashcards.length}
          </Badge>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      
      <CardContent>
        <div className="relative">
          <div
            className={cn(
              "min-h-[300px] rounded-lg border-2 border-dashed border-border p-8 cursor-pointer transition-all duration-300 hover:border-primary",
              "flex items-center justify-center text-center",
              isFlipped && "bg-muted"
            )}
            onClick={handleFlip}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">
                  Click to {isFlipped ? 'show front' : 'reveal answer'}
                </span>
              </div>
              
              <div className="text-xl font-medium">
                {isFlipped ? currentCard.back : currentCard.front}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
          >
            Next
          </Button>
        </div>
        
        {isFlipped && (
          <div className="flex space-x-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDifficulty('hard')}
            >
              <X className="w-4 h-4 mr-1" />
              Hard
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => handleDifficulty('easy')}
            >
              <Check className="w-4 h-4 mr-1" />
              Easy
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}