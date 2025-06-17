
import React from 'react';
import HeizölPreisrechner from '@/components/HeizölPreisrechner';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🛢️ Heizöl Online
            </h1>
            <p className="text-xl text-gray-600">
              Günstig, schnell und zuverlässig direkt zu Ihnen nach Hause
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Preisrechner */}
          <div>
            <HeizölPreisrechner />
          </div>

          {/* Informationen */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Warum Heizöl Online?
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span>Kostenlose Lieferung ab 3.000 Litern</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span>Schnelle Lieferung in 1-3 Werktagen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span>Qualitätsgeprüftes Heizöl</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span>Sichere Online-Zahlung</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span>Transparente Preisgestaltung</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Unsere Heizöl-Qualitäten
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-700">Standard Heizöl</h4>
                  <p className="text-gray-600 text-sm">
                    Hochwertiges Heizöl nach DIN-Norm, ideal für den täglichen Gebrauch.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-700">Premium Heizöl</h4>
                  <p className="text-gray-600 text-sm">
                    Mit speziellen Additiven für optimale Verbrennung und Schutz Ihrer Heizungsanlage.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Jetzt Heizöl bestellen!
              </h3>
              <p className="text-gray-700">
                Nutzen Sie unseren Preisrechner links, um sofort den aktuellen Preis für Ihre gewünschte Menge zu erfahren und direkt zu bestellen.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Heizöl Online - Testzwecke | Alle Preise inkl. MwSt.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
