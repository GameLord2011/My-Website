import { gsap } from "gsap";

// Utility: DRY ref setter
export function createRefSetter<ElementType extends HTMLElement>(
    refArr: React.RefObject<ElementType[]>,
) {
    return (el: ElementType | null) => {
        if (el && !refArr.current.includes(el)) {
            refArr.current.push(el);
        }
    };
}

// Utility: DRY GSAP scrambleText animation
export function animateScrambleText(
    elements: HTMLElement[],
    scrambleOptions: Partial<Record<string, unknown>> = {},
) {
    elements.forEach((el) => {
        gsap.to(el, {
            duration: gsap.utils.random(1.5, 4, 0.1),
            scrambleText: {
                text: el?.innerText as string,
                chars: 'ʎﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・."=*+-</>¦|⁝⁞₩₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾⍉⍊⍋',
                revealDelay: gsap.utils.random(0.1, 1),
                tweenLength: true,
                speed: gsap.utils.random(0.5, 1),
                ...scrambleOptions,
            },
        });
    });
}
