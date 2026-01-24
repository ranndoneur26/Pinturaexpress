"use client";

import * as React from "react";
// import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Start by implementing a simple custom accordion using Framer Motion and standard React state if Radix is not installed
// or install Radix. Since I didn't install Radix, I'll build a custom one with Framer Motion as it's already installed.

import { motion, AnimatePresence } from "framer-motion";

interface AccordionItemProps {
    value: string;
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    completed?: boolean;
}

export function AccordionItem({
    value,
    title,
    isOpen,
    onToggle,
    children,
    completed,
}: AccordionItemProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-white/20 bg-white/5 backdrop-blur-md transition-colors hover:bg-white/10">
            <button
                type="button"
                onClick={onToggle}
                className={cn(
                    "flex w-full items-center justify-between px-6 py-4 text-left transition-all",
                    isOpen ? "bg-white/10" : ""
                )}
            >
                <div className="flex items-center gap-3">
                    <div className={cn("flex h-6 w-6 items-center justify-center rounded-full border text-xs", completed ? "border-primary bg-primary text-white" : "border-white/40 text-white/60")}>
                        {completed ? "✓" : "•"}
                    </div>
                    <span className="text-lg font-medium text-white">{title}</span>
                </div>
                <ChevronDown
                    className={cn(
                        "h-5 w-5 text-white/60 transition-transform duration-300",
                        isOpen ? "rotate-180" : ""
                    )}
                />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="border-t border-white/10 px-6 py-6 text-white/80">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
