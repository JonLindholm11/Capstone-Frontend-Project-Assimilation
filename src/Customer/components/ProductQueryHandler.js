const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default async function ProductQueryHandler(category) {
  const url = new URL(`${API}/products`);
  if (category) url.searchParams.set("category", category);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${API}/products/${id}`);
  if (!res.ok) throw new Error(`GET /products/${id} failed: ${res.status}`);
  return res.json();
}