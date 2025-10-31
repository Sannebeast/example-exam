<script>
	import { getContext } from 'svelte';
	const { allPets, selectedType } = getContext('pets');

	// Derive unique types for filter buttons
	$: types = Array.from(new Set($allPets.map(p => p.type)));
</script>

{#each types as type}
	<li>
		<button
			class="m-2 bg-lime-400 p-1 hover:bg-amber-300"
			on:click={() => selectedType.set(type)}
		>
			{type}
		</button>
	</li>
{/each}

<li>
	<button
		class="m-2 bg-gray-300 p-1 hover:bg-gray-400"
		on:click={() => selectedType.set(null)}
	>
		Show All
	</button>
</li>
