<script lang="ts">
    import AnimalCard from '$lib/components/AnimalCard.svelte';
    import '../../lib/styles/theme.css';

    // Mock data for achieved animals (you would typically get this from your backend/store)
    const achievedAnimals = [
        {
            name: 'Chicken',
            stage: 3,
            imageUrl: 'https://placekitten.com/302/302',
            achievements: ['Reached full growth', 'Laid first egg']
        },
        {
            name: 'Pig',
            stage: 2,
            imageUrl: 'https://placekitten.com/304/304',
            achievements: ['Reached maturity']
        },
        {
            name: 'Cow',
            stage: 4,
            imageUrl: 'https://placekitten.com/308/308',
            achievements: ['Reached full growth', 'First milk production']
        }
    ];
</script>

<main>
    <h1>Your Animal Gallery</h1>
    <p class="subtitle">Celebrate your farming achievements!</p>

    <div class="gallery-grid">
        {#each achievedAnimals as animal}
            <div class="achievement-card">
                <AnimalCard 
                    name={animal.name} 
                    stage={animal.stage} 
                    imageUrl={animal.imageUrl} 
                    maxStage={animal.stage} 
                />
                <div class="achievements">
                    <h4>Achievements</h4>
                    <ul>
                        {#each animal.achievements as achievement}
                            <li>{achievement}</li>
                        {/each}
                    </ul>
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    h1 {
        text-align: center;
        color: var(--text-primary);
        font-size: 2.5rem;
        margin: 2rem 0 0.5rem;
        font-weight: 800;
    }

    .subtitle {
        text-align: center;
        color: var(--text-secondary);
        font-size: 1.1rem;
        margin-bottom: 3rem;
    }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        animation: fadeIn 0.6s ease-out;
    }

    .achievement-card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .achievements {
        background: var(--background-card);
        padding: 1.5rem;
        border-radius: var(--radius-medium);
        box-shadow: var(--shadow-soft);
    }

    .achievements h4 {
        color: var(--text-primary);
        margin: 0 0 1rem 0;
        font-size: 1.2rem;
    }

    .achievements ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .achievements li {
        color: var(--text-secondary);
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--background-primary);
    }

    .achievements li:last-child {
        border-bottom: none;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .gallery-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
