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
          <h1 className="mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-5xl font-extrabold text-transparent sm:text-7xl">
            PinturaExpress
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Calcula tu presupuesto al instante. Especialistas en personalización y restauración de cuadros de carbono.
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
