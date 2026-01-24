"use client";

import { useFormContext } from "react-hook-form";
import { BudgetFormData } from "@/lib/schemas";
import { UploadCloud, X, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

const MAX_FILE_SIZE_MB = 4;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_FILES = 3;
const MAX_TOTAL_SIZE_MB = 12;

export default function FileUploadForm() {
    const { register, watch, setValue } = useFormContext<BudgetFormData>();
    const files = watch("files");
    const [error, setError] = useState<string | null>(null);
    const [validFiles, setValidFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const selectedFiles = e.target.files;

        if (!selectedFiles || selectedFiles.length === 0) {
            setValidFiles([]);
            setValue("files", undefined);
            return;
        }

        const filesArray = Array.from(selectedFiles);

        // Check max files
        if (filesArray.length > MAX_FILES) {
            setError(`Máximo ${MAX_FILES} imágenes permitidas`);
            e.target.value = "";
            return;
        }

        // Check individual file sizes
        for (const file of filesArray) {
            if (file.size > MAX_FILE_SIZE_BYTES) {
                setError(`Reduce el tamaño de imagen máximo ${MAX_FILE_SIZE_MB} Mb por imagen`);
                e.target.value = "";
                return;
            }
        }

        // Check total size
        const totalSize = filesArray.reduce((acc, file) => acc + file.size, 0);
        if (totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
            setError(`El tamaño total no puede superar ${MAX_TOTAL_SIZE_MB} MB`);
            e.target.value = "";
            return;
        }

        setValidFiles(filesArray);
        setValue("files", selectedFiles);
    };

    const removeFile = (index: number) => {
        const newFiles = validFiles.filter((_, i) => i !== index);
        setValidFiles(newFiles);

        if (newFiles.length === 0) {
            setValue("files", undefined);
        } else {
            // Create a new FileList-like object
            const dt = new DataTransfer();
            newFiles.forEach(file => dt.items.add(file));
            setValue("files", dt.files);
        }
    };

    return (
        <div className="space-y-4">
            <div className="relative flex min-h-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-6 transition-colors hover:border-primary/50 hover:bg-white/10">
                <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept="image/*"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleFileChange}
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
                            Máximo {MAX_FILES} imágenes, {MAX_FILE_SIZE_MB} MB por imagen (JPG, PNG)
                        </p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-500/20 p-3 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {validFiles.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-white/80">Archivos seleccionados ({validFiles.length}/{MAX_FILES}):</p>
                    <div className="space-y-1">
                        {validFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between gap-2 rounded px-3 py-2 bg-white/5 text-sm text-white/70">
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="truncate">{file.name}</span>
                                    <span className="text-xs text-white/40 flex-shrink-0">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
                                >
                                    <X className="h-4 w-4 text-white/50 hover:text-red-400" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

