<script>
	import { onMount, setContext } from 'svelte';
	import Pets from '$lib/components/Pets.svelte';
	import { allPets, selectedType, filteredPets } from '$lib/stores/petsStore.js';

	onMount(async () => {
		const res = await fetch('http://localhost:3010/pets');
		const urls = await res.json();
		
		// Fetch full pet details for each
		const petData = await Promise.all(urls.map(u => fetch(`http://localhost:3010${u}`).then(r => r.json())));
		allPets.set(petData);
	});

	// Provide context
	setContext('pets', { allPets, selectedType, filteredPets });
</script>

<main class="p-4">
	<Pets />
</main>
