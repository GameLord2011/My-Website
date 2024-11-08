// @path-json can be an object or an array, the first will be loaded directly, and the object from the array will be randomly selected
/* tsParticles.load(@params); */

tsParticles
    .load({
        id: "tsparticles",
        url: "./assets/json/particles.json",
    })
    .then(container => {
        console.log("callback - tsparticles config loaded");
    })
    .catch(error => {
        console.error(error);
    });