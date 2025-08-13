import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { OnboardingLayout } from './onboarding/OnboardingLayout';
import { Step1Welcome } from './onboarding/Step1Welcome';
import { Step2Subjects } from './onboarding/Step2Subjects';
// Import other steps here when created

export default function Onboarding() {
  const navigate = useNavigate();
  const { 
    user, 
    onboardingStep, 
    setOnboardingStep, 
    completeOnboardingStep,
    isAuthenticated 
  } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleNext = () => {
    completeOnboardingStep(onboardingStep);
    
    if (onboardingStep < 8) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      // Complete onboarding
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  const renderStep = () => {
    switch (onboardingStep) {
      case 1:
        return <Step1Welcome onNext={handleNext} />;
      case 2:
        return <Step2Subjects onNext={handleNext} onBack={handleBack} />;
      // Add other steps here
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Step {onboardingStep} Coming Soon</h2>
            <p className="text-muted-foreground mb-6">This step is under development.</p>
            <div className="space-x-4">
              <button 
                onClick={handleBack}
                className="px-4 py-2 border rounded"
                disabled={onboardingStep === 1}
              >
                Back
              </button>
              <button 
                onClick={handleNext}
                className="px-4 py-2 bg-primary text-primary-foreground rounded"
              >
                {onboardingStep === 8 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        );
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to auth
  }

  return (
    <OnboardingLayout>
      {renderStep()}
    </OnboardingLayout>
  );
}