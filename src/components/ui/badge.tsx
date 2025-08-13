import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 shadow-soft",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 shadow-soft",
        outline: "text-foreground border-border",
        success:
          "border-transparent bg-success text-success-foreground hover:bg-success/80 shadow-soft",
        warning:
          "border-transparent bg-warning text-warning-foreground hover:bg-warning/90 shadow-soft",
        physics:
          "border-blue-200 bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 dark:border-blue-800 dark:bg-blue-500/20 dark:text-blue-300",
        chemistry:
          "border-green-200 bg-green-500/10 text-green-700 hover:bg-green-500/20 dark:border-green-800 dark:bg-green-500/20 dark:text-green-300",
        biology:
          "border-purple-200 bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 dark:border-purple-800 dark:bg-purple-500/20 dark:text-purple-300",
        streak:
          "border-transparent bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/80 hover:to-accent/80 shadow-glow animate-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
