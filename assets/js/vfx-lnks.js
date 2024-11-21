import { VFX } from 'https://esm.sh/@vfx-js/core';

const img = document.querySelector('#img');

const vfx = new VFX();
vfx.add(img, { shader: "rgbShift", overflow: 100 });
            