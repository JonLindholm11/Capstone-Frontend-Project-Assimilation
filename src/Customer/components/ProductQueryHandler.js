const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default async function ProductQueryHandler(category) {
  const path = category
    ? `/products/category/${encodeURIComponent(category)}`
    : `/products`;

  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${API}/products/${id}`);
  if (!res.ok) throw new Error(`GET /products/${id} failed: ${res.status}`);
  return res.json();
}