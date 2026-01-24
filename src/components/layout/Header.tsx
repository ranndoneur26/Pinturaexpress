import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
            <div className="container mx-auto">
                <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/20 bg-white/10 px-6 py-3 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-xl transition-all duration-300 hover:bg-white/20">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative h-12 w-48 sm:h-14 sm:w-58">
                            <Image
                                src="/Carbonoexpress_logo_2026.png"
                                alt="Carbono Express"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-8 font-medium text-white/90">
                            {/* Button removed */}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
