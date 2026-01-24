"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetSchema, BudgetFormData } from "@/lib/schemas";
import { AccordionItem } from "@/components/ui/Accordion";
import { calculateBudget } from "@/lib/calculator";
import ClientDataForm from "./steps/ClientDataForm";
import BikeDetailsForm from "./steps/BikeDetailsForm";
import PaintingElementsForm from "./steps/PaintingElementsForm";
import PaintSelectionForm from "./steps/PaintSelectionForm";
import FinishesForm from "./steps/FinishesForm";
import DismantlingForm from "./steps/DismantlingForm";
import TransportForm from "./steps/TransportForm";
import FileUploadForm from "./steps/FileUploadForm";
import BudgetSummary from "./BudgetSummary";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

export default function BudgetCalculator() {
    const [openItem, setOpenItem] = useState("item-1");
    const [budgetNumber, setBudgetNumber] = useState("");

    useEffect(() => {
        // Generate Budget Number once on mount
        const random = Math.floor(10000 + Math.random() * 90000);
        const year = new Date().getFullYear();
        setBudgetNumber(`P${random}${year}`);
    }, []);

    const methods = useForm<BudgetFormData>({
        resolver: zodResolver(budgetSchema),
        mode: "onChange",
        defaultValues: {
            // Reasonable defaults to avoid uncontrolled/controlled warnings if possible
            bike: { type: "ROAD" },
            elements: { type: "FRAME" },
            painting: { type: "ONE_COLOR" },
            finishes: { logos: "NONE", varnish: "GLOSS" },
            services: { dismantling: "NONE", transport: "NONE" },
        }
    });

    const { handleSubmit, trigger, formState: { errors } } = methods;

    const onSubmit = async (data: BudgetFormData, action: "USER_TXT" | "COMPANY_PDF") => {
        console.log("Submitting:", data, action);
        const totalPrice = calculateBudget(data as any);
        const payload = {
            ...data,
            budgetNumber,
            totalPrice,
            action
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));

        // Handle Files
        if (data.files && data.files.length > 0) {
            Array.from(data.files as any).forEach((file: any) => {
                formData.append("files", file as Blob);
            });
        }

        // Handle PDF generation for Company
        if (action === "COMPANY_PDF") {
            const summaryElement = document.getElementById("budget-summary-card");
            if (summaryElement) {
                try {
                    // Force black background for the capture to emulate the dark theme look
                    const dataUrl = await toPng(summaryElement, {
                        backgroundColor: "#1a1a1a",
                        pixelRatio: 2,
                        // Using filter to ignore specific elements
                        filter: (node) => {
                            // Check if node is an element to check tagName
                            if (node instanceof HTMLElement) {
                                return node.tagName !== 'BUTTON' && node.tagName !== 'INPUT';
                            }
                            return true;
                        }
                    });

                    const pdf = new jsPDF();
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    // Calculate height maintaining aspect ratio
                    const elementWidth = summaryElement.offsetWidth;
                    const elementHeight = summaryElement.offsetHeight;
                    const pdfHeight = (elementHeight * pdfWidth) / elementWidth;

                    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
                    const pdfBlob = pdf.output("blob");
                    formData.append("pdf", pdfBlob, `Presupuesto-${budgetNumber}.pdf`);
                } catch (error) {
                    console.error("Error generating PDF:", error);
                    alert("Error generando el PDF. Se enviará sin PDF adjunto.");
                }
            }
        }

        // API Call
        try {
            const res = await fetch("/api/send-budget", {
                method: "POST",
                body: formData,
            });

            if (res.status === 413) {
                alert("Error: Las imágenes son demasiado grandes. El límite total es 4.5MB.");
                return;
            }

            let result;
            try {
                result = await res.json();
            } catch (jsonError) {
                console.error("JSON Parse Error:", jsonError);
                throw new Error(`Error del servidor (${res.status}): Respuesta no válida (posible timeout o error de red)`);
            }

            if (result.success) {
                if (action === "USER_TXT") alert("Presupuesto enviado a tu correo correctamente.");
                else alert("Solicitud enviada a PinturaExpress correctamente.");
            } else {
                alert("Error al enviar: " + (result.error || "Desconocido"));
            }
        } catch (err) {
            console.error("Submit Error:", err);
            const errorMessage = err instanceof Error ? err.message : "Error desconocido";
            alert(`Error de conexión o servidor: ${errorMessage}. Inténtalo de nuevo con imágenes más pequeñas.`);
        }
    };

    const handleAction = (action: "USER_TXT" | "COMPANY_PDF") => {
        handleSubmit(
            (data) => onSubmit(data, action),
            (errors) => {
                console.error("Validation errors:", errors);
                // Debug mode: Show granular errors
                let debugMsg = "DEBUG INFO - Errores detectados:\n";
                // Helper to list keys
                const listErrors = (obj: any, prefix = ""): string => {
                    let msg = "";
                    for (const key in obj) {
                        if (obj[key]?.message) {
                            msg += `${prefix}${key}: ${obj[key].message}\n`;
                        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                            msg += listErrors(obj[key], `${prefix}${key}.`);
                        }
                    }
                    return msg;
                };

                debugMsg += listErrors(errors);

                if (debugMsg === "DEBUG INFO - Errores detectados:\n") {
                    debugMsg += JSON.stringify(errors, null, 2);
                }

                alert(debugMsg);
            }
        )();
    };




    // ... handleAction ...

    const toggleItem = (value: string) => {
        setOpenItem((prev) => (prev === value ? "" : value));
    };

    const nextStep = async (nextItem: string) => {
        let fieldsToValidate: any[] = [];
        let stepName = "";

        switch (nextItem) {
            case "item-2": // Validate Step 1: Client
                fieldsToValidate = ["client.name", "client.email", "client.phone", "client.address", "client.city", "client.postalCode"];
                stepName = "Datos Cliente";
                break;
            case "item-3": // Validate Step 2: Bike
                fieldsToValidate = ["bike.type"];
                stepName = "Bicicleta";
                break;
            case "item-4": // Validate Step 3: Elements
                fieldsToValidate = ["elements.type"];
                stepName = "Elementos a Pintar";
                break;
            case "item-5": // Validate Step 4: Paint
                fieldsToValidate = ["painting.type"];
                stepName = "Pintura";
                break;
            case "item-6": // Validate Step 5: Finishes
                fieldsToValidate = ["finishes.logos", "finishes.varnish"];
                stepName = "Acabados";
                break;
            case "item-7": // Validate Step 6: Dismantling
                fieldsToValidate = ["services.dismantling"];
                stepName = "Montaje y Desmontaje";
                break;
            case "item-8": // Validate Step 7: Transport
                fieldsToValidate = ["services.transport"];
                stepName = "Transporte";
                break;
        }

        const isStepValid = await trigger(fieldsToValidate);

        if (isStepValid) {
            setOpenItem(nextItem);
        } else {
            alert(`Por favor rellene el campo obligatorio de "${stepName}" antes de pasar al siguiente punto.`);
        }
    };

    return (
        <FormProvider {...methods}>
            <form className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                    <AccordionItem
                        value="item-1"
                        title="1. Datos Cliente"
                        isOpen={openItem === "item-1"}
                        onToggle={() => toggleItem("item-1")}
                    >
                        <ClientDataForm />
                        <div className="mt-4 flex justify-end">
                            <button type="button" onClick={() => nextStep("item-2")} className="text-sm font-medium text-primary hover:underline">Siguiente</button>
                        </div>
                    </AccordionItem>

                    <AccordionItem
                        value="item-2"
                        title="2. Bicicleta"
                        isOpen={openItem === "item-2"}
                        onToggle={() => toggleItem("item-2")}
                    >
                        <BikeDetailsForm />
                        <div className="mt-4 flex justify-end">
                            <button type="button" onClick={() => nextStep("item-3")} className="text-sm font-medium text-primary hover:underline">Siguiente</button>
                        </div>
                    </AccordionItem>

                    <AccordionItem
                        value="item-3"
                        title="3. Elementos a Pintar"
                        isOpen={openItem === "item-3"}
                        onToggle={() => toggleItem("item-3")}
                    >
                        <PaintingElementsForm />
                        <div className="mt-4 flex justify-end">
                            <button type="button" onClick={() => nextStep("item-4")} className="text-sm font-medium text-primary hover:underline">Siguiente</button>
                        </div>
                    </AccordionItem>

                    <AccordionItem
                        value="item-4"
                        title="4. Pintura"
                        isOpen={openItem === "item-4"}
                        onToggle={() => toggleItem("item-4")}
                    >
                        <PaintSelectionForm />
                        <div className="mt-4 flex justify-end">
                            <button type="button" onClick={() => nextStep("item-5")} className="text-sm font-medium text-primary hover:underline">Siguiente</button>
                        </div>
                    </AccordionItem>

                    <AccordionItem
                        value="item-5"
                        title="5. Acabados"
                        isOpen={openItem === "item-5"}
                        onToggle={() => toggleItem("item-5")}
                    >
                        <FinishesForm />
                        <div className="mt-4 flex justify-end">
                            <button type="button" onClick={() => nextStep("item-6")} className="text-sm font-medium text-primary hover:underline">Siguiente</button>
                        </div>
                    </AccordionItem>

                    <AccordionItem
                        value="item-6"
                        title="6. Montaje y Desmontaje"
                        isOpen={openItem === "item-6"}
                        onToggle={() => toggleItem("item-6")}
                    >
                        <DismantlingForm />
                        <div className="mt-4 flex justify-end">
                            <button type="button" onClick={() => nextStep("item-7")} className="text-sm font-medium text-primary hover:underline">Siguiente</button>
                        </div>
                    </AccordionItem>

                    <AccordionItem
                        value="item-7"
                        title="7. Transporte"
                        isOpen={openItem === "item-7"}
                        onToggle={() => toggleItem("item-7")}
                    >
                        <TransportForm />
                        <div className="mt-4 flex justify-end">
                            <button type="button" onClick={() => nextStep("item-8")} className="text-sm font-medium text-primary hover:underline">Siguiente</button>
                        </div>
                    </AccordionItem>

                    <AccordionItem
                        value="item-8"
                        title="8. Imágenes (Opcional)"
                        isOpen={openItem === "item-8"}
                        onToggle={() => toggleItem("item-8")}
                    >
                        <FileUploadForm />
                    </AccordionItem>
                </div>

                <div className="relative">
                    <BudgetSummary budgetNumber={budgetNumber} onAction={handleAction} />
                </div>
            </form>
        </FormProvider>
    );
}
