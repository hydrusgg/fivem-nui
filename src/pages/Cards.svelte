<script lang="ts">
  import { callServer, post } from "../lib/api";
  import { credits, isBrowser, visible } from "../lib/state";
  import type { Credit, CreditForm } from "../lib/types";

  let form: CreditForm | null;

  function createForm(credit: Credit) {
    if (isBrowser) {
      return (form = {
        id: 1,
        errors: {},
        has_testdrive: true,
        fields: [
          {
            label: "Escolha seu veículo",
            choices: {
              panto: "Panto",
            },
          },
        ],
      });
    }

    callServer("CREATE_FORM", credit.id).then((data) => {
      form = Object.assign(data, {
        errors: {},
      });
    });
  }

  async function handleSubmit() {
    if (!form) {
      return;
    }

    const values = form.fields.map((f) => f.value);
    const res = await callServer("REDEEM", form.id, values);

    if (!res) {
      $visible = false;
      post("CLOSE");
    } else {
      form = Object.assign(form, res ?? {});
    }
  }

  async function handleTestdrive() {
    if (!form) {
      return;
    }

    const [{ value }] = form.fields;

    if (!value) {
      return;
    }

    if (await callServer("TESTDRIVE", form.id, value)) {
      $visible = false;
      post("CLOSE");
    }
  }
</script>

<main id="cards">
  <header>
    {#if form}
      <button on:click={() => (form = null)}> ← </button>
    {/if}

    <h1>RESGATE DE BENEFÍCIOS</h1>
  </header>

  {#if form}
    <div id="form">
      {#if form.message}
        <p class="error-text">{form.message}</p>
      {/if}

      {#each form.fields as field, idx}
        <div class="field">
          <label>{field.label}</label>

          {#if field.choices}
            <select bind:value={field.value}>
              <option value="" disabled selected>Seleciona uma opção</option>

              {#each Object.entries(field.choices) as [key, value]}
                <option value={key}>{value}</option>
              {/each}
            </select>
          {:else}
            <input bind:value={field.value} />
          {/if}

          {#if form.errors[idx]}
            <p class="error-text">{form.errors[idx]}</p>
          {/if}
        </div>
      {/each}

      <div id="form-buttons">
        <button on:click|preventDefault={handleSubmit} type="submit"
          >Resgatar</button
        >

        {#if form.has_testdrive}
          <button id="testdrive" type="button" on:click={handleTestdrive}
            >Testdrive</button
          >
        {/if}
      </div>
    </div>
  {:else}
    <ul>
      {#each $credits as item}
        <li>
          <h1>{item.name}</h1>
          <img src={item.image} crossorigin="anonymous" alt="" />
          <button on:click={() => createForm(item)}>Resgatar</button>
        </li>
      {/each}
    </ul>
  {/if}
</main>
