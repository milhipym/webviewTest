"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-rose-950/40 backdrop-blur-sm data-[state=open]:animate-fade-in",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    title?: string;
  }
>(({ className, children, title, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-h-[92dvh] max-w-md flex-col rounded-t-3xl bg-card shadow-2xl data-[state=open]:animate-slide-up safe-bottom",
        className,
      )}
      {...props}
    >
      <div className="relative flex items-center justify-center pt-3">
        <div className="h-1.5 w-12 rounded-full bg-muted" />
      </div>
      <div className="flex items-center justify-between px-5 pb-2 pt-2">
        <DialogPrimitive.Title className="text-base font-bold tracking-tight">
          {title ?? ""}
        </DialogPrimitive.Title>
        <DialogPrimitive.Close
          className="rounded-full p-1.5 text-muted-foreground hover:bg-muted"
          aria-label="닫기"
        >
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-4 pt-2">{children}</div>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";
