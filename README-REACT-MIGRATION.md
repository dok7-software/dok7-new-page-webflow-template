# Migración a React - DOK7

Este proyecto es la versión React del sitio HTML estático original, manteniendo el mismo aspecto y comportamiento.

## Estructura

```
/src
  /components     → Navbar, Hero, AboutSection, WorkInitSection, WorkSection, WhyUsSection, TestimonialSection, CTASection, FooterSection, WebflowBadge
  /sections       → Fragmentos HTML originales (about, workinit, work, whyus, testimonial, cta, footer) para renderizado idéntico
  /hooks          → useGsapAnimations (Lenis, GSAP ScrollTrigger, project-card loop, why-us counter)
  /utils          → helpers (assets path)
  App.jsx
  main.jsx
/public
  /assets         → Copia de css, js, images (sin modificar)
index.html        → Entrada Vite con head original (estilos inline, fuentes, scripts de librerías)
index.original.html → Respaldo del HTML estático original
```

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:5173/

## Build

```bash
npm run build
npm run preview
```

## Notas

- Los CSS y assets se mantienen igual; las rutas se resuelven a `/assets/` desde `public/assets`.
- Las animaciones (GSAP, Lenis, Webflow) se inicializan en `useGsapAnimations` tras el mount.
- El HTML de secciones grandes se carga con `?raw` y se renderiza con `dangerouslySetInnerHTML` para no alterar markup ni estilos.
- Navbar y Hero están implementados como JSX; el resto de secciones usan el HTML original con reemplazo de rutas `./assets/` → `/assets/`.
