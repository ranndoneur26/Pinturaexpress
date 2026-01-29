"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BudgetCalculator from "@/components/budget/BudgetCalculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black font-sans text-white">
      <Header />

      <main className="container mx-auto px-4 pt-32">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <h1 className="mb-6 text-3xl font-extrabold sm:text-5xl" style={{ color: '#b7bf10' }}>
            PinturaExpress
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Calcula tu presupuesto al instante. Especialistas en personalización y restauración de cuadros de carbono.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Si deseas más información sobre nuestro trabajos de pintura, visita nuestra web:{" "}
            <a
              href="https://carbonoexpress.com/trabajos-de-pintura-presupuesto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b7bf10] hover:underline hover:text-[#d4dd12] transition-colors font-medium"
            >
              carbonoexpress.com
            </a>
          </p>
        </section>

        {/* Calculator Section */}
        <section id="presupuesto" className="scroll-mt-32">
          <BudgetCalculator />
        </section>
      </main>

      <Footer />
    </div>
  );
}
