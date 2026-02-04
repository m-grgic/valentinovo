<script lang="ts">
  import { fade } from "svelte/transition";
  import EnvelopeIcon from "./EnvelopeIcon.svelte";
  import { spring, Spring } from "svelte/motion";
  import { onMount } from "svelte";
  import confetti from "@hiseb/confetti";
  import { browser } from "$app/environment";

  type Props = {
    onComplete?: () => {};
  };

  let { onComplete }: Props = $props();

  const scale = spring(1, {
    stiffness: 0.2,
    damping: 0.4,
  });

  let pressValue = $state(0);

  const handlePointerUp = () => scale.set(1);

  const drainRate = $derived(0.2 + pressValue / 180);

  const handlePointerDown = () => {
    scale.set(0.8);

    const increment = Math.max(1, 10 - pressValue / 10);

    if (pressValue < 100) {
      pressValue = Math.min(pressValue + increment, 100);
    }
  };

  const text = [
    "Pritisni",
    "Pritisni",
    "Pritisni",
    "Pritisni",
    "Slabo je to...",
    "Slabo je to...",
    "Slabo je to...",
    "Slabo je to...",
    "Slabo je to...",
    "Možeš ti to bolje!",
    "Možeš ti to bolje!",
    "Možeš ti to bolje!",
    "Možeš ti to bolje!",
    "Možeš ti to bolje!",
    "Sad smo već negdje.",
    "Sad smo već negdje.",
    "Sad smo već negdje.",
    "Sad smo već negdje.",
    "Bržeee",
    "Pazi da ne pukne!",
    "JOŠŠŠ MALOOO",
    "AAAAAaaaaAAAAaaaAAA",
  ];

  const currentText = $derived(
    Math.min(Math.floor(pressValue / (100 / text.length)), text.length),
  );

  onMount(() => {
    const interval = setInterval(() => {
      if (pressValue > 0) {
        pressValue -= drainRate;
      }

      if (pressValue >= 99) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  });

  let hasWon = $state(false);
  let confettiInstance: any = null;

  $effect(() => {
    if (pressValue >= 99 && !hasWon) {
      hasWon = true;
      if (browser && (window as any)) {
        confetti({
          count: 500,
          size: 2,
        });
      }
      onComplete && onComplete();
    }
  });
</script>

<div
  class="relative col-start-1 row-start-1 flex justify-center w-full h-screen"
  in:fade={{ duration: 600, delay: 300 }}
>
  {#if !hasWon}
    <div
      class="absolute bottom-0 left-0 w-full bg-red-400/30 pointer-events-none transition-all duration-150 ease-out"
      style="height: {pressValue}%"
      out:fade={{
        duration: 2000,
      }}
    ></div>
    <div
      out:fade={{ duration: 1500 }}
      role="button"
      tabindex="0"
      style="
    transform: scale({$scale})
    translate({pressValue > 50
        ? (Math.random() - 0.5) * (pressValue / 10)
        : 0}px);
  "
      onpointerdown={handlePointerDown}
      onpointerup={handlePointerUp}
      onpointerleave={handlePointerUp}
      class="relative z-10 cursor-pointer select-none"
    >
      <EnvelopeIcon
        class="max-w-[calc(100vw-2rem)] w-full transition-colors duration-100"
        style="color: rgb({100 + pressValue}, {50}, {50})"
      />
    </div>
    <div
      out:fade={{ duration: 500 }}
      class="absolute bottom-10 overflow-hidden font-medium"
    >
      {text[currentText]}
    </div>
  {/if}
</div>
