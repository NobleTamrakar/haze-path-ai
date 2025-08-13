import { ReactNode } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Stepper } from '@/components/ui/stepper';
import { useUserStore } from '@/stores/userStore';

interface OnboardingLayoutProps {
  children: ReactNode;
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const { onboardingStep } = useUserStore();

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <Stepper currentStep={onboardingStep} totalSteps={8} className="mb-8" />
        <div className="min-h-[500px]">
          {children}
        </div>
      </div>
    </AppLayout>
  );
}