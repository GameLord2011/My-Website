"use client";

import Image from "next/image";
import Link from 'next/link'

import { BrowserView, MobileView } from "react-device-detect";

export default function HPageIs(){
    return(
        <>
            <BrowserView>
                <div className="">
                    <Link href='https://github-readme-stats.vercel.app/'>
                        <div className="bg-svgimg w-[467px] h-[195px] bottom-0 p-0 m-0 right-0 fixed"/>
                    </Link>
                    <Link href="http://s05.flagcounter.com/more/xU6" className="hidden w-[209px] bottom-0 p-0 m-0 left-0 fixed dark:block">
                        <Image 
                            className="Flag_cntr" 
                            src="https://s05.flagcounter.com/count2_US/xU6/bg_000000/txt_044002/border_044002/columns_2/maxflags_20/viewers_0/labels_1/pageviews_1/flags_0/percent_0/" 
                            alt="Flag Counter" 
                            width={209} 
                            height={123}
                        />
                    </Link>
                </div>
            </BrowserView>
            <MobileView>
            </MobileView>
        </>
    )
}