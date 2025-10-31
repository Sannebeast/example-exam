import { writable, derived } from 'svelte/store';

// All pets from the backend
export const allPets = writable([]);

// Selected type for filtering
export const selectedType = writable(null);

// Derived store for filtered pets
export const filteredPets = derived(
  [allPets, selectedType],
  ([$allPets, $selectedType]) => {
    if (!$selectedType) return $allPets;
    return $allPets.filter(p => p.type.toLowerCase() === $selectedType.toLowerCase());
  }
);
