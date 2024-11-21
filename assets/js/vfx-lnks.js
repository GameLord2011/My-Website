import { VFX } from '@vfx-js/core';

const img = document.querySelector('#img');

const vfx = new VFX();
vfx.add(img, { shader: "glitch", overflow: 100 });
            