/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
  var listenerFn = listener.apply(this, arguments);

  element.addEventListener(type, listenerFn, useCapture);

  return {
    destroy: function () {
      element.removeEventListener(type, listenerFn, useCapture);
    },
  };
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
export function delegate(elements, selector, type, callback, useCapture) {
  // Handle the regular Element usage
  if (typeof elements.addEventListener === 'function') {
    return _delegate.apply(null, arguments);
  }

  // Handle Element-less usage, it defaults to global delegation
  if (typeof type === 'function') {
    // Use `document` as the first parameter, then apply arguments
    // This is a short way to .unshift `arguments` without running into deoptimizations
    return _delegate.bind(null, document).apply(null, arguments);
  }

  // Handle Selector-based usage
  if (typeof elements === 'string') {
    elements = document.querySelectorAll(elements);
  }

  // Handle Array-like based usage
  return Array.prototype.map.call(elements, function (element) {
    return _delegate(element, selector, type, callback, useCapture);
  });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
  return function (e) {
    e.delegateTarget = e.target.closest(selector);

    if (e.delegateTarget) {
      callback.call(element, e);
    }
  };
}

/**
 * AJAX request.
 *
 * @param {String} url
 * @return {Object}
 */
function request(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 400 ? resolve(JSON.parse(xhr.response)) : reject(xhr.status));
    xhr.ontimeout = () => reject('timeout');
    xhr.send();
  });
}
/**
 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 *
 * @param {Function} func Function to wrap.
 * @param {Number} limit Number of milliseconds that must elapse between `func` invocations.
 * @return {Function} A new function that wraps the `func` function passed in.
 */

export function throttle(func, limit) {
  let wait = false;
  return function () {
    if (!wait) {
      func.apply(null, arguments);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

/**
 * acceleration until halfway, then deceleration
 *
 * @param {Number} t current time
 * @param {Number} b start value
 * @param {Number} c change in value
 * @param {Number} d duration
 * @return {Number} new scrollY
 */

// function easeInOutQuad(t, b, c, d) {
//   t /= d / 2;
//   if (t < 1) return (c / 2) * t * t + b;
//   t--;
//   return (-c / 2) * (t * (t - 2) - 1) + b;
// }

/**
 * accelerating from zero velocity
 *
 * @param {Number} t current time
 * @param {Number} b start value
 * @param {Number} c change in value
 * @param {Number} d duration
 * @return {Number} new scrollY
 */

function easeInQuad(t, b, c, d) {
  t /= d / 2;
  return (c / 2) * t * t + b;
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value.data;
}

function isValid(receivedTime, thresholdHour) {
  const currentTime = Date.now();
  const elapsedTime = (currentTime - receivedTime) / 1000 / 60 / 60;
  return elapsedTime < thresholdHour;
}

export function moveScroll(to) {
  const start = scrollY;
  const change = to - start;
  const duration = Math.abs(change / 4);
  const increment = 20;
  let currentTime = 0;

  const animateScroll = () => {
    currentTime += increment;
    let newY = easeInQuad(currentTime, start, change, duration);
    scrollTo(0, newY);
    if (currentTime < duration) requestAnimationFrame(animateScroll);
  };

  requestAnimationFrame(animateScroll);
}

const fetchJSONP = (
  (unique) => (url) =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      const name = `_jsonp_${unique++}`;
      url += url.match(/\?/) ? `&callback=${name}` : `?callback=${name}`;
      script.src = url;
      window[name] = (json) => {
        resolve(json);
        script.remove();
        delete window[name];
      };
      document.body.appendChild(script);
    })
)(0);

export async function checkLocalStorage(key, isJSONP) {
  const cache = getLocalStorage(key);
  if (cache && isValid(cache.time, 6)) return cache.data;
  const value = {
    data: isJSONP ? (await fetchJSONP(key))[1] : await request(key),
    time: Date.now(),
  };
  // eslint-disable-next-line no-prototype-builtins
  return value.data.hasOwnProperty('error') ? false : setLocalStorage(key, value);
}
