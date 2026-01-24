"use client";

import { useFormContext } from "react-hook-form";
import { BudgetFormData } from "@/lib/schemas";
import { UploadCloud } from "lucide-react";

export default function FileUploadForm() {
    const { register, watch } = useFormContext<BudgetFormData>();
    const files = watch("files");

    return (
        <div className="space-y-4">
            <div className="relative flex min-h-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-6 transition-colors hover:border-primary/50 hover:bg-white/10">
                <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept="image/*"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    {...register("files")}
                />
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                        <UploadCloud className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <p className="font-medium text-white">
                            Haz clic o arrastra imágenes aquí
                        </p>
                        <p className="text-sm text-white/50">
                            Máximo 6 imágenes. (JPG, PNG)
                        </p>
                    </div>
                </div>
            </div>

            {files && files.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-white/80">Archivos seleccionados:</p>
                    <div className="space-y-1">
                        {Array.from(files).map((file: any, index) => (
                            <div key={index} className="flex items-center gap-2 rounded px-3 py-2 bg-white/5 text-sm text-white/70">
                                <span className="truncate">{file.name}</span>
                                <span className="text-xs text-white/40">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
