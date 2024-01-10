<script>
  import { fade } from "svelte/transition";
  import { post } from "../lib/api";
  import { writable } from "svelte/store";

  let command = writable("store");

  post("getStoreCommand").then(command.set, () => {});
</script>

<div transition:fade id="overlay">
  <header>
    <h1>BENEFÍCIOS</h1>
  </header>

  <p>Você possui benefícios pendentes</p>

  <footer>
    <p>Utilize /{$command} para resgatar</p>
  </footer>
</div>
