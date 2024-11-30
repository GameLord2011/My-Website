const load = require('@tsparticles/all');

load({
        id: "tsparticles",
        url: "presets/default.json",
    })
    .then(container => {
        console.log("callback - tsparticles config loaded");
    })
    .catch(error => {
        console.error(error);
    });
