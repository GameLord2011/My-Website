"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { isBrowser, isMobile } from "react-device-detect";

export default function HPageIs() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {isBrowser && (
        <div className="">
          <Link href='https://github-readme-stats.vercel.app/'>
            <div className="bg-svgimg w-[467px] h-[195px] bottom-0 p-0 m-0 right-0 fixed" />
          </Link>
          {process.env.NODE_ENV === 'production' && (
            <Link href="http://s01.flagcounter.com/more/ugnH" className="hidden bottom-0 p-0 m-0 left-0 fixed dark:block w-auto h-auto">
              <Image
                className="Flag_cntr"
                src="https://s01.flagcounter.com/count2/ugnH/bg_000000/txt_1e4d12/border_1E4D12/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/"
                alt="Flag Counter"
                width={209}
                height={123}
              />
            </Link>
          )}
          {process.env.NODE_ENV === 'development' && (
              <Link href="http://s05.flagcounter.com/more/xU6" className="hidden bottom-0 p-0 m-0 left-0 fixed dark:block w-auto h-auto">
                <Image
                  className="Flag_cntr"
                  src="https://s05.flagcounter.com/count2_US/xU6/bg_000000/txt_044002/border_044002/columns_2/maxflags_20/viewers_0/labels_1/pageviews_1/flags_0/percent_0/"
                  alt="Flag Counter"
                  width={209}
                  height={123}
                />
            </Link>          
          )}
        </div>
      )}
      {isMobile && (
        <div>
          {process.env.NODE_ENV === 'production' && (
            <Link href="http://s01.flagcounter.com/more/ugnH" className="hidden bottom-0 p-0 m-0 left-0 fixed dark:block">
              <Image
                className="Flag_cntr"
                src="https://s01.flagcounter.com/count2/ugnH/bg_000000/txt_1e4d12/border_1E4D12/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/"
                alt="Flag Counter"
                width={209}
                height={123}
              />
          </Link>
          )}
          {process.env.NODE_ENV === 'development' && (
              <Link href="http://s05.flagcounter.com/more/xU6" className="hidden bottom-0 p-0 m-0 left-0 fixed dark:block">
                <Image
                  className="Flag_cntr"
                  src="https://s05.flagcounter.com/count2_US/xU6/bg_000000/txt_044002/border_044002/columns_2/maxflags_20/viewers_0/labels_1/pageviews_1/flags_0/percent_0/"
                  alt="Flag Counter"
                  width={209}
                  height={123}
                />
            </Link>          
          )}
        </div>
      )}
    </>
  );
}
