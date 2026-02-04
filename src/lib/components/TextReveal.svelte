<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { onMount } from "svelte";

  interface Props {
    text?: string;
    displayTime?: number;
    inDuration?: number;
    outDuration?: number;
    separator?: string;
    onComplete?: () => void;
  }

  let {
    text = "Hello | Welcome | Enjoy",
    displayTime = 5000,
    inDuration = 800,
    outDuration = 600,
    separator = " | ",
    onComplete,
  }: Props = $props();

  let currentIndex = $state(0);

  const sentences = $derived(text.split(separator));

  onMount(() => {
    const interval = setInterval(() => {
      if (currentIndex < sentences.length - 1) {
        currentIndex++;
      } else {
        clearInterval(interval);
        if (onComplete) {
          setTimeout(onComplete, displayTime);
        }
      }
    }, displayTime);

    return () => clearInterval(interval);
  });
</script>

<div class="p-2 flex justify-center">
  <div class="grid grid-cols-1 grid-rows-1 items-center justify-items-center">
    {#key currentIndex}
      <div
        class="col-start-1 row-start-1"
        in:fly={{ duration: inDuration }}
        out:fade={{ duration: outDuration }}
      >
        <div
          in:fly={{ y: 20, duration: inDuration, delay: inDuration }}
          out:fly={{ y: -20, duration: outDuration }}
        >
          <p class="text-2xl font-medium">
            {sentences[currentIndex]}
          </p>
        </div>
      </div>
    {/key}
  </div>
</div>
