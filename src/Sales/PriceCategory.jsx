import { useState } from "react";

export default function PriceCategoryPage() {
    
    const [sectionCategories] = useState([
        { id: 1, name: "FeaturesSection"},
      { id: 2, name: "TestimonialsSection"},
      { id: 3, name: "ProductDetails"},
      { id: 4, name: "PricingTable"},
    ]);
}
