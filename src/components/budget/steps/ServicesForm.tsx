"use client";

import { useFormContext } from "react-hook-form";
import { BudgetFormData } from "@/lib/schemas";
import { PRICING } from "@/lib/constants";

export default function ServicesForm() {
    const { register } = useFormContext<BudgetFormData>();

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <label className="text-sm font-medium text-white/80">Montaje y Desmontaje</label>
                <div className="grid gap-3 md:grid-cols-3">
                    {Object.entries(PRICING.DISMANTLING).map(([key, price]) => (
                        <label key={key} className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 cursor-pointer text-center">
                            <input
                                type="radio"
                                value={key}
                                {...register("services.dismantling")}
                                className="mx-auto h-4 w-4 text-primary focus:ring-primary"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white capitalize">{key === 'NONE' ? 'Ya desmontada' : key === 'PARTIAL' ? 'Parcial' : 'Completo'}</span>
                                <span className="text-xs text-white/60">
                                    {key === 'NONE' && "Traes el cuadro suelto"}
                                    {key === 'PARTIAL' && "Biela/Horquilla montada"}
                                    {key === 'FULL' && "Bici completa"}
                                </span>
                                <span className="mt-1 text-sm font-medium text-primary">+{price}€</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-sm font-medium text-white/80">Transporte (Recogida y Entrega)</label>
                <div className="grid gap-3 md:grid-cols-3">
                    {Object.entries(PRICING.TRANSPORT).map(([key, price]) => (
                        <label key={key} className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 cursor-pointer text-center">
                            <input
                                type="radio"
                                value={key}
                                {...register("services.transport")}
                                className="mx-auto h-4 w-4 text-primary focus:ring-primary"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white capitalize">{key === 'NONE' ? 'Lo traigo yo' : key === 'ONE_WAY' ? 'Solo Envío' : 'Ida y Vuelta'}</span>
                                <span className="mt-1 text-sm font-medium text-primary">+{price}€</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
