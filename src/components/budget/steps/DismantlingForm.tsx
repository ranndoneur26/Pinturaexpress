"use client";

import { useFormContext } from "react-hook-form";
import { BudgetFormData } from "@/lib/schemas";
import { DISMANTLING_TYPES } from "@/lib/constants";

export default function DismantlingForm() {
    const { register } = useFormContext<BudgetFormData>();

    return (
        <div className="space-y-4">
            <div className="grid gap-3">
                {Object.entries(DISMANTLING_TYPES).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 cursor-pointer">
                        <input
                            type="radio"
                            value={key}
                            {...register("services.dismantling")}
                            className="h-4 w-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-white">{label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
