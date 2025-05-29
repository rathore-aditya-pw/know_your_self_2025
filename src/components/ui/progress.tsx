import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    value?: number;
  }
>(({ className, value = 0, ...props }, ref) => {
  const [animatedValue, setAnimatedValue] = React.useState(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValue(value);
    }, 50);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-[#e1e1e1]",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-[#1b2124] transition-all duration-[2000ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]"
        style={{ width: `${animatedValue}%` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
