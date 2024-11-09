<script lang="ts">
	export let name: string;
	export let stage: number;
	export let imageUrl: string;
	export let maxStage: number;
</script>

<a href="/animal/{name.toLowerCase()}" class="animal-card">
	<div class="image-container">
		<img src={imageUrl} alt={`${name} at growth stage ${stage}`} />
	</div>
	<div class="info">
		<h3>{name}</h3>
		<div class="growth-bar">
			<div class="progress" style="width: {(stage / maxStage) * 100}%"></div>
		</div>
		<span class="stage">Stage {stage}/{maxStage}</span>
	</div>
</a>

<style>
	.animal-card {
		display: block;
		text-decoration: none;
		background: var(--background-card);
		border-radius: var(--radius-medium);
		box-shadow: var(--shadow-soft);
		overflow: hidden;
		transition: all 0.3s ease;
		animation: float 6s ease-in-out infinite;
	}

	.animal-card:hover {
		transform: translateY(-8px);
		box-shadow: var(--shadow-hover);
	}

	.image-container {
		padding: 1rem;
		background: var(--pastel-green);
		border-radius: var(--radius-medium) var(--radius-medium) 0 0;
	}

	img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		border-radius: var(--radius-small);
	}

	.info {
		padding: 1.5rem;
	}

	h3 {
		margin: 0 0 1rem 0;
		font-size: 1.4rem;
		color: var(--text-primary);
		font-weight: 700;
	}

	.growth-bar {
		background: var(--background-primary);
		height: 10px;
		border-radius: 20px;
		border: 1px solid black;
		margin: 0.8rem 0;
		overflow: hidden;
	}

	.progress {
		background: var(--matcha-green);
		height: 100%;
		border-radius: 20px;
		transition: width 0.5s ease;
	}

	.stage {
		font-size: 0.9rem;
		color: var(--text-secondary);
		font-weight: 600;
	}
</style>
