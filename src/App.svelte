<script lang="ts">
  import { iframe, overlay, popups, resourceName, visible } from "./lib/state";
  import { fade } from "svelte/transition";
  import Cards from "./pages/Cards.svelte";
  import Overlay from "./pages/Overlay.svelte";
  import { externalImage } from "./lib/external";
  import { post } from "./lib/api";

  if (resourceName) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `nui://${resourceName}/html/styles.css`;
    document.head.appendChild(link);
  }

  function closeIframe() {
    iframe.set("");
    if (!$visible) {
      post("CLOSE");
    }
  }

  $: popup = $popups[0];
</script>

{#if $iframe}
  <div transition:fade class="container">
    <div class="iframe-outer">
      <div id="iframe-header">
        <button on:click={closeIframe} data-action="close" />
      </div>
      <iframe
        id="custom-iframe"
        src={$iframe}
        frameborder="0"
        title="Custom iframe"
        allow="clipboard-write"
      />
    </div>
  </div>
{:else if popup}
  <div transition:fade class="container">
    <div id="popup">
      <h1>Você resgatou!</h1>
      <h2>{popup.name}</h2>
      {#key popup.image}
        <img
          src={externalImage(popup.image)}
          alt={String(popup.image) || "empty image"}
        />
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
