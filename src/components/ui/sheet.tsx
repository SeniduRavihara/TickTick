"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "yfixed yinset-0 yz-50 ybg-black/80 y data-[state=open]:yanimate-in data-[state=closed]:yanimate-out data-[state=closed]:yfade-out-0 data-[state=open]:yfade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "yfixed yz-50 ygap-4 ybg-background yp-6 yshadow-lg ytransition yease-in-out data-[state=open]:yanimate-in data-[state=closed]:yanimate-out data-[state=closed]:yduration-300 data-[state=open]:yduration-500",
  {
    variants: {
      side: {
        top: "yinset-x-0 ytop-0 yborder-b data-[state=closed]:yslide-out-to-top data-[state=open]:yslide-in-from-top",
        bottom:
          "yinset-x-0 ybottom-0 yborder-t data-[state=closed]:yslide-out-to-bottom data-[state=open]:yslide-in-from-bottom",
        left: "yinset-y-0 yleft-0 yh-full yw-3/4 yborder-r data-[state=closed]:yslide-out-to-left data-[state=open]:yslide-in-from-left sm:ymax-w-sm",
        right:
          "yinset-y-0 yright-0 yh-full yw-3/4 y yborder-l data-[state=closed]:yslide-out-to-right data-[state=open]:yslide-in-from-right sm:ymax-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="yabsolute yright-4 ytop-4 yrounded-sm yopacity-70 yring-offset-background ytransition-opacity hover:yopacity-100 focus:youtline-none focus:yring-2 focus:yring-ring focus:yring-offset-2 disabled:ypointer-events-none data-[state=open]:ybg-secondary">
        <X className="yh-4 yw-4" />
        <span className="ysr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "yflex yflex-col yspace-y-2 ytext-center sm:ytext-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "yflex yflex-col-reverse sm:yflex-row sm:yjustify-end sm:yspace-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("ytext-lg yfont-semibold ytext-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("ytext-sm ytext-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
