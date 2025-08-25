import View from './View.js';

export default class extends View {
  constructor(el) {
    super(el);
    this.headerEl;
    this.mainEl;
    this.footerEl;
  }

  bind(bindCmd) {
    const bindCommands = {
      load: () => {
        this.setContentHeight();
        this.setVhForMobile();
      },
    };

    bindCommands[bindCmd]();
    return this;
  }

  setContentHeight() {
    this.headerEl = this.qs('.layout-header');
    this.footerEl = this.qs('.layout-footer');
    this.mainEl = this.qs('.layout-main');

    let height = this.getBodyHeight();
    
    // if (this.headerEl != null) {
    //   height = height - this.headerEl.offsetHeight;
    // }
    if (this.footerEl != null) {
      height = height - this.footerEl.offsetHeight;
    }
    if(this.mainEl != null) {
      this.mainEl.style.minHeight = height + 'px';
    }
  }

  getBodyHeight() {
    if (window.innerHeight > 0) {
      return window.innerHeight;
    } else {
      return document.documentElement.clientHeight;
    }
  }

  /**
   * CSS vh variable error fix for mobile
   * Use CSS
   * height: 100vh;
   * height: calc(var(--vh, 1vh) * 100);
   */
  setVhForMobile() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');

    window.addEventListener('resize', function () {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', vh + 'px');
    });
  }
}
