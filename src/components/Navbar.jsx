import React from 'react';

const ASSETS = '/assets';

export default function Navbar() {
  return (
    <section className="header-section var-1">
      <div
        data-animation="over-right"
        data-collapse="all"
        data-duration="500"
        data-easing="ease-out-quad"
        data-easing2="ease-in-quad"
        role="banner"
        className="navbar-content w-nav"
      >
        <div className="navbar-wrapper">
          <a
            href="#"
            id="w-node-_46886c73-715f-60b5-8817-d67c53d4e84f-53d4e84c"
            aria-current="page"
            className="navbar-logo-dark w-nav-brand w--current"
            aria-label="home"
          >
            <img
              width="105"
              aria-label="Header Logo"
              alt="Site logo."
              src={`${ASSETS}/images/69a71518e8601b2fa94fb516_logo.webp`}
              loading="lazy"
              className="logo-normal"
            />
          </a>
          <div id="w-node-_46886c73-715f-60b5-8817-d67c53d4e851-53d4e84c" className="navbar-link-wrap">
            <a href="#about" className="nav-link w-inline-block"><div className="small-text">About</div></a>
          </div>
          <div className="navbar-link-wrap">
            <a href="#Service" className="nav-link w-inline-block"><div className="small-text">Services</div></a>
          </div>
          <div className="navbar-link-wrap">
            <a href="#work-window" className="nav-link w-inline-block"><div className="small-text">Work</div></a>
          </div>
          <div className="navbar-link-wrap">
            <a href="#cta" className="nav-link w-inline-block"><div className="small-text">Contact</div></a>
          </div>
          <div id="w-node-_46886c73-715f-60b5-8817-d67c53d4e861-53d4e84c" className="navbar-button-wrap visible">
            <div
              data-w-id="46886c73-715f-60b5-8817-d67c53d4e862"
              className="navbar-menu-button-wrap-dark w-nav-button"
              style={{ WebkitUserSelect: 'text' }}
              aria-label="menu"
              role="button"
              tabIndex="0"
              aria-controls="w-nav-overlay-0"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              <img width="23" loading="lazy" alt="" src={`${ASSETS}/images/69a71518e8601b2fa94fb4d0_three-horizontal-lines-icon.svg`} className="navbar-icon" />
              <div className="menu-text"></div>
            </div>
          </div>
        </div>
        <nav role="navigation" className="navbar-menu w-nav-menu">
          <div className="menu-wrap">
            <div className="menu-flex">
              <div className="navbar-wrapper close">
                <div className="navbar-button-wrap">
                  <div
                    data-w-id="46886c73-715f-60b5-8817-d67c53d4e86c"
                    className="navbar-menu-button-wrap-dark w-nav-button"
                    style={{ WebkitUserSelect: 'text' }}
                    aria-label="menu"
                    role="button"
                    tabIndex="0"
                    aria-controls="w-nav-overlay-0"
                    aria-haspopup="menu"
                    aria-expanded="false"
                  >
                    <img width="23" loading="lazy" alt="" src={`${ASSETS}/images/69a71518e8601b2fa94fb4d1_close-line-icon.svg`} className="navbar-icon white" />
                  </div>
                </div>
              </div>
              <div className="navbar-menu-wrapper">
                <a href="#about" data-w-id="46886c73-715f-60b5-8817-d67c53d4e871" className="header-link-wrap navbar w-inline-block">
                  <div className="link-text"><div className="navbar-link">About<br /></div></div>
                </a>
                <a href="#Service" data-w-id="46886c73-715f-60b5-8817-d67c53d4e876" className="header-link-wrap navbar w-inline-block">
                  <div className="link-text"><div className="navbar-link">SERVICE</div></div>
                </a>
                <a href="#work-window" data-w-id="46886c73-715f-60b5-8817-d67c53d4e87a" className="header-link-wrap navbar w-inline-block">
                  <div className="link-text"><div className="navbar-link">WORK</div></div>
                </a>
                <a href="#cta" data-w-id="46886c73-715f-60b5-8817-d67c53d4e87e" className="header-link-wrap navbar w-inline-block">
                  <div className="link-text"><div className="navbar-link">Contact</div></div>
                </a>
              </div>
            </div>
            <img
              sizes="100vw"
              srcSet="https://cdn.prod.website-files.com/69a71516e8601b2fa94fb3a0/69a71518e8601b2fa94fb4d2_img8-p-500.webp 500w, https://cdn.prod.website-files.com/69a71516e8601b2fa94fb3a0/69a71518e8601b2fa94fb4d2_img8-p-800.webp 800w, https://cdn.prod.website-files.com/69a71516e8601b2fa94fb3a0/69a71518e8601b2fa94fb4d2_img8-p-1080.webp 1080w, https://cdn.prod.website-files.com/69a71516e8601b2fa94fb3a0/69a71518e8601b2fa94fb4d2_img8.webp 1200w"
              alt="A window on white wall."
              src={`${ASSETS}/images/69a71518e8601b2fa94fb4d2_img8.webp`}
              loading="lazy"
              className="menu-image"
            />
          </div>
        </nav>
        <div className="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0"></div>
      </div>
    </section>
  );
}
