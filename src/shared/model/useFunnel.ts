import { Children, isValidElement, type ReactNode, useState } from "react";

interface Props {
  steps: string[];
}

interface FunnelProps {
  children: ReactNode;
}

interface StepProps {
  name: string;
  children: ReactNode;
}

export default function useFunnel({ steps }: Props) {
  const [step, setStep] = useState(steps[0]);
  const stepIndex = steps.indexOf(step);

  const Funnel = ({ children }: FunnelProps) => {
    const currentStep = Children.toArray(children).find(
      (child) => isValidElement<StepProps>(child) && child.props.name === step,
    );
    return currentStep ?? null;
  };
  const FunnelStep = ({ children }: StepProps) => children;

  return { Funnel, FunnelStep, setStep, step, stepIndex };
}
