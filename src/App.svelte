<script lang="ts">
  import { overlay, popups, resourceName, visible } from "./lib/state";
  import { fade } from "svelte/transition";
  import Cards from "./pages/Cards.svelte";
  import Overlay from "./pages/Overlay.svelte";

  if (resourceName) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `nui://${resourceName}/html/styles.css`;
    document.head.appendChild(link);
  }

  $: popup = $popups[0];
</script>

{#if popup}
  <div transition:fade class="container">
    <div id="popup">
      <h1>Você resgatou!</h1>
      <h2>{popup.name}</h2>
      {#key popup.image}
        <img src={popup.image} alt={String(popup.image) || "empty image"} />
      {/key}
    </div>
  </div>
{:else if $visible}
  <div transition:fade class="container">
    <Cards />
  </div>
{:else if $overlay}
  <Overlay />
{/if}
