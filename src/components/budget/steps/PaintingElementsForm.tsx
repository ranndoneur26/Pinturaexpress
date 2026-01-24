"use client";

import { useFormContext } from "react-hook-form";
import { BudgetFormData } from "@/lib/schemas";
import { ELEMENT_TYPES } from "@/lib/constants";

export default function PaintingElementsForm() {
    const { register, watch } = useFormContext<BudgetFormData>();
    const selectedType = watch("elements.type");

    return (
        <div className="space-y-4">
            <div className="grid gap-3">
                {Object.entries(ELEMENT_TYPES).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 cursor-pointer">
                        <input
                            type="radio"
                            value={key}
                            {...register("elements.type")}
                            className="h-4 w-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-white">{label}</span>
                    </label>
                ))}
            </div>

            {selectedType === "OTHER" && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                    <label className="mb-2 block text-sm font-medium text-white/80">Especificar Otro Elemento</label>
                    <input
                        {...register("elements.otherText")}
                        className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-primary focus:bg-white/10 focus:outline-none"
                        placeholder="Describe qué necesitas pintar..."
                    />
                </div>
            )}
        </div>
    );
}
