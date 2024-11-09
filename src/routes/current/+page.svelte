<script>
  // Assuming you have an array of animal growth progress items
  let animalProgress = [
    { name: 'Bunny', progress: 65, maxGrowth: 100 },
    { name: 'Hamster', progress: 40, maxGrowth: 100 },
    { name: 'Chick', progress: 85, maxGrowth: 100 }
  ];
</script>

<div class="background">
  <div class="blob blob1"></div>
  <div class="blob blob2"></div>
  <div class="blob blob3"></div>
  
  <div class="page-container">
    <h1 class="main-heading">Current Blobs</h1>
    <div class="progress-container">
      {#each animalProgress.slice(0, 3) as animal}
        <div class="progress-card">
          <h3>{animal.name}</h3>
          <div class="progress-bar-container">
            <div 
              class="progress-bar" 
              style="width: {animal.progress}%"
            >
              <span class="progress-text">
                {animal.progress}%
              </span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .background {
    background-color: #e8f5e9;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.5;
    z-index: 0;
  }

  .blob1 {
    background: #c1e6c3;
    width: 300px;
    height: 300px;
    top: -100px;
    right: -50px;
    animation: float 8s ease-in-out infinite;
  }

  .blob2 {
    background: #d1ecd3;
    width: 400px;
    height: 400px;
    bottom: -150px;
    left: -100px;
    animation: float 10s ease-in-out infinite;
  }

  .blob3 {
    background: #b4deb6;
    width: 250px;
    height: 250px;
    top: 50%;
    right: 10%;
    animation: float 12s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(5deg); }
    66% { transform: translate(-20px, 20px) rotate(-5deg); }
  }

  .page-container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .main-heading {
    text-align: center;
    color: #7fb883;
    font-size: 3.5rem;
    margin-bottom: 2.5rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .progress-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem;
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
  }

  .progress-card {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 1.5rem;
    border-radius: 25px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease;
    backdrop-filter: blur(5px);
  }

  .progress-card:hover {
    transform: translateY(-2px);
  }

  h3 {
    color: #7fb883;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .progress-bar-container {
    background-color: #f0f9f0;
    border-radius: 30px;
    height: 35px;
    overflow: hidden;
    position: relative;
  }

  .progress-bar {
    background-color: #9ed4a2;
    height: 100%;
    border-radius: 30px;
    transition: width 0.5s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress-text {
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  /* Responsive design for smaller screens */
  @media (max-width: 600px) {
    .page-container {
      margin: 1rem auto;
    }

    .main-heading {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }

    .progress-container {
      padding: 1rem;
      gap: 1.5rem;
    }

    .progress-card {
      padding: 1.2rem;
    }

    h3 {
      font-size: 1.3rem;
    }

    .progress-bar-container {
      height: 30px;
    }

    .progress-text {
      font-size: 1.1rem;
    }
  }
</style>
