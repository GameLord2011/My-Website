import { loadFull } from "https://cdn.jsdelivr.net/npm/tsparticles@3.6.0/tsparticles.bundle.min.js";

(async () => {
  await loadFull(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    url: "./assets/json/particles.json"
  });
})();