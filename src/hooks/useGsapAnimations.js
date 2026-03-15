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

    // Hero Section - Animación ligada al scroll; el desplazamiento se calcula para que la frase se lea completa
    let heroScrollTrigger = null;
    const setupHeroTimeline = () => {
      if (heroScrollTrigger) {
        heroScrollTrigger.kill();
        heroScrollTrigger = null;
      }
      const heroMovingTitle = document.querySelector('.hero-moving-title');
      const heroTitleWrap = document.querySelector('.hero-title-wrap');
      const heroAccent = document.querySelector('.hero-accent');
      const heroAccentRotate = document.querySelector('.hero-accent-rotate');
      const heroAccentWrap = document.querySelector('.hero-accent-wrap');
      const heroAccentShape = document.querySelector('.hero-accent-shape');
      const heroDescWrap = document.querySelector('.hero-desc-wrap');
      if (!heroMovingTitle || !heroAccent || !heroAccentWrap || !heroAccentShape || !heroDescWrap) return;

      gsap.set(heroMovingTitle, { x: 0 });
      const titleWidth = heroTitleWrap ? heroTitleWrap.scrollWidth : heroMovingTitle.scrollWidth;
      const rect = heroMovingTitle.getBoundingClientRect();
      const spaceRight = window.innerWidth - rect.left;
      const maxX = Math.min(0, spaceRight - titleWidth);

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
      heroTl.fromTo(heroMovingTitle, { x: 0 }, { x: maxX, duration: 0.55, ease: 'none' }, 0);
      heroTl.fromTo(heroAccent, { rotateZ: 0 }, { rotateZ: -360, duration: 0.6, ease: 'none' }, 0);
      if (heroAccentRotate) {
        heroTl.fromTo(heroAccentRotate, { rotateZ: 0 }, { rotateZ: -214, duration: 0.6, ease: 'none' }, 0);
      }
      heroTl.fromTo(heroAccentWrap, { width: '28vw', height: '9vw' }, { width: '9vw', height: '9vw', duration: 0.6, ease: 'power2.inOut' }, 0);
      heroTl.fromTo(heroAccentShape, { filter: 'invert(100%)' }, { filter: 'invert(0%)', duration: 0.5, ease: 'power2.out' }, 0);
      heroTl.fromTo(heroDescWrap, { opacity: 0 }, { opacity: 1, duration: 0.59, ease: 'none' }, 0);
      heroScrollTrigger = heroTl.scrollTrigger;
    };

    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        setupHeroTimeline();
      }, 50);
    };
    window.addEventListener('resize', onResize);
    const resizeObserver = new ResizeObserver(() => onResize());
    resizeObserver.observe(document.body);

    queueMicrotask(() => {
      gsap.to("[data-start='hidden']", { autoAlpha: 1, duration: 0.1, delay: 0.2 });
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setupHeroTimeline());
    });

    // About Section - Reveal al entrar en view (project-card-inner, big-desc, small-desc)
    const aboutCardInner = document.querySelector('.project-card-inner');
    const aboutBigDesc = document.querySelectorAll('.big-desc');
    const aboutSmallDesc = document.querySelectorAll('.small-desc');
    const aboutBigText = document.querySelectorAll('.big-text.about');
    let aboutRevealTrigger = null;
    if (document.querySelector('#about') || document.querySelector('.about-scroll-trigger')) {
      const triggerEl = document.querySelector('.about-wrap') || document.querySelector('#about');
      if (triggerEl && (aboutCardInner || aboutBigDesc.length || aboutSmallDesc.length)) {
        aboutRevealTrigger = ScrollTrigger.create({
          trigger: triggerEl,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            if (aboutCardInner) {
              gsap.to(aboutCardInner, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' });
            }
            aboutBigDesc.forEach((el) => gsap.to(el, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.2 }));
            aboutSmallDesc.forEach((el) => gsap.to(el, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.35 }));
            aboutBigText.forEach((el) => gsap.to(el, { y: 0, duration: 0.6, ease: 'power2.out' }));
          },
        });
      }
    }

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

    // Why Us Section - Barra de progreso (progress-bar-dynamic) al entrar en view
    const progressBarTriggers = [];
    document.querySelectorAll('.progress-bar-dynamic').forEach((bar) => {
      const parentCard = bar.closest('.why-us-card');
      if (!parentCard) return;
      const st = ScrollTrigger.create({
        trigger: parentCard,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo(bar, { width: 0 }, { width: 145, duration: 2.6, ease: 'power2.out' });
        },
      });
      progressBarTriggers.push(st);
    });

    // Work Section - Shrink de imágenes ligado al scroll (100vh → 68vh)
    const initialWorkImage = document.querySelector('.initial-work-image');
    let workInitScrollTrigger = null;
    if (initialWorkImage) {
      const tween = gsap.to(initialWorkImage, {
        height: '68vh',
        ease: 'none',
        scrollTrigger: {
          trigger: '#work-init',
          start: 'top bottom',
          end: 'center center',
          scrub: 1.5,
        },
      });
      workInitScrollTrigger = tween.scrollTrigger;
    }
    const projectWorkImages = document.querySelectorAll('.project-work-image, .project-work-image-2');
    const workSectionTriggers = [];
    projectWorkImages.forEach((img) => {
      const wrap = img.closest('.project-sticky');
      const tween = gsap.to(img, {
        height: '68vh',
        ease: 'none',
        scrollTrigger: {
          trigger: wrap || img,
          start: 'top bottom',
          end: 'center center',
          scrub: 1.5,
        },
      });
      if (tween.scrollTrigger) workSectionTriggers.push(tween.scrollTrigger);
    });

    // Testimonial Section - Giro 3D horizontal (rotateY 0° → 180°) ligado al scroll (derecha a izquierda)
    const testimonialRotateEl = document.querySelector('.testimonial-rotate');
    let testimonialScrollTrigger;
    if (testimonialRotateEl) {
      const testimonialTl = gsap.to(testimonialRotateEl, {
        rotateY: 180,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: '#testimonial',
          start: 'top 65%',
          end: 'bottom 35%',
          scrub: 1.2,
        },
      });
      testimonialScrollTrigger = testimonialTl.scrollTrigger;
    }

    return () => {
      window.removeEventListener('resize', onResize);
      resizeObserver.disconnect();
      if (intervalId) clearInterval(intervalId);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      if (testimonialScrollTrigger) testimonialScrollTrigger.kill();
      if (heroScrollTrigger) heroScrollTrigger.kill();
      if (aboutRevealTrigger) aboutRevealTrigger.kill();
      if (workInitScrollTrigger) workInitScrollTrigger.kill();
      workSectionTriggers.forEach((t) => t.kill());
      progressBarTriggers.forEach((t) => t.kill());
    };
  }, []);
}
