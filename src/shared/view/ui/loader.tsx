import { VariantProps, cva } from "class-variance-authority";
import { cn } from "./utils";

export function Loader({
  size,
  color,
  className,
}: VariantProps<typeof styles> & { className?: string }) {
  return <div className={cn(styles({ size, color }), className)} />;
}

const styles = cva(
  "animate-spin inline-block self-center border-current border-t-transparent rounded-full m-0",
  {
    variants: {
      color: {
        default: ["text-accent-foreground"],
      },
      size: {
        sm: ["h-4 w-4 border-[2.5px]"],
        md: ["h-6 w-6 border-[2.5px]"],
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
    },
  },
);
