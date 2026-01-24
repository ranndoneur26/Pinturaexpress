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
import imageCompression from 'browser-image-compression';

export default function BudgetCalculator() {
    const [openItem, setOpenItem] = useState("item-1");
    const [budgetNumber, setBudgetNumber] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

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
        if (isProcessing) return;
        setIsProcessing(true);
        console.log("Submitting:", data, action);

        try {
            const totalPrice = calculateBudget(data as any);
            const payload = {
                ...data,
                budgetNumber,
                totalPrice,
                action
            };

            const formData = new FormData();
            formData.append("data", JSON.stringify(payload));

            // Handle Files with Compression
            const MAX_PAYLOAD_SIZE = 4.4 * 1024 * 1024; // 4.4 MB strict limit (leaving 100kb for text overhead)
            let estimatedSize = 0;

            if (data.files && data.files.length > 0) {
                const filesArray = Array.from(data.files as any) as File[];

                // If we are sending COMPANY_PDF (now works as TXT+IMAGES), we need to fit images in 4.4MB
                const AVAILABLE_FOR_IMAGES = 4.3; // MB
                const targetSizeMB = AVAILABLE_FOR_IMAGES / filesArray.length;

                for (const file of filesArray) {
                    if (file.type.startsWith('image/')) {
                        console.log(`Procesando ${file.name} (Original: ${(file.size / 1024 / 1024).toFixed(2)} MB)...`);

                        const options = {
                            maxSizeMB: targetSizeMB,
                            maxWidthOrHeight: 1600, // Reasonable max dimension for viewing
                            useWebWorker: true,
                            initialQuality: 0.7, // Good balance
                        };

                        try {
                            const compressedFile = await imageCompression(file, options);
                            console.log(`-> Comprimido: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

                            // Double check if compressed file is actually smaller, otherwise use original if it fits or warn
                            // But usually compression helps.
                            formData.append("files", compressedFile);
                            estimatedSize += compressedFile.size;
                        } catch (error) {
                            console.error("Error comprimiendo, usando original:", error);
                            formData.append("files", file);
                            estimatedSize += file.size;
                        }
                    } else {
                        // Non-image files (shouldn't happen given input accept="image/*")
                        formData.append("files", file);
                        estimatedSize += file.size;
                    }
                }
            }

            console.log(`Tamaño total estimado payload: ${(estimatedSize / 1024 / 1024).toFixed(2)} MB`);

            // Client-side pre-check
            if (estimatedSize > MAX_PAYLOAD_SIZE) {
                const msg = `El tamaño total de archivos (${(estimatedSize / 1024 / 1024).toFixed(2)} MB) excede el límite permitido por el servidor (4.5 MB). Hemos intentado comprimirlos pero no ha sido suficiente. Por favor, envía menos fotos o envíalas por email.`;
                alert(msg);
                setIsProcessing(false);
                return;
            }

            // API Call
            const res = await fetch("/api/send-budget", {
                method: "POST",
                body: formData,
            });

            if (res.status === 413) {
                alert("Error: Las imágenes son demasiado grandes para el servidor (Límite físico 4.5MB). La compresión automática no fue suficiente. Por favor, reduce la cantidad de fotos o envíalas por email aparte.");
                setIsProcessing(false);
                return;
            }

            let result;
            try {
                result = await res.json();
            } catch (jsonError) {
                console.error("JSON Parse Error:", jsonError);
                throw new Error(`Error del servidor (${res.status}): Respuesta no válida`);
            }

            if (result.success) {
                if (action === "USER_TXT") alert("Presupuesto enviado correctamente a tu dirección de e-mail introducida en el formulario.");
                else alert("Presupuesto enviado correctamente a Carbonoexpress.");
            } else {
                alert("Error al enviar: " + (result.error || "Desconocido"));
            }

        } catch (err) {
            console.error("Submit Error:", err);
            const errorMessage = err instanceof Error ? err.message : "Error desconocido";
            alert(`Error de conexión o servidor: ${errorMessage}.`);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleAction = (action: "USER_TXT" | "COMPANY_PDF") => {
        handleSubmit(
            (data) => onSubmit(data, action),
            (errors) => {
                console.error("Validation errors:", errors);
                // Build user-friendly error message
                let errorMsg = "Por favor, completa los siguientes campos obligatorios:\n\n";

                const listErrors = (obj: any, prefix = ""): string => {
                    let msg = "";
                    for (const key in obj) {
                        if (obj[key]?.message) {
                            msg += `• ${obj[key].message}\n`;
                        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                            msg += listErrors(obj[key], `${prefix}${key}.`);
                        }
                    }
                    return msg;
                };

                errorMsg += listErrors(errors);

                alert(errorMsg);
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
                fieldsToValidate = ["painting.type", "painting.pantoneColors"];
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
