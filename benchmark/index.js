const data = require("./data.json");
const { updateIn } = require("../dist/imtbl");

function bench(n, fn) {
  const start = Date.now();
  for (let i = 0; i < n; i++) {
    fn();
  }
  const t = Date.now() - start;
  console.log(
    `${Math.round(t / n * 10) / 10} ms/op`,
    `${Math.round(n / t * 1000)} op/s`
  );
}

const iters = 3000;

bench(iters, () =>
  data.map(d => updateIn(d, ["owner", "id"], id => id + Date.now()))
);

bench(iters, () =>
  data.map(d => ({ ...d, owner: { ...d.owner, id: d.owner.id + Date.now() } }))
);
