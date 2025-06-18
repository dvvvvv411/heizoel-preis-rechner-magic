import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { heizölConfig } from '@/config/heizoel';
import { useToast } from '@/hooks/use-toast';

const HeizölPreisrechner = () => {
  const [plz, setPlz] = useState('');
  const [liters, setLiters] = useState(3000);
  const [selectedProduct, setSelectedProduct] = useState('standard');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const currentProduct = heizölConfig.products[selectedProduct as keyof typeof heizölConfig.products];
  const basePrice = liters * currentProduct.pricePerLiter;
  const deliveryFee = liters >= heizölConfig.delivery.freeDeliveryThreshold ? 0 : heizölConfig.delivery.deliveryFee;
  const totalPrice = basePrice + deliveryFee;

  const handleOrder = async () => {
    if (!plz) {
      toast({
        title: "PLZ erforderlich",
        description: "Bitte geben Sie Ihre Postleitzahl ein.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const orderData = {
        shop_id: heizölConfig.shopId,
        product: currentProduct.id,
        liters,
        price_per_liter: currentProduct.pricePerLiter,
        delivery_fee: deliveryFee,
        total_amount: totalPrice,
        plz
      };

      console.log('Sending order data:', orderData);

      const response = await fetch(`${heizölConfig.backendUrl}/create-order-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received token:', data.token);
      
      if (data.token) {
        window.location.href = `${heizölConfig.checkoutUrl}?token=${data.token}`;
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      toast({
        title: "Bestellung fehlgeschlagen",
        description: "Es gab einen Fehler beim Erstellen der Bestellung. Bitte versuchen Sie es erneut.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Heizöl Preisrechner</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* PLZ Eingabe */}
        <div className="space-y-2">
          <Label htmlFor="plz">Postleitzahl</Label>
          <Input
            id="plz"
            type="text"
            placeholder="12345"
            value={plz}
            onChange={(e) => setPlz(e.target.value)}
            className="text-lg"
          />
        </div>

        {/* Liefermenge */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            Liefermenge: {liters.toLocaleString('de-DE')} Liter
          </Label>
          <Slider
            value={[liters]}
            onValueChange={(value) => setLiters(value[0])}
            min={heizölConfig.limits.minLiters}
            max={heizölConfig.limits.maxLiters}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{heizölConfig.limits.minLiters.toLocaleString('de-DE')}L</span>
            <span>{heizölConfig.limits.maxLiters.toLocaleString('de-DE')}L</span>
          </div>
          <Input
            type="number"
            value={liters}
            onChange={(e) => setLiters(Math.max(heizölConfig.limits.minLiters, Math.min(heizölConfig.limits.maxLiters, parseInt(e.target.value) || heizölConfig.limits.minLiters)))}
            min={heizölConfig.limits.minLiters}
            max={heizölConfig.limits.maxLiters}
            step={100}
            className="text-center text-lg"
          />
        </div>

        {/* Produktauswahl */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Produktauswahl</Label>
          <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct}>
            {Object.entries(heizölConfig.products).map(([key, product]) => (
              <div key={key} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={key} id={key} />
                <div className="flex-1">
                  <Label htmlFor={key} className="cursor-pointer font-medium">
                    {product.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {product.pricePerLiter.toFixed(2)} €/L
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Preisübersicht */}
        <Card className="bg-accent/50">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span>Grundpreis ({liters.toLocaleString('de-DE')} L × {currentProduct.pricePerLiter.toFixed(2)} €/L):</span>
              <span className="font-semibold">{basePrice.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between items-center">
              <span>
                Liefergebühr:
                {deliveryFee === 0 && (
                  <span className="text-green-600 ml-1 text-sm">(ab 3.000L kostenlos)</span>
                )}
              </span>
              <span className="font-semibold">
                {deliveryFee === 0 ? 'kostenlos' : `${deliveryFee.toFixed(2)} €`}
              </span>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between items-center text-xl font-bold text-primary">
              <span>Gesamtpreis:</span>
              <span>{totalPrice.toFixed(2)} €</span>
            </div>
          </CardContent>
        </Card>

        {/* Bestell-Button */}
        <Button 
          onClick={handleOrder} 
          disabled={isLoading || !plz}
          className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
        >
          {isLoading ? 'Bestellung wird erstellt...' : 'Jetzt bestellen'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HeizölPreisrechner;
