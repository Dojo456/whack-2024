<script lang="ts">
    let isMenuOpen = false;

    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const nav = target.closest('.nav-container');
        if (!nav) {
            isMenuOpen = false;
        }
    };
</script>

<svelte:window on:click={handleClickOutside} />

<div class="nav-container">
    <button 
        class="blob-button" 
        on:click={() => isMenuOpen = !isMenuOpen}
        aria-label="Navigation menu"
    >
        <div class="blob-face">
            <div class="eyes">
                <div class="eye"></div>
                <div class="eye"></div>
            </div>
            <div class="smile"></div>
        </div>
    </button>

    {#if isMenuOpen}
        <nav class="menu">
            <a href="/new" class="menu-item">New</a>
            <a href="/current" class="menu-item">Current</a>
            <a href="/gallery" class="menu-item">Gallery</a>
            <a href="/options" class="menu-item">Options</a>
        </nav>
    {/if}
</div>

<style>
    .nav-container {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1000;
    }

    .blob-button {
        width: 60px;
        height: 60px;
        background: #9ed4a2;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        transition: transform 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .blob-button:hover {
        transform: scale(1.1);
    }

    .blob-face {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .eyes {
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
    }

    .eye {
        width: 8px;
        height: 8px;
        background: #333;
        border-radius: 50%;
    }

    .smile {
        position: absolute;
        bottom: 30%;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 10px;
        border-bottom: 3px solid #333;
        border-radius: 0 0 10px 10px;
    }

    .menu {
        position: absolute;
        top: 70px;
        left: 0;
        background: white;
        border-radius: 15px;
        padding: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        gap: 5px;
        animation: slideDown 0.3s ease;
    }

    .menu-item {
        text-decoration: none;
        color: #5c6178;
        padding: 10px 20px;
        border-radius: 10px;
        font-family: 'Nunito', sans-serif;
        font-weight: 600;
        transition: background 0.2s ease;
        white-space: nowrap;
    }

    .menu-item:hover {
        background: #f0f9f0;
        color: #9ed4a2;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style> 