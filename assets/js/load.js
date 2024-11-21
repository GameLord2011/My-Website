import * as tsParticles from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.6.0/tsparticles.all.bundle.min.js";

(async () => {
  await loadFull(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    url: "./assets/json/particles.json"
  });
})();