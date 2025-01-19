"use client";

import React from 'react';
import { VFXProvider, VFXImg } from 'react-vfx';
import Link from 'next/link';

export default function Shoutouts() {
  return (
    <VFXProvider>
        <main className="flex flex-col items-center justify-center p-4">
            <h1 className='text-xl'>Shoutouts!</h1>
            <br/>
            <div className='text-sm'>
                <p>
                    <Link href="https://github.com/fand">@fand</Link> for <Link href="https://amagi.dev/react-vfx"><i><VFXImg src="/react-vfx.png" className='h-[1.3rem] hidden dark:inline-block overflow-clip' shader="glitch" overflow={true} alt='React-Vfx' /></i><i className="dark:hidden">React-Vfx</i></Link>!
                </p>
                <br/>
                <p>
                    <Link href="https://github.com/vincentgarreau">@vincentgarreau</Link>, and <Link href="https://github.com/matteobruni">@matteobruni</Link> for <i><Link href="https://github.com/tsparticles/tsparticles">TSParticles</Link></i>!
                </p>
                <br/>
                <p>
                    <Link href="https://github.com/facebook">Meta</Link>, <Link href="https://github.com/microsoft">Microsoft</Link>, and <Link href="https://github.com/vercel">Vercel</Link> for making this site possible at all!
                </p>
                <br/>
                <p>
                    <Link href="https://github.com/torvalds">@torvalds</Link> for <i><Link href="https://github.com/torvalds/linux">Linux</Link></i>!
                </p>
                <br/>
                <p>
                    <Link href='https://github.com/willy-jl'>@Willy-JL</Link>, <Link href='https://github.com/sil333033'>@Sil333033</Link>, <Link href='https://github.com/haxsam'>@HaxSam</Link>, <Link href='https://github.com/matthewkukanich'>@MatthewKuKanich</Link>, and <Link href='https://github.com/956mb'>@956MB</Link> for <i><Link href='https://github.com/next-flip/momentum-firmware'>Momentum Firmware</Link></i>!
                </p>
            </div>
        </main>
    </VFXProvider>
  )
}