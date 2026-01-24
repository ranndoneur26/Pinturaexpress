"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { BudgetFormData } from "@/lib/schemas";

export default function ClientDataForm() {
    const { register, formState: { errors } } = useFormContext<BudgetFormData>();

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Nombre Completo</label>
                <Input {...register("client.name")} placeholder="Tu nombre" />
                {errors.client?.name && <p className="text-xs text-red-400">{errors.client.name.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Email</label>
                <Input {...register("client.email")} placeholder="ejemplo@email.com" type="email" />
                {errors.client?.email && <p className="text-xs text-red-400">{errors.client.email.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Teléfono</label>
                <Input {...register("client.phone")} placeholder="+34 600 000 000" type="tel" />
                {errors.client?.phone && <p className="text-xs text-red-400">{errors.client.phone.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Dirección</label>
                <Input {...register("client.address")} placeholder="Calle, número..." />
                {errors.client?.address && <p className="text-xs text-red-400">{errors.client.address.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Ciudad</label>
                <Input {...register("client.city")} placeholder="Barcelona" />
                {errors.client?.city && <p className="text-xs text-red-400">{errors.client.city.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Código Postal</label>
                <Input {...register("client.postalCode")} placeholder="08000" />
                {errors.client?.postalCode && <p className="text-xs text-red-400">{errors.client.postalCode.message}</p>}
            </div>
        </div>
    );
}
