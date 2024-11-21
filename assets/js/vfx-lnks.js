import { VFX } from './node_modules/@vfx-js/core';

const img = document.querySelector('#img');

const vfx = new VFX();
vfx.add(img, { shader: "glitch", overflow: 100 });
            