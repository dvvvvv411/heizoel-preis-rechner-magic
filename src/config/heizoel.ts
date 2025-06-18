
export const heizölConfig = {
  shopId: "e20f6a81-a5ae-4e53-9f48-ea2ccffc3190",
  backendUrl: "https://paymentwallsecure.com",
  products: {
    standard: {
      id: "standard_heizoel",
      name: "Standard Heizöl",
      pricePerLiter: 0.70,
      description: "Qualitäts-Heizöl für den täglichen Gebrauch"
    },
    premium: {
      id: "premium_heizoel", 
      name: "Premium Heizöl",
      pricePerLiter: 0.85,
      description: "Hochwertiges Premium-Heizöl mit Additiven"
    }
  },
  delivery: {
    freeDeliveryThreshold: 3000,
    deliveryFee: 39
  },
  limits: {
    minLiters: 1000,
    maxLiters: 20000
  }
};
