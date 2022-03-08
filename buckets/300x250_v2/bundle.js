(function () {
  'use strict';

  // BannerUtils version 3.2.0
  function getBrowser() {
    // desktop browsers as of 2019-10-04
    var browserslist = ['other', 'blink', 'chrome', 'safari', 'opera', 'ie', 'edge', 'firefox'];
    var browser = 0;

    if ('WebkitAppearance' in document.documentElement.style) {
      browser = 1; // chrome/safari/opera/edge/firefox

      if (/google/i.test(window.navigator.vendor)) browser = 2;
      if (/apple/i.test(window.navigator.vendor)) browser = 3;
      if (!!window.opr && !!window.opr.addons || !!window.opera || / OPR\//.test(window.navigator.userAgent)) browser = 4;
    }

    if (
    /*@cc_on!@*/
    !!document.documentMode) browser = 5; // ie 6-11

    if (browser !== 5 && !!window.StyleMedia) browser = 6;
    if (typeof InstallTrigger !== 'undefined' || 'MozAppearance' in document.documentElement.style) browser = 7;
    return browserslist[browser];
  }
  getBrowser();
  function es5() {
    return parseInt('010', 10) === 10 && function () {
      return !this;
    }() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
  }
  var log = {
    // https://bit.ly/32ZIpgo
    traceOn: window.console.log.bind(window.console, '%s'),
    traceOff: function traceOff() {},
    trace: window.console.log.bind(window.console, '%s'),

    set debug(bool) {
      this._debug = bool;
      bool ? this.trace = this.traceOn : this.trace = this.traceOff;
    },

    get debug() {
      return this._debug;
    }

  };
  var domUtils = {
    // DOM UTILS
    getAllIdElements: function getAllIdElements(scope) {
      if (scope === void 0) {
        scope = document;
      }

      // returns an array of all elements in scope that have an ID
      var items = scope.getElementsByTagName('*');
      var elements = [];

      for (var i = items.length; i--;) {
        if (items[i].hasAttribute('id')) {
          elements.push(items[i]);
        }
      }

      return elements;
    },
    varName: function varName(id, camel) {
      var newname;
      camel ? newname = id.replace(/[-_]([a-z])/g, function (g) {
        return g[1].toUpperCase();
      }).replace(/[-_]/g, '') : newname = id.replace(/-/g, '_');
      return newname;
    },
    getAllIds: function getAllIds(scope, trace, camel) {
      if (scope === void 0) {
        scope = document;
      }

      // returns an array of strings of all the id names in scope
      var items = scope.getElementsByTagName('*');
      var ids = [];
      var varlist = "\nfunction getEl(id){\n    return document.getElementById(id);\n}\nvar ";
      var len = items.length;

      for (var i = 0; i < len; i++) {
        if (items[i].hasAttribute('id')) {
          ids.push(items[i].id);

          if (trace) {
            varlist += this.varName(items[i].id, camel) + " = getEl('" + items[i].id + "')";

            if (i > -1) {
              varlist += ',\n    ';
            }
          }
        }
      }

      if (trace) {
        varlist = varlist.replace(/,\s([^,]+)$/, '; $1\n\n');
        log.trace(varlist);
      }

      return ids;
    },
    makeVarsFromIds: function makeVarsFromIds(scope, camel) {
      if (scope === void 0) {
        scope = document;
      }

      var ids = this.getAllIds(scope);
      var i = ids.length;
      var elements = {};

      while (i--) {
        elements[this.varName(ids[i], camel)] = document.getElementById(ids[i]);
      }

      return elements;
    },
    recordClasses: function recordClasses(elements) {
      if (elements === void 0) {
        elements = this.getAllIdElements(document);
      }

      // record each element's current classList
      var i = elements.length;

      while (i--) {
        elements[i].cl = '';
        elements[i].cl += elements[i].className;
      }
    },
    resetClasses: function resetClasses(elements, callback) {
      if (elements === void 0) {
        elements = this.getAllIdElements(document);
      }

      // resets the classes to their recorded state (you must call recordStates() before using this method)
      var i = elements.length;

      while (i--) {
        if (typeof elements[i].cl !== 'undefined') {
          elements[i].className = elements[i].cl;
        } else {
          this.trace("initial state not recorded for: " + elements[i].id);
        }
      }

      if (callback) {
        var dly = elements.length * 10; // KLUDGE adds .01 seconds delay for each element

        setTimeout(function () {
          callback.apply();
        }, dly);
      }
    }
  };

  var Banner = {
    init: function init() {
      var dom = domUtils.makeVarsFromIds(),
          text_1_split = new SplitText('#text-01', {
        type: 'words'
      }),
          // text_2_split = new SplitText('#text-02', { type: 'words' }),
      text_ef_split = new SplitText('#text-ef', {
        type: 'words'
      });
      var progress;
      var rate_value = '20.552'; ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function frame0() {
        var mainTl = gsap.timeline({
          onComplete: addRollover
        });
        dom.ad_content.classList.remove('invisible');
        progress = {
          value: '00.000'
        };
        mainTl.add('start').set("#screenFinal", {
          transformOrigin: '96% 59%'
        }).staggerFrom(text_1_split.words, 0.15, {
          autoAlpha: 0,
          rotationX: 90,
          transformOrigin: 'bottom'
        }, 0.05, '+=0.2').to("#slider", 2.5, {
          y: -397,
          ease: 'sine.out'
        }, 'start') // .addPause()
        // .to('#slider', 1, { y: -397 }, '+=0.3' )
        .from('.bar', 1, {
          autoAlpha: 0
        }).from('.bar-fill', 1, {
          width: 0,
          ease: 'cubic.inOut'
        }, '-=0.5').to('.bar-fill', 1, {
          background: '#0B8100'
        }).to('.bar', 1, {
          autoAlpha: 0
        }, '+=0.5') // .to('#slider', 1, { y: 0}, '-=0.5' )
        .from("#screenFinal", 0.25, {
          autoAlpha: 0
        }, '-=0.5').add('scaleScreen', '-=0.5') // .staggerTo("#text-01", 0.25, {autoAlpha: 0}, 0.025, '-=0.25')
        .to("#lastIcon", 1.5, {
          scale: 0.6,
          y: 60,
          x: 112,
          ease: 'sine.inOut'
        }, 'scaleScreen').from("#screenFinal", 1.5, {
          scale: 3,
          ease: 'sine.inOut'
        }, 'scaleScreen').from(["#analyze", "#optimize", "#organize", "#divider01", "#divider02"], 1.5, {
          autoAlpha: 0,
          ease: 'sine.out'
        }, '-=1') // .staggerFrom(text_2_split.words, 0.15, {autoAlpha: 0, rotationX: 90, transformOrigin: 'bottom'}, 0.05, '-=1.5')
        .add('animElements', '-=0.5').to(progress, 1.5, {
          value: rate_value,
          onUpdate: addValues,
          ease: 'sine.out'
        }, 'scaleScreen').from("#col1", 0.5, {
          height: 0,
          ease: 'sine.out'
        }, 'animElements').from("#col2", 0.5, {
          height: 0,
          ease: 'sine.out'
        }, 'animElements').from("#col3", 0.5, {
          height: 0,
          ease: 'sine.out'
        }, 'animElements').from("#value1", 0.5, {
          css: {
            bottom: 0
          },
          ease: 'sine.out'
        }, 'animElements').from("#value2", 0.5, {
          css: {
            bottom: 0
          },
          ease: 'sine.out'
        }, 'animElements').from("#value3", 0.5, {
          css: {
            bottom: 0
          },
          ease: 'sine.out'
        }, 'animElements').to("#text-01", 0.25, {
          autoAlpha: 0
        }).staggerFrom(text_ef_split.words, 0.15, {
          autoAlpha: 0,
          rotationX: 90,
          transformOrigin: 'bottom'
        }, 0.05, 'showPhone2').from(['#cta', '#legal'], 0.5, {
          autoAlpha: 0,
          delay: 0.75
        }, '-=0.25');
      }

      function addValues() {
        if (progress.value <= rate_value) {
          dom.header_value.innerHTML = '$' + progress.value.toFixed(3).toString().replace(/[.]/, ','); // HACK: not sure how this is working because progress.value is a string. UPDATE: Added toFixed() to avoid white space between round number and percentage character.
          // if(Math.round(progress.value * 100) / 100 == rate_value) {
          //   dom.rate.innerHTML = rate_value.toFixed(1);
          // }
        }
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          gsap.to('#cta', 0.5, {
            backgroundColor: '#5f285e'
          });
          gsap.to('#cta-text', 0.5, {
            autoAlpha: 0
          });
          gsap.to('#cta-text-hover', 0.5, {
            autoAlpha: 1
          });
        });
        dom.ad_content.addEventListener('mouseleave', function () {
          gsap.to('#cta', 0.5, {
            backgroundColor: 'transparent'
          });
          gsap.to('#cta-text', 0.5, {
            autoAlpha: 1
          });
          gsap.to('#cta-text-hover', 0.5, {
            autoAlpha: 0
          });
        });
      }

      function adClickThru() {
        dom.ad_content.addEventListener('click', function () {
          window.Enabler.exit('main');
        });
      } ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////


      adClickThru();
      frameStart();
    }
  };

  window.onload = function () {
    if (window.Enabler) {
      if (!window.Enabler.isInitialized()) {
        window.Enabler.addEventListener(window.studio.events.StudioEvent.INIT, Banner.init);
      } else {
        window.requestAnimationFrame(Banner.init);
      }
    } else {
      document.getElementById('backup').className = 'backup';
    }
  };

}());
