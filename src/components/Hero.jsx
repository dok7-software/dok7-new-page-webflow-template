import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="main-section hero">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="hero-wrap">
          <div
            className="hero-moving-title"
            style={{
              willChange: 'transform',
              transform: 'translate3d(-32.4883%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="hero-title-wrap">
              <h1 className="default-title">SOLUCIONES</h1>
              <div className="hero-accent-wrap" style={{ willChange: 'width, height', width: '9vw', height: '9vw' }}>
                <div className="hero-accent-shape" style={{ willChange: 'filter', filter: 'invert(100%)' }}>
                  <div
                    data-w-id="9b0fee6e-8518-43be-d6f1-eea36f39b1af"
                    className="hero-accent-rotate"
                    style={{
                      transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-214.283deg) skew(0deg, 0deg)',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
                    }}
                  >
                    <div
                      className="hero-accent"
                      style={{
                        willChange: 'transform',
                        transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-360deg) skew(0deg, 0deg)',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div className="accent-part var-1"></div>
                      <div className="accent-part var-2"></div>
                      <div className="accent-part var-3"></div>
                      <div className="accent-part var-4"></div>
                    </div>
                  </div>
                </div>
                <div className="line-bottom"></div>
              </div>
              <h1>SOFTWARE</h1>
              <h1>matter</h1>
            </div>
          </div>
          <div className="hero-desc-wrap" style={{ willChange: 'opacity', opacity: 0 }}>
            <div className="small-text">
              Studio specialized in crafting identities and design strategy.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
