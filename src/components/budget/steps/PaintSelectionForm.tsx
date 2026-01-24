"use client";

import { useFormContext } from "react-hook-form";
import { BudgetFormData } from "@/lib/schemas";
import { PAINT_TYPES } from "@/lib/constants";

export default function PaintSelectionForm() {
    const { register, watch } = useFormContext<BudgetFormData>();
    const selectedType = watch("painting.type");

    return (
        <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
                {Object.entries(PAINT_TYPES).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 cursor-pointer">
                        <input
                            type="radio"
                            value={key}
                            {...register("painting.type")}
                            className="h-4 w-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-white">{label}</span>
                    </label>
                ))}
            </div>

            {selectedType === "OTHER" && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                    <label className="mb-2 block text-sm font-medium text-white/80">Especificar Pintura</label>
                    <input
                        {...register("painting.otherText")}
                        className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-primary focus:bg-white/10 focus:outline-none"
                        placeholder="Describe el tipo de pintura..."
                    />
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-white/10">
                <label className="mb-2 block text-sm font-medium text-white/80">
                    Colores Ral/Pantone/Camaleón a Pintar
                    <div className="mt-1 flex flex-wrap gap-2 text-xs">
                        <a href="https://cartaral.es/pages/colores-ral" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Colores Ral</a>
                        <span className="text-white/40">|</span>
                        <a href="https://www.logorapid.com/pantone" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Colores Pantone</a>
                        <span className="text-white/40">|</span>
                        <a href="https://tiendaracingcolors.com/es/Pinturas-Camaleonicas/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Colores Camaleón</a>
                    </div>
                </label>
                <input
                    {...register("painting.pantoneColors")}
                    className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-primary focus:bg-white/10 focus:outline-none"
                    placeholder="Ej: RAL 3000, Pantone 123C, Camaleón Azul-Verde..."
                />
            </div>
        </div>
    );
}
