const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default async function ProductQueryHandler(category) {
  const url = new URL(`${API}/products`);
  if (category) url.searchParams.set("category", category);

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
}
