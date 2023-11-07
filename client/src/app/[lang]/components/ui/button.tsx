"use client";

import * as React from "react";

import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/utils/tailwind-helpers";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-root hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        input:
          "border border-input font-sans hover:text-accent-foreground bg-root hover:bg-root-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/60 hover:text-secondary-foreground/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        xs: "h-8 px-2 rounded-md",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, ...props}, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({variant, size, className}))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export interface AnchorButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

const AnchorButton = React.forwardRef<HTMLAnchorElement, AnchorButtonProps>(
  ({className, children, variant, size, ...props}, ref) => {
    return (
      <a
        ref={ref}
        aria-label="External link"
        className={cn(buttonVariants({variant, size, className}))}
        target="_blank"
        rel="noreferrer noopener"
        {...props}
      >
        {children}
      </a>
    );
  }
);
AnchorButton.displayName = "AnchorButton";

export {Button, AnchorButton, buttonVariants};
