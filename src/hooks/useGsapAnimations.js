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
    const aboutTriggerEl = document.querySelector('.about-text-layer') || document.querySelector('.about-phases-wrapper') || document.querySelector('#about');
    if (aboutTriggerEl) {
      aboutRevealTrigger = ScrollTrigger.create({
        trigger: aboutTriggerEl,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (aboutCardInner) {
            gsap.to(aboutCardInner, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' });
          }
          aboutBigDesc.forEach((el) => gsap.to(el, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.2 }));
          aboutSmallDesc.forEach((el) => gsap.to(el, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.35 }));
          aboutBigText.forEach((el) => gsap.to(el, { y: 0, duration: 0.6, ease: 'power2.out' }));

          const aboutImageResize = document.querySelector('.about-image-resize');
          if (aboutImageResize) {
            gsap.fromTo(aboutImageResize, { width: '0vw' }, { width: '16vw', duration: 1, ease: 'power2.out', delay: 0.3 });
            const aboutImageWrap = aboutImageResize.querySelector('.about-image-wrap');
            if (aboutImageWrap) gsap.fromTo(aboutImageWrap, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.5 });
          }
          const lottieWrap = document.querySelector('#about .lottie-wrap');
          if (lottieWrap) {
            gsap.fromTo(lottieWrap, { width: '0vw' }, { width: '10vw', duration: 1, ease: 'power2.out', delay: 0.4 });
            const arrowEl = lottieWrap.querySelector('.lottie-arrow');
            if (arrowEl) {
              gsap.to(arrowEl, {
                x: 15,
                duration: 0.6,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
                delay: 1,
              });
            }
          }
        },
      });
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
    const workSectionTriggers = [];
    const initialWorkImage = document.querySelector('.initial-work-image');
    let workInitScrollTrigger = null;
    if (initialWorkImage) {
      const workInitTrigger = '#work-init';
      const tween = gsap.to(initialWorkImage, {
        height: '68vh',
        ease: 'none',
        scrollTrigger: {
          trigger: workInitTrigger,
          start: 'top bottom',
          end: 'center center',
          scrub: 1.5,
        },
      });
      workInitScrollTrigger = tween.scrollTrigger;
      const initialImageWrap = initialWorkImage.closest('.initial-work-image-wrap');
      if (initialImageWrap) {
        const varsTween = gsap.to(initialImageWrap, {
          '--work-padding': '3vw',
          '--block-image-radius': '1vw',
          ease: 'none',
          scrollTrigger: {
            trigger: workInitTrigger,
            start: 'top bottom',
            end: 'center center',
            scrub: 1.5,
          },
        });
        if (varsTween.scrollTrigger) workSectionTriggers.push(varsTween.scrollTrigger);
      }
    }
    const projectWorkImages = document.querySelectorAll('.project-work-image, .project-work-image-2');
    projectWorkImages.forEach((img) => {
      const stickyWrap = img.closest('.project-sticky');
      const imageWrap = img.closest('.project-work-image-wrap-2, .project-work-image-wrap');
      const trigger = stickyWrap || img;
      const tween = gsap.to(img, {
        height: '68vh',
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'center center',
          scrub: 1.5,
        },
      });
      if (tween.scrollTrigger) workSectionTriggers.push(tween.scrollTrigger);
      // Efecto de la plantilla: padding y border-radius al hacer scroll (como Webflow a-105)
      if (imageWrap) {
        const varsTween = gsap.to(imageWrap, {
          '--work-padding-3': '3vw',
          '--work-image-radius-3': '1vw',
          '--work-padding-2': '3vw',
          '--work-image-radius-2': '1vw',
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top bottom',
            end: 'center center',
            scrub: 1.5,
          },
        });
        if (varsTween.scrollTrigger) workSectionTriggers.push(varsTween.scrollTrigger);
      }
    });

    // Testimonial Section: t1 visible para leer → giro → t2 (Alexander) visible mucho rato para leerlo entero antes de salir
    const testimonialRotateEl = document.querySelector('.testimonial-rotate');
    let testimonialScrollTrigger;
    if (testimonialRotateEl) {
      const t1Front = document.querySelectorAll('#testimonial .single-big-testimonial.t-1 .review-emphasis.front, #testimonial .single-big-testimonial.t-1 .name-designation.front, #testimonial .single-big-testimonial.t-1 .testiminoal-content.front, #testimonial .single-big-testimonial.t-1 .testimonial-photo.var-big-1');
      const t2Back = document.querySelectorAll('#testimonial .single-big-testimonial.t-2 .review-emphasis.back-2, #testimonial .single-big-testimonial.t-2 .name-designation.back-2, #testimonial .single-big-testimonial.t-2 .testiminoal-content.back-2, #testimonial .single-big-testimonial.t-2 .testimonial-photo.var-big-2');
      gsap.set(t2Back, { opacity: 0 });
      const holdStart = 0.8;
      const rotationDuration = 0.2;
      const holdEnd = 0.8;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#testimonial',
          start: 'top 75%',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
      tl.to(testimonialRotateEl, { rotateY: 180, ease: 'none', force3D: true, duration: rotationDuration }, holdStart);
      tl.to(t1Front, { opacity: 0, ease: 'none', duration: rotationDuration }, holdStart);
      tl.fromTo(t2Back, { opacity: 0 }, { opacity: 1, ease: 'none', duration: rotationDuration }, holdStart);
      tl.set({}, {}, holdStart + rotationDuration + holdEnd);
      testimonialScrollTrigger = tl.scrollTrigger;
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
