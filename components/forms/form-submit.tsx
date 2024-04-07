import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

// Define props interface for the FormSubmit component
interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

// Define the FormSubmit component
export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "default",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      size="sm"
      variant={variant}
      className={cn("bg-slate-500 rounded mt-2", className)}
    >
      {children}
    </Button>
  );
};
