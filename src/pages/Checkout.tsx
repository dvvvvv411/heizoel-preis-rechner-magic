
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Checkout = () => {
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tokenParam = urlParams.get('token');
    setToken(tokenParam);
    console.log('Checkout page loaded with token:', tokenParam);
  }, [location]);

  const handleBackToCalculator = () => {
    window.location.href = '/';
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Fehler</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Kein gültiger Bestell-Token gefunden.</p>
            <Button onClick={handleBackToCalculator} className="w-full">
              Zurück zum Preisrechner
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-green-600">
                Bestellung erfolgreich erstellt!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  Ihr Bestell-Token wurde erfolgreich generiert.
                </p>
                <p className="text-sm text-green-600 mt-2 font-mono break-all">
                  Token: {token}
                </p>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Diese Checkout-Seite ist für Testzwecke. In einer echten Implementierung 
                  würde hier der Zahlungsprozess stattfinden.
                </p>
                <p>
                  Der Token wurde erfolgreich vom Backend 
                  (https://paymentwallsecure.com/api/create-order-token) generiert 
                  und kann für weitere Verarbeitung verwendet werden.
                </p>
              </div>

              <div className="pt-4">
                <Button onClick={handleBackToCalculator} className="w-full">
                  Neue Bestellung aufgeben
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
