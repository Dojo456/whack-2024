<script lang="ts">
    import AnimalCard from '$lib/components/AnimalCard.svelte';
</script>

<main class="container">
    <header>
        <h1>Whackathon 2024</h1>
        <p class="subtitle">Discover and learn about different animals</p>
    </header>

    <section class="features">
        <div class="feature">
            <h2>Browse Animals</h2>
            <p>Explore our collection of animal cards featuring various species</p>
        </div>
        <div class="feature">
            <h2>Learn Facts</h2>
            <p>Each card contains interesting facts about the animals</p>
        </div>
        <div class="feature">
            <h2>Interactive Experience</h2>
            <p>Click on cards to learn more about each animal</p>
        </div>
    </section>

    <section class="featured-cards">
        <h2>Featured Animals</h2>
        <div class="card-grid">
            <!-- Add AnimalCard components here once you have the data -->
        </div>
    </section>
</main>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    header {
        text-align: center;
        margin-bottom: 4rem;
    }

    h1 {
        font-family: 'Nunito', sans-serif;
        font-weight: 800;
        font-size: 3rem;
        color: #2c3e50;
        margin-bottom: 1rem;
    }

    .subtitle {
        font-size: 1.25rem;
        color: #666;
    }

    .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
    }

    .feature {
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 8px;
        text-align: center;
    }

    .feature h2 {
        font-family: 'Nunito', sans-serif;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 1rem;
    }

    .featured-cards {
        margin-top: 2rem;
    }

    .featured-cards h2 {
        font-family: 'Nunito', sans-serif;
        font-weight: 700;
        text-align: center;
        margin-bottom: 2rem;
    }

    .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }
</style>
