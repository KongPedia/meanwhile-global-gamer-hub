import { useLayoutEffect, RefObject } from 'react';
import { gsap } from 'gsap';

interface AnimationConfig {
  headerRef: RefObject<HTMLElement>;
  sectionRefs: RefObject<HTMLElement>[];
  itemSelectors?: {
    ref: RefObject<HTMLElement>;
    selector: string;
    animation: {
      from: gsap.TweenVars;
      to: gsap.TweenVars;
    };
  }[];
}

/**
 * Custom hook for report page animations using GSAP
 * Provides consistent animation behavior across different report pages
 */
export function useReportAnimations(
  loading: boolean,
  report: any,
  config: AnimationConfig
) {
  useLayoutEffect(() => {
    if (loading || !report) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Header animation - slide down and fade in
      tl.fromTo(
        config.headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      );

      // Sections stagger animation - slide up and fade in
      const sectionElements = config.sectionRefs
        .map(ref => ref.current)
        .filter(Boolean);
      
      if (sectionElements.length > 0) {
        tl.fromTo(
          sectionElements,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
          '-=0.3'
        );
      }

      // Animate individual items within sections
      if (config.itemSelectors) {
        config.itemSelectors.forEach(({ ref, selector, animation }) => {
          const items = ref.current?.querySelectorAll(selector);
          if (items && items.length > 0) {
            gsap.fromTo(items, animation.from, animation.to);
          }
        });
      }
    });

    return () => ctx.revert();
  }, [loading, report, config]);
}
