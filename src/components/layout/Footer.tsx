import Image from "next/image";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-white/10 bg-[#e5e7eb] py-12 text-black/80">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Legal / Warnings */}
                    <div className="lg:col-span-2 space-y-2 text-[11px] leading-tight">
                        <h4 className="font-bold mb-2 text-sm">Advertencias Legales</h4>
                        <p><span className="font-bold">Atención para entregas en persona contactar primero por teléfono o e-mail. Cita previa</span></p>
                        <p>Este presupuesto es orientativo previa a validación in situ al revisar con el cliente los datos aportado</p>

                        <div className="pt-2 space-y-1">
                            <p>Las referencias del color deben concretarse en cartas de colores estandard (Ral, Pantone o similares colores formulados...)</p>
                            <p>o bién en muestras físicas donde podamos extrarer una muestra real de color.</p>
                            <p>Las fotografías digitales, referencias de nombres de otros modelos o en papel no son válidas como muestras de color.</p>
                            <p>La pintura no tiene garantía ya que el uso indebido, casual o involuntario de roces, caidas, golpes pueden afectar al acabado no siendo atribuible al acabado original.</p>
                            <p>Antes de realizar el trabajo consulta las fechas de nuestros plazos de entrega ya que dependiendo del mes pueden variar.</p>
                            <p>21 % de iva no aplicado en el presupuesto.</p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <div className="bg-white/50 p-6 rounded-xl backdrop-blur-sm border border-black/5">
                            <div className="mb-4 relative h-10 w-48">
                                <Image
                                    src="/Carbonoexpress_logo_2026.png"
                                    alt="Carbono Express"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                            <div className="space-y-1 text-base font-medium text-[#008080]">
                                <p>Oficina: Pau Claris 15 bajos.</p>
                                <p>08100 Mollet dels Vallès.</p>
                                <p>Tel. 622 566 385</p>
                                <p className="text-black/60 text-sm mt-2">expresscarbono@gmail.com / <a href="http://www.carbonoexpress.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#008080]">www.carbonoexpress.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center text-[10px] opacity-40 border-t border-black/10 pt-4">
                    © {new Date().getFullYear()} Carbono Express. Tots els drets reservats.
                </div>
            </div>
        </footer>
    );
}
