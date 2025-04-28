"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./EmblaCarousel.module.css";
import Image from "next/image"; 

interface PropType {
  slides: string[];
  options?: EmblaOptionsType;
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const autoplayRef = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  // Initialize Autoplay plugin with a delay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { ...options, watchDrag: false, loop: true },
    [autoplayRef.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      autoplayRef.current.reset(); // Reset the autoplay timer
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Attach event listeners
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div className={styles.embla__slide} key={index}>
              <Image
                src={slide}
                alt={`Slide ${String(index + 1)}`}
                className={styles.embla__slideImg}
                width={500} 
                height={300} 
              />
              <div className={styles.embla__overlay}></div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.embla__controls}>
        <div className={styles.embla__dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => { onDotButtonClick(index); }} 
              className={`${styles.embla__dot} ${
                index === selectedIndex ? styles["embla__dot--selected"] : ""
              }`}
              aria-label={`Go to slide ${String(index + 1)}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
