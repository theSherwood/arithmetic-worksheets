function random_int(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function random_option(arr) {
  return arr[random_int(arr.length)];
}

function gen_random_problem(config) {
  let result =
    random_option(config.digits) +
    " " +
    random_option(config.operators) +
    " " +
    random_option(config.digits) +
    " = __";
  return config.wrap ? [result] : result;
}

export function gen_n_problems(n, config) {
  return Array.from(new Array(n), () => gen_random_problem(config));
}
