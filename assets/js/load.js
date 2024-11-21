import { tsParticles } from "@tsparticles/engine/package.json";

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