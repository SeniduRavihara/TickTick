import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "yinline-flex yitems-center yjustify-center ywhitespace-nowrap yrounded-md ytext-sm yfont-medium yring-offset-background ytransition-colors focus-visible:youtline-none focus-visible:yring-2 focus-visible:yring-ring focus-visible:yring-offset-2 disabled:ypointer-events-none disabled:yopacity-50",
  {
    variants: {
      variant: {
        default: "ybg-primary ytext-primary-foreground hover:ybg-primary/90",
        destructive:
          "ybg-destructive ytext-destructive-foreground hover:ybg-destructive/90",
        outline:
          "yborder yborder-input ybg-background hover:ybg-accent hover:ytext-accent-foreground",
        secondary:
          "ybg-secondary ytext-secondary-foreground hover:ybg-secondary/80",
        ghost: "hover:ybg-accent hover:ytext-accent-foreground",
        link: "ytext-primary yunderline-offset-4 hover:yunderline",
      },
      size: {
        default: "yh-10 ypx-4 ypy-2",
        sm: "yh-9 yrounded-md ypx-3",
        lg: "yh-11 yrounded-md ypx-8",
        icon: "yh-10 yw-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
