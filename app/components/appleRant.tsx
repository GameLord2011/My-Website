"use client";

import { UAParser } from "ua-parser-js";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

const LOCAL_STORAGE_KEY = "appleRantDismissed";

export default function AppleRant() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isApple, setIsApple] = useState<boolean>(false);
  const [appleRantDismissed, setAppleRantDismissed] = useState<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(ScrambleTextPlugin);
  }, []);

  const Pcontent = useRef<HTMLParagraphElement[]>([]);
  const liContent = useRef<HTMLLIElement[]>([]);
  const strongContent = useRef<HTMLElement[]>([]);
  const h1Content = useRef<HTMLHeadingElement[]>([]);

  // DRY up ref setters
  const setRef =
    <T extends HTMLElement>(refArr: React.RefObject<T[]>) =>
    (el: T | null) => {
      if (el && !refArr.current.includes(el)) {
        refArr.current.push(el);
      }
    };
  const setPRef = setRef(Pcontent);
  const setLiRef = setRef(liContent);
  const setStrongRef = setRef(strongContent);
  const setH1Ref = setRef(h1Content);

  useEffect(() => {
    const parser = new UAParser();
    const device = parser.getDevice();
    setIsApple(device.vendor === "Apple");
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (dismissed) {
      setAppleRantDismissed(true);
    }
  }, []);

  // DRY up GSAP animation logic
  const animateElements = (elements: HTMLElement[]) => {
    elements.forEach((el) => {
      gsap.to(el, {
        duration: gsap.utils.random(1.5, 3, 0.1),
        scrambleText: {
          text: el?.innerText as string,
          chars:
            'ʎﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・."=*+-<></>¦|⁝⁞₩₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾⍉⍊⍋',
          revealDelay: gsap.utils.random(0.1, 1),
          tweenLength: true,
          speed: gsap.utils.random(0.5, 1),
        },
      });
    });
  };

  useGSAP(() => {
    if (!isLoaded) return;
    animateElements(Pcontent.current);
    animateElements(liContent.current);
    animateElements(strongContent.current);
    animateElements(h1Content.current);
  }, [isLoaded]);

  const dismiss = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, "true");
    setAppleRantDismissed(true);
  };

  if (isApple && !appleRantDismissed) {
    return (
      <>
        <style>{`.content{display:none;}`}</style>
        <div className="x-0 y-0 relative z-50 m-0 flex h-full w-full flex-col items-center p-0">
          <br />
          <h1 className="text-2xl" ref={setH1Ref}>
            Wait!
          </h1>
          <br />
          <p className="w-1/2" ref={setPRef}>
            Apple does not align with my personal beliefs, so I am making you
            read this becase you use an apple device, I will remove this when
            apple changes these things, who knows, mabye this could make a
            change:
          </p>
          <br />
          <ul className="center w-1/2 list-inside">
            <li className="p-2" ref={setLiRef}>
              <strong ref={setStrongRef}>
                Absolutely exorbant app store fees
              </strong>
              {", "}
              Apple charges $99/year for a developer account, &gt;$5000 for a
              mac (which is the only computer that you can program anything for
              the app sotre on), And 10% - 30% of all money made from their app.
              These fees are absolutely ridiculous and are a huge barrier to
              entry for developers. I will not support a company that does this.
            </li>
            <li className="p-2" ref={setLiRef}>
              <strong ref={setStrongRef}>Being a monopoly</strong>, Apple only
              allows apps to be downloaded from the app store, and they charge a
              fee for that. This is a monopoly, and it is illegal. I will not
              support a company that does this.
            </li>
            <li className="p-2" ref={setLiRef}>
              <strong ref={setStrongRef}>Allowing any ad network</strong>, Apple
              allows any ad network to be used in apps, those ad networks are
              uasually extremely cheap, and allow any advertisers to put their
              content on tehir network. This is a problem because of ads-in-ads,
              ads for pirated content, and hugely racist ads! I am not
              supporting a componay that allows this.
            </li>
            <li className="p-2" ref={setLiRef}>
              <strong ref={setStrongRef}>,Not allowing sideloading</strong>{" "}
              Apple does not allow you to install apps form anywhere except the
              app store. That means that you cannot test your app at all! I HATE
              this, and I am sure many fellow devs will agree with me.
            </li>
            <li className="p-2" ref={setLiRef}>
              <strong ref={setStrongRef}>
                Not doing BASIC APP QUALITY CHECKS
              </strong>
              {", "}
              Apple does not give a care to what&apos;s in any app, as long as
              thety give them a huge chunk of money. It allows for apps that are
              just ads, or pirated content, or just plain bad. And, it blocks
              devs form submitting their apps.
            </li>
          </ul>
          <br />
          <p className="w-1/2" ref={setPRef}>
            If you are an apple user, I am sorry, but I cannot support a company
            that does this. I am leaving this here until apple change these
            things. If you are using an apple device, please do not give them
            your money. Apple being apple, they will probably never change.
          </p>
          <br />
          <br />
          <button
            type="button"
            className="bg-Gween-300 dark:bg-Gween-600 bottom-full w-full p-4"
            onClick={dismiss}
          >
            Dissmiss
          </button>
        </div>
      </>
    );
  }

  return null;
}
