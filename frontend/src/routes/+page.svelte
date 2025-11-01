<script>
  import { setContext } from 'svelte';
  import { writable, derived } from 'svelte/store';
  import Pets from '$lib/components/Pets.svelte';

  export let data;

  // Create stores
  const allPets = writable(data.pets || []);
  const selectedType = writable(null);

  // Derived store: filters pets based on selected type
  const filteredPets = derived(
    [allPets, selectedType],
    ([$allPets, $selectedType]) => {
      if (!$selectedType) return $allPets;
      return $allPets.filter(p => p.type === $selectedType);
    }
  );

  // Provide context for children components
  setContext('pets', { allPets, selectedType, filteredPets });
</script>

{#if data.error}
  <p class="text-center text-red-600">{data.error}</p>
{:else}
  <Pets />
{/if}
