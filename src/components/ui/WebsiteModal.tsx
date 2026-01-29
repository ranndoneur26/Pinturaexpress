import { X, ExternalLink } from "lucide-react";
import { useEffect } from "react";

interface WebsiteModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title?: string;
}

export default function WebsiteModal({ isOpen, onClose, url, title = "Sitio Web" }: WebsiteModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-6xl h-[90vh] overflow-hidden rounded-2xl border border-white/20 bg-[#1a1a1a] shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 p-4 bg-white/5 shrink-0">
                    <h2 className="text-xl font-bold text-white truncate max-w-[70%]">{title}</h2>
                    <div className="flex items-center gap-2">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20 transition-colors"
                        >
                            <span>Abrir en nueva ventana</span>
                            <ExternalLink className="h-3 w-3" />
                        </a>
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Content - Iframe */}
                <div className="flex-1 w-full relative bg-white">
                    <iframe
                        src={url}
                        className="absolute inset-0 w-full h-full border-0"
                        title={title}
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
            </div>

            {/* Backdrop click to close */}
            <div className="absolute inset-0 -z-10" onClick={onClose} />
        </div>
    );
}
