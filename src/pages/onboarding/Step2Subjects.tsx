import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle } from 'lucide-react';
import { useUserStore } from '@/stores/userStore';

interface Step2SubjectsProps {
  onNext: () => void;
  onBack: () => void;
}

export function Step2Subjects({ onNext, onBack }: Step2SubjectsProps) {
  const { user, updateUser } = useUserStore();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(user?.subjects || []);
  const [selectedUnits, setSelectedUnits] = useState<string[]>(user?.syllabus || []);

  const subjects = [
    {
      name: 'Physics',
      units: ['Mechanics', 'Thermodynamics', 'Optics', 'Electricity & Magnetism', 'Modern Physics']
    },
    {
      name: 'Chemistry', 
      units: ['Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry']
    },
    {
      name: 'Biology',
      units: ['Cell Biology', 'Genetics & Evolution', 'Human Physiology', 'Plant Physiology', 'Ecology']
    }
  ];

  const handleSubjectToggle = (subject: string) => {
    const newSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter(s => s !== subject)
      : [...selectedSubjects, subject];
    
    setSelectedSubjects(newSubjects);
    
    // Remove units of deselected subjects
    if (!newSubjects.includes(subject)) {
      const subjectData = subjects.find(s => s.name === subject);
      if (subjectData) {
        setSelectedUnits(prev => prev.filter(unit => !subjectData.units.includes(unit)));
      }
    }
  };

  const handleUnitToggle = (unit: string) => {
    const newUnits = selectedUnits.includes(unit)
      ? selectedUnits.filter(u => u !== unit)
      : [...selectedUnits, unit];
    
    setSelectedUnits(newUnits);
  };

  const handleNext = () => {
    updateUser({
      subjects: selectedSubjects,
      syllabus: selectedUnits
    });
    onNext();
  };

  const isValid = selectedSubjects.length > 0 && selectedUnits.length > 0;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Choose Your Subjects & Syllabus</CardTitle>
        <CardDescription className="text-lg">
          Select the subjects you want to focus on and mark the units you need help with.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <div className="space-y-6">
          {subjects.map((subject) => (
            <div key={subject.name} className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={subject.name}
                  checked={selectedSubjects.includes(subject.name)}
                  onCheckedChange={() => handleSubjectToggle(subject.name)}
                />
                <label 
                  htmlFor={subject.name}
                  className="text-lg font-semibold cursor-pointer"
                >
                  {subject.name}
                </label>
                {selectedSubjects.includes(subject.name) && (
                  <CheckCircle className="w-5 h-5 text-success" />
                )}
              </div>
              
              {selectedSubjects.includes(subject.name) && (
                <div className="ml-6 space-y-3">
                  <p className="text-sm text-muted-foreground mb-2">
                    Select units where you need help:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {subject.units.map((unit) => (
                      <Badge
                        key={unit}
                        variant={selectedUnits.includes(unit) ? "default" : "outline"}
                        className="cursor-pointer px-3 py-1 hover:bg-primary/10"
                        onClick={() => handleUnitToggle(unit)}
                      >
                        {unit}
                        {selectedUnits.includes(unit) && (
                          <CheckCircle className="w-3 h-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedSubjects.length > 0 && (
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Summary:</h4>
            <p className="text-sm text-muted-foreground">
              Subjects: {selectedSubjects.join(', ')} | 
              Units to focus on: {selectedUnits.length}
            </p>
          </div>
        )}

        <div className="pt-6 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={!isValid}>
            Next: Take Assessment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}