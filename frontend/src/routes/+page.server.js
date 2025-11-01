import { PUBLIC_API_URL } from "$env/static/public";

/**
 * Loads pets from the backend.
 */
export const load = async ({ fetch }) => {
  try {
    const res = await fetch(`${PUBLIC_API_URL}/pets`);

    if (!res.ok) {
      throw new Error(`Failed to fetch pets: ${res.status}`);
    }

    const data = await res.json();

    return {
      meta: data.meta,
      pets: data.data
    };
  } catch (err) {
    console.error("Error loading pets:", err);
    return {
      error: "Failed to load pets. Please try again later."
    };
  }
};
