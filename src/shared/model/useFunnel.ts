import { Children, isValidElement, type ReactNode, useState } from "react";

interface Props {
  steps: string[];
  onFirst?: () => void;
  onLast?: () => void;
}

interface FunnelProps {
  children: ReactNode;
}

interface StepProps {
  name: string;
  children: ReactNode;
}

export default function useFunnel({ steps, onFirst, onLast }: Props) {
  const [step, setStep] = useState(steps[0]);
  const stepIndex = steps.indexOf(step);

  const Funnel = ({ children }: FunnelProps) => {
    const currentStep = Children.toArray(children).find(
      (child) => isValidElement<StepProps>(child) && child.props.name === step,
    );
    return currentStep ?? null;
  };
  const FunnelStep = ({ children }: StepProps) => children;

  const prevStep = () => {
    if (stepIndex > 0) {
      setStep(steps[stepIndex - 1]);
    } else {
      onFirst?.();
    }
  };

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStep(steps[stepIndex + 1]);
    } else {
      onLast?.();
    }
  };

  return { Funnel, FunnelStep, setStep, prevStep, nextStep, step, stepIndex };
}
