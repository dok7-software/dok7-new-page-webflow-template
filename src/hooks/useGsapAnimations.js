import { useEffect } from 'react';

/**
 * Inicializa Lenis, GSAP Ready y las animaciones que dependen del DOM
 * (project-card loop, why-us counter). Debe ejecutarse después del mount
 * y después de que las librerías (gsap, ScrollTrigger, Lenis) estén cargadas.
 */
export function useGsapAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    let lenis;
    const initScroll = () => {
      if (typeof Lenis === 'undefined') return;
      lenis = new Lenis({});
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    };

    const sendGsapEvent = () => {
      window.dispatchEvent(
        new CustomEvent('GSAPReady', {
          detail: { lenis },
        })
      );
    };

    if (document.fonts.status === 'loaded') {
      sendGsapEvent();
    } else {
      document.fonts.ready.then(() => sendGsapEvent());
    }

    initScroll();

    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 50);
    };
    window.addEventListener('resize', onResize);
    const resizeObserver = new ResizeObserver(() => onResize());
    resizeObserver.observe(document.body);

    queueMicrotask(() => {
      gsap.to("[data-start='hidden']", { autoAlpha: 1, duration: 0.1, delay: 0.2 });
    });

    // About Section - Image Card Loop
    const items = document.querySelectorAll('.project-card');
    const offset = 30;
    let intervalId;
    let scrollTriggerInstance;
    if (items.length) {
      gsap.set(items, {
        zIndex: (i) => items.length - i,
        opacity: 0,
        scale: 0.8,
      });

      function diagonalLoop(items) {
        let totalItems = items.length;
        let currentItem = 0;
        function updatePositions() {
          for (let i = 0; i < totalItems; i++) {
            let itemIndex = (currentItem + i) % totalItems;
            let item = items[itemIndex];
            gsap.to(item, {
              x: offset * i,
              y: -offset * i * 1.5,
              zIndex: totalItems - i,
              scale: 1,
              opacity: 1,
              duration: 0.6,
            });
          }
        }
        function moveToNext() {
          currentItem = (currentItem + 1) % totalItems;
          updatePositions();
        }
        updatePositions();
        return setInterval(moveToNext, 2000);
      }

      function straightLoop(items) {
        let totalItems = items.length;
        let currentItem = 0;
        function updatePositions() {
          for (let i = 0; i < totalItems; i++) {
            let itemIndex = (currentItem + i) % totalItems;
            let item = items[itemIndex];
            gsap.to(item, {
              x: 0,
              y: -offset * i * 1.5,
              zIndex: totalItems - i,
              scale: 1,
              opacity: 1,
              duration: 0.6,
            });
          }
        }
        function moveToNext() {
          currentItem = (currentItem + 1) % totalItems;
          updatePositions();
        }
        updatePositions();
        return setInterval(moveToNext, 2000);
      }

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: '.about-scroll-trigger',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (window.innerWidth <= 428) {
            intervalId = straightLoop(items);
          } else {
            intervalId = diagonalLoop(items);
          }
        },
      });
    }

    // Why Us Section - Counter
    document.querySelectorAll('.why-us-card').forEach((card) => {
      const counter = card.querySelector('.number');
      if (counter) {
        const finalValue = parseInt(counter.textContent, 10);
        counter.textContent = '0';
        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              counter,
              { innerText: 0 },
              { innerText: finalValue, duration: 2, ease: 'power1.out', snap: { innerText: 1 } }
            );
          },
        });
      }
    });

    return () => {
      window.removeEventListener('resize', onResize);
      resizeObserver.disconnect();
      if (intervalId) clearInterval(intervalId);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, []);
}
