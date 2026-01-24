"use client";

import { useFormContext } from "react-hook-form";
import { BudgetFormData } from "@/lib/schemas";
import { BIKE_TYPES, PRICING } from "@/lib/constants";

export default function BikeDetailsForm() {
    const { register, formState: { errors } } = useFormContext<BudgetFormData>();

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Selecciona el tipo de bicicleta</label>
                <div className="grid gap-3 md:grid-cols-2">
                    {Object.entries(BIKE_TYPES).map(([key, label]) => {
                        const price = PRICING.BIKE[key as keyof typeof PRICING.BIKE];
                        return (
                            <label key={key} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 cursor-pointer">
                                <input
                                    type="radio"
                                    value={key}
                                    {...register("bike.type")}
                                    className="h-4 w-4 text-primary focus:ring-primary"
                                />
                                <div className="flex flex-1 justify-between">
                                    <span className="text-sm text-white">{label}</span>
                                    {/* Hide prices as requested: "no mestres en la página de cara al públiico los precios entre paréntesis" - BUT user specifically asked "no mestres... entre paréntesis" for Module 6. For others? 
                                User prompt: "6.Módulos de la página... no mestres ... los precios". 
                                Actually, looking at the prompt: "2. Módulo bicicleta ... Eléctrica (30 Euros)". It lists prices. 
                                Rule: "no mestres en la página de cara al públiico los precios entre paréntesis" was under "6. Módulos de la página". 
                                The user listed prices for me to know them.
                                Let's show prices generally or hide them? "no mestres en la página de cara al públiico los precios entre paréntesis". This sounds like a general rule for the public facing page.
                                I will HIDE prices from the selection labels to be safe/clean as requested. The budget summary will show the total. */
                                    }
                                    {/* <span className={`text-xs ${price > 0 ? 'text-primary' : 'text-white/50'}`}>
                                {price > 0 ? `+${price}€` : price < 0 ? `${price}€` : ''}
                            </span> */}
                                </div>
                            </label>
                        )
                    })}
                </div>
                {errors.bike?.type && (
                    <p className="text-xs text-red-400">{errors.bike.type.message}</p>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Marca</label>
                    <input {...register("bike.brand")} className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-primary focus:bg-white/10 focus:outline-none" placeholder="Ej: Specialized" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Modelo</label>
                    <input {...register("bike.model")} className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-primary focus:bg-white/10 focus:outline-none" placeholder="Ej: Tarmac SL7" />
                </div>
            </div>
        </div>
    );
}
