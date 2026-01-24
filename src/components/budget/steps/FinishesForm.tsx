"use client";

import { useFormContext } from "react-hook-form";
import { BudgetFormData } from "@/lib/schemas";
import { LOGO_TYPES, VARNISH_TYPES } from "@/lib/constants";

export default function FinishesForm() {
    const { register } = useFormContext<BudgetFormData>();

    return (
        <div className="space-y-6">
            {/* Logos Section */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-white/80">Logos</label>
                <div className="grid gap-3 md:grid-cols-3">
                    {Object.entries(LOGO_TYPES).map(([key, label]) => (
                        <label key={key} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 cursor-pointer">
                            <input
                                type="radio"
                                value={key}
                                {...register("finishes.logos")}
                                className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-white">{label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="my-6 h-px w-full bg-white/10" />

            {/* Varnish Section */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-white/80">Barniz</label>
                <div className="grid gap-3 md:grid-cols-2">
                    {Object.entries(VARNISH_TYPES).map(([key, label]) => (
                        <label key={key} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 cursor-pointer">
                            <input
                                type="radio"
                                value={key}
                                {...register("finishes.varnish")}
                                className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-white">{label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="my-6 h-px w-full bg-white/10" />

            {/* Comments Section */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Explícanos algo que debamos saber (Opcional)</label>
                <textarea
                    {...register("finishes.comments")}
                    className="flex h-24 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-primary focus:bg-white/10 focus:outline-none"
                    placeholder="Detalles adicionales..."
                />
            </div>
        </div>
    );
}
