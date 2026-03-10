/** useScrollSection — Tracks currently visible section via IntersectionObserver. */
import { useState, useEffect, useCallback } from "react";

export function useScrollSection(sectionRefs) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers = [];
    sectionRefs.forEach((ref, index) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { threshold: 0.4 }
      );
      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionRefs]);

  const scrollTo = useCallback(
    (index) => {
      sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });
    },
    [sectionRefs]
  );

  return { activeIndex, scrollTo };
}
