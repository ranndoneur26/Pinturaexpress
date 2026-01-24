import { useFormContext, useWatch } from "react-hook-form";
import { BudgetFormData } from "@/lib/schemas";
import { calculateBudget } from "@/lib/calculator";
import { useEffect, useState } from "react";
import { Loader2, Download, Send } from "lucide-react";
import { BIKE_TYPES, ELEMENT_TYPES, PAINT_TYPES, LOGO_TYPES, VARNISH_TYPES, DISMANTLING_TYPES, TRANSPORT_TYPES, PRICING } from "@/lib/constants";
import LegalModal from "../ui/LegalModal";

interface BudgetSummaryProps {
    budgetNumber: string;
    onAction: (action: "USER_TXT" | "COMPANY_PDF") => void;
}

export default function BudgetSummary({ budgetNumber, onAction }: BudgetSummaryProps) {
    const { formState: { isValid, isSubmitting } } = useFormContext<BudgetFormData>();
    const formData = useWatch<BudgetFormData>();
    const [total, setTotal] = useState(0);
    const [date, setDate] = useState("");
    const [acceptedConditions, setAcceptedConditions] = useState(false);
    const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

    useEffect(() => {
        setTotal(calculateBudget(formData as any));
    }, [formData]);

    useEffect(() => {
        setDate(new Date().toLocaleDateString("es-ES", { day: '2-digit', month: '2-digit', year: 'numeric' }));
    }, []);

    // Helper to get labels and prices
    const getBikeLabel = () => BIKE_TYPES[formData.bike?.type as keyof typeof BIKE_TYPES] || "-";
    const getBikePrice = () => PRICING.BIKE[formData.bike?.type as keyof typeof PRICING.BIKE] || 0;

    const getElementsLabel = () => {
        if (formData.elements?.type === "OTHER") return `Otro: ${formData.elements.otherText || ""}`;
        return ELEMENT_TYPES[formData.elements?.type as keyof typeof ELEMENT_TYPES] || "-";
    };
    const getElementsPrice = () => PRICING.ELEMENTS[formData.elements?.type as keyof typeof PRICING.ELEMENTS] || 0;

    // ... [Rest of getLabel functions - unchanged ideally, but I need to include them to keep context validity if I replace the whole file or chunk]
    const getPaintLabel = () => {
        if (formData.painting?.type === "OTHER") return `Otro: ${formData.painting?.otherText || ""}`;
        return PAINT_TYPES[formData.painting?.type as keyof typeof PAINT_TYPES] || "-";
    };
    const getPaintPrice = () => PRICING.PAINT[formData.painting?.type as keyof typeof PRICING.PAINT] || 0;

    const getLogosLabel = () => LOGO_TYPES[formData.finishes?.logos as keyof typeof LOGO_TYPES] || "-";
    const getLogosPrice = () => PRICING.LOGOS[formData.finishes?.logos as keyof typeof PRICING.LOGOS] || 0;

    const getVarnishLabel = () => VARNISH_TYPES[formData.finishes?.varnish as keyof typeof VARNISH_TYPES] || "-";
    const getVarnishPrice = () => PRICING.VARNISH[formData.finishes?.varnish as keyof typeof PRICING.VARNISH] || 0;

    const getDismantlingLabel = () => DISMANTLING_TYPES[formData.services?.dismantling as keyof typeof DISMANTLING_TYPES] || "-";
    const getDismantlingPrice = () => PRICING.DISMANTLING[formData.services?.dismantling as keyof typeof PRICING.DISMANTLING] || 0;

    const getTransportLabel = () => TRANSPORT_TYPES[formData.services?.transport as keyof typeof TRANSPORT_TYPES] || "-";
    const getTransportPrice = () => PRICING.TRANSPORT[formData.services?.transport as keyof typeof PRICING.TRANSPORT] || 0;

    // Check for Carbono Visto exception
    const paintType = formData.painting?.type;
    const isCarbonoVisto = paintType === "FRAME_FORK_CARBON" || paintType === "FRAME_FORK_SWINGARM_CARBON";

    return (
        <>
            <div id="budget-summary-card" className="sticky top-24 h-fit space-y-6 rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white">Presupuesto</h3>
                        <p className="text-xs text-white/50">Datos Cliente</p>
                        <div className="text-sm text-white/80 mt-1">
                            <p>{formData.client?.name || "Nombre del cliente"}</p>
                            <p>{formData.client?.email || "Email"}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-mono text-lg font-bold text-primary">{budgetNumber}</p>
                        <p className="text-xs text-white/50">{date}</p>
                    </div>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-start">
                        <span className="text-white/70 w-2/3">{getBikeLabel()}</span>
                        <span className="font-medium text-white">{!isCarbonoVisto ? getBikePrice() : 0}€</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="text-white/70 w-2/3">{getElementsLabel()}</span>
                        <span className="font-medium text-white">{!isCarbonoVisto ? getElementsPrice() : 0}€</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="text-white/70 w-2/3">{getPaintLabel()}</span>
                        <span className="font-medium text-white">{getPaintPrice()}€</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="text-white/70 w-2/3">{getLogosLabel()}</span>
                        <span className="font-medium text-white">{getLogosPrice()}€</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="text-white/70 w-2/3">{getVarnishLabel()}</span>
                        <span className="font-medium text-white">{getVarnishPrice()}€</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="text-white/70 w-2/3">{getDismantlingLabel()}</span>
                        <span className="font-medium text-white">{getDismantlingPrice()}€</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="text-white/70 w-2/3">{getTransportLabel()}</span>
                        <span className="font-medium text-white">{getTransportPrice()}€</span>
                    </div>
                </div>

                <div className="my-4 h-px bg-white/20" />

                <div className="flex items-center justify-between text-xl font-bold text-primary">
                    <span>Total Estimado</span>
                    <span>{total}€</span>
                </div>

                {formData.painting?.pantoneColors && (
                    <div className="mt-8 pt-4 border-t border-white/10">
                        <p className="text-xs text-white/50 mb-1">Colores Ral/Pantone/Camaleón:</p>
                        <p className="text-xs text-white/80 italic">"{formData.painting.pantoneColors}"</p>
                    </div>
                )}

                {formData.finishes?.comments && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-xs text-white/50 mb-1">Notas del cliente:</p>
                        <p className="text-xs text-white/80 italic">"{formData.finishes.comments}"</p>
                    </div>
                )}

                <div className="space-y-4 mt-6">
                    <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
                        <input
                            type="checkbox"
                            id="conditions"
                            checked={acceptedConditions}
                            onChange={(e) => setAcceptedConditions(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-primary focus:ring-primary"
                        />
                        <label htmlFor="conditions" className="text-xs text-white/70 cursor-pointer select-none">
                            He leído y acepto las <button type="button" onClick={() => setIsLegalModalOpen(true)} className="underline hover:text-primary">condiciones de Pinturaexpress</button>. Entiendo que este presupuesto es orientativo.
                        </label>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <button
                            type="button"
                            onClick={() => onAction("USER_TXT")}
                            disabled={isSubmitting || !acceptedConditions}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/50 bg-transparent px-6 py-3 font-bold text-primary transition-all hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : <Download className="h-4 w-4" />}
                            <span>Descargar Presupuesto</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => onAction("COMPANY_PDF")}
                            disabled={isSubmitting || !acceptedConditions}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : <Send className="h-4 w-4" />}
                            <span>Pedir presupuesto a Pinturaexpress</span>
                        </button>
                    </div>
                    <p className="text-[10px] text-center text-white/40">*Precios sin IVA.</p>
                </div>
            </div>
            <LegalModal isOpen={isLegalModalOpen} onClose={() => setIsLegalModalOpen(false)} />
        </>
    );
}
