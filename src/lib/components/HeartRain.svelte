<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { linear } from "svelte/easing";

  interface Heart {
    id: number;
    x: number; // Horizontalna pozicija (%)
    size: number; // Veličina (px)
    duration: number; // Brzina pada (ms)
    delay: number; // Odgoda (ms)
  }

  let hearts = $state<Heart[]>([]);
  let counter = 0;

  function createHeart() {
    const id = counter++;
    const newHeart: Heart = {
      id,
      x: Math.random() * 100,
      size: Math.random() * (40 - 20) + 20,
      duration: Math.random() * (4000 - 2000) + 2000,
      delay: Math.random() * 500,
    };

    hearts.push(newHeart);

    // Ukloni srce iz niza nakon što padne da ne gušimo memoriju
    setTimeout(
      () => {
        hearts = hearts.filter((h) => h.id !== id);
      },
      newHeart.duration + newHeart.delay + 100,
    );
  }

  onMount(() => {
    // Generiraj srce svakih 300ms
    const interval = setInterval(createHeart, 300);
    return () => clearInterval(interval);
  });
</script>

<div class="fixed inset-0 pointer-events-none overflow-hidden -z-10">
  {#each hearts as heart (heart.id)}
    <div
      class="absolute top-[-50px]"
      style="left: {heart.x}%; font-size: {heart.size}px;"
      in:fly={{
        y: "110vh",
        duration: heart.duration,
        delay: heart.delay,
        easing: linear,
      }}
    >
      <span class="animate-sway inline-block">❤️</span>
    </div>
  {/each}
</div>

<style>
  /* Dodajemo lagano njišući efekt dok srce pada */
  @keyframes sway {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(20px) rotate(20deg);
    }
  }
  .animate-sway {
    animation: sway 1.5s ease-in-out infinite;
  }
</style>
