<script>
  import FlexH from "./FlexH.svelte";
  import { gen_n_problems } from "./gen_problems.js";
  import { digits, operators, store } from "./stores.js";

  // Forces redraw
  let draw_count = 1;
  function redraw() {
    draw_count += 1;
  }

  $: problems = gen_n_problems(
    $store.quantity,
    {
      digits: $digits,
      operators: $operators
    },
    draw_count
  );

  $: if ($store) {
    localStorage.setItem("store_data", JSON.stringify($store));
  }
</script>

<style>
  * {
    font-family: sans-serif;
  }
  :global(body) {
    background: #e5f4cb;
    margin-top: 30px;
  }
  main {
    background: white;
    width: 612px;
    padding: 40px;
    margin: auto;
  }
  .grid {
    display: grid;
    grid-template-rows: auto;
  }
  .center {
    display: grid;
    place-content: center;
  }

  header {
    max-width: 250px;
    margin-bottom: 30px;
  }

  button {
    margin-top: 10px;
    background: white;
    border-radius: 5px;
    border: none;
    box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.1);
    transition: all 100ms ease-in;
  }

  button:active {
    transform: scale(0.95);
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
  }

  button > div {
    height: 30px;
    display: grid;
    place-content: center;
  }

  @media print {
    :global(body) {
      background: white;
      width: 612px;
    }
    header {
      display: none;
    }
  }
</style>

<header>
<FlexH>
  quantity
  <input type=number bind:value={$store.quantity} min={1}>
</FlexH>
<FlexH>
  columns
  <input type=number bind:value={$store.columns} min={1}>
</FlexH>
<FlexH>
  font size
  <input type=number bind:value={$store.font_size} min={16}>
</FlexH>
<FlexH>
  cell height
  <input type=number bind:value={$store.height} min={30}>
</FlexH>
<FlexH>
  operators
  <input type=text bind:value={$store.operator_string}>
  </FlexH><FlexH>
  range start
  <input type=number bind:value={$store.digit_start} max={$store.digit_end}
 >
  </FlexH><FlexH>
  range end
  <input type=number bind:value={$store.digit_end} min={$store.digit_start}
  >
  </FlexH>
  <FlexH>
  &nbsp;
  <button on:click={redraw}>
    <div>redraw</div>
  </button>
  </FlexH>
</header>
<main style={"font-size: " + $store.font_size + "px;"}>
  <div class="grid"
  style={"grid-template-columns: " + " 1fr".repeat($store.columns) + ";"}>
    {#each problems as problem}
      <div
      class="center"
      style={"height: " + $store.height + "px;"}>{problem}</div>
    {/each}
  </div>
</main>