import React from 'react';

import * as VFX from 'react-vfx';

function Test() {
  return (
    <>
        <VFX.VFXProvider>
            <VFX.VFXDiv shader={"glitch"} overflow={[10, 10, 10, 10]}>
                <h1>
                    About Page
                </h1>
                <p>
                    About Me!
                </p>
            </VFX.VFXDiv>
        </VFX.VFXProvider>
    </>
  );
}

export default Test;
