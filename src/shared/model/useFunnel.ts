import { Children, isValidElement, type ReactNode, useState } from "react";

interface Props {
  initStep: string;
}

interface FunnelProps {
  children: ReactNode;
}

interface StepProps {
  name: string;
  children: ReactNode;
}
export default function useFunnel({ initStep }: Props) {
  const [step, setStep] = useState(initStep);

  const Funnel = ({ children }: FunnelProps) => {
    const currentStep = Children.toArray(children).find(
      (child) => isValidElement<StepProps>(child) && child.props.name === step,
    );
    return currentStep ?? null;
  };
  const FunnelStep = ({ children }: StepProps) => children;

  return { Funnel, FunnelStep, setStep };
}
