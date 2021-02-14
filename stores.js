import { writable, derived } from "svelte/store";

let default_store = {
  quantity: 10,
  columns: 2,
  font_size: 30,
  digit_start: 0,
  digit_end: 2,
  operator_string: "+",
  height: 120
};

let store_data = JSON.parse(localStorage.getItem("store_data")) || {};

export let store = writable({
  ...default_store,
  ...store_data
});

export let operators = derived(store, ($store) =>
  $store.operator_string.split(" ")
);

export let digits = derived(store, ($store) =>
  Array.from(
    new Array($store.digit_end - $store.digit_start + 1),
    (n, i) => i + Number($store.digit_start)
  )
);
