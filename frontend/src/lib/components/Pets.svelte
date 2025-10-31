<script>
	import { getContext } from 'svelte';
	import Filter from './Filter.svelte';

	const { filteredPets } = getContext('pets');
</script>

<section class="flex flex-col items-center">
	<h3 class="text-center">Use this filter to switch between pets</h3>
	<ul class="flex justify-center gap-2">
		<Filter />
	</ul>
</section>

<h2 class="my-6 text-center text-2xl">Pets Overview</h2>

<table class="w-full table-auto border-separate text-center">
	<thead class="border-y-4">
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Icon</th>
		</tr>
	</thead>
	<tbody class="text-xs">
		{#each $filteredPets as pet}
			<tr>
				<td>{pet.name}</td>
				<td>{pet.type}</td>
				<td>{pet.icon}</td>
			</tr>
		{/each}
	</tbody>
</table>
