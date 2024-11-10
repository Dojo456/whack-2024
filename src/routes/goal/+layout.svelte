<script lang="ts">
	const { children } = $props();
</script>

<div class="background">
	{@render children()}
</div>

<style>
	.background {
		background-color: #d5dde0;
		background-image: url('$lib/assets/Floating_island_.jpg');
		background-size: 400%;
		background-position: 50% 0%;
		min-height: 100vh;
		position: relative;
		overflow: hidden;
	}
</style>
