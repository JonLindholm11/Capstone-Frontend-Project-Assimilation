//-----Not needed ATM but nice to have later-----//

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import ProductQueryHandler from "./ProductQueryHandler";
// import "../pages/pages.css"

// export default function Products() {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let cancelled = false;

//     (async () => {
//       try {
//         const data = await ProductQueryHandler();
//         if (!cancelled) setProducts(data);
//       } catch (err) {
//         if (!cancelled) setError(err.message || "Failed to load products");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   if (loading || !products) return <p>Loading...</p>;
//   if (error) return <p role="alert">{error}</p>;

//   return (
//     <ul className="product-grid">
//       {products.map((p) => (
//         <li
//           key={p.id}
//           className="product-card"
//           onClick={() => navigate(`/products/${p.id}`)}
//         >
//           <img
//             className="productImg"
//             src={p.product_img}
//             alt={p.product_name}
//           />
//           <h3>{p.product_name}</h3>
//           <p className="price">
//             $
//             {typeof p.basic_price === "number"
//               ? p.basic_price.toFixed(2)
//               : p.basic_price}
//           </p>
//           <p className="description">{p.product_description}</p>
//         </li>
//       ))}
//     </ul>
//   );
// }
