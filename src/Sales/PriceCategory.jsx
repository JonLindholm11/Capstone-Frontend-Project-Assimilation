import { useState } from "react";

export default function PriceCategory() {
  const [sectionCategories] = useState([
    { id: 1, name: "FeaturesSection" },
    { id: 2, name: "TestimonialsSection" },
    { id: 3, name: "ProductDetails" },
    { id: 4, name: "PricingTable" },
  ]);

  return (
    <div className="price-category">
      <h2>Price Categories</h2>
      <ul>
        {sectionCategories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}
