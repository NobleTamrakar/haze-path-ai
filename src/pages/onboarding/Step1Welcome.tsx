import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Target, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useUserStore } from '@/stores/userStore';
import { cn } from '@/lib/utils';

interface Step1Data {
  name: string;
  targetExam: string;
  examDate: Date | undefined;
}

interface StepErrors {
  name?: string;
  examDate?: string;
}

interface Step1WelcomeProps {
  onNext: () => void;
}

export function Step1Welcome({ onNext }: Step1WelcomeProps) {
  const { user, updateUser } = useUserStore();
  const [data, setData] = useState<Step1Data>({
    name: user?.name || '',
    targetExam: user?.targetExam || 'NEET',
    examDate: user?.examDate ? new Date(user.examDate) : undefined
  });

  const [errors, setErrors] = useState<StepErrors>({});

  const validateStep = () => {
    const newErrors: StepErrors = {};
    
    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!data.examDate) {
      newErrors.examDate = 'Exam date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      updateUser({
        name: data.name,
        targetExam: data.targetExam,
        examDate: data.examDate?.toISOString() || ''
      });
      onNext();
    }
  };

  const daysUntilExam = data.examDate 
    ? Math.ceil((data.examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Welcome to AI VR Tutor!</CardTitle>
        <CardDescription className="text-lg">
          We'll customize your learning plan in just 3 minutes. Let's start with the basics.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">What's your name? *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your full name"
            className={cn(errors.name && "border-destructive")}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="exam">Target Exam</Label>
          <Select value={data.targetExam} onValueChange={(value) => setData(prev => ({ ...prev, targetExam: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select your target exam" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEET">NEET (National Eligibility Entrance Test)</SelectItem>
              <SelectItem value="AIIMS">AIIMS</SelectItem>
              <SelectItem value="JIPMER">JIPMER</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Exam Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !data.examDate && "text-muted-foreground",
                  errors.examDate && "border-destructive"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.examDate ? format(data.examDate, "PPP") : "Select exam date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.examDate}
                onSelect={(date) => setData(prev => ({ ...prev, examDate: date }))}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.examDate && (
            <p className="text-sm text-destructive">{errors.examDate}</p>
          )}
          
          {data.examDate && daysUntilExam > 0 && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{daysUntilExam} days until your exam</span>
            </div>
          )}
        </div>

        <div className="pt-6 flex justify-end">
          <Button onClick={handleNext} size="lg">
            Next: Choose Subjects
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}