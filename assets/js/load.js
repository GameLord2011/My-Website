import { tsParticles } from "https://cdn.jsdelivr.net/npm/tsparticles@3.6.0/tsparticles.bundle.min.js";

tsParticles
  .load({
    id: "tsparticles",
    url: "assets/json/particles.json",
  })
  .then((container) => {
    console.log("callback - tsparticles config loaded");
  })
  .catch((error) => {
    console.error(error);
  });