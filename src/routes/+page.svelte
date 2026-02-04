<script lang="ts">
  import TextReveal from "$lib/components/TextReveal.svelte";
  import { fade } from "svelte/transition";
  import EnvelopePressing from "../lib/components/EnvelopePressing.svelte";
  import confetti from "@hiseb/confetti";
  import HeartRain from "../lib/components/HeartRain.svelte";

  let initialTextRevealFinished = $state(false);
  let envelopePressingFinished = $state(false);
  let finalTextFinished = $state(false);
  let choiceMade = $state(false);
  let noCounter = $state(0);

  let noButtonText = [
    "Ne",
    "Nee",
    "Nee (sarkazam)",
    "Ne.",
    "Prestani.",
    "SAD SE VRIJEĐAMO",
    "Malo škakljika ovo",
    "Prestani me pipkati",
    "Samo reci da",
    "Ne?",
    "Hmmm",
    "Slab signal",
    "'Da' se nije pomaknuo",
    "Nez jesi skontala",
    "Da",
    "Fuck",
    "Neočekivano",
    "Kontao sam",
    "Da ćeš zatvoriti",
    "Prije nego",
    "Stisnuti Da",
    "...",
    "Nisam toliko",
    "Daleko ovo",
    "Isplanirao",
    "Ne",
    "Nee",
    "Nee (sarkazam)",
    "ZAŠTO POKUŠAVAŠ OPET",
    "AJ STISNI DA VIŠE",
    "INAČE ŠKAKLJIKAM",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "Ajmo opet",
    "Da",
    "Ne",
    "Možda",
    "Ovisi je li jupiter u saturnu",
    "ILI TI U MENI",
    "... sad sam pretjerao",
  ];

  const noButtonTextIndex = $derived(
    Math.min(Math.floor(noCounter / 1), noButtonText.length - 1),
  );

  const handleNoClick = () => {
    if (noCounter < noButtonText.length * 1) {
      noCounter++;
    } else {
      noCounter = 0;
    }
  };
</script>

<div
  class="grid grid-cols-1 grid-rows-1 items-center justify-items-center min-h-screen w-full overflow-hidden"
>
  {#if !initialTextRevealFinished}
    <div class="col-start-1 row-start-1" out:fade={{ duration: 300 }}>
      <TextReveal
        text="Ćao Dora | Nadam se da si dobro. | Bolje ti je da jesi. | (to je bila prijetnja) | Pokušaj ovo otvoriti | ... | ako možeš hehe"
        onComplete={() => (initialTextRevealFinished = true)}
        displayTime={5000}
      />
    </div>
  {:else if !envelopePressingFinished}
    <EnvelopePressing onComplete={() => (envelopePressingFinished = true)} />
  {:else if envelopePressingFinished && !choiceMade}
    <div class="col-start-1 row-start-1" out:fade={{ duration: 300 }}>
      <TextReveal
        text="Wau. | Što li ti sve možeš... | S tim prstićima | Moram priznati, stvarno sam impresioniran | Ti to mene sigurno... | Romantiziraš | Kakve li slučajnosti | Da je uskoro valentinovo | Imajući to na umu, moram te pitati | Ako je krumpir tri eura... | Koliko Ivica ima godina? | Šalim se naravno | Ispit iz matematike te tek očekuje | Ukratko khmmm | Želiš li biti moje valentinovo?"
        onComplete={() => (finalTextFinished = true)}
        displayTime={5000}
      />
      {#if finalTextFinished && !choiceMade}
        <div
          in:fade={{ duration: 2000 }}
          class="flex flex-col gap-3 p-3 relative"
        >
          <button
            type="button"
            class="button bg-red-300 h-fit w-fit"
            onclick={() => (choiceMade = true)}>Da</button
          >
          <button
            type="button"
            class="button fixed left-3 mt-9 h-fit w-fit text-left overflow-x-clip"
            onclick={handleNoClick}
          >
            {noButtonText[noButtonTextIndex]}
          </button>
        </div>
      {/if}
    </div>
  {/if}
  {#if choiceMade}
    <HeartRain />
    <TextReveal
      text="Znao sam... | Da se nećeš dvoumiti | O.o | ❤️"
      displayTime={5000}
    />
  {/if}
</div>
