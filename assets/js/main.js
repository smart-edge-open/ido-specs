/* SPDX-License-Identifier: Apache-2.0
 * Copyright (c) 2021 Intel Corporation
 */
(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define("uikit", factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, 
    global.UIkit = factory());
})(this, function() {
    "use strict";
    var objPrototype = Object.prototype;
    var hasOwnProperty = objPrototype.hasOwnProperty;
    function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key);
    }
    var hyphenateRe = /\B([A-Z])/g;
    var hyphenate = memoize(function(str) {
        return str.replace(hyphenateRe, "-$1").toLowerCase();
    });
    var camelizeRe = /-(\w)/g;
    var camelize = memoize(function(str) {
        return str.replace(camelizeRe, toUpper);
    });
    var ucfirst = memoize(function(str) {
        return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : "";
    });
    function toUpper(_, c) {
        return c ? c.toUpperCase() : "";
    }
    var strPrototype = String.prototype;
    var startsWithFn = strPrototype.startsWith || function(search) {
        return this.lastIndexOf(search, 0) === 0;
    };
    function startsWith(str, search) {
        return startsWithFn.call(str, search);
    }
    var endsWithFn = strPrototype.endsWith || function(search) {
        return this.substr(-search.length) === search;
    };
    function endsWith(str, search) {
        return endsWithFn.call(str, search);
    }
    var arrPrototype = Array.prototype;
    var includesFn = function(search, i) {
        return !!~this.indexOf(search, i);
    };
    var includesStr = strPrototype.includes || includesFn;
    var includesArray = arrPrototype.includes || includesFn;
    function includes(obj, search) {
        return obj && (isString(obj) ? includesStr : includesArray).call(obj, search);
    }
    var findIndexFn = arrPrototype.findIndex || function(predicate) {
        var arguments$1 = arguments;
        for (var i = 0; i < this.length; i++) {
            if (predicate.call(arguments$1[1], this[i], i, this)) {
                return i;
            }
        }
        return -1;
    };
    function findIndex(array, predicate) {
        return findIndexFn.call(array, predicate);
    }
    var isArray = Array.isArray;
    function isFunction(obj) {
        return typeof obj === "function";
    }
    function isObject(obj) {
        return obj !== null && typeof obj === "object";
    }
    var toString = objPrototype.toString;
    function isPlainObject(obj) {
        return toString.call(obj) === "[object Object]";
    }
    function isWindow(obj) {
        return isObject(obj) && obj === obj.window;
    }
    function isDocument(obj) {
        return nodeType(obj) === 9;
    }
    function isNode(obj) {
        return nodeType(obj) >= 1;
    }
    function isElement(obj) {
        return nodeType(obj) === 1;
    }
    function nodeType(obj) {
        return !isWindow(obj) && isObject(obj) && obj.nodeType;
    }
    function isBoolean(value) {
        return typeof value === "boolean";
    }
    function isString(value) {
        return typeof value === "string";
    }
    function isNumber(value) {
        return typeof value === "number";
    }
    function isNumeric(value) {
        return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
    }
    function isEmpty(obj) {
        return !(isArray(obj) ? obj.length : isObject(obj) ? Object.keys(obj).length : false);
    }
    function isUndefined(value) {
        return value === void 0;
    }
    function toBoolean(value) {
        return isBoolean(value) ? value : value === "true" || value === "1" || value === "" ? true : value === "false" || value === "0" ? false : value;
    }
    function toNumber(value) {
        var number = Number(value);
        return !isNaN(number) ? number : false;
    }
    function toFloat(value) {
        return parseFloat(value) || 0;
    }
    var toArray = Array.from || function(value) {
        return arrPrototype.slice.call(value);
    };
    function toNode(element) {
        return toNodes(element)[0];
    }
    function toNodes(element) {
        return element && (isNode(element) ? [ element ] : toArray(element).filter(isNode)) || [];
    }
    function toWindow(element) {
        if (isWindow(element)) {
            return element;
        }
        element = toNode(element);
        return element ? (isDocument(element) ? element : element.ownerDocument).defaultView : window;
    }
    function toMs(time) {
        return !time ? 0 : endsWith(time, "ms") ? toFloat(time) : toFloat(time) * 1e3;
    }
    function isEqual(value, other) {
        return value === other || isObject(value) && isObject(other) && Object.keys(value).length === Object.keys(other).length && each(value, function(val, key) {
            return val === other[key];
        });
    }
    function swap(value, a, b) {
        return value.replace(new RegExp(a + "|" + b, "g"), function(match) {
            return match === a ? b : a;
        });
    }
    var assign = Object.assign || function(target) {
        var args = [], len = arguments.length - 1;
        while (len-- > 0) args[len] = arguments[len + 1];
        target = Object(target);
        for (var i = 0; i < args.length; i++) {
            var source = args[i];
            if (source !== null) {
                for (var key in source) {
                    if (hasOwn(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
    function last(array) {
        return array[array.length - 1];
    }
    function each(obj, cb) {
        for (var key in obj) {
            if (false === cb(obj[key], key)) {
                return false;
            }
        }
        return true;
    }
    function sortBy$1(array, prop) {
        return array.slice().sort(function(ref, ref$1) {
            var propA = ref[prop];
            if (propA === void 0) propA = 0;
            var propB = ref$1[prop];
            if (propB === void 0) propB = 0;
            return propA > propB ? 1 : propB > propA ? -1 : 0;
        });
    }
    function uniqueBy(array, prop) {
        var seen = new Set();
        return array.filter(function(ref) {
            var check = ref[prop];
            return seen.has(check) ? false : seen.add(check) || true;
        });
    }
    function clamp(number, min, max) {
        if (min === void 0) min = 0;
        if (max === void 0) max = 1;
        return Math.min(Math.max(toNumber(number) || 0, min), max);
    }
    function noop() {}
    function intersectRect() {
        var rects = [], len = arguments.length;
        while (len--) rects[len] = arguments[len];
        return [ [ "bottom", "top" ], [ "right", "left" ] ].every(function(ref) {
            var minProp = ref[0];
            var maxProp = ref[1];
            return Math.min.apply(Math, rects.map(function(ref) {
                var min = ref[minProp];
                return min;
            })) - Math.max.apply(Math, rects.map(function(ref) {
                var max = ref[maxProp];
                return max;
            })) > 0;
        });
    }
    function pointInRect(point, rect) {
        return point.x <= rect.right && point.x >= rect.left && point.y <= rect.bottom && point.y >= rect.top;
    }
    var Dimensions = {
        ratio: function(dimensions, prop, value) {
            var obj;
            var aProp = prop === "width" ? "height" : "width";
            return obj = {}, obj[aProp] = dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp], 
            obj[prop] = value, obj;
        },
        contain: function(dimensions, maxDimensions) {
            var this$1 = this;
            dimensions = assign({}, dimensions);
            each(dimensions, function(_, prop) {
                return dimensions = dimensions[prop] > maxDimensions[prop] ? this$1.ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
            });
            return dimensions;
        },
        cover: function(dimensions, maxDimensions) {
            var this$1 = this;
            dimensions = this.contain(dimensions, maxDimensions);
            each(dimensions, function(_, prop) {
                return dimensions = dimensions[prop] < maxDimensions[prop] ? this$1.ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
            });
            return dimensions;
        }
    };
    function getIndex(i, elements, current, finite) {
        if (current === void 0) current = 0;
        if (finite === void 0) finite = false;
        elements = toNodes(elements);
        var length = elements.length;
        i = isNumeric(i) ? toNumber(i) : i === "next" ? current + 1 : i === "previous" ? current - 1 : elements.indexOf(toNode(i));
        if (finite) {
            return clamp(i, 0, length - 1);
        }
        i %= length;
        return i < 0 ? i + length : i;
    }
    function memoize(fn) {
        var cache = Object.create(null);
        return function(key) {
            return cache[key] || (cache[key] = fn(key));
        };
    }
    function attr(element, name, value) {
        if (isObject(name)) {
            for (var key in name) {
                attr(element, key, name[key]);
            }
            return;
        }
        if (isUndefined(value)) {
            element = toNode(element);
            return element && element.getAttribute(name);
        } else {
            toNodes(element).forEach(function(element) {
                if (isFunction(value)) {
                    value = value.call(element, attr(element, name));
                }
                if (value === null) {
                    removeAttr(element, name);
                } else {
                    element.setAttribute(name, value);
                }
            });
        }
    }
    function hasAttr(element, name) {
        return toNodes(element).some(function(element) {
            return element.hasAttribute(name);
        });
    }
    function removeAttr(element, name) {
        element = toNodes(element);
        name.split(" ").forEach(function(name) {
            return element.forEach(function(element) {
                return element.hasAttribute(name) && element.removeAttribute(name);
            });
        });
    }
    function data(element, attribute) {
        for (var i = 0, attrs = [ attribute, "data-" + attribute ]; i < attrs.length; i++) {
            if (hasAttr(element, attrs[i])) {
                return attr(element, attrs[i]);
            }
        }
    }
    var inBrowser = typeof window !== "undefined";
    var isIE = inBrowser && /msie|trident/i.test(window.navigator.userAgent);
    var isRtl = inBrowser && attr(document.documentElement, "dir") === "rtl";
    var hasTouchEvents = inBrowser && "ontouchstart" in window;
    var hasPointerEvents = inBrowser && window.PointerEvent;
    var hasTouch = inBrowser && (hasTouchEvents || window.DocumentTouch && document instanceof DocumentTouch || navigator.maxTouchPoints);
    var pointerDown = hasPointerEvents ? "pointerdown" : hasTouchEvents ? "touchstart" : "mousedown";
    var pointerMove = hasPointerEvents ? "pointermove" : hasTouchEvents ? "touchmove" : "mousemove";
    var pointerUp = hasPointerEvents ? "pointerup" : hasTouchEvents ? "touchend" : "mouseup";
    var pointerEnter = hasPointerEvents ? "pointerenter" : hasTouchEvents ? "" : "mouseenter";
    var pointerLeave = hasPointerEvents ? "pointerleave" : hasTouchEvents ? "" : "mouseleave";
    var pointerCancel = hasPointerEvents ? "pointercancel" : "touchcancel";
    var voidElements = {
        area: true,
        base: true,
        br: true,
        col: true,
        embed: true,
        hr: true,
        img: true,
        input: true,
        keygen: true,
        link: true,
        menuitem: true,
        meta: true,
        param: true,
        source: true,
        track: true,
        wbr: true
    };
    function isVoidElement(element) {
        return toNodes(element).some(function(element) {
            return voidElements[element.tagName.toLowerCase()];
        });
    }
    function isVisible(element) {
        return toNodes(element).some(function(element) {
            return element.offsetWidth || element.offsetHeight || element.getClientRects().length;
        });
    }
    var selInput = "input,select,textarea,button";
    function isInput(element) {
        return toNodes(element).some(function(element) {
            return matches(element, selInput);
        });
    }
    function isFocusable(element) {
        return isInput(element) || matches(element, "a[href],button") || hasAttr(element, "tabindex");
    }
    function parent(element) {
        element = toNode(element);
        return element && isElement(element.parentNode) && element.parentNode;
    }
    function filter$1(element, selector) {
        return toNodes(element).filter(function(element) {
            return matches(element, selector);
        });
    }
    var elProto = inBrowser ? Element.prototype : {};
    var matchesFn = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector || noop;
    function matches(element, selector) {
        return toNodes(element).some(function(element) {
            return matchesFn.call(element, selector);
        });
    }
    var closestFn = elProto.closest || function(selector) {
        var ancestor = this;
        do {
            if (matches(ancestor, selector)) {
                return ancestor;
            }
        } while (ancestor = parent(ancestor));
    };
    function closest(element, selector) {
        if (startsWith(selector, ">")) {
            selector = selector.slice(1);
        }
        return isElement(element) ? closestFn.call(element, selector) : toNodes(element).map(function(element) {
            return closest(element, selector);
        }).filter(Boolean);
    }
    function within(element, selector) {
        return !isString(selector) ? element === selector || (isDocument(selector) ? selector.documentElement : toNode(selector)).contains(toNode(element)) : matches(element, selector) || !!closest(element, selector);
    }
    function parents(element, selector) {
        var elements = [];
        while (element = parent(element)) {
            if (!selector || matches(element, selector)) {
                elements.push(element);
            }
        }
        return elements;
    }
    function children(element, selector) {
        element = toNode(element);
        var children = element ? toNodes(element.children) : [];
        return selector ? filter$1(children, selector) : children;
    }
    function index(element, ref) {
        return ref ? toNodes(element).indexOf(toNode(ref)) : children(parent(element)).indexOf(element);
    }
    function query(selector, context) {
        return find(selector, getContext(selector, context));
    }
    function queryAll(selector, context) {
        return findAll(selector, getContext(selector, context));
    }
    function getContext(selector, context) {
        if (context === void 0) context = document;
        return isString(selector) && isContextSelector(selector) || isDocument(context) ? context : context.ownerDocument;
    }
    function find(selector, context) {
        return toNode(_query(selector, context, "querySelector"));
    }
    function findAll(selector, context) {
        return toNodes(_query(selector, context, "querySelectorAll"));
    }
    function _query(selector, context, queryFn) {
        if (context === void 0) context = document;
        if (!selector || !isString(selector)) {
            return selector;
        }
        selector = selector.replace(contextSanitizeRe, "$1 *");
        if (isContextSelector(selector)) {
            selector = splitSelector(selector).map(function(selector) {
                var ctx = context;
                if (selector[0] === "!") {
                    var selectors = selector.substr(1).trim().split(" ");
                    ctx = closest(parent(context), selectors[0]);
                    selector = selectors.slice(1).join(" ").trim();
                }
                if (selector[0] === "-") {
                    var selectors$1 = selector.substr(1).trim().split(" ");
                    var prev = (ctx || context).previousElementSibling;
                    ctx = matches(prev, selector.substr(1)) ? prev : null;
                    selector = selectors$1.slice(1).join(" ");
                }
                if (!ctx) {
                    return null;
                }
                return domPath(ctx) + " " + selector;
            }).filter(Boolean).join(",");
            context = document;
        }
        try {
            return context[queryFn](selector);
        } catch (e) {
            return null;
        }
    }
    var contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
    var contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;
    var isContextSelector = memoize(function(selector) {
        return selector.match(contextSelectorRe);
    });
    var selectorRe = /.*?[^\\](?:,|$)/g;
    var splitSelector = memoize(function(selector) {
        return selector.match(selectorRe).map(function(selector) {
            return selector.replace(/,$/, "").trim();
        });
    });
    function domPath(element) {
        var names = [];
        while (element.parentNode) {
            if (element.id) {
                names.unshift("#" + escape(element.id));
                break;
            } else {
                var tagName = element.tagName;
                if (tagName !== "HTML") {
                    tagName += ":nth-child(" + (index(element) + 1) + ")";
                }
                names.unshift(tagName);
                element = element.parentNode;
            }
        }
        return names.join(" > ");
    }
    var escapeFn = inBrowser && window.CSS && CSS.escape || function(css) {
        return css.replace(/([^\x7f-\uFFFF\w-])/g, function(match) {
            return "\\" + match;
        });
    };
    function escape(css) {
        return isString(css) ? escapeFn.call(null, css) : "";
    }
    function on() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var ref = getArgs(args);
        var targets = ref[0];
        var type = ref[1];
        var selector = ref[2];
        var listener = ref[3];
        var useCapture = ref[4];
        targets = toEventTargets(targets);
        if (listener.length > 1) {
            listener = detail(listener);
        }
        if (useCapture && useCapture.self) {
            listener = selfFilter(listener);
        }
        if (selector) {
            listener = delegate(selector, listener);
        }
        useCapture = useCaptureFilter(useCapture);
        type.split(" ").forEach(function(type) {
            return targets.forEach(function(target) {
                return target.addEventListener(type, listener, useCapture);
            });
        });
        return function() {
            return off(targets, type, listener, useCapture);
        };
    }
    function off(targets, type, listener, useCapture) {
        if (useCapture === void 0) useCapture = false;
        useCapture = useCaptureFilter(useCapture);
        targets = toEventTargets(targets);
        type.split(" ").forEach(function(type) {
            return targets.forEach(function(target) {
                return target.removeEventListener(type, listener, useCapture);
            });
        });
    }
    function once() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var ref = getArgs(args);
        var element = ref[0];
        var type = ref[1];
        var selector = ref[2];
        var listener = ref[3];
        var useCapture = ref[4];
        var condition = ref[5];
        var off = on(element, type, selector, function(e) {
            var result = !condition || condition(e);
            if (result) {
                off();
                listener(e, result);
            }
        }, useCapture);
        return off;
    }
    function trigger(targets, event, detail) {
        return toEventTargets(targets).reduce(function(notCanceled, target) {
            return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail));
        }, true);
    }
    function createEvent(e, bubbles, cancelable, detail) {
        if (bubbles === void 0) bubbles = true;
        if (cancelable === void 0) cancelable = false;
        if (isString(e)) {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent(e, bubbles, cancelable, detail);
            e = event;
        }
        return e;
    }
    function getArgs(args) {
        if (isFunction(args[2])) {
            args.splice(2, 0, false);
        }
        return args;
    }
    function delegate(selector, listener) {
        var this$1 = this;
        return function(e) {
            var current = selector[0] === ">" ? findAll(selector, e.currentTarget).reverse().filter(function(element) {
                return within(e.target, element);
            })[0] : closest(e.target, selector);
            if (current) {
                e.current = current;
                listener.call(this$1, e);
            }
        };
    }
    function detail(listener) {
        return function(e) {
            return isArray(e.detail) ? listener.apply(void 0, [ e ].concat(e.detail)) : listener(e);
        };
    }
    function selfFilter(listener) {
        return function(e) {
            if (e.target === e.currentTarget || e.target === e.current) {
                return listener.call(null, e);
            }
        };
    }
    function useCaptureFilter(options) {
        return options && isIE && !isBoolean(options) ? !!options.capture : options;
    }
    function isEventTarget(target) {
        return target && "addEventListener" in target;
    }
    function toEventTarget(target) {
        return isEventTarget(target) ? target : toNode(target);
    }
    function toEventTargets(target) {
        return isArray(target) ? target.map(toEventTarget).filter(Boolean) : isString(target) ? findAll(target) : isEventTarget(target) ? [ target ] : toNodes(target);
    }
    function isTouch(e) {
        return e.pointerType === "touch" || !!e.touches;
    }
    function getEventPos(e) {
        var touches = e.touches;
        var changedTouches = e.changedTouches;
        var ref = touches && touches[0] || changedTouches && changedTouches[0] || e;
        var x = ref.clientX;
        var y = ref.clientY;
        return {
            x: x,
            y: y
        };
    }
    var Promise$1 = inBrowser && window.Promise || PromiseFn;
    var Deferred = function() {
        var this$1 = this;
        this.promise = new Promise$1(function(resolve, reject) {
            this$1.reject = reject;
            this$1.resolve = resolve;
        });
    };
    var RESOLVED = 0;
    var REJECTED = 1;
    var PENDING = 2;
    var async = inBrowser && window.setImmediate || setTimeout;
    function PromiseFn(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.deferred = [];
        var promise = this;
        try {
            executor(function(x) {
                promise.resolve(x);
            }, function(r) {
                promise.reject(r);
            });
        } catch (e) {
            promise.reject(e);
        }
    }
    PromiseFn.reject = function(r) {
        return new PromiseFn(function(resolve, reject) {
            reject(r);
        });
    };
    PromiseFn.resolve = function(x) {
        return new PromiseFn(function(resolve, reject) {
            resolve(x);
        });
    };
    PromiseFn.all = function all(iterable) {
        return new PromiseFn(function(resolve, reject) {
            var result = [];
            var count = 0;
            if (iterable.length === 0) {
                resolve(result);
            }
            function resolver(i) {
                return function(x) {
                    result[i] = x;
                    count += 1;
                    if (count === iterable.length) {
                        resolve(result);
                    }
                };
            }
            for (var i = 0; i < iterable.length; i += 1) {
                PromiseFn.resolve(iterable[i]).then(resolver(i), reject);
            }
        });
    };
    PromiseFn.race = function race(iterable) {
        return new PromiseFn(function(resolve, reject) {
            for (var i = 0; i < iterable.length; i += 1) {
                PromiseFn.resolve(iterable[i]).then(resolve, reject);
            }
        });
    };
    var p = PromiseFn.prototype;
    p.resolve = function resolve(x) {
        var promise = this;
        if (promise.state === PENDING) {
            if (x === promise) {
                throw new TypeError("Promise settled with itself.");
            }
            var called = false;
            try {
                var then = x && x.then;
                if (x !== null && isObject(x) && isFunction(then)) {
                    then.call(x, function(x) {
                        if (!called) {
                            promise.resolve(x);
                        }
                        called = true;
                    }, function(r) {
                        if (!called) {
                            promise.reject(r);
                        }
                        called = true;
                    });
                    return;
                }
            } catch (e) {
                if (!called) {
                    promise.reject(e);
                }
                return;
            }
            promise.state = RESOLVED;
            promise.value = x;
            promise.notify();
        }
    };
    p.reject = function reject(reason) {
        var promise = this;
        if (promise.state === PENDING) {
            if (reason === promise) {
                throw new TypeError("Promise settled with itself.");
            }
            promise.state = REJECTED;
            promise.value = reason;
            promise.notify();
        }
    };
    p.notify = function notify() {
        var this$1 = this;
        async(function() {
            if (this$1.state !== PENDING) {
                while (this$1.deferred.length) {
                    var ref = this$1.deferred.shift();
                    var onResolved = ref[0];
                    var onRejected = ref[1];
                    var resolve = ref[2];
                    var reject = ref[3];
                    try {
                        if (this$1.state === RESOLVED) {
                            if (isFunction(onResolved)) {
                                resolve(onResolved.call(undefined, this$1.value));
                            } else {
                                resolve(this$1.value);
                            }
                        } else if (this$1.state === REJECTED) {
                            if (isFunction(onRejected)) {
                                resolve(onRejected.call(undefined, this$1.value));
                            } else {
                                reject(this$1.value);
                            }
                        }
                    } catch (e) {
                        reject(e);
                    }
                }
            }
        });
    };
    p.then = function then(onResolved, onRejected) {
        var this$1 = this;
        return new PromiseFn(function(resolve, reject) {
            this$1.deferred.push([ onResolved, onRejected, resolve, reject ]);
            this$1.notify();
        });
    };
    p.catch = function(onRejected) {
        return this.then(undefined, onRejected);
    };
    function ajax(url, options) {
        var env = assign({
            data: null,
            method: "GET",
            headers: {},
            xhr: new XMLHttpRequest(),
            beforeSend: noop,
            responseType: ""
        }, options);
        return Promise$1.resolve().then(function() {
            return env.beforeSend(env);
        }).then(function() {
            return send(url, env);
        });
    }
    function send(url, env) {
        return new Promise$1(function(resolve, reject) {
            var xhr = env.xhr;
            for (var prop in env) {
                if (prop in xhr) {
                    try {
                        xhr[prop] = env[prop];
                    } catch (e) {}
                }
            }
            xhr.open(env.method.toUpperCase(), url);
            for (var header in env.headers) {
                xhr.setRequestHeader(header, env.headers[header]);
            }
            on(xhr, "load", function() {
                if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    if (env.responseType === "json" && isString(xhr.response)) {
                        xhr = assign(copyXhr(xhr), {
                            response: JSON.parse(xhr.response)
                        });
                    }
                    resolve(xhr);
                } else {
                    reject(assign(Error(xhr.statusText), {
                        xhr: xhr,
                        status: xhr.status
                    }));
                }
            });
            on(xhr, "error", function() {
                return reject(assign(Error("Network Error"), {
                    xhr: xhr
                }));
            });
            on(xhr, "timeout", function() {
                return reject(assign(Error("Network Timeout"), {
                    xhr: xhr
                }));
            });
            xhr.send(env.data);
        });
    }
    function getImage(src, srcset, sizes) {
        return new Promise$1(function(resolve, reject) {
            var img = new Image();
            img.onerror = function(e) {
                return reject(e);
            };
            img.onload = function() {
                return resolve(img);
            };
            sizes && (img.sizes = sizes);
            srcset && (img.srcset = srcset);
            img.src = src;
        });
    }
    function copyXhr(source) {
        var target = {};
        for (var key in source) {
            target[key] = source[key];
        }
        return target;
    }
    function ready(fn) {
        if (document.readyState !== "loading") {
            fn();
            return;
        }
        var unbind = on(document, "DOMContentLoaded", function() {
            unbind();
            fn();
        });
    }
    function empty(element) {
        element = $(element);
        element.innerHTML = "";
        return element;
    }
    function html(parent, html) {
        parent = $(parent);
        return isUndefined(html) ? parent.innerHTML : append(parent.hasChildNodes() ? empty(parent) : parent, html);
    }
    function prepend(parent, element) {
        parent = $(parent);
        if (!parent.hasChildNodes()) {
            return append(parent, element);
        } else {
            return insertNodes(element, function(element) {
                return parent.insertBefore(element, parent.firstChild);
            });
        }
    }
    function append(parent, element) {
        parent = $(parent);
        return insertNodes(element, function(element) {
            return parent.appendChild(element);
        });
    }
    function before(ref, element) {
        ref = $(ref);
        return insertNodes(element, function(element) {
            return ref.parentNode.insertBefore(element, ref);
        });
    }
    function after(ref, element) {
        ref = $(ref);
        return insertNodes(element, function(element) {
            return ref.nextSibling ? before(ref.nextSibling, element) : append(ref.parentNode, element);
        });
    }
    function insertNodes(element, fn) {
        element = isString(element) ? fragment(element) : element;
        return element ? "length" in element ? toNodes(element).map(fn) : fn(element) : null;
    }
    function remove$1(element) {
        toNodes(element).forEach(function(element) {
            return element.parentNode && element.parentNode.removeChild(element);
        });
    }
    function wrapAll(element, structure) {
        structure = toNode(before(element, structure));
        while (structure.firstChild) {
            structure = structure.firstChild;
        }
        append(structure, element);
        return structure;
    }
    function wrapInner(element, structure) {
        return toNodes(toNodes(element).map(function(element) {
            return element.hasChildNodes ? wrapAll(toNodes(element.childNodes), structure) : append(element, structure);
        }));
    }
    function unwrap(element) {
        toNodes(element).map(parent).filter(function(value, index, self) {
            return self.indexOf(value) === index;
        }).forEach(function(parent) {
            before(parent, parent.childNodes);
            remove$1(parent);
        });
    }
    var fragmentRe = /^\s*<(\w+|!)[^>]*>/;
    var singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
    function fragment(html) {
        var matches = singleTagRe.exec(html);
        if (matches) {
            return document.createElement(matches[1]);
        }
        var container = document.createElement("div");
        if (fragmentRe.test(html)) {
            container.insertAdjacentHTML("beforeend", html.trim());
        } else {
            container.textContent = html;
        }
        return container.childNodes.length > 1 ? toNodes(container.childNodes) : container.firstChild;
    }
    function apply$1(node, fn) {
        if (!isElement(node)) {
            return;
        }
        fn(node);
        node = node.firstElementChild;
        while (node) {
            var next = node.nextElementSibling;
            apply$1(node, fn);
            node = next;
        }
    }
    function $(selector, context) {
        return isHtml(selector) ? toNode(fragment(selector)) : find(selector, context);
    }
    function $$(selector, context) {
        return isHtml(selector) ? toNodes(fragment(selector)) : findAll(selector, context);
    }
    function isHtml(str) {
        return isString(str) && (str[0] === "<" || str.match(/^\s*</));
    }
    function addClass(element) {
        var args = [], len = arguments.length - 1;
        while (len-- > 0) args[len] = arguments[len + 1];
        apply(element, args, "add");
    }
    function removeClass(element) {
        var args = [], len = arguments.length - 1;
        while (len-- > 0) args[len] = arguments[len + 1];
        apply(element, args, "remove");
    }
    function removeClasses(element, cls) {
        attr(element, "class", function(value) {
            return (value || "").replace(new RegExp("\\b" + cls + "\\b", "g"), "");
        });
    }
    function replaceClass(element) {
        var args = [], len = arguments.length - 1;
        while (len-- > 0) args[len] = arguments[len + 1];
        args[0] && removeClass(element, args[0]);
        args[1] && addClass(element, args[1]);
    }
    function hasClass(element, cls) {
        var assign;
        assign = getClasses(cls), cls = assign[0];
        var nodes = toNodes(element);
        for (var n = 0; n < nodes.length; n++) {
            if (cls && nodes[n].classList.contains(cls)) {
                return true;
            }
        }
        return false;
    }
    function toggleClass(element, cls, force) {
        cls = getClasses(cls);
        var nodes = toNodes(element);
        for (var n = 0; n < nodes.length; n++) {
            var list = nodes[n].classList;
            for (var i = 0; i < cls.length; i++) {
                if (isUndefined(force)) {
                    list.toggle(cls[i]);
                } else if (supports.Force) {
                    list.toggle(cls[i], !!force);
                } else {
                    list[force ? "add" : "remove"](cls[i]);
                }
            }
        }
    }
    function apply(element, args, fn) {
        var ref;
        args = args.reduce(function(args, arg) {
            return args.concat(getClasses(arg));
        }, []);
        var nodes = toNodes(element);
        var loop = function(n) {
            if (supports.Multiple) {
                (ref = nodes[n].classList)[fn].apply(ref, args);
            } else {
                args.forEach(function(cls) {
                    return nodes[n].classList[fn](cls);
                });
            }
        };
        for (var n = 0; n < nodes.length; n++) loop(n);
    }
    function getClasses(str) {
        return String(str).split(/\s|,/).filter(Boolean);
    }
    var supports = {
        get Multiple() {
            return this.get("Multiple");
        },
        get Force() {
            return this.get("Force");
        },
        get: function(key) {
            var ref = document.createElement("_");
            var classList = ref.classList;
            classList.add("a", "b");
            classList.toggle("c", false);
            supports = {
                Multiple: classList.contains("b"),
                Force: !classList.contains("c")
            };
            return supports[key];
        }
    };
    var cssNumber = {
        "animation-iteration-count": true,
        "column-count": true,
        "fill-opacity": true,
        "flex-grow": true,
        "flex-shrink": true,
        "font-weight": true,
        "line-height": true,
        opacity: true,
        order: true,
        orphans: true,
        "stroke-dasharray": true,
        "stroke-dashoffset": true,
        widows: true,
        "z-index": true,
        zoom: true
    };
    function css(element, property, value, priority) {
        if (priority === void 0) priority = "";
        return toNodes(element).map(function(element) {
            if (isString(property)) {
                property = propName(property);
                if (isUndefined(value)) {
                    return getStyle(element, property);
                } else if (!value && !isNumber(value)) {
                    element.style.removeProperty(property);
                } else {
                    element.style.setProperty(property, isNumeric(value) && !cssNumber[property] ? value + "px" : value, priority);
                }
            } else if (isArray(property)) {
                var styles = getStyles(element);
                return property.reduce(function(props, property) {
                    props[property] = styles[propName(property)];
                    return props;
                }, {});
            } else if (isObject(property)) {
                priority = value;
                each(property, function(value, property) {
                    return css(element, property, value, priority);
                });
            }
            return element;
        })[0];
    }
    function getStyles(element, pseudoElt) {
        return toWindow(element).getComputedStyle(element, pseudoElt);
    }
    function getStyle(element, property, pseudoElt) {
        return getStyles(element, pseudoElt)[property];
    }
    var parseCssVar = memoize(function(name) {
        var element = append(document.documentElement, document.createElement("div"));
        addClass(element, "uk-" + name);
        name = getStyle(element, "content", ":before").replace(/^["'](.*)["']$/, "$1");
        remove$1(element);
        return name;
    });
    function getCssVar(name) {
        return !isIE ? getStyles(document.documentElement).getPropertyValue("--uk-" + name) : parseCssVar(name);
    }
    var propName = memoize(function(name) {
        return vendorPropName(name);
    });
    var cssPrefixes = [ "webkit", "moz", "ms" ];
    function vendorPropName(name) {
        name = hyphenate(name);
        var ref = document.documentElement;
        var style = ref.style;
        if (name in style) {
            return name;
        }
        var i = cssPrefixes.length, prefixedName;
        while (i--) {
            prefixedName = "-" + cssPrefixes[i] + "-" + name;
            if (prefixedName in style) {
                return prefixedName;
            }
        }
    }
    function transition(element, props, duration, timing) {
        if (duration === void 0) duration = 400;
        if (timing === void 0) timing = "linear";
        return Promise$1.all(toNodes(element).map(function(element) {
            return new Promise$1(function(resolve, reject) {
                for (var name in props) {
                    var value = css(element, name);
                    if (value === "") {
                        css(element, name, value);
                    }
                }
                var timer = setTimeout(function() {
                    return trigger(element, "transitionend");
                }, duration);
                once(element, "transitionend transitioncanceled", function(ref) {
                    var type = ref.type;
                    clearTimeout(timer);
                    removeClass(element, "uk-transition");
                    css(element, {
                        transitionProperty: "",
                        transitionDuration: "",
                        transitionTimingFunction: ""
                    });
                    type === "transitioncanceled" ? reject() : resolve(element);
                }, {
                    self: true
                });
                addClass(element, "uk-transition");
                css(element, assign({
                    transitionProperty: Object.keys(props).map(propName).join(","),
                    transitionDuration: duration + "ms",
                    transitionTimingFunction: timing
                }, props));
            });
        }));
    }
    var Transition = {
        start: transition,
        stop: function(element) {
            trigger(element, "transitionend");
            return Promise$1.resolve();
        },
        cancel: function(element) {
            trigger(element, "transitioncanceled");
        },
        inProgress: function(element) {
            return hasClass(element, "uk-transition");
        }
    };
    var animationPrefix = "uk-animation-";
    function animate$1(element, animation, duration, origin, out) {
        if (duration === void 0) duration = 200;
        return Promise$1.all(toNodes(element).map(function(element) {
            return new Promise$1(function(resolve, reject) {
                trigger(element, "animationcanceled");
                var timer = setTimeout(function() {
                    return trigger(element, "animationend");
                }, duration);
                once(element, "animationend animationcanceled", function(ref) {
                    var type = ref.type;
                    clearTimeout(timer);
                    type === "animationcanceled" ? reject() : resolve(element);
                    css(element, "animationDuration", "");
                    removeClasses(element, animationPrefix + "\\S*");
                }, {
                    self: true
                });
                css(element, "animationDuration", duration + "ms");
                addClass(element, animation, animationPrefix + (out ? "leave" : "enter"));
                if (startsWith(animation, animationPrefix)) {
                    origin && addClass(element, "uk-transform-origin-" + origin);
                    out && addClass(element, animationPrefix + "reverse");
                }
            });
        }));
    }
    var inProgress = new RegExp(animationPrefix + "(enter|leave)");
    var Animation = {
        in: animate$1,
        out: function(element, animation, duration, origin) {
            return animate$1(element, animation, duration, origin, true);
        },
        inProgress: function(element) {
            return inProgress.test(attr(element, "class"));
        },
        cancel: function(element) {
            trigger(element, "animationcanceled");
        }
    };
    var dirs$1 = {
        width: [ "left", "right" ],
        height: [ "top", "bottom" ]
    };
    function dimensions(element) {
        var rect = isElement(element) ? toNode(element).getBoundingClientRect() : {
            height: height(element),
            width: width(element),
            top: 0,
            left: 0
        };
        return {
            height: rect.height,
            width: rect.width,
            top: rect.top,
            left: rect.left,
            bottom: rect.top + rect.height,
            right: rect.left + rect.width
        };
    }
    function offset(element, coordinates) {
        var currentOffset = dimensions(element);
        var ref = toWindow(element);
        var pageYOffset = ref.pageYOffset;
        var pageXOffset = ref.pageXOffset;
        var offsetBy = {
            height: pageYOffset,
            width: pageXOffset
        };
        for (var dir in dirs$1) {
            for (var i in dirs$1[dir]) {
                currentOffset[dirs$1[dir][i]] += offsetBy[dir];
            }
        }
        if (!coordinates) {
            return currentOffset;
        }
        var pos = css(element, "position");
        each(css(element, [ "left", "top" ]), function(value, prop) {
            return css(element, prop, coordinates[prop] - currentOffset[prop] + toFloat(pos === "absolute" && value === "auto" ? position(element)[prop] : value));
        });
    }
    function position(element) {
        var ref = offset(element);
        var top = ref.top;
        var left = ref.left;
        var ref$1 = toNode(element);
        var ref$1_ownerDocument = ref$1.ownerDocument;
        var body = ref$1_ownerDocument.body;
        var documentElement = ref$1_ownerDocument.documentElement;
        var offsetParent = ref$1.offsetParent;
        var parent = offsetParent || documentElement;
        while (parent && (parent === body || parent === documentElement) && css(parent, "position") === "static") {
            parent = parent.parentNode;
        }
        if (isElement(parent)) {
            var parentOffset = offset(parent);
            top -= parentOffset.top + toFloat(css(parent, "borderTopWidth"));
            left -= parentOffset.left + toFloat(css(parent, "borderLeftWidth"));
        }
        return {
            top: top - toFloat(css(element, "marginTop")),
            left: left - toFloat(css(element, "marginLeft"))
        };
    }
    function offsetPosition(element) {
        var offset = [ 0, 0 ];
        element = toNode(element);
        do {
            offset[0] += element.offsetTop;
            offset[1] += element.offsetLeft;
            if (css(element, "position") === "fixed") {
                var win = toWindow(element);
                offset[0] += win.pageYOffset;
                offset[1] += win.pageXOffset;
                return offset;
            }
        } while (element = element.offsetParent);
        return offset;
    }
    var height = dimension("height");
    var width = dimension("width");
    function dimension(prop) {
        var propName = ucfirst(prop);
        return function(element, value) {
            if (isUndefined(value)) {
                if (isWindow(element)) {
                    return element["inner" + propName];
                }
                if (isDocument(element)) {
                    var doc = element.documentElement;
                    return Math.max(doc["offset" + propName], doc["scroll" + propName]);
                }
                element = toNode(element);
                value = css(element, prop);
                value = value === "auto" ? element["offset" + propName] : toFloat(value) || 0;
                return value - boxModelAdjust(element, prop);
            } else {
                return css(element, prop, !value && value !== 0 ? "" : +value + boxModelAdjust(element, prop) + "px");
            }
        };
    }
    function boxModelAdjust(element, prop, sizing) {
        if (sizing === void 0) sizing = "border-box";
        return css(element, "boxSizing") === sizing ? dirs$1[prop].map(ucfirst).reduce(function(value, prop) {
            return value + toFloat(css(element, "padding" + prop)) + toFloat(css(element, "border" + prop + "Width"));
        }, 0) : 0;
    }
    function flipPosition(pos) {
        for (var dir in dirs$1) {
            for (var i in dirs$1[dir]) {
                if (dirs$1[dir][i] === pos) {
                    return dirs$1[dir][1 - i];
                }
            }
        }
        return pos;
    }
    function toPx(value, property, element) {
        if (property === void 0) property = "width";
        if (element === void 0) element = window;
        return isNumeric(value) ? +value : endsWith(value, "vh") ? percent(height(toWindow(element)), value) : endsWith(value, "vw") ? percent(width(toWindow(element)), value) : endsWith(value, "%") ? percent(dimensions(element)[property], value) : toFloat(value);
    }
    function percent(base, value) {
        return base * toFloat(value) / 100;
    }
    var fastdom = {
        reads: [],
        writes: [],
        read: function(task) {
            this.reads.push(task);
            scheduleFlush();
            return task;
        },
        write: function(task) {
            this.writes.push(task);
            scheduleFlush();
            return task;
        },
        clear: function(task) {
            remove(this.reads, task);
            remove(this.writes, task);
        },
        flush: flush
    };
    function flush(recursion) {
        if (recursion === void 0) recursion = 1;
        runTasks(fastdom.reads);
        runTasks(fastdom.writes.splice(0));
        fastdom.scheduled = false;
        if (fastdom.reads.length || fastdom.writes.length) {
            scheduleFlush(recursion + 1);
        }
    }
    var RECURSION_LIMIT = 4;
    function scheduleFlush(recursion) {
        if (fastdom.scheduled) {
            return;
        }
        fastdom.scheduled = true;
        if (recursion && recursion < RECURSION_LIMIT) {
            Promise$1.resolve().then(function() {
                return flush(recursion);
            });
        } else {
            requestAnimationFrame(function() {
                return flush();
            });
        }
    }
    function runTasks(tasks) {
        var task;
        while (task = tasks.shift()) {
            try {
                task();
            } catch (e) {
                console.error(e);
            }
        }
    }
    function remove(array, item) {
        var index = array.indexOf(item);
        return ~index && array.splice(index, 1);
    }
    function MouseTracker() {}
    MouseTracker.prototype = {
        positions: [],
        init: function() {
            var this$1 = this;
            this.positions = [];
            var position;
            this.unbind = on(document, "mousemove", function(e) {
                return position = getEventPos(e);
            });
            this.interval = setInterval(function() {
                if (!position) {
                    return;
                }
                this$1.positions.push(position);
                if (this$1.positions.length > 5) {
                    this$1.positions.shift();
                }
            }, 50);
        },
        cancel: function() {
            this.unbind && this.unbind();
            this.interval && clearInterval(this.interval);
        },
        movesTo: function(target) {
            if (this.positions.length < 2) {
                return false;
            }
            var p = target.getBoundingClientRect();
            var left = p.left;
            var right = p.right;
            var top = p.top;
            var bottom = p.bottom;
            var ref = this.positions;
            var prevPosition = ref[0];
            var position = last(this.positions);
            var path = [ prevPosition, position ];
            if (pointInRect(position, p)) {
                return false;
            }
            var diagonals = [ [ {
                x: left,
                y: top
            }, {
                x: right,
                y: bottom
            } ], [ {
                x: left,
                y: bottom
            }, {
                x: right,
                y: top
            } ] ];
            return diagonals.some(function(diagonal) {
                var intersection = intersect(path, diagonal);
                return intersection && pointInRect(intersection, p);
            });
        }
    };
    function intersect(ref, ref$1) {
        var ref_0 = ref[0];
        var x1 = ref_0.x;
        var y1 = ref_0.y;
        var ref_1 = ref[1];
        var x2 = ref_1.x;
        var y2 = ref_1.y;
        var ref$1_0 = ref$1[0];
        var x3 = ref$1_0.x;
        var y3 = ref$1_0.y;
        var ref$1_1 = ref$1[1];
        var x4 = ref$1_1.x;
        var y4 = ref$1_1.y;
        var denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        if (denominator === 0) {
            return false;
        }
        var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
        if (ua < 0) {
            return false;
        }
        return {
            x: x1 + ua * (x2 - x1),
            y: y1 + ua * (y2 - y1)
        };
    }
    var strats = {};
    strats.events = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat;
    strats.args = function(parentVal, childVal) {
        return childVal !== false && concatStrat(childVal || parentVal);
    };
    strats.update = function(parentVal, childVal) {
        return sortBy$1(concatStrat(parentVal, isFunction(childVal) ? {
            read: childVal
        } : childVal), "order");
    };
    strats.props = function(parentVal, childVal) {
        if (isArray(childVal)) {
            childVal = childVal.reduce(function(value, key) {
                value[key] = String;
                return value;
            }, {});
        }
        return strats.methods(parentVal, childVal);
    };
    strats.computed = strats.methods = function(parentVal, childVal) {
        return childVal ? parentVal ? assign({}, parentVal, childVal) : childVal : parentVal;
    };
    strats.data = function(parentVal, childVal, vm) {
        if (!vm) {
            if (!childVal) {
                return parentVal;
            }
            if (!parentVal) {
                return childVal;
            }
            return function(vm) {
                return mergeFnData(parentVal, childVal, vm);
            };
        }
        return mergeFnData(parentVal, childVal, vm);
    };
    function mergeFnData(parentVal, childVal, vm) {
        return strats.computed(isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal, isFunction(childVal) ? childVal.call(vm, vm) : childVal);
    }
    function concatStrat(parentVal, childVal) {
        parentVal = parentVal && !isArray(parentVal) ? [ parentVal ] : parentVal;
        return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [ childVal ] : parentVal;
    }
    function defaultStrat(parentVal, childVal) {
        return isUndefined(childVal) ? parentVal : childVal;
    }
    function mergeOptions(parent, child, vm) {
        var options = {};
        if (isFunction(child)) {
            child = child.options;
        }
        if (child.extends) {
            parent = mergeOptions(parent, child.extends, vm);
        }
        if (child.mixins) {
            for (var i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm);
            }
        }
        for (var key in parent) {
            mergeKey(key);
        }
        for (var key$1 in child) {
            if (!hasOwn(parent, key$1)) {
                mergeKey(key$1);
            }
        }
        function mergeKey(key) {
            options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
        }
        return options;
    }
    function parseOptions(options, args) {
        var obj;
        if (args === void 0) args = [];
        try {
            return !options ? {} : startsWith(options, "{") ? JSON.parse(options) : args.length && !includes(options, ":") ? (obj = {}, 
            obj[args[0]] = options, obj) : options.split(";").reduce(function(options, option) {
                var ref = option.split(/:(.*)/);
                var key = ref[0];
                var value = ref[1];
                if (key && !isUndefined(value)) {
                    options[key.trim()] = value.trim();
                }
                return options;
            }, {});
        } catch (e) {
            return {};
        }
    }
    function play(el) {
        if (isIFrame(el)) {
            call(el, {
                func: "playVideo",
                method: "play"
            });
        }
        if (isHTML5(el)) {
            try {
                el.play().catch(noop);
            } catch (e) {}
        }
    }
    function pause(el) {
        if (isIFrame(el)) {
            call(el, {
                func: "pauseVideo",
                method: "pause"
            });
        }
        if (isHTML5(el)) {
            el.pause();
        }
    }
    function mute(el) {
        if (isIFrame(el)) {
            call(el, {
                func: "mute",
                method: "setVolume",
                value: 0
            });
        }
        if (isHTML5(el)) {
            el.muted = true;
        }
    }
    function isHTML5(el) {
        return el && el.tagName === "VIDEO";
    }
    function isIFrame(el) {
        return el && el.tagName === "IFRAME" && (isYoutube(el) || isVimeo(el));
    }
    function isYoutube(el) {
        return !!el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/);
    }
    function isVimeo(el) {
        return !!el.src.match(/vimeo\.com\/video\/.*/);
    }
    function call(el, cmd) {
        enableApi(el).then(function() {
            return post(el, cmd);
        });
    }
    function post(el, cmd) {
        try {
            el.contentWindow.postMessage(JSON.stringify(assign({
                event: "command"
            }, cmd)), "*");
        } catch (e) {}
    }
    var stateKey$1 = "_ukPlayer";
    var counter = 0;
    function enableApi(el) {
        if (el[stateKey$1]) {
            return el[stateKey$1];
        }
        var youtube = isYoutube(el);
        var vimeo = isVimeo(el);
        var id = ++counter;
        var poller;
        return el[stateKey$1] = new Promise$1(function(resolve) {
            youtube && once(el, "load", function() {
                var listener = function() {
                    return post(el, {
                        event: "listening",
                        id: id
                    });
                };
                poller = setInterval(listener, 100);
                listener();
            });
            once(window, "message", resolve, false, function(ref) {
                var data = ref.data;
                try {
                    data = JSON.parse(data);
                    return data && (youtube && data.id === id && data.event === "onReady" || vimeo && Number(data.player_id) === id);
                } catch (e) {}
            });
            el.src = "" + el.src + (includes(el.src, "?") ? "&" : "?") + (youtube ? "enablejsapi=1" : "api=1&player_id=" + id);
        }).then(function() {
            return clearInterval(poller);
        });
    }
    function isInView(element, offsetTop, offsetLeft) {
        if (offsetTop === void 0) offsetTop = 0;
        if (offsetLeft === void 0) offsetLeft = 0;
        if (!isVisible(element)) {
            return false;
        }
        return intersectRect.apply(void 0, scrollParents(element).map(function(parent) {
            var ref = offset(getViewport$1(parent));
            var top = ref.top;
            var left = ref.left;
            var bottom = ref.bottom;
            var right = ref.right;
            return {
                top: top - offsetTop,
                left: left - offsetLeft,
                bottom: bottom + offsetTop,
                right: right + offsetLeft
            };
        }).concat(offset(element)));
    }
    function scrollTop(element, top) {
        if (isWindow(element) || isDocument(element)) {
            element = getScrollingElement(element);
        } else {
            element = toNode(element);
        }
        element.scrollTop = top;
    }
    function scrollIntoView(element, ref) {
        if (ref === void 0) ref = {};
        var offsetBy = ref.offset;
        if (offsetBy === void 0) offsetBy = 0;
        var parents = isVisible(element) ? scrollParents(element) : [];
        var diff = 0;
        return parents.reduce(function(fn, scrollElement, i) {
            var scrollTop = scrollElement.scrollTop;
            var scrollHeight = scrollElement.scrollHeight;
            var maxScroll = scrollHeight - getViewportClientHeight(scrollElement);
            var top = Math.ceil(offset(parents[i - 1] || element).top - offset(getViewport$1(scrollElement)).top - offsetBy + diff + scrollTop);
            if (top > maxScroll) {
                diff = top - maxScroll;
                top = maxScroll;
            } else {
                diff = 0;
            }
            return function() {
                return scrollTo(scrollElement, top - scrollTop).then(fn);
            };
        }, function() {
            return Promise$1.resolve();
        })();
        function scrollTo(element, top) {
            return new Promise$1(function(resolve) {
                var scroll = element.scrollTop;
                var duration = getDuration(Math.abs(top));
                var start = Date.now();
                (function step() {
                    var percent = ease(clamp((Date.now() - start) / duration));
                    scrollTop(element, scroll + top * percent);
                    if (percent !== 1) {
                        requestAnimationFrame(step);
                    } else {
                        resolve();
                    }
                })();
            });
        }
        function getDuration(dist) {
            return 40 * Math.pow(dist, .375);
        }
        function ease(k) {
            return .5 * (1 - Math.cos(Math.PI * k));
        }
    }
    function scrolledOver(element, heightOffset) {
        if (heightOffset === void 0) heightOffset = 0;
        if (!isVisible(element)) {
            return 0;
        }
        var ref = scrollParents(element, /auto|scroll/, true);
        var scrollElement = ref[0];
        var scrollHeight = scrollElement.scrollHeight;
        var scrollTop = scrollElement.scrollTop;
        var clientHeight = getViewportClientHeight(scrollElement);
        var viewportTop = offsetPosition(element)[0] - scrollTop - offsetPosition(scrollElement)[0];
        var viewportDist = Math.min(clientHeight, viewportTop + scrollTop);
        var top = viewportTop - viewportDist;
        var dist = Math.min(element.offsetHeight + heightOffset + viewportDist, scrollHeight - (viewportTop + scrollTop), scrollHeight - clientHeight);
        return clamp(-1 * top / dist);
    }
    function scrollParents(element, overflowRe, scrollable) {
        if (overflowRe === void 0) overflowRe = /auto|scroll|hidden/;
        if (scrollable === void 0) scrollable = false;
        var scrollEl = getScrollingElement(element);
        var ancestors = parents(element).reverse();
        ancestors = ancestors.slice(ancestors.indexOf(scrollEl) + 1);
        var fixedIndex = findIndex(ancestors, function(el) {
            return css(el, "position") === "fixed";
        });
        if (~fixedIndex) {
            ancestors = ancestors.slice(fixedIndex);
        }
        return [ scrollEl ].concat(ancestors.filter(function(parent) {
            return overflowRe.test(css(parent, "overflow")) && (!scrollable || parent.scrollHeight > getViewportClientHeight(parent));
        })).reverse();
    }
    function getViewport$1(scrollElement) {
        return scrollElement === getScrollingElement(scrollElement) ? window : scrollElement;
    }
    function getViewportClientHeight(scrollElement) {
        return (scrollElement === getScrollingElement(scrollElement) ? document.documentElement : scrollElement).clientHeight;
    }
    function getScrollingElement(element) {
        var ref = toWindow(element);
        var document = ref.document;
        return document.scrollingElement || document.documentElement;
    }
    var dirs = {
        width: [ "x", "left", "right" ],
        height: [ "y", "top", "bottom" ]
    };
    function positionAt(element, target, elAttach, targetAttach, elOffset, targetOffset, flip, boundary) {
        elAttach = getPos(elAttach);
        targetAttach = getPos(targetAttach);
        var flipped = {
            element: elAttach,
            target: targetAttach
        };
        if (!element || !target) {
            return flipped;
        }
        var dim = offset(element);
        var targetDim = offset(target);
        var position = targetDim;
        moveTo(position, elAttach, dim, -1);
        moveTo(position, targetAttach, targetDim, 1);
        elOffset = getOffsets(elOffset, dim.width, dim.height);
        targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);
        elOffset["x"] += targetOffset["x"];
        elOffset["y"] += targetOffset["y"];
        position.left += elOffset["x"];
        position.top += elOffset["y"];
        if (flip) {
            var boundaries = scrollParents(element).map(getViewport$1);
            if (boundary && !includes(boundaries, boundary)) {
                boundaries.unshift(boundary);
            }
            boundaries = boundaries.map(function(el) {
                return offset(el);
            });
            each(dirs, function(ref, prop) {
                var dir = ref[0];
                var align = ref[1];
                var alignFlip = ref[2];
                if (!(flip === true || includes(flip, dir))) {
                    return;
                }
                boundaries.some(function(boundary) {
                    var elemOffset = elAttach[dir] === align ? -dim[prop] : elAttach[dir] === alignFlip ? dim[prop] : 0;
                    var targetOffset = targetAttach[dir] === align ? targetDim[prop] : targetAttach[dir] === alignFlip ? -targetDim[prop] : 0;
                    if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {
                        var centerOffset = dim[prop] / 2;
                        var centerTargetOffset = targetAttach[dir] === "center" ? -targetDim[prop] / 2 : 0;
                        return elAttach[dir] === "center" && (apply(centerOffset, centerTargetOffset) || apply(-centerOffset, -centerTargetOffset)) || apply(elemOffset, targetOffset);
                    }
                    function apply(elemOffset, targetOffset) {
                        var newVal = toFloat((position[align] + elemOffset + targetOffset - elOffset[dir] * 2).toFixed(4));
                        if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
                            position[align] = newVal;
                            [ "element", "target" ].forEach(function(el) {
                                flipped[el][dir] = !elemOffset ? flipped[el][dir] : flipped[el][dir] === dirs[prop][1] ? dirs[prop][2] : dirs[prop][1];
                            });
                            return true;
                        }
                    }
                });
            });
        }
        offset(element, position);
        return flipped;
    }
    function moveTo(position, attach, dim, factor) {
        each(dirs, function(ref, prop) {
            var dir = ref[0];
            var align = ref[1];
            var alignFlip = ref[2];
            if (attach[dir] === alignFlip) {
                position[align] += dim[prop] * factor;
            } else if (attach[dir] === "center") {
                position[align] += dim[prop] * factor / 2;
            }
        });
    }
    function getPos(pos) {
        var x = /left|center|right/;
        var y = /top|center|bottom/;
        pos = (pos || "").split(" ");
        if (pos.length === 1) {
            pos = x.test(pos[0]) ? pos.concat("center") : y.test(pos[0]) ? [ "center" ].concat(pos) : [ "center", "center" ];
        }
        return {
            x: x.test(pos[0]) ? pos[0] : "center",
            y: y.test(pos[1]) ? pos[1] : "center"
        };
    }
    function getOffsets(offsets, width, height) {
        var ref = (offsets || "").split(" ");
        var x = ref[0];
        var y = ref[1];
        return {
            x: x ? toFloat(x) * (endsWith(x, "%") ? width / 100 : 1) : 0,
            y: y ? toFloat(y) * (endsWith(y, "%") ? height / 100 : 1) : 0
        };
    }
    var util = Object.freeze({
        __proto__: null,
        ajax: ajax,
        getImage: getImage,
        transition: transition,
        Transition: Transition,
        animate: animate$1,
        Animation: Animation,
        attr: attr,
        hasAttr: hasAttr,
        removeAttr: removeAttr,
        data: data,
        addClass: addClass,
        removeClass: removeClass,
        removeClasses: removeClasses,
        replaceClass: replaceClass,
        hasClass: hasClass,
        toggleClass: toggleClass,
        dimensions: dimensions,
        offset: offset,
        position: position,
        offsetPosition: offsetPosition,
        height: height,
        width: width,
        boxModelAdjust: boxModelAdjust,
        flipPosition: flipPosition,
        toPx: toPx,
        ready: ready,
        empty: empty,
        html: html,
        prepend: prepend,
        append: append,
        before: before,
        after: after,
        remove: remove$1,
        wrapAll: wrapAll,
        wrapInner: wrapInner,
        unwrap: unwrap,
        fragment: fragment,
        apply: apply$1,
        $: $,
        $$: $$,
        inBrowser: inBrowser,
        isIE: isIE,
        isRtl: isRtl,
        hasTouch: hasTouch,
        pointerDown: pointerDown,
        pointerMove: pointerMove,
        pointerUp: pointerUp,
        pointerEnter: pointerEnter,
        pointerLeave: pointerLeave,
        pointerCancel: pointerCancel,
        on: on,
        off: off,
        once: once,
        trigger: trigger,
        createEvent: createEvent,
        toEventTargets: toEventTargets,
        isTouch: isTouch,
        getEventPos: getEventPos,
        fastdom: fastdom,
        isVoidElement: isVoidElement,
        isVisible: isVisible,
        selInput: selInput,
        isInput: isInput,
        isFocusable: isFocusable,
        parent: parent,
        filter: filter$1,
        matches: matches,
        closest: closest,
        within: within,
        parents: parents,
        children: children,
        index: index,
        hasOwn: hasOwn,
        hyphenate: hyphenate,
        camelize: camelize,
        ucfirst: ucfirst,
        startsWith: startsWith,
        endsWith: endsWith,
        includes: includes,
        findIndex: findIndex,
        isArray: isArray,
        isFunction: isFunction,
        isObject: isObject,
        isPlainObject: isPlainObject,
        isWindow: isWindow,
        isDocument: isDocument,
        isNode: isNode,
        isElement: isElement,
        isBoolean: isBoolean,
        isString: isString,
        isNumber: isNumber,
        isNumeric: isNumeric,
        isEmpty: isEmpty,
        isUndefined: isUndefined,
        toBoolean: toBoolean,
        toNumber: toNumber,
        toFloat: toFloat,
        toArray: toArray,
        toNode: toNode,
        toNodes: toNodes,
        toWindow: toWindow,
        toMs: toMs,
        isEqual: isEqual,
        swap: swap,
        assign: assign,
        last: last,
        each: each,
        sortBy: sortBy$1,
        uniqueBy: uniqueBy,
        clamp: clamp,
        noop: noop,
        intersectRect: intersectRect,
        pointInRect: pointInRect,
        Dimensions: Dimensions,
        getIndex: getIndex,
        memoize: memoize,
        MouseTracker: MouseTracker,
        mergeOptions: mergeOptions,
        parseOptions: parseOptions,
        play: play,
        pause: pause,
        mute: mute,
        positionAt: positionAt,
        Promise: Promise$1,
        Deferred: Deferred,
        query: query,
        queryAll: queryAll,
        find: find,
        findAll: findAll,
        escape: escape,
        css: css,
        getCssVar: getCssVar,
        propName: propName,
        isInView: isInView,
        scrollTop: scrollTop,
        scrollIntoView: scrollIntoView,
        scrolledOver: scrolledOver,
        scrollParents: scrollParents,
        getViewport: getViewport$1,
        getViewportClientHeight: getViewportClientHeight
    });
    function globalAPI(UIkit) {
        var DATA = UIkit.data;
        UIkit.use = function(plugin) {
            if (plugin.installed) {
                return;
            }
            plugin.call(null, this);
            plugin.installed = true;
            return this;
        };
        UIkit.mixin = function(mixin, component) {
            component = (isString(component) ? UIkit.component(component) : component) || this;
            component.options = mergeOptions(component.options, mixin);
        };
        UIkit.extend = function(options) {
            options = options || {};
            var Super = this;
            var Sub = function UIkitComponent(options) {
                this._init(options);
            };
            Sub.prototype = Object.create(Super.prototype);
            Sub.prototype.constructor = Sub;
            Sub.options = mergeOptions(Super.options, options);
            Sub.super = Super;
            Sub.extend = Super.extend;
            return Sub;
        };
        UIkit.update = function(element, e) {
            element = element ? toNode(element) : document.body;
            parents(element).reverse().forEach(function(element) {
                return update(element[DATA], e);
            });
            apply$1(element, function(element) {
                return update(element[DATA], e);
            });
        };
        var container;
        Object.defineProperty(UIkit, "container", {
            get: function() {
                return container || document.body;
            },
            set: function(element) {
                container = $(element);
            }
        });
        function update(data, e) {
            if (!data) {
                return;
            }
            for (var name in data) {
                if (data[name]._connected) {
                    data[name]._callUpdate(e);
                }
            }
        }
    }
    function hooksAPI(UIkit) {
        UIkit.prototype._callHook = function(hook) {
            var this$1 = this;
            var handlers = this.$options[hook];
            if (handlers) {
                handlers.forEach(function(handler) {
                    return handler.call(this$1);
                });
            }
        };
        UIkit.prototype._callConnected = function() {
            if (this._connected) {
                return;
            }
            this._data = {};
            this._computeds = {};
            this._initProps();
            this._callHook("beforeConnect");
            this._connected = true;
            this._initEvents();
            this._initObservers();
            this._callHook("connected");
            this._callUpdate();
        };
        UIkit.prototype._callDisconnected = function() {
            if (!this._connected) {
                return;
            }
            this._callHook("beforeDisconnect");
            this._disconnectObservers();
            this._unbindEvents();
            this._callHook("disconnected");
            this._connected = false;
            delete this._watch;
        };
        UIkit.prototype._callUpdate = function(e) {
            var this$1 = this;
            if (e === void 0) e = "update";
            if (!this._connected) {
                return;
            }
            if (e === "update" || e === "resize") {
                this._callWatches();
            }
            if (!this.$options.update) {
                return;
            }
            if (!this._updates) {
                this._updates = new Set();
                fastdom.read(function() {
                    if (this$1._connected) {
                        runUpdates.call(this$1, this$1._updates);
                    }
                    delete this$1._updates;
                });
            }
            this._updates.add(e.type || e);
        };
        UIkit.prototype._callWatches = function() {
            var this$1 = this;
            if (this._watch) {
                return;
            }
            var initial = !hasOwn(this, "_watch");
            this._watch = fastdom.read(function() {
                if (this$1._connected) {
                    runWatches.call(this$1, initial);
                }
                this$1._watch = null;
            });
        };
        function runUpdates(types) {
            var this$1 = this;
            var updates = this.$options.update;
            var loop = function(i) {
                var ref = updates[i];
                var read = ref.read;
                var write = ref.write;
                var events = ref.events;
                if (!types.has("update") && (!events || !events.some(function(type) {
                    return types.has(type);
                }))) {
                    return;
                }
                var result = void 0;
                if (read) {
                    result = read.call(this$1, this$1._data, types);
                    if (result && isPlainObject(result)) {
                        assign(this$1._data, result);
                    }
                }
                if (write && result !== false) {
                    fastdom.write(function() {
                        return write.call(this$1, this$1._data, types);
                    });
                }
            };
            for (var i = 0; i < updates.length; i++) loop(i);
        }
        function runWatches(initial) {
            var ref = this;
            var computed = ref.$options.computed;
            var _computeds = ref._computeds;
            for (var key in computed) {
                var hasPrev = hasOwn(_computeds, key);
                var prev = _computeds[key];
                delete _computeds[key];
                var ref$1 = computed[key];
                var watch = ref$1.watch;
                var immediate = ref$1.immediate;
                if (watch && (initial && immediate || hasPrev && !isEqual(prev, this[key]))) {
                    watch.call(this, this[key], prev);
                }
            }
        }
    }
    function stateAPI(UIkit) {
        var uid = 0;
        UIkit.prototype._init = function(options) {
            options = options || {};
            options.data = normalizeData(options, this.constructor.options);
            this.$options = mergeOptions(this.constructor.options, options, this);
            this.$el = null;
            this.$props = {};
            this._uid = uid++;
            this._initData();
            this._initMethods();
            this._initComputeds();
            this._callHook("created");
            if (options.el) {
                this.$mount(options.el);
            }
        };
        UIkit.prototype._initData = function() {
            var ref = this.$options;
            var data = ref.data;
            if (data === void 0) data = {};
            for (var key in data) {
                this.$props[key] = this[key] = data[key];
            }
        };
        UIkit.prototype._initMethods = function() {
            var ref = this.$options;
            var methods = ref.methods;
            if (methods) {
                for (var key in methods) {
                    this[key] = methods[key].bind(this);
                }
            }
        };
        UIkit.prototype._initComputeds = function() {
            var ref = this.$options;
            var computed = ref.computed;
            this._computeds = {};
            if (computed) {
                for (var key in computed) {
                    registerComputed(this, key, computed[key]);
                }
            }
        };
        UIkit.prototype._initProps = function(props) {
            var key;
            props = props || getProps(this.$options, this.$name);
            for (key in props) {
                if (!isUndefined(props[key])) {
                    this.$props[key] = props[key];
                }
            }
            var exclude = [ this.$options.computed, this.$options.methods ];
            for (key in this.$props) {
                if (key in props && notIn(exclude, key)) {
                    this[key] = this.$props[key];
                }
            }
        };
        UIkit.prototype._initEvents = function() {
            var this$1 = this;
            this._events = [];
            var ref = this.$options;
            var events = ref.events;
            if (events) {
                events.forEach(function(event) {
                    if (!hasOwn(event, "handler")) {
                        for (var key in event) {
                            registerEvent(this$1, event[key], key);
                        }
                    } else {
                        registerEvent(this$1, event);
                    }
                });
            }
        };
        UIkit.prototype._unbindEvents = function() {
            this._events.forEach(function(unbind) {
                return unbind();
            });
            delete this._events;
        };
        UIkit.prototype._initObservers = function() {
            this._observers = [ initChildListObserver(this), initPropsObserver(this) ];
        };
        UIkit.prototype._disconnectObservers = function() {
            this._observers.forEach(function(observer) {
                return observer && observer.disconnect();
            });
        };
        function getProps(opts, name) {
            var data$1 = {};
            var args = opts.args;
            if (args === void 0) args = [];
            var props = opts.props;
            if (props === void 0) props = {};
            var el = opts.el;
            if (!props) {
                return data$1;
            }
            for (var key in props) {
                var prop = hyphenate(key);
                var value = data(el, prop);
                if (isUndefined(value)) {
                    continue;
                }
                value = props[key] === Boolean && value === "" ? true : coerce(props[key], value);
                if (prop === "target" && (!value || startsWith(value, "_"))) {
                    continue;
                }
                data$1[key] = value;
            }
            var options = parseOptions(data(el, name), args);
            for (var key$1 in options) {
                var prop$1 = camelize(key$1);
                if (props[prop$1] !== undefined) {
                    data$1[prop$1] = coerce(props[prop$1], options[key$1]);
                }
            }
            return data$1;
        }
        function registerComputed(component, key, cb) {
            Object.defineProperty(component, key, {
                enumerable: true,
                get: function() {
                    var _computeds = component._computeds;
                    var $props = component.$props;
                    var $el = component.$el;
                    if (!hasOwn(_computeds, key)) {
                        _computeds[key] = (cb.get || cb).call(component, $props, $el);
                    }
                    return _computeds[key];
                },
                set: function(value) {
                    var _computeds = component._computeds;
                    _computeds[key] = cb.set ? cb.set.call(component, value) : value;
                    if (isUndefined(_computeds[key])) {
                        delete _computeds[key];
                    }
                }
            });
        }
        function registerEvent(component, event, key) {
            if (!isPlainObject(event)) {
                event = {
                    name: key,
                    handler: event
                };
            }
            var name = event.name;
            var el = event.el;
            var handler = event.handler;
            var capture = event.capture;
            var passive = event.passive;
            var delegate = event.delegate;
            var filter = event.filter;
            var self = event.self;
            el = isFunction(el) ? el.call(component) : el || component.$el;
            if (isArray(el)) {
                el.forEach(function(el) {
                    return registerEvent(component, assign({}, event, {
                        el: el
                    }), key);
                });
                return;
            }
            if (!el || filter && !filter.call(component)) {
                return;
            }
            component._events.push(on(el, name, !delegate ? null : isString(delegate) ? delegate : delegate.call(component), isString(handler) ? component[handler] : handler.bind(component), {
                passive: passive,
                capture: capture,
                self: self
            }));
        }
        function notIn(options, key) {
            return options.every(function(arr) {
                return !arr || !hasOwn(arr, key);
            });
        }
        function coerce(type, value) {
            if (type === Boolean) {
                return toBoolean(value);
            } else if (type === Number) {
                return toNumber(value);
            } else if (type === "list") {
                return toList(value);
            }
            return type ? type(value) : value;
        }
        function toList(value) {
            return isArray(value) ? value : isString(value) ? value.split(/,(?![^(]*\))/).map(function(value) {
                return isNumeric(value) ? toNumber(value) : toBoolean(value.trim());
            }) : [ value ];
        }
        function normalizeData(ref, ref$1) {
            var data = ref.data;
            var args = ref$1.args;
            var props = ref$1.props;
            if (props === void 0) props = {};
            data = isArray(data) ? !isEmpty(args) ? data.slice(0, args.length).reduce(function(data, value, index) {
                if (isPlainObject(value)) {
                    assign(data, value);
                } else {
                    data[args[index]] = value;
                }
                return data;
            }, {}) : undefined : data;
            if (data) {
                for (var key in data) {
                    if (isUndefined(data[key])) {
                        delete data[key];
                    } else {
                        data[key] = props[key] ? coerce(props[key], data[key]) : data[key];
                    }
                }
            }
            return data;
        }
        function initChildListObserver(component) {
            var ref = component.$options;
            var el = ref.el;
            var observer = new MutationObserver(function() {
                return component.$emit();
            });
            observer.observe(el, {
                childList: true,
                subtree: true
            });
            return observer;
        }
        function initPropsObserver(component) {
            var $name = component.$name;
            var $options = component.$options;
            var $props = component.$props;
            var attrs = $options.attrs;
            var props = $options.props;
            var el = $options.el;
            if (!props || attrs === false) {
                return;
            }
            var attributes = isArray(attrs) ? attrs : Object.keys(props);
            var filter = attributes.map(function(key) {
                return hyphenate(key);
            }).concat($name);
            var observer = new MutationObserver(function(records) {
                var data = getProps($options, $name);
                if (records.some(function(ref) {
                    var attributeName = ref.attributeName;
                    var prop = attributeName.replace("data-", "");
                    return (prop === $name ? attributes : [ camelize(prop), camelize(attributeName) ]).some(function(prop) {
                        return !isUndefined(data[prop]) && data[prop] !== $props[prop];
                    });
                })) {
                    component.$reset();
                }
            });
            observer.observe(el, {
                attributes: true,
                attributeFilter: filter.concat(filter.map(function(key) {
                    return "data-" + key;
                }))
            });
            return observer;
        }
    }
    function instanceAPI(UIkit) {
        var DATA = UIkit.data;
        UIkit.prototype.$create = function(component, element, data) {
            return UIkit[component](element, data);
        };
        UIkit.prototype.$mount = function(el) {
            var ref = this.$options;
            var name = ref.name;
            if (!el[DATA]) {
                el[DATA] = {};
            }
            if (el[DATA][name]) {
                return;
            }
            el[DATA][name] = this;
            this.$el = this.$options.el = this.$options.el || el;
            if (within(el, document)) {
                this._callConnected();
            }
        };
        UIkit.prototype.$reset = function() {
            this._callDisconnected();
            this._callConnected();
        };
        UIkit.prototype.$destroy = function(removeEl) {
            if (removeEl === void 0) removeEl = false;
            var ref = this.$options;
            var el = ref.el;
            var name = ref.name;
            if (el) {
                this._callDisconnected();
            }
            this._callHook("destroy");
            if (!el || !el[DATA]) {
                return;
            }
            delete el[DATA][name];
            if (!isEmpty(el[DATA])) {
                delete el[DATA];
            }
            if (removeEl) {
                remove$1(this.$el);
            }
        };
        UIkit.prototype.$emit = function(e) {
            this._callUpdate(e);
        };
        UIkit.prototype.$update = function(element, e) {
            if (element === void 0) element = this.$el;
            UIkit.update(element, e);
        };
        UIkit.prototype.$getComponent = UIkit.getComponent;
        var componentName = memoize(function(name) {
            return UIkit.prefix + hyphenate(name);
        });
        Object.defineProperties(UIkit.prototype, {
            $container: Object.getOwnPropertyDescriptor(UIkit, "container"),
            $name: {
                get: function() {
                    return componentName(this.$options.name);
                }
            }
        });
    }
    function componentAPI(UIkit) {
        var DATA = UIkit.data;
        var components = {};
        UIkit.component = function(name, options) {
            var id = hyphenate(name);
            name = camelize(id);
            if (!options) {
                if (isPlainObject(components[name])) {
                    components[name] = UIkit.extend(components[name]);
                }
                return components[name];
            }
            UIkit[name] = function(element, data) {
                var i = arguments.length, argsArray = Array(i);
                while (i--) argsArray[i] = arguments[i];
                var component = UIkit.component(name);
                return component.options.functional ? new component({
                    data: isPlainObject(element) ? element : [].concat(argsArray)
                }) : !element ? init(element) : $$(element).map(init)[0];
                function init(element) {
                    var instance = UIkit.getComponent(element, name);
                    if (instance) {
                        if (!data) {
                            return instance;
                        } else {
                            instance.$destroy();
                        }
                    }
                    return new component({
                        el: element,
                        data: data
                    });
                }
            };
            var opt = isPlainObject(options) ? assign({}, options) : options.options;
            opt.name = name;
            if (opt.install) {
                opt.install(UIkit, opt, name);
            }
            if (UIkit._initialized && !opt.functional) {
                fastdom.read(function() {
                    return UIkit[name]("[uk-" + id + "],[data-uk-" + id + "]");
                });
            }
            return components[name] = isPlainObject(options) ? opt : options;
        };
        UIkit.getComponents = function(element) {
            return element && element[DATA] || {};
        };
        UIkit.getComponent = function(element, name) {
            return UIkit.getComponents(element)[name];
        };
        UIkit.connect = function(node) {
            if (node[DATA]) {
                for (var name in node[DATA]) {
                    node[DATA][name]._callConnected();
                }
            }
            for (var i = 0; i < node.attributes.length; i++) {
                var name$1 = getComponentName(node.attributes[i].name);
                if (name$1 && name$1 in components) {
                    UIkit[name$1](node);
                }
            }
        };
        UIkit.disconnect = function(node) {
            for (var name in node[DATA]) {
                node[DATA][name]._callDisconnected();
            }
        };
    }
    var getComponentName = memoize(function(attribute) {
        return startsWith(attribute, "uk-") || startsWith(attribute, "data-uk-") ? camelize(attribute.replace("data-uk-", "").replace("uk-", "")) : false;
    });
    var UIkit = function(options) {
        this._init(options);
    };
    UIkit.util = util;
    UIkit.data = "__uikit__";
    UIkit.prefix = "uk-";
    UIkit.options = {};
    UIkit.version = "3.7.3";
    globalAPI(UIkit);
    hooksAPI(UIkit);
    stateAPI(UIkit);
    componentAPI(UIkit);
    instanceAPI(UIkit);
    function Core(UIkit) {
        if (!inBrowser) {
            return;
        }
        var pendingResize;
        var handleResize = function() {
            if (pendingResize) {
                return;
            }
            pendingResize = true;
            fastdom.write(function() {
                return pendingResize = false;
            });
            UIkit.update(null, "resize");
        };
        on(window, "load resize", handleResize);
        on(document, "loadedmetadata load", handleResize, true);
        if ("ResizeObserver" in window) {
            new ResizeObserver(handleResize).observe(document.documentElement);
        }
        var pending;
        on(window, "scroll", function(e) {
            if (pending) {
                return;
            }
            pending = true;
            fastdom.write(function() {
                return pending = false;
            });
            UIkit.update(null, e.type);
        }, {
            passive: true,
            capture: true
        });
        var started = 0;
        on(document, "animationstart", function(ref) {
            var target = ref.target;
            if ((css(target, "animationName") || "").match(/^uk-.*(left|right)/)) {
                started++;
                css(document.documentElement, "overflowX", "hidden");
                setTimeout(function() {
                    if (!--started) {
                        css(document.documentElement, "overflowX", "");
                    }
                }, toMs(css(target, "animationDuration")) + 100);
            }
        }, true);
        on(document, pointerDown, function(e) {
            if (!isTouch(e)) {
                return;
            }
            var pos = getEventPos(e);
            var target = "tagName" in e.target ? e.target : parent(e.target);
            once(document, pointerUp + " " + pointerCancel + " scroll", function(e) {
                var ref = getEventPos(e);
                var x = ref.x;
                var y = ref.y;
                if (e.type !== "scroll" && target && x && Math.abs(pos.x - x) > 100 || y && Math.abs(pos.y - y) > 100) {
                    setTimeout(function() {
                        trigger(target, "swipe");
                        trigger(target, "swipe" + swipeDirection(pos.x, pos.y, x, y));
                    });
                }
            });
        }, {
            passive: true
        });
    }
    function swipeDirection(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? "Left" : "Right" : y1 - y2 > 0 ? "Up" : "Down";
    }
    function boot(UIkit) {
        var connect = UIkit.connect;
        var disconnect = UIkit.disconnect;
        if (!inBrowser || !window.MutationObserver) {
            return;
        }
        fastdom.read(function() {
            if (document.body) {
                apply$1(document.body, connect);
            }
            new MutationObserver(function(records) {
                return records.forEach(applyChildListMutation);
            }).observe(document, {
                childList: true,
                subtree: true
            });
            new MutationObserver(function(records) {
                return records.forEach(applyAttributeMutation);
            }).observe(document, {
                attributes: true,
                subtree: true
            });
            UIkit._initialized = true;
        });
        function applyChildListMutation(ref) {
            var addedNodes = ref.addedNodes;
            var removedNodes = ref.removedNodes;
            for (var i = 0; i < addedNodes.length; i++) {
                apply$1(addedNodes[i], connect);
            }
            for (var i$1 = 0; i$1 < removedNodes.length; i$1++) {
                apply$1(removedNodes[i$1], disconnect);
            }
        }
        function applyAttributeMutation(ref) {
            var target = ref.target;
            var attributeName = ref.attributeName;
            var name = getComponentName(attributeName);
            if (!name || !(name in UIkit)) {
                return;
            }
            if (hasAttr(target, attributeName)) {
                UIkit[name](target);
                return;
            }
            var component = UIkit.getComponent(target, name);
            if (component) {
                component.$destroy();
            }
        }
    }
    var Class = {
        connected: function() {
            !hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
        }
    };
    var Togglable = {
        props: {
            cls: Boolean,
            animation: "list",
            duration: Number,
            origin: String,
            transition: String
        },
        data: {
            cls: false,
            animation: [ false ],
            duration: 200,
            origin: false,
            transition: "linear",
            clsEnter: "uk-togglabe-enter",
            clsLeave: "uk-togglabe-leave",
            initProps: {
                overflow: "",
                height: "",
                paddingTop: "",
                paddingBottom: "",
                marginTop: "",
                marginBottom: ""
            },
            hideProps: {
                overflow: "hidden",
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginBottom: 0
            }
        },
        computed: {
            hasAnimation: function(ref) {
                var animation = ref.animation;
                return !!animation[0];
            },
            hasTransition: function(ref) {
                var animation = ref.animation;
                return this.hasAnimation && animation[0] === true;
            }
        },
        methods: {
            toggleElement: function(targets, toggle, animate) {
                var this$1 = this;
                return new Promise$1(function(resolve) {
                    return Promise$1.all(toNodes(targets).map(function(el) {
                        var show = isBoolean(toggle) ? toggle : !this$1.isToggled(el);
                        if (!trigger(el, "before" + (show ? "show" : "hide"), [ this$1 ])) {
                            return Promise$1.reject();
                        }
                        var promise = (isFunction(animate) ? animate : animate === false || !this$1.hasAnimation ? this$1._toggle : this$1.hasTransition ? toggleHeight(this$1) : toggleAnimation(this$1))(el, show);
                        var cls = show ? this$1.clsEnter : this$1.clsLeave;
                        addClass(el, cls);
                        trigger(el, show ? "show" : "hide", [ this$1 ]);
                        var done = function() {
                            removeClass(el, cls);
                            trigger(el, show ? "shown" : "hidden", [ this$1 ]);
                            this$1.$update(el);
                        };
                        return promise ? promise.then(done, function() {
                            removeClass(el, cls);
                            return Promise$1.reject();
                        }) : done();
                    })).then(resolve, noop);
                });
            },
            isToggled: function(el) {
                if (el === void 0) el = this.$el;
                return hasClass(el, this.clsEnter) ? true : hasClass(el, this.clsLeave) ? false : this.cls ? hasClass(el, this.cls.split(" ")[0]) : !hasAttr(el, "hidden");
            },
            _toggle: function(el, toggled) {
                if (!el) {
                    return;
                }
                toggled = Boolean(toggled);
                var changed;
                if (this.cls) {
                    changed = includes(this.cls, " ") || toggled !== hasClass(el, this.cls);
                    changed && toggleClass(el, this.cls, includes(this.cls, " ") ? undefined : toggled);
                } else {
                    changed = toggled === el.hidden;
                    changed && (el.hidden = !toggled);
                }
                $$("[autofocus]", el).some(function(el) {
                    return isVisible(el) ? el.focus() || true : el.blur();
                });
                if (changed) {
                    trigger(el, "toggled", [ toggled, this ]);
                    this.$update(el);
                }
            }
        }
    };
    function toggleHeight(ref) {
        var isToggled = ref.isToggled;
        var duration = ref.duration;
        var initProps = ref.initProps;
        var hideProps = ref.hideProps;
        var transition = ref.transition;
        var _toggle = ref._toggle;
        return function(el, show) {
            var inProgress = Transition.inProgress(el);
            var inner = el.hasChildNodes ? toFloat(css(el.firstElementChild, "marginTop")) + toFloat(css(el.lastElementChild, "marginBottom")) : 0;
            var currentHeight = isVisible(el) ? height(el) + (inProgress ? 0 : inner) : 0;
            Transition.cancel(el);
            if (!isToggled(el)) {
                _toggle(el, true);
            }
            height(el, "");
            fastdom.flush();
            var endHeight = height(el) + (inProgress ? 0 : inner);
            height(el, currentHeight);
            return (show ? Transition.start(el, assign({}, initProps, {
                overflow: "hidden",
                height: endHeight
            }), Math.round(duration * (1 - currentHeight / endHeight)), transition) : Transition.start(el, hideProps, Math.round(duration * (currentHeight / endHeight)), transition).then(function() {
                return _toggle(el, false);
            })).then(function() {
                return css(el, initProps);
            });
        };
    }
    function toggleAnimation(cmp) {
        return function(el, show) {
            Animation.cancel(el);
            var animation = cmp.animation;
            var duration = cmp.duration;
            var _toggle = cmp._toggle;
            if (show) {
                _toggle(el, true);
                return Animation.in(el, animation[0], duration, cmp.origin);
            }
            return Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(function() {
                return _toggle(el, false);
            });
        };
    }
    var Accordion = {
        mixins: [ Class, Togglable ],
        props: {
            targets: String,
            active: null,
            collapsible: Boolean,
            multiple: Boolean,
            toggle: String,
            content: String,
            transition: String,
            offset: Number
        },
        data: {
            targets: "> *",
            active: false,
            animation: [ true ],
            collapsible: true,
            multiple: false,
            clsOpen: "uk-open",
            toggle: "> .uk-accordion-title",
            content: "> .uk-accordion-content",
            transition: "ease",
            offset: 0
        },
        computed: {
            items: {
                get: function(ref, $el) {
                    var targets = ref.targets;
                    return $$(targets, $el);
                },
                watch: function(items, prev) {
                    var this$1 = this;
                    items.forEach(function(el) {
                        return hide($(this$1.content, el), !hasClass(el, this$1.clsOpen));
                    });
                    if (prev || hasClass(items, this.clsOpen)) {
                        return;
                    }
                    var active = this.active !== false && items[Number(this.active)] || !this.collapsible && items[0];
                    if (active) {
                        this.toggle(active, false);
                    }
                },
                immediate: true
            },
            toggles: function(ref) {
                var toggle = ref.toggle;
                return this.items.map(function(item) {
                    return $(toggle, item);
                });
            }
        },
        events: [ {
            name: "click",
            delegate: function() {
                return this.targets + " " + this.$props.toggle;
            },
            handler: function(e) {
                e.preventDefault();
                this.toggle(index(this.toggles, e.current));
            }
        } ],
        methods: {
            toggle: function(item, animate) {
                var this$1 = this;
                var items = [ this.items[getIndex(item, this.items)] ];
                var activeItems = filter$1(this.items, "." + this.clsOpen);
                if (!this.multiple && !includes(activeItems, items[0])) {
                    items = items.concat(activeItems);
                }
                if (!this.collapsible && activeItems.length < 2 && !filter$1(items, ":not(." + this.clsOpen + ")").length) {
                    return;
                }
                items.forEach(function(el) {
                    return this$1.toggleElement(el, !hasClass(el, this$1.clsOpen), function(el, show) {
                        toggleClass(el, this$1.clsOpen, show);
                        attr($(this$1.$props.toggle, el), "aria-expanded", show);
                        var content = $("" + (el._wrapper ? "> * " : "") + this$1.content, el);
                        if (animate === false || !this$1.hasTransition) {
                            hide(content, !show);
                            return;
                        }
                        if (!el._wrapper) {
                            el._wrapper = wrapAll(content, "<div" + (show ? " hidden" : "") + ">");
                        }
                        hide(content, false);
                        return toggleHeight(this$1)(el._wrapper, show).then(function() {
                            hide(content, !show);
                            delete el._wrapper;
                            unwrap(content);
                            if (show) {
                                var toggle = $(this$1.$props.toggle, el);
                                if (!isInView(toggle)) {
                                    scrollIntoView(toggle, {
                                        offset: this$1.offset
                                    });
                                }
                            }
                        });
                    });
                });
            }
        }
    };
    function hide(el, hide) {
        el && (el.hidden = hide);
    }
    var alert = {
        mixins: [ Class, Togglable ],
        args: "animation",
        props: {
            close: String
        },
        data: {
            animation: [ true ],
            selClose: ".uk-alert-close",
            duration: 150,
            hideProps: assign({
                opacity: 0
            }, Togglable.data.hideProps)
        },
        events: [ {
            name: "click",
            delegate: function() {
                return this.selClose;
            },
            handler: function(e) {
                e.preventDefault();
                this.close();
            }
        } ],
        methods: {
            close: function() {
                var this$1 = this;
                this.toggleElement(this.$el).then(function() {
                    return this$1.$destroy(true);
                });
            }
        }
    };
    var Video = {
        args: "autoplay",
        props: {
            automute: Boolean,
            autoplay: Boolean
        },
        data: {
            automute: false,
            autoplay: true
        },
        computed: {
            inView: function(ref) {
                var autoplay = ref.autoplay;
                return autoplay === "inview";
            }
        },
        connected: function() {
            if (this.inView && !hasAttr(this.$el, "preload")) {
                this.$el.preload = "none";
            }
            if (this.automute) {
                mute(this.$el);
            }
        },
        update: {
            read: function() {
                return {
                    visible: isVisible(this.$el) && css(this.$el, "visibility") !== "hidden",
                    inView: this.inView && isInView(this.$el)
                };
            },
            write: function(ref) {
                var visible = ref.visible;
                var inView = ref.inView;
                if (!visible || this.inView && !inView) {
                    pause(this.$el);
                } else if (this.autoplay === true || this.inView && inView) {
                    play(this.$el);
                }
            },
            events: [ "resize", "scroll" ]
        }
    };
    var cover = {
        mixins: [ Class, Video ],
        props: {
            width: Number,
            height: Number
        },
        data: {
            automute: true
        },
        update: {
            read: function() {
                var el = this.$el;
                var ref = getPositionedParent(el) || parent(el);
                var height = ref.offsetHeight;
                var width = ref.offsetWidth;
                var dim = Dimensions.cover({
                    width: this.width || el.naturalWidth || el.videoWidth || el.clientWidth,
                    height: this.height || el.naturalHeight || el.videoHeight || el.clientHeight
                }, {
                    width: width + (width % 2 ? 1 : 0),
                    height: height + (height % 2 ? 1 : 0)
                });
                if (!dim.width || !dim.height) {
                    return false;
                }
                return dim;
            },
            write: function(ref) {
                var height = ref.height;
                var width = ref.width;
                css(this.$el, {
                    height: height,
                    width: width
                });
            },
            events: [ "resize" ]
        }
    };
    function getPositionedParent(el) {
        while (el = parent(el)) {
            if (css(el, "position") !== "static") {
                return el;
            }
        }
    }
    var Container = {
        props: {
            container: Boolean
        },
        data: {
            container: true
        },
        computed: {
            container: function(ref) {
                var container = ref.container;
                return container === true && this.$container || container && $(container);
            }
        }
    };
    var Position = {
        props: {
            pos: String,
            offset: null,
            flip: Boolean,
            clsPos: String
        },
        data: {
            pos: "bottom-" + (!isRtl ? "left" : "right"),
            flip: true,
            offset: false,
            clsPos: ""
        },
        computed: {
            pos: function(ref) {
                var pos = ref.pos;
                return (pos + (!includes(pos, "-") ? "-center" : "")).split("-");
            },
            dir: function() {
                return this.pos[0];
            },
            align: function() {
                return this.pos[1];
            }
        },
        methods: {
            positionAt: function(element, target, boundary) {
                removeClasses(element, this.clsPos + "-(top|bottom|left|right)(-[a-z]+)?");
                var ref = this;
                var offset$1 = ref.offset;
                var axis = this.getAxis();
                if (!isNumeric(offset$1)) {
                    var node = $(offset$1);
                    offset$1 = node ? offset(node)[axis === "x" ? "left" : "top"] - offset(target)[axis === "x" ? "right" : "bottom"] : 0;
                }
                var ref$1 = positionAt(element, target, axis === "x" ? flipPosition(this.dir) + " " + this.align : this.align + " " + flipPosition(this.dir), axis === "x" ? this.dir + " " + this.align : this.align + " " + this.dir, axis === "x" ? "" + (this.dir === "left" ? -offset$1 : offset$1) : " " + (this.dir === "top" ? -offset$1 : offset$1), null, this.flip, boundary).target;
                var x = ref$1.x;
                var y = ref$1.y;
                this.dir = axis === "x" ? x : y;
                this.align = axis === "x" ? y : x;
                toggleClass(element, this.clsPos + "-" + this.dir + "-" + this.align, this.offset === false);
            },
            getAxis: function() {
                return this.dir === "top" || this.dir === "bottom" ? "y" : "x";
            }
        }
    };
    var active$1;
    var drop = {
        mixins: [ Container, Position, Togglable ],
        args: "pos",
        props: {
            mode: "list",
            toggle: Boolean,
            boundary: Boolean,
            boundaryAlign: Boolean,
            delayShow: Number,
            delayHide: Number,
            clsDrop: String
        },
        data: {
            mode: [ "click", "hover" ],
            toggle: "- *",
            boundary: true,
            boundaryAlign: false,
            delayShow: 0,
            delayHide: 800,
            clsDrop: false,
            animation: [ "uk-animation-fade" ],
            cls: "uk-open",
            container: false
        },
        computed: {
            boundary: function(ref, $el) {
                var boundary = ref.boundary;
                return boundary === true ? window : query(boundary, $el);
            },
            clsDrop: function(ref) {
                var clsDrop = ref.clsDrop;
                return clsDrop || "uk-" + this.$options.name;
            },
            clsPos: function() {
                return this.clsDrop;
            }
        },
        created: function() {
            this.tracker = new MouseTracker();
        },
        connected: function() {
            addClass(this.$el, this.clsDrop);
            if (this.toggle && !this.target) {
                this.target = this.$create("toggle", query(this.toggle, this.$el), {
                    target: this.$el,
                    mode: this.mode
                });
            }
        },
        disconnected: function() {
            if (this.isActive()) {
                active$1 = null;
            }
        },
        events: [ {
            name: "click",
            delegate: function() {
                return "." + this.clsDrop + "-close";
            },
            handler: function(e) {
                e.preventDefault();
                this.hide(false);
            }
        }, {
            name: "click",
            delegate: function() {
                return 'a[href^="#"]';
            },
            handler: function(ref) {
                var defaultPrevented = ref.defaultPrevented;
                var hash = ref.current.hash;
                if (!defaultPrevented && hash && !within(hash, this.$el)) {
                    this.hide(false);
                }
            }
        }, {
            name: "beforescroll",
            handler: function() {
                this.hide(false);
            }
        }, {
            name: "toggle",
            self: true,
            handler: function(e, toggle) {
                e.preventDefault();
                if (this.isToggled()) {
                    this.hide(false);
                } else {
                    this.show(toggle.$el, false);
                }
            }
        }, {
            name: "toggleshow",
            self: true,
            handler: function(e, toggle) {
                e.preventDefault();
                this.show(toggle.$el);
            }
        }, {
            name: "togglehide",
            self: true,
            handler: function(e) {
                e.preventDefault();
                this.hide();
            }
        }, {
            name: pointerEnter + " focusin",
            filter: function() {
                return includes(this.mode, "hover");
            },
            handler: function(e) {
                if (!isTouch(e)) {
                    this.clearTimers();
                }
            }
        }, {
            name: pointerLeave + " focusout",
            filter: function() {
                return includes(this.mode, "hover");
            },
            handler: function(e) {
                if (!isTouch(e) && e.relatedTarget) {
                    this.hide();
                }
            }
        }, {
            name: "toggled",
            self: true,
            handler: function(e, toggled) {
                if (!toggled) {
                    return;
                }
                this.clearTimers();
                this.position();
            }
        }, {
            name: "show",
            self: true,
            handler: function() {
                var this$1 = this;
                active$1 = this;
                this.tracker.init();
                once(this.$el, "hide", on(document, pointerDown, function(ref) {
                    var target = ref.target;
                    return !within(target, this$1.$el) && once(document, pointerUp + " " + pointerCancel + " scroll", function(ref) {
                        var defaultPrevented = ref.defaultPrevented;
                        var type = ref.type;
                        var newTarget = ref.target;
                        if (!defaultPrevented && type === pointerUp && target === newTarget && !(this$1.target && within(target, this$1.target))) {
                            this$1.hide(false);
                        }
                    }, true);
                }), {
                    self: true
                });
                once(this.$el, "hide", on(document, "keydown", function(e) {
                    if (e.keyCode === 27) {
                        this$1.hide(false);
                    }
                }), {
                    self: true
                });
            }
        }, {
            name: "beforehide",
            self: true,
            handler: function() {
                this.clearTimers();
            }
        }, {
            name: "hide",
            handler: function(ref) {
                var target = ref.target;
                if (this.$el !== target) {
                    active$1 = active$1 === null && within(target, this.$el) && this.isToggled() ? this : active$1;
                    return;
                }
                active$1 = this.isActive() ? null : active$1;
                this.tracker.cancel();
            }
        } ],
        update: {
            write: function() {
                if (this.isToggled() && !hasClass(this.$el, this.clsEnter)) {
                    this.position();
                }
            },
            events: [ "resize" ]
        },
        methods: {
            show: function(target, delay) {
                var this$1 = this;
                if (target === void 0) target = this.target;
                if (delay === void 0) delay = true;
                if (this.isToggled() && target && this.target && target !== this.target) {
                    this.hide(false);
                }
                this.target = target;
                this.clearTimers();
                if (this.isActive()) {
                    return;
                }
                if (active$1) {
                    if (delay && active$1.isDelaying) {
                        this.showTimer = setTimeout(this.show, 10);
                        return;
                    }
                    var prev;
                    while (active$1 && prev !== active$1 && !within(this.$el, active$1.$el)) {
                        prev = active$1;
                        active$1.hide(false);
                    }
                }
                if (this.container && parent(this.$el) !== this.container) {
                    append(this.container, this.$el);
                }
                this.showTimer = setTimeout(function() {
                    return this$1.toggleElement(this$1.$el, true);
                }, delay && this.delayShow || 0);
            },
            hide: function(delay) {
                var this$1 = this;
                if (delay === void 0) delay = true;
                var hide = function() {
                    return this$1.toggleElement(this$1.$el, false, false);
                };
                this.clearTimers();
                this.isDelaying = getPositionedElements(this.$el).some(function(el) {
                    return this$1.tracker.movesTo(el);
                });
                if (delay && this.isDelaying) {
                    this.hideTimer = setTimeout(this.hide, 50);
                } else if (delay && this.delayHide) {
                    this.hideTimer = setTimeout(hide, this.delayHide);
                } else {
                    hide();
                }
            },
            clearTimers: function() {
                clearTimeout(this.showTimer);
                clearTimeout(this.hideTimer);
                this.showTimer = null;
                this.hideTimer = null;
                this.isDelaying = false;
            },
            isActive: function() {
                return active$1 === this;
            },
            position: function() {
                removeClass(this.$el, this.clsDrop + "-stack");
                toggleClass(this.$el, this.clsDrop + "-boundary", this.boundaryAlign);
                var boundary = offset(this.boundary);
                var alignTo = this.boundaryAlign ? boundary : offset(this.target);
                if (this.align === "justify") {
                    var prop = this.getAxis() === "y" ? "width" : "height";
                    css(this.$el, prop, alignTo[prop]);
                } else if (this.boundary && this.$el.offsetWidth > Math.max(boundary.right - alignTo.left, alignTo.right - boundary.left)) {
                    addClass(this.$el, this.clsDrop + "-stack");
                }
                this.positionAt(this.$el, this.boundaryAlign ? this.boundary : this.target, this.boundary);
            }
        }
    };
    function getPositionedElements(el) {
        var result = [];
        apply$1(el, function(el) {
            return css(el, "position") !== "static" && result.push(el);
        });
        return result;
    }
    var formCustom = {
        mixins: [ Class ],
        args: "target",
        props: {
            target: Boolean
        },
        data: {
            target: false
        },
        computed: {
            input: function(_, $el) {
                return $(selInput, $el);
            },
            state: function() {
                return this.input.nextElementSibling;
            },
            target: function(ref, $el) {
                var target = ref.target;
                return target && (target === true && parent(this.input) === $el && this.input.nextElementSibling || query(target, $el));
            }
        },
        update: function() {
            var ref = this;
            var target = ref.target;
            var input = ref.input;
            if (!target) {
                return;
            }
            var option;
            var prop = isInput(target) ? "value" : "textContent";
            var prev = target[prop];
            var value = input.files && input.files[0] ? input.files[0].name : matches(input, "select") && (option = $$("option", input).filter(function(el) {
                return el.selected;
            })[0]) ? option.textContent : input.value;
            if (prev !== value) {
                target[prop] = value;
            }
        },
        events: [ {
            name: "change",
            handler: function() {
                this.$update();
            }
        }, {
            name: "reset",
            el: function() {
                return closest(this.$el, "form");
            },
            handler: function() {
                this.$update();
            }
        } ]
    };
    var gif = {
        update: {
            read: function(data) {
                var inview = isInView(this.$el);
                if (!inview || data.isInView === inview) {
                    return false;
                }
                data.isInView = inview;
            },
            write: function() {
                this.$el.src = "" + this.$el.src;
            },
            events: [ "scroll", "resize" ]
        }
    };
    var Margin = {
        props: {
            margin: String,
            firstColumn: Boolean
        },
        data: {
            margin: "uk-margin-small-top",
            firstColumn: "uk-first-column"
        },
        update: {
            read: function() {
                var rows = getRows(this.$el.children);
                return {
                    rows: rows,
                    columns: getColumns(rows)
                };
            },
            write: function(ref) {
                var columns = ref.columns;
                var rows = ref.rows;
                for (var i = 0; i < rows.length; i++) {
                    for (var j = 0; j < rows[i].length; j++) {
                        toggleClass(rows[i][j], this.margin, i !== 0);
                        toggleClass(rows[i][j], this.firstColumn, !!~columns[0].indexOf(rows[i][j]));
                    }
                }
            },
            events: [ "resize" ]
        }
    };
    function getRows(items) {
        return sortBy(items, "top", "bottom");
    }
    function getColumns(rows) {
        var columns = [];
        for (var i = 0; i < rows.length; i++) {
            var sorted = sortBy(rows[i], "left", "right");
            for (var j = 0; j < sorted.length; j++) {
                columns[j] = !columns[j] ? sorted[j] : columns[j].concat(sorted[j]);
            }
        }
        return isRtl ? columns.reverse() : columns;
    }
    function sortBy(items, startProp, endProp) {
        var sorted = [ [] ];
        for (var i = 0; i < items.length; i++) {
            var el = items[i];
            if (!isVisible(el)) {
                continue;
            }
            var dim = getOffset(el);
            for (var j = sorted.length - 1; j >= 0; j--) {
                var current = sorted[j];
                if (!current[0]) {
                    current.push(el);
                    break;
                }
                var startDim = void 0;
                if (current[0].offsetParent === el.offsetParent) {
                    startDim = getOffset(current[0]);
                } else {
                    dim = getOffset(el, true);
                    startDim = getOffset(current[0], true);
                }
                if (dim[startProp] >= startDim[endProp] - 1 && dim[startProp] !== startDim[startProp]) {
                    sorted.push([ el ]);
                    break;
                }
                if (dim[endProp] - 1 > startDim[startProp] || dim[startProp] === startDim[startProp]) {
                    current.push(el);
                    break;
                }
                if (j === 0) {
                    sorted.unshift([ el ]);
                    break;
                }
            }
        }
        return sorted;
    }
    function getOffset(element, offset) {
        var assign;
        if (offset === void 0) offset = false;
        var offsetTop = element.offsetTop;
        var offsetLeft = element.offsetLeft;
        var offsetHeight = element.offsetHeight;
        var offsetWidth = element.offsetWidth;
        if (offset) {
            assign = offsetPosition(element), offsetTop = assign[0], offsetLeft = assign[1];
        }
        return {
            top: offsetTop,
            left: offsetLeft,
            bottom: offsetTop + offsetHeight,
            right: offsetLeft + offsetWidth
        };
    }
    var grid = {
        extends: Margin,
        mixins: [ Class ],
        name: "grid",
        props: {
            masonry: Boolean,
            parallax: Number
        },
        data: {
            margin: "uk-grid-margin",
            clsStack: "uk-grid-stack",
            masonry: false,
            parallax: 0
        },
        connected: function() {
            this.masonry && addClass(this.$el, "uk-flex-top uk-flex-wrap-top");
        },
        update: [ {
            write: function(ref) {
                var columns = ref.columns;
                toggleClass(this.$el, this.clsStack, columns.length < 2);
            },
            events: [ "resize" ]
        }, {
            read: function(data) {
                var columns = data.columns;
                var rows = data.rows;
                if (!columns.length || !this.masonry && !this.parallax || positionedAbsolute(this.$el)) {
                    data.translates = false;
                    return false;
                }
                var translates = false;
                var nodes = children(this.$el);
                var columnHeights = getColumnHeights(columns);
                var margin = getMarginTop(nodes, this.margin) * (rows.length - 1);
                var elHeight = Math.max.apply(Math, columnHeights) + margin;
                if (this.masonry) {
                    columns = columns.map(function(column) {
                        return sortBy$1(column, "offsetTop");
                    });
                    translates = getTranslates(rows, columns);
                }
                var padding = Math.abs(this.parallax);
                if (padding) {
                    padding = columnHeights.reduce(function(newPadding, hgt, i) {
                        return Math.max(newPadding, hgt + margin + (i % 2 ? padding : padding / 8) - elHeight);
                    }, 0);
                }
                return {
                    padding: padding,
                    columns: columns,
                    translates: translates,
                    height: translates ? elHeight : ""
                };
            },
            write: function(ref) {
                var height = ref.height;
                var padding = ref.padding;
                css(this.$el, "paddingBottom", padding || "");
                height !== false && css(this.$el, "height", height);
            },
            events: [ "resize" ]
        }, {
            read: function(ref) {
                var height$1 = ref.height;
                if (positionedAbsolute(this.$el)) {
                    return false;
                }
                return {
                    scrolled: this.parallax ? scrolledOver(this.$el, height$1 ? height$1 - height(this.$el) : 0) * Math.abs(this.parallax) : false
                };
            },
            write: function(ref) {
                var columns = ref.columns;
                var scrolled = ref.scrolled;
                var translates = ref.translates;
                if (scrolled === false && !translates) {
                    return;
                }
                columns.forEach(function(column, i) {
                    return column.forEach(function(el, j) {
                        return css(el, "transform", !scrolled && !translates ? "" : "translateY(" + ((translates && -translates[i][j]) + (scrolled ? i % 2 ? scrolled : scrolled / 8 : 0)) + "px)");
                    });
                });
            },
            events: [ "scroll", "resize" ]
        } ]
    };
    function positionedAbsolute(el) {
        return children(el).some(function(el) {
            return css(el, "position") === "absolute";
        });
    }
    function getTranslates(rows, columns) {
        var rowHeights = rows.map(function(row) {
            return Math.max.apply(Math, row.map(function(el) {
                return el.offsetHeight;
            }));
        });
        return columns.map(function(elements) {
            var prev = 0;
            return elements.map(function(element, row) {
                return prev += row ? rowHeights[row - 1] - elements[row - 1].offsetHeight : 0;
            });
        });
    }
    function getMarginTop(nodes, cls) {
        var ref = nodes.filter(function(el) {
            return hasClass(el, cls);
        });
        var node = ref[0];
        return toFloat(node ? css(node, "marginTop") : css(nodes[0], "paddingLeft"));
    }
    function getColumnHeights(columns) {
        return columns.map(function(column) {
            return column.reduce(function(sum, el) {
                return sum + el.offsetHeight;
            }, 0);
        });
    }
    var FlexBug = isIE ? {
        props: {
            selMinHeight: String
        },
        data: {
            selMinHeight: false,
            forceHeight: false
        },
        computed: {
            elements: function(ref, $el) {
                var selMinHeight = ref.selMinHeight;
                return selMinHeight ? $$(selMinHeight, $el) : [ $el ];
            }
        },
        update: [ {
            read: function() {
                css(this.elements, "height", "");
            },
            order: -5,
            events: [ "resize" ]
        }, {
            write: function() {
                var this$1 = this;
                this.elements.forEach(function(el) {
                    var height = toFloat(css(el, "minHeight"));
                    if (height && (this$1.forceHeight || Math.round(height + boxModelAdjust(el, "height", "content-box")) >= el.offsetHeight)) {
                        css(el, "height", height);
                    }
                });
            },
            order: 5,
            events: [ "resize" ]
        } ]
    } : {};
    var heightMatch = {
        mixins: [ FlexBug ],
        args: "target",
        props: {
            target: String,
            row: Boolean
        },
        data: {
            target: "> *",
            row: true,
            forceHeight: true
        },
        computed: {
            elements: function(ref, $el) {
                var target = ref.target;
                return $$(target, $el);
            }
        },
        update: {
            read: function() {
                return {
                    rows: (this.row ? getRows(this.elements) : [ this.elements ]).map(match$1)
                };
            },
            write: function(ref) {
                var rows = ref.rows;
                rows.forEach(function(ref) {
                    var heights = ref.heights;
                    var elements = ref.elements;
                    return elements.forEach(function(el, i) {
                        return css(el, "minHeight", heights[i]);
                    });
                });
            },
            events: [ "resize" ]
        }
    };
    function match$1(elements) {
        if (elements.length < 2) {
            return {
                heights: [ "" ],
                elements: elements
            };
        }
        var heights = elements.map(getHeight);
        var max = Math.max.apply(Math, heights);
        var hasMinHeight = elements.some(function(el) {
            return el.style.minHeight;
        });
        var hasShrunk = elements.some(function(el, i) {
            return !el.style.minHeight && heights[i] < max;
        });
        if (hasMinHeight && hasShrunk) {
            css(elements, "minHeight", "");
            heights = elements.map(getHeight);
            max = Math.max.apply(Math, heights);
        }
        heights = elements.map(function(el, i) {
            return heights[i] === max && toFloat(el.style.minHeight).toFixed(2) !== max.toFixed(2) ? "" : max;
        });
        return {
            heights: heights,
            elements: elements
        };
    }
    function getHeight(element) {
        var style = false;
        if (!isVisible(element)) {
            style = element.style.display;
            css(element, "display", "block", "important");
        }
        var height = dimensions(element).height - boxModelAdjust(element, "height", "content-box");
        if (style !== false) {
            css(element, "display", style);
        }
        return height;
    }
    var heightViewport = {
        mixins: [ FlexBug ],
        props: {
            expand: Boolean,
            offsetTop: Boolean,
            offsetBottom: Boolean,
            minHeight: Number
        },
        data: {
            expand: false,
            offsetTop: false,
            offsetBottom: false,
            minHeight: 0
        },
        update: {
            read: function(ref) {
                var prev = ref.minHeight;
                if (!isVisible(this.$el)) {
                    return false;
                }
                var minHeight = "";
                var box = boxModelAdjust(this.$el, "height", "content-box");
                if (this.expand) {
                    minHeight = height(window) - (dimensions(document.documentElement).height - dimensions(this.$el).height) - box || "";
                } else {
                    minHeight = "calc(100vh";
                    if (this.offsetTop) {
                        var ref$1 = offset(this.$el);
                        var top = ref$1.top;
                        minHeight += top > 0 && top < height(window) / 2 ? " - " + top + "px" : "";
                    }
                    if (this.offsetBottom === true) {
                        minHeight += " - " + dimensions(this.$el.nextElementSibling).height + "px";
                    } else if (isNumeric(this.offsetBottom)) {
                        minHeight += " - " + this.offsetBottom + "vh";
                    } else if (this.offsetBottom && endsWith(this.offsetBottom, "px")) {
                        minHeight += " - " + toFloat(this.offsetBottom) + "px";
                    } else if (isString(this.offsetBottom)) {
                        minHeight += " - " + dimensions(query(this.offsetBottom, this.$el)).height + "px";
                    }
                    minHeight += (box ? " - " + box + "px" : "") + ")";
                }
                return {
                    minHeight: minHeight,
                    prev: prev
                };
            },
            write: function(ref) {
                var minHeight = ref.minHeight;
                var prev = ref.prev;
                css(this.$el, {
                    minHeight: minHeight
                });
                if (minHeight !== prev) {
                    this.$update(this.$el, "resize");
                }
                if (this.minHeight && toFloat(css(this.$el, "minHeight")) < this.minHeight) {
                    css(this.$el, "minHeight", this.minHeight);
                }
            },
            events: [ "resize" ]
        }
    };
    var SVG = {
        args: "src",
        props: {
            id: Boolean,
            icon: String,
            src: String,
            style: String,
            width: Number,
            height: Number,
            ratio: Number,
            class: String,
            strokeAnimation: Boolean,
            focusable: Boolean,
            attributes: "list"
        },
        data: {
            ratio: 1,
            include: [ "style", "class", "focusable" ],
            class: "",
            strokeAnimation: false
        },
        beforeConnect: function() {
            this.class += " uk-svg";
        },
        connected: function() {
            var this$1 = this;
            var assign;
            if (!this.icon && includes(this.src, "#")) {
                assign = this.src.split("#"), this.src = assign[0], this.icon = assign[1];
            }
            this.svg = this.getSvg().then(function(el) {
                if (this$1._connected) {
                    var svg = insertSVG(el, this$1.$el);
                    if (this$1.svgEl && svg !== this$1.svgEl) {
                        remove$1(this$1.svgEl);
                    }
                    this$1.applyAttributes(svg, el);
                    this$1.$emit();
                    return this$1.svgEl = svg;
                }
            }, noop);
        },
        disconnected: function() {
            var this$1 = this;
            this.svg.then(function(svg) {
                if (!this$1._connected) {
                    if (isVoidElement(this$1.$el)) {
                        this$1.$el.hidden = false;
                    }
                    remove$1(svg);
                    this$1.svgEl = null;
                }
            });
            this.svg = null;
        },
        update: {
            read: function() {
                return !!(this.strokeAnimation && this.svgEl && isVisible(this.svgEl));
            },
            write: function() {
                applyAnimation(this.svgEl);
            },
            type: [ "resize" ]
        },
        methods: {
            getSvg: function() {
                var this$1 = this;
                return loadSVG(this.src).then(function(svg) {
                    return parseSVG(svg, this$1.icon) || Promise$1.reject("SVG not found.");
                });
            },
            applyAttributes: function(el, ref) {
                var this$1 = this;
                for (var prop in this.$options.props) {
                    if (includes(this.include, prop) && prop in this) {
                        attr(el, prop, this[prop]);
                    }
                }
                for (var attribute in this.attributes) {
                    var ref$1 = this.attributes[attribute].split(":", 2);
                    var prop$1 = ref$1[0];
                    var value = ref$1[1];
                    attr(el, prop$1, value);
                }
                if (!this.id) {
                    removeAttr(el, "id");
                }
                var props = [ "width", "height" ];
                var dimensions = props.map(function(prop) {
                    return this$1[prop];
                });
                if (!dimensions.some(function(val) {
                    return val;
                })) {
                    dimensions = props.map(function(prop) {
                        return attr(ref, prop);
                    });
                }
                var viewBox = attr(ref, "viewBox");
                if (viewBox && !dimensions.some(function(val) {
                    return val;
                })) {
                    dimensions = viewBox.split(" ").slice(2);
                }
                dimensions.forEach(function(val, i) {
                    return attr(el, props[i], toFloat(val) * this$1.ratio || null);
                });
            }
        }
    };
    var loadSVG = memoize(function(src) {
        return new Promise$1(function(resolve, reject) {
            if (!src) {
                reject();
                return;
            }
            if (startsWith(src, "data:")) {
                resolve(decodeURIComponent(src.split(",")[1]));
            } else {
                ajax(src).then(function(xhr) {
                    return resolve(xhr.response);
                }, function() {
                    return reject("SVG not found.");
                });
            }
        });
    });
    function parseSVG(svg, icon) {
        if (icon && includes(svg, "<symbol")) {
            svg = parseSymbols(svg, icon) || svg;
        }
        svg = $(svg.substr(svg.indexOf("<svg")));
        return svg && svg.hasChildNodes() && svg;
    }
    var symbolRe = /<symbol([^]*?id=(['"])(.+?)\2[^]*?<\/)symbol>/g;
    var symbols = {};
    function parseSymbols(svg, icon) {
        if (!symbols[svg]) {
            symbols[svg] = {};
            symbolRe.lastIndex = 0;
            var match;
            while (match = symbolRe.exec(svg)) {
                symbols[svg][match[3]] = '<svg xmlns="http://www.w3.org/2000/svg"' + match[1] + "svg>";
            }
        }
        return symbols[svg][icon];
    }
    function applyAnimation(el) {
        var length = getMaxPathLength(el);
        if (length) {
            el.style.setProperty("--uk-animation-stroke", length);
        }
    }
    function getMaxPathLength(el) {
        return Math.ceil(Math.max.apply(Math, [ 0 ].concat($$("[stroke]", el).map(function(stroke) {
            try {
                return stroke.getTotalLength();
            } catch (e) {
                return 0;
            }
        }))));
    }
    function insertSVG(el, root) {
        if (isVoidElement(root) || root.tagName === "CANVAS") {
            root.hidden = true;
            var next = root.nextElementSibling;
            return equals(el, next) ? next : after(root, el);
        }
        var last = root.lastElementChild;
        return equals(el, last) ? last : append(root, el);
    }
    function equals(el, other) {
        return isSVG(el) && isSVG(other) && innerHTML(el) === innerHTML(other);
    }
    function isSVG(el) {
        return el && el.tagName === "svg";
    }
    function innerHTML(el) {
        return (el.innerHTML || new XMLSerializer().serializeToString(el).replace(/<svg.*?>(.*?)<\/svg>/g, "$1")).replace(/\s/g, "");
    }
    var closeIcon = '<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"/></svg>';
    var closeLarge = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.4" x1="1" y1="1" x2="19" y2="19"/><line fill="none" stroke="#000" stroke-width="1.4" x1="19" y1="1" x2="1" y2="19"/></svg>';
    var marker = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="4" width="1" height="11"/><rect x="4" y="9" width="11" height="1"/></svg>';
    var navbarToggleIcon = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="9" width="20" height="2"/><rect y="3" width="20" height="2"/><rect y="15" width="20" height="2"/></svg>';
    var overlayIcon = '<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="0" width="1" height="40"/><rect x="0" y="19" width="40" height="1"/></svg>';
    var paginationNext = '<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 1 6 6 1 11"/></svg>';
    var paginationPrevious = '<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="6 1 1 6 6 11"/></svg>';
    var searchIcon = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>';
    var searchLarge = '<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.8" cx="17.5" cy="17.5" r="16.5"/><line fill="none" stroke="#000" stroke-width="1.8" x1="38" y1="39" x2="29" y2="30"/></svg>';
    var searchNavbar = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10.5" cy="10.5" r="9.5"/><line fill="none" stroke="#000" stroke-width="1.1" x1="23" y1="23" x2="17" y2="17"/></svg>';
    var slidenavNext = '<svg width="14" height="24" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="1.225,23 12.775,12 1.225,1 "/></svg>';
    var slidenavNextLarge = '<svg width="25" height="40" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="4.002,38.547 22.527,20.024 4,1.5 "/></svg>';
    var slidenavPrevious = '<svg width="14" height="24" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23 "/></svg>';
    var slidenavPreviousLarge = '<svg width="25" height="40" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="20.527,1.5 2,20.024 20.525,38.547 "/></svg>';
    var spinner = '<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"/></svg>';
    var totop = '<svg width="18" height="10" viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 9 9 1 17 9 "/></svg>';
    var icons = {
        spinner: spinner,
        totop: totop,
        marker: marker,
        "close-icon": closeIcon,
        "close-large": closeLarge,
        "navbar-toggle-icon": navbarToggleIcon,
        "overlay-icon": overlayIcon,
        "pagination-next": paginationNext,
        "pagination-previous": paginationPrevious,
        "search-icon": searchIcon,
        "search-large": searchLarge,
        "search-navbar": searchNavbar,
        "slidenav-next": slidenavNext,
        "slidenav-next-large": slidenavNextLarge,
        "slidenav-previous": slidenavPrevious,
        "slidenav-previous-large": slidenavPreviousLarge
    };
    var Icon = {
        install: install$3,
        extends: SVG,
        args: "icon",
        props: [ "icon" ],
        data: {
            include: [ "focusable" ]
        },
        isIcon: true,
        beforeConnect: function() {
            addClass(this.$el, "uk-icon");
        },
        methods: {
            getSvg: function() {
                var icon = getIcon(this.icon);
                if (!icon) {
                    return Promise$1.reject("Icon not found.");
                }
                return Promise$1.resolve(icon);
            }
        }
    };
    var IconComponent = {
        args: false,
        extends: Icon,
        data: function(vm) {
            return {
                icon: hyphenate(vm.constructor.options.name)
            };
        },
        beforeConnect: function() {
            addClass(this.$el, this.$name);
        }
    };
    var Slidenav = {
        extends: IconComponent,
        beforeConnect: function() {
            addClass(this.$el, "uk-slidenav");
        },
        computed: {
            icon: function(ref, $el) {
                var icon = ref.icon;
                return hasClass($el, "uk-slidenav-large") ? icon + "-large" : icon;
            }
        }
    };
    var Search = {
        extends: IconComponent,
        computed: {
            icon: function(ref, $el) {
                var icon = ref.icon;
                return hasClass($el, "uk-search-icon") && parents($el, ".uk-search-large").length ? "search-large" : parents($el, ".uk-search-navbar").length ? "search-navbar" : icon;
            }
        }
    };
    var Close = {
        extends: IconComponent,
        computed: {
            icon: function() {
                return "close-" + (hasClass(this.$el, "uk-close-large") ? "large" : "icon");
            }
        }
    };
    var Spinner = {
        extends: IconComponent,
        connected: function() {
            var this$1 = this;
            this.svg.then(function(svg) {
                return svg && this$1.ratio !== 1 && css($("circle", svg), "strokeWidth", 1 / this$1.ratio);
            });
        }
    };
    var parsed = {};
    function install$3(UIkit) {
        UIkit.icon.add = function(name, svg) {
            var obj;
            var added = isString(name) ? (obj = {}, obj[name] = svg, obj) : name;
            each(added, function(svg, name) {
                icons[name] = svg;
                delete parsed[name];
            });
            if (UIkit._initialized) {
                apply$1(document.body, function(el) {
                    return each(UIkit.getComponents(el), function(cmp) {
                        cmp.$options.isIcon && cmp.icon in added && cmp.$reset();
                    });
                });
            }
        };
    }
    function getIcon(icon) {
        if (!icons[icon]) {
            return null;
        }
        if (!parsed[icon]) {
            parsed[icon] = $((icons[applyRtl(icon)] || icons[icon]).trim());
        }
        return parsed[icon].cloneNode(true);
    }
    function applyRtl(icon) {
        return isRtl ? swap(swap(icon, "left", "right"), "previous", "next") : icon;
    }
    var img = {
        args: "dataSrc",
        props: {
            dataSrc: String,
            dataSrcset: Boolean,
            sizes: String,
            width: Number,
            height: Number,
            offsetTop: String,
            offsetLeft: String,
            target: String
        },
        data: {
            dataSrc: "",
            dataSrcset: false,
            sizes: false,
            width: false,
            height: false,
            offsetTop: "50vh",
            offsetLeft: "50vw",
            target: false
        },
        computed: {
            cacheKey: function(ref) {
                var dataSrc = ref.dataSrc;
                return this.$name + "." + dataSrc;
            },
            width: function(ref) {
                var width = ref.width;
                var dataWidth = ref.dataWidth;
                return width || dataWidth;
            },
            height: function(ref) {
                var height = ref.height;
                var dataHeight = ref.dataHeight;
                return height || dataHeight;
            },
            sizes: function(ref) {
                var sizes = ref.sizes;
                var dataSizes = ref.dataSizes;
                return sizes || dataSizes;
            },
            isImg: function(_, $el) {
                return isImg($el);
            },
            target: {
                get: function(ref) {
                    var target = ref.target;
                    return [ this.$el ].concat(queryAll(target, this.$el));
                },
                watch: function() {
                    this.observe();
                }
            },
            offsetTop: function(ref) {
                var offsetTop = ref.offsetTop;
                return toPx(offsetTop, "height");
            },
            offsetLeft: function(ref) {
                var offsetLeft = ref.offsetLeft;
                return toPx(offsetLeft, "width");
            }
        },
        connected: function() {
            if (!window.IntersectionObserver) {
                setSrcAttrs(this.$el, this.dataSrc, this.dataSrcset, this.sizes);
                return;
            }
            if (storage[this.cacheKey]) {
                setSrcAttrs(this.$el, storage[this.cacheKey], this.dataSrcset, this.sizes);
            } else if (this.isImg && this.width && this.height) {
                setSrcAttrs(this.$el, getPlaceholderImage(this.width, this.height, this.sizes));
            }
            this.observer = new IntersectionObserver(this.load, {
                rootMargin: this.offsetTop + "px " + this.offsetLeft + "px"
            });
            requestAnimationFrame(this.observe);
        },
        disconnected: function() {
            this.observer && this.observer.disconnect();
        },
        update: {
            read: function(ref) {
                var this$1 = this;
                var image = ref.image;
                if (!this.observer) {
                    return false;
                }
                if (!image && document.readyState === "complete") {
                    this.load(this.observer.takeRecords());
                }
                if (this.isImg) {
                    return false;
                }
                image && image.then(function(img) {
                    return img && img.currentSrc !== "" && setSrcAttrs(this$1.$el, currentSrc(img));
                });
            },
            write: function(data) {
                if (this.dataSrcset && window.devicePixelRatio !== 1) {
                    var bgSize = css(this.$el, "backgroundSize");
                    if (bgSize.match(/^(auto\s?)+$/) || toFloat(bgSize) === data.bgSize) {
                        data.bgSize = getSourceSize(this.dataSrcset, this.sizes);
                        css(this.$el, "backgroundSize", data.bgSize + "px");
                    }
                }
            },
            events: [ "resize" ]
        },
        methods: {
            load: function(entries) {
                var this$1 = this;
                if (!entries.some(function(entry) {
                    return isUndefined(entry.isIntersecting) || entry.isIntersecting;
                })) {
                    return;
                }
                this._data.image = getImage(this.dataSrc, this.dataSrcset, this.sizes).then(function(img) {
                    setSrcAttrs(this$1.$el, currentSrc(img), img.srcset, img.sizes);
                    storage[this$1.cacheKey] = currentSrc(img);
                    return img;
                }, function(e) {
                    return trigger(this$1.$el, new e.constructor(e.type, e));
                });
                this.observer.disconnect();
            },
            observe: function() {
                var this$1 = this;
                if (this._connected && !this._data.image) {
                    this.target.forEach(function(el) {
                        return this$1.observer.observe(el);
                    });
                }
            }
        }
    };
    function setSrcAttrs(el, src, srcset, sizes) {
        if (isImg(el)) {
            var set = function(prop, val) {
                return val && val !== el[prop] && (el[prop] = val);
            };
            set("sizes", sizes);
            set("srcset", srcset);
            set("src", src);
        } else if (src) {
            var change = !includes(el.style.backgroundImage, src);
            if (change) {
                css(el, "backgroundImage", "url(" + escape(src) + ")");
                trigger(el, createEvent("load", false));
            }
        }
    }
    function getPlaceholderImage(width, height, sizes) {
        var assign;
        if (sizes) {
            assign = Dimensions.ratio({
                width: width,
                height: height
            }, "width", toPx(sizesToPixel(sizes))), width = assign.width, height = assign.height;
        }
        return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '"></svg>';
    }
    var sizesRe = /\s*(.*?)\s*(\w+|calc\(.*?\))\s*(?:,|$)/g;
    function sizesToPixel(sizes) {
        var matches;
        sizesRe.lastIndex = 0;
        while (matches = sizesRe.exec(sizes)) {
            if (!matches[1] || window.matchMedia(matches[1]).matches) {
                matches = evaluateSize(matches[2]);
                break;
            }
        }
        return matches || "100vw";
    }
    var sizeRe = /\d+(?:\w+|%)/g;
    var additionRe = /[+-]?(\d+)/g;
    function evaluateSize(size) {
        return startsWith(size, "calc") ? size.slice(5, -1).replace(sizeRe, function(size) {
            return toPx(size);
        }).replace(/ /g, "").match(additionRe).reduce(function(a, b) {
            return a + +b;
        }, 0) : size;
    }
    var srcSetRe = /\s+\d+w\s*(?:,|$)/g;
    function getSourceSize(srcset, sizes) {
        var srcSize = toPx(sizesToPixel(sizes));
        var descriptors = (srcset.match(srcSetRe) || []).map(toFloat).sort(function(a, b) {
            return a - b;
        });
        return descriptors.filter(function(size) {
            return size >= srcSize;
        })[0] || descriptors.pop() || "";
    }
    function isImg(el) {
        return el.tagName === "IMG";
    }
    function currentSrc(el) {
        return el.currentSrc || el.src;
    }
    var key = "__test__";
    var storage;
    try {
        storage = window.sessionStorage || {};
        storage[key] = 1;
        delete storage[key];
    } catch (e) {
        storage = {};
    }
    var Media = {
        props: {
            media: Boolean
        },
        data: {
            media: false
        },
        computed: {
            matchMedia: function() {
                var media = toMedia(this.media);
                return !media || window.matchMedia(media).matches;
            }
        }
    };
    function toMedia(value) {
        if (isString(value)) {
            if (value[0] === "@") {
                var name = "breakpoint-" + value.substr(1);
                value = toFloat(getCssVar(name));
            } else if (isNaN(value)) {
                return value;
            }
        }
        return value && !isNaN(value) ? "(min-width: " + value + "px)" : false;
    }
    var leader = {
        mixins: [ Class, Media ],
        props: {
            fill: String
        },
        data: {
            fill: "",
            clsWrapper: "uk-leader-fill",
            clsHide: "uk-leader-hide",
            attrFill: "data-fill"
        },
        computed: {
            fill: function(ref) {
                var fill = ref.fill;
                return fill || getCssVar("leader-fill-content");
            }
        },
        connected: function() {
            var assign;
            assign = wrapInner(this.$el, '<span class="' + this.clsWrapper + '">'), this.wrapper = assign[0];
        },
        disconnected: function() {
            unwrap(this.wrapper.childNodes);
        },
        update: {
            read: function(ref) {
                var changed = ref.changed;
                var width = ref.width;
                var prev = width;
                width = Math.floor(this.$el.offsetWidth / 2);
                return {
                    width: width,
                    fill: this.fill,
                    changed: changed || prev !== width,
                    hide: !this.matchMedia
                };
            },
            write: function(data) {
                toggleClass(this.wrapper, this.clsHide, data.hide);
                if (data.changed) {
                    data.changed = false;
                    attr(this.wrapper, this.attrFill, new Array(data.width).join(data.fill));
                }
            },
            events: [ "resize" ]
        }
    };
    var active = [];
    var Modal = {
        mixins: [ Class, Container, Togglable ],
        props: {
            selPanel: String,
            selClose: String,
            escClose: Boolean,
            bgClose: Boolean,
            stack: Boolean
        },
        data: {
            cls: "uk-open",
            escClose: true,
            bgClose: true,
            overlay: true,
            stack: false
        },
        computed: {
            panel: function(ref, $el) {
                var selPanel = ref.selPanel;
                return $(selPanel, $el);
            },
            transitionElement: function() {
                return this.panel;
            },
            bgClose: function(ref) {
                var bgClose = ref.bgClose;
                return bgClose && this.panel;
            }
        },
        beforeDisconnect: function() {
            if (this.isToggled()) {
                this.toggleElement(this.$el, false, false);
            }
        },
        events: [ {
            name: "click",
            delegate: function() {
                return this.selClose;
            },
            handler: function(e) {
                e.preventDefault();
                this.hide();
            }
        }, {
            name: "toggle",
            self: true,
            handler: function(e) {
                if (e.defaultPrevented) {
                    return;
                }
                e.preventDefault();
                if (this.isToggled() === includes(active, this)) {
                    this.toggle();
                }
            }
        }, {
            name: "beforeshow",
            self: true,
            handler: function(e) {
                if (includes(active, this)) {
                    return false;
                }
                if (!this.stack && active.length) {
                    Promise$1.all(active.map(function(modal) {
                        return modal.hide();
                    })).then(this.show);
                    e.preventDefault();
                } else {
                    active.push(this);
                }
            }
        }, {
            name: "show",
            self: true,
            handler: function() {
                var this$1 = this;
                var docEl = document.documentElement;
                if (width(window) > docEl.clientWidth && this.overlay) {
                    css(document.body, "overflowY", "scroll");
                }
                if (this.stack) {
                    css(this.$el, "zIndex", toFloat(css(this.$el, "zIndex")) + active.length);
                }
                addClass(docEl, this.clsPage);
                if (this.bgClose) {
                    once(this.$el, "hide", on(document, pointerDown, function(ref) {
                        var target = ref.target;
                        if (last(active) !== this$1 || this$1.overlay && !within(target, this$1.$el) || within(target, this$1.panel)) {
                            return;
                        }
                        once(document, pointerUp + " " + pointerCancel + " scroll", function(ref) {
                            var defaultPrevented = ref.defaultPrevented;
                            var type = ref.type;
                            var newTarget = ref.target;
                            if (!defaultPrevented && type === pointerUp && target === newTarget) {
                                this$1.hide();
                            }
                        }, true);
                    }), {
                        self: true
                    });
                }
                if (this.escClose) {
                    once(this.$el, "hide", on(document, "keydown", function(e) {
                        if (e.keyCode === 27 && last(active) === this$1) {
                            this$1.hide();
                        }
                    }), {
                        self: true
                    });
                }
            }
        }, {
            name: "hidden",
            self: true,
            handler: function() {
                var this$1 = this;
                if (includes(active, this)) {
                    active.splice(active.indexOf(this), 1);
                }
                if (!active.length) {
                    css(document.body, "overflowY", "");
                }
                css(this.$el, "zIndex", "");
                if (!active.some(function(modal) {
                    return modal.clsPage === this$1.clsPage;
                })) {
                    removeClass(document.documentElement, this.clsPage);
                }
            }
        } ],
        methods: {
            toggle: function() {
                return this.isToggled() ? this.hide() : this.show();
            },
            show: function() {
                var this$1 = this;
                if (this.container && parent(this.$el) !== this.container) {
                    append(this.container, this.$el);
                    return new Promise$1(function(resolve) {
                        return requestAnimationFrame(function() {
                            return this$1.show().then(resolve);
                        });
                    });
                }
                return this.toggleElement(this.$el, true, animate(this));
            },
            hide: function() {
                return this.toggleElement(this.$el, false, animate(this));
            }
        }
    };
    function animate(ref) {
        var transitionElement = ref.transitionElement;
        var _toggle = ref._toggle;
        return function(el, show) {
            return new Promise$1(function(resolve, reject) {
                return once(el, "show hide", function() {
                    el._reject && el._reject();
                    el._reject = reject;
                    _toggle(el, show);
                    var off = once(transitionElement, "transitionstart", function() {
                        once(transitionElement, "transitionend transitioncancel", resolve, {
                            self: true
                        });
                        clearTimeout(timer);
                    }, {
                        self: true
                    });
                    var timer = setTimeout(function() {
                        off();
                        resolve();
                    }, toMs(css(transitionElement, "transitionDuration")));
                });
            }).then(function() {
                return delete el._reject;
            });
        };
    }
    var modal = {
        install: install$2,
        mixins: [ Modal ],
        data: {
            clsPage: "uk-modal-page",
            selPanel: ".uk-modal-dialog",
            selClose: ".uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full"
        },
        events: [ {
            name: "show",
            self: true,
            handler: function() {
                if (hasClass(this.panel, "uk-margin-auto-vertical")) {
                    addClass(this.$el, "uk-flex");
                } else {
                    css(this.$el, "display", "block");
                }
                height(this.$el);
            }
        }, {
            name: "hidden",
            self: true,
            handler: function() {
                css(this.$el, "display", "");
                removeClass(this.$el, "uk-flex");
            }
        } ]
    };
    function install$2(ref) {
        var modal = ref.modal;
        modal.dialog = function(content, options) {
            var dialog = modal('<div class="uk-modal"> <div class="uk-modal-dialog">' + content + "</div> </div>", options);
            dialog.show();
            on(dialog.$el, "hidden", function() {
                return Promise$1.resolve().then(function() {
                    return dialog.$destroy(true);
                });
            }, {
                self: true
            });
            return dialog;
        };
        modal.alert = function(message, options) {
            return openDialog(function(ref) {
                var labels = ref.labels;
                return '<div class="uk-modal-body">' + (isString(message) ? message : html(message)) + '</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>' + labels.ok + "</button> </div>";
            }, options, function(deferred) {
                return deferred.resolve();
            });
        };
        modal.confirm = function(message, options) {
            return openDialog(function(ref) {
                var labels = ref.labels;
                return '<form> <div class="uk-modal-body">' + (isString(message) ? message : html(message)) + '</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">' + labels.cancel + '</button> <button class="uk-button uk-button-primary" autofocus>' + labels.ok + "</button> </div> </form>";
            }, options, function(deferred) {
                return deferred.reject();
            });
        };
        modal.prompt = function(message, value, options) {
            return openDialog(function(ref) {
                var labels = ref.labels;
                return '<form class="uk-form-stacked"> <div class="uk-modal-body"> <label>' + (isString(message) ? message : html(message)) + '</label> <input class="uk-input" value="' + (value || "") + '" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">' + labels.cancel + '</button> <button class="uk-button uk-button-primary">' + labels.ok + "</button> </div> </form>";
            }, options, function(deferred) {
                return deferred.resolve(null);
            }, function(dialog) {
                return $("input", dialog.$el).value;
            });
        };
        modal.labels = {
            ok: "Ok",
            cancel: "Cancel"
        };
        function openDialog(tmpl, options, hideFn, submitFn) {
            options = assign({
                bgClose: false,
                escClose: true,
                labels: modal.labels
            }, options);
            var dialog = modal.dialog(tmpl(options), options);
            var deferred = new Deferred();
            var resolved = false;
            on(dialog.$el, "submit", "form", function(e) {
                e.preventDefault();
                deferred.resolve(submitFn && submitFn(dialog));
                resolved = true;
                dialog.hide();
            });
            on(dialog.$el, "hide", function() {
                return !resolved && hideFn(deferred);
            });
            deferred.promise.dialog = dialog;
            return deferred.promise;
        }
    }
    var nav = {
        extends: Accordion,
        data: {
            targets: "> .uk-parent",
            toggle: "> a",
            content: "> ul"
        }
    };
    var navItem = ".uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle";
    var navbar = {
        mixins: [ Class, Container, FlexBug ],
        props: {
            dropdown: String,
            mode: "list",
            align: String,
            offset: Number,
            boundary: Boolean,
            boundaryAlign: Boolean,
            clsDrop: String,
            delayShow: Number,
            delayHide: Number,
            dropbar: Boolean,
            dropbarMode: String,
            dropbarAnchor: Boolean,
            duration: Number
        },
        data: {
            dropdown: navItem,
            align: !isRtl ? "left" : "right",
            clsDrop: "uk-navbar-dropdown",
            mode: undefined,
            offset: undefined,
            delayShow: undefined,
            delayHide: undefined,
            boundaryAlign: undefined,
            flip: "x",
            boundary: true,
            dropbar: false,
            dropbarMode: "slide",
            dropbarAnchor: false,
            duration: 200,
            forceHeight: true,
            selMinHeight: navItem,
            container: false
        },
        computed: {
            boundary: function(ref, $el) {
                var boundary = ref.boundary;
                var boundaryAlign = ref.boundaryAlign;
                return boundary === true || boundaryAlign ? $el : boundary;
            },
            dropbarAnchor: function(ref, $el) {
                var dropbarAnchor = ref.dropbarAnchor;
                return query(dropbarAnchor, $el);
            },
            pos: function(ref) {
                var align = ref.align;
                return "bottom-" + align;
            },
            dropbar: {
                get: function(ref) {
                    var dropbar = ref.dropbar;
                    if (!dropbar) {
                        return null;
                    }
                    dropbar = this._dropbar || query(dropbar, this.$el) || $("+ .uk-navbar-dropbar", this.$el);
                    return dropbar ? dropbar : this._dropbar = $("<div></div>");
                },
                watch: function(dropbar) {
                    addClass(dropbar, "uk-navbar-dropbar");
                },
                immediate: true
            },
            dropContainer: function(_, $el) {
                return this.container || $el;
            },
            dropdowns: {
                get: function(ref, $el) {
                    var clsDrop = ref.clsDrop;
                    var dropdowns = $$("." + clsDrop, $el);
                    if (this.container !== $el) {
                        $$("." + clsDrop, this.container).forEach(function(el) {
                            return !includes(dropdowns, el) && dropdowns.push(el);
                        });
                    }
                    return dropdowns;
                },
                watch: function(dropdowns) {
                    var this$1 = this;
                    this.$create("drop", dropdowns.filter(function(el) {
                        return !this$1.getDropdown(el);
                    }), assign({}, this.$props, {
                        boundary: this.boundary,
                        pos: this.pos,
                        offset: this.dropbar || this.offset
                    }));
                },
                immediate: true
            }
        },
        disconnected: function() {
            this.dropbar && remove$1(this.dropbar);
            delete this._dropbar;
        },
        events: [ {
            name: "mouseover",
            delegate: function() {
                return this.dropdown;
            },
            handler: function(ref) {
                var current = ref.current;
                var active = this.getActive();
                if (active && active.target && !within(active.target, current) && !active.tracker.movesTo(active.$el)) {
                    active.hide(false);
                }
            }
        }, {
            name: "mouseleave",
            el: function() {
                return this.dropbar;
            },
            handler: function() {
                var active = this.getActive();
                if (active && !this.dropdowns.some(function(el) {
                    return matches(el, ":hover");
                })) {
                    active.hide();
                }
            }
        }, {
            name: "beforeshow",
            el: function() {
                return this.dropContainer;
            },
            filter: function() {
                return this.dropbar;
            },
            handler: function() {
                if (!parent(this.dropbar)) {
                    after(this.dropbarAnchor || this.$el, this.dropbar);
                }
            }
        }, {
            name: "show",
            el: function() {
                return this.dropContainer;
            },
            filter: function() {
                return this.dropbar;
            },
            handler: function(_, ref) {
                var $el = ref.$el;
                var dir = ref.dir;
                if (!hasClass($el, this.clsDrop)) {
                    return;
                }
                if (this.dropbarMode === "slide") {
                    addClass(this.dropbar, "uk-navbar-dropbar-slide");
                }
                this.clsDrop && addClass($el, this.clsDrop + "-dropbar");
                if (dir === "bottom") {
                    this.transitionTo($el.offsetHeight + toFloat(css($el, "marginTop")) + toFloat(css($el, "marginBottom")), $el);
                }
            }
        }, {
            name: "beforehide",
            el: function() {
                return this.dropContainer;
            },
            filter: function() {
                return this.dropbar;
            },
            handler: function(e, ref) {
                var $el = ref.$el;
                var active = this.getActive();
                if (matches(this.dropbar, ":hover") && active && active.$el === $el) {
                    e.preventDefault();
                }
            }
        }, {
            name: "hide",
            el: function() {
                return this.dropContainer;
            },
            filter: function() {
                return this.dropbar;
            },
            handler: function(_, ref) {
                var $el = ref.$el;
                if (!hasClass($el, this.clsDrop)) {
                    return;
                }
                var active = this.getActive();
                if (!active || active && active.$el === $el) {
                    this.transitionTo(0);
                }
            }
        } ],
        methods: {
            getActive: function() {
                return active$1 && includes(active$1.mode, "hover") && within(active$1.target, this.$el) && active$1;
            },
            transitionTo: function(newHeight, el) {
                var this$1 = this;
                var ref = this;
                var dropbar = ref.dropbar;
                var oldHeight = isVisible(dropbar) ? height(dropbar) : 0;
                el = oldHeight < newHeight && el;
                css(el, "clip", "rect(0," + el.offsetWidth + "px," + oldHeight + "px,0)");
                height(dropbar, oldHeight);
                Transition.cancel([ el, dropbar ]);
                return Promise$1.all([ Transition.start(dropbar, {
                    height: newHeight
                }, this.duration), Transition.start(el, {
                    clip: "rect(0," + el.offsetWidth + "px," + newHeight + "px,0)"
                }, this.duration) ]).catch(noop).then(function() {
                    css(el, {
                        clip: ""
                    });
                    this$1.$update(dropbar);
                });
            },
            getDropdown: function(el) {
                return this.$getComponent(el, "drop") || this.$getComponent(el, "dropdown");
            }
        }
    };
    var offcanvas = {
        mixins: [ Modal ],
        args: "mode",
        props: {
            mode: String,
            flip: Boolean,
            overlay: Boolean
        },
        data: {
            mode: "slide",
            flip: false,
            overlay: false,
            clsPage: "uk-offcanvas-page",
            clsContainer: "uk-offcanvas-container",
            selPanel: ".uk-offcanvas-bar",
            clsFlip: "uk-offcanvas-flip",
            clsContainerAnimation: "uk-offcanvas-container-animation",
            clsSidebarAnimation: "uk-offcanvas-bar-animation",
            clsMode: "uk-offcanvas",
            clsOverlay: "uk-offcanvas-overlay",
            selClose: ".uk-offcanvas-close",
            container: false
        },
        computed: {
            clsFlip: function(ref) {
                var flip = ref.flip;
                var clsFlip = ref.clsFlip;
                return flip ? clsFlip : "";
            },
            clsOverlay: function(ref) {
                var overlay = ref.overlay;
                var clsOverlay = ref.clsOverlay;
                return overlay ? clsOverlay : "";
            },
            clsMode: function(ref) {
                var mode = ref.mode;
                var clsMode = ref.clsMode;
                return clsMode + "-" + mode;
            },
            clsSidebarAnimation: function(ref) {
                var mode = ref.mode;
                var clsSidebarAnimation = ref.clsSidebarAnimation;
                return mode === "none" || mode === "reveal" ? "" : clsSidebarAnimation;
            },
            clsContainerAnimation: function(ref) {
                var mode = ref.mode;
                var clsContainerAnimation = ref.clsContainerAnimation;
                return mode !== "push" && mode !== "reveal" ? "" : clsContainerAnimation;
            },
            transitionElement: function(ref) {
                var mode = ref.mode;
                return mode === "reveal" ? parent(this.panel) : this.panel;
            }
        },
        update: {
            read: function() {
                if (this.isToggled() && !isVisible(this.$el)) {
                    this.hide();
                }
            },
            events: [ "resize" ]
        },
        events: [ {
            name: "click",
            delegate: function() {
                return 'a[href^="#"]';
            },
            handler: function(ref) {
                var hash = ref.current.hash;
                var defaultPrevented = ref.defaultPrevented;
                if (!defaultPrevented && hash && $(hash, document.body)) {
                    this.hide();
                }
            }
        }, {
            name: "touchstart",
            passive: true,
            el: function() {
                return this.panel;
            },
            handler: function(ref) {
                var targetTouches = ref.targetTouches;
                if (targetTouches.length === 1) {
                    this.clientY = targetTouches[0].clientY;
                }
            }
        }, {
            name: "touchmove",
            self: true,
            passive: false,
            filter: function() {
                return this.overlay;
            },
            handler: function(e) {
                e.cancelable && e.preventDefault();
            }
        }, {
            name: "touchmove",
            passive: false,
            el: function() {
                return this.panel;
            },
            handler: function(e) {
                if (e.targetTouches.length !== 1) {
                    return;
                }
                var clientY = e.targetTouches[0].clientY - this.clientY;
                var ref = this.panel;
                var scrollTop = ref.scrollTop;
                var scrollHeight = ref.scrollHeight;
                var clientHeight = ref.clientHeight;
                if (clientHeight >= scrollHeight || scrollTop === 0 && clientY > 0 || scrollHeight - scrollTop <= clientHeight && clientY < 0) {
                    e.cancelable && e.preventDefault();
                }
            }
        }, {
            name: "show",
            self: true,
            handler: function() {
                if (this.mode === "reveal" && !hasClass(parent(this.panel), this.clsMode)) {
                    wrapAll(this.panel, "<div>");
                    addClass(parent(this.panel), this.clsMode);
                }
                css(document.documentElement, "overflowY", this.overlay ? "hidden" : "");
                addClass(document.body, this.clsContainer, this.clsFlip);
                css(document.body, "touch-action", "pan-y pinch-zoom");
                css(this.$el, "display", "block");
                addClass(this.$el, this.clsOverlay);
                addClass(this.panel, this.clsSidebarAnimation, this.mode !== "reveal" ? this.clsMode : "");
                height(document.body);
                addClass(document.body, this.clsContainerAnimation);
                this.clsContainerAnimation && suppressUserScale();
            }
        }, {
            name: "hide",
            self: true,
            handler: function() {
                removeClass(document.body, this.clsContainerAnimation);
                css(document.body, "touch-action", "");
            }
        }, {
            name: "hidden",
            self: true,
            handler: function() {
                this.clsContainerAnimation && resumeUserScale();
                if (this.mode === "reveal") {
                    unwrap(this.panel);
                }
                removeClass(this.panel, this.clsSidebarAnimation, this.clsMode);
                removeClass(this.$el, this.clsOverlay);
                css(this.$el, "display", "");
                removeClass(document.body, this.clsContainer, this.clsFlip);
                css(document.documentElement, "overflowY", "");
            }
        }, {
            name: "swipeLeft swipeRight",
            handler: function(e) {
                if (this.isToggled() && endsWith(e.type, "Left") ^ this.flip) {
                    this.hide();
                }
            }
        } ]
    };
    function suppressUserScale() {
        getViewport().content += ",user-scalable=0";
    }
    function resumeUserScale() {
        var viewport = getViewport();
        viewport.content = viewport.content.replace(/,user-scalable=0$/, "");
    }
    function getViewport() {
        return $('meta[name="viewport"]', document.head) || append(document.head, '<meta name="viewport">');
    }
    var overflowAuto = {
        mixins: [ Class ],
        props: {
            selContainer: String,
            selContent: String,
            minHeight: Number
        },
        data: {
            selContainer: ".uk-modal",
            selContent: ".uk-modal-dialog",
            minHeight: 150
        },
        computed: {
            container: function(ref, $el) {
                var selContainer = ref.selContainer;
                return closest($el, selContainer);
            },
            content: function(ref, $el) {
                var selContent = ref.selContent;
                return closest($el, selContent);
            }
        },
        connected: function() {
            css(this.$el, "minHeight", this.minHeight);
        },
        update: {
            read: function() {
                if (!this.content || !this.container || !isVisible(this.$el)) {
                    return false;
                }
                return {
                    current: toFloat(css(this.$el, "maxHeight")),
                    max: Math.max(this.minHeight, height(this.container) - (dimensions(this.content).height - height(this.$el)))
                };
            },
            write: function(ref) {
                var current = ref.current;
                var max = ref.max;
                css(this.$el, "maxHeight", max);
                if (Math.round(current) !== Math.round(max)) {
                    trigger(this.$el, "resize");
                }
            },
            events: [ "resize" ]
        }
    };
    var responsive = {
        props: [ "width", "height" ],
        connected: function() {
            addClass(this.$el, "uk-responsive-width");
        },
        update: {
            read: function() {
                return isVisible(this.$el) && this.width && this.height ? {
                    width: width(parent(this.$el)),
                    height: this.height
                } : false;
            },
            write: function(dim) {
                height(this.$el, Dimensions.contain({
                    height: this.height,
                    width: this.width
                }, dim).height);
            },
            events: [ "resize" ]
        }
    };
    var scroll = {
        props: {
            offset: Number
        },
        data: {
            offset: 0
        },
        methods: {
            scrollTo: function(el) {
                var this$1 = this;
                el = el && $(el) || document.body;
                if (trigger(this.$el, "beforescroll", [ this, el ])) {
                    scrollIntoView(el, {
                        offset: this.offset
                    }).then(function() {
                        return trigger(this$1.$el, "scrolled", [ this$1, el ]);
                    });
                }
            }
        },
        events: {
            click: function(e) {
                if (e.defaultPrevented) {
                    return;
                }
                e.preventDefault();
                this.scrollTo("#" + escape(decodeURIComponent((this.$el.hash || "").substr(1))));
            }
        }
    };
    var stateKey = "_ukScrollspy";
    var scrollspy = {
        args: "cls",
        props: {
            cls: String,
            target: String,
            hidden: Boolean,
            offsetTop: Number,
            offsetLeft: Number,
            repeat: Boolean,
            delay: Number
        },
        data: function() {
            return {
                cls: false,
                target: false,
                hidden: true,
                offsetTop: 0,
                offsetLeft: 0,
                repeat: false,
                delay: 0,
                inViewClass: "uk-scrollspy-inview"
            };
        },
        computed: {
            elements: {
                get: function(ref, $el) {
                    var target = ref.target;
                    return target ? $$(target, $el) : [ $el ];
                },
                watch: function(elements) {
                    if (this.hidden) {
                        css(filter$1(elements, ":not(." + this.inViewClass + ")"), "visibility", "hidden");
                    }
                },
                immediate: true
            }
        },
        disconnected: function() {
            var this$1 = this;
            this.elements.forEach(function(el) {
                removeClass(el, this$1.inViewClass, el[stateKey] ? el[stateKey].cls : "");
                delete el[stateKey];
            });
        },
        update: [ {
            read: function(data$1) {
                var this$1 = this;
                if (!data$1.update) {
                    Promise$1.resolve().then(function() {
                        this$1.$emit();
                        data$1.update = true;
                    });
                    return false;
                }
                this.elements.forEach(function(el) {
                    if (!el[stateKey]) {
                        el[stateKey] = {
                            cls: data(el, "uk-scrollspy-class") || this$1.cls
                        };
                    }
                    el[stateKey].show = isInView(el, this$1.offsetTop, this$1.offsetLeft);
                });
            },
            write: function(data) {
                var this$1 = this;
                this.elements.forEach(function(el) {
                    var state = el[stateKey];
                    if (state.show && !state.inview && !state.queued) {
                        state.queued = true;
                        data.promise = (data.promise || Promise$1.resolve()).then(function() {
                            return new Promise$1(function(resolve) {
                                return setTimeout(resolve, this$1.delay);
                            });
                        }).then(function() {
                            this$1.toggle(el, true);
                            setTimeout(function() {
                                state.queued = false;
                                this$1.$emit();
                            }, 300);
                        });
                    } else if (!state.show && state.inview && !state.queued && this$1.repeat) {
                        this$1.toggle(el, false);
                    }
                });
            },
            events: [ "scroll", "resize" ]
        } ],
        methods: {
            toggle: function(el, inview) {
                var state = el[stateKey];
                state.off && state.off();
                css(el, "visibility", !inview && this.hidden ? "hidden" : "");
                toggleClass(el, this.inViewClass, inview);
                toggleClass(el, state.cls);
                if (/\buk-animation-/.test(state.cls)) {
                    state.off = once(el, "animationcancel animationend", function() {
                        return removeClasses(el, "uk-animation-[\\w-]+");
                    });
                }
                trigger(el, inview ? "inview" : "outview");
                state.inview = inview;
                this.$update(el);
            }
        }
    };
    var scrollspyNav = {
        props: {
            cls: String,
            closest: String,
            scroll: Boolean,
            overflow: Boolean,
            offset: Number
        },
        data: {
            cls: "uk-active",
            closest: false,
            scroll: false,
            overflow: true,
            offset: 0
        },
        computed: {
            links: {
                get: function(_, $el) {
                    return $$('a[href^="#"]', $el).filter(function(el) {
                        return el.hash;
                    });
                },
                watch: function(links) {
                    if (this.scroll) {
                        this.$create("scroll", links, {
                            offset: this.offset || 0
                        });
                    }
                },
                immediate: true
            },
            targets: function() {
                return $$(this.links.map(function(el) {
                    return escape(el.hash).substr(1);
                }).join(","));
            },
            elements: function(ref) {
                var selector = ref.closest;
                return closest(this.links, selector || "*");
            }
        },
        update: [ {
            read: function() {
                var this$1 = this;
                var ref = this.targets;
                var length = ref.length;
                if (!length || !isVisible(this.$el)) {
                    return false;
                }
                var ref$1 = scrollParents(this.targets, /auto|scroll/, true);
                var scrollElement = ref$1[0];
                var scrollTop = scrollElement.scrollTop;
                var scrollHeight = scrollElement.scrollHeight;
                var max = scrollHeight - getViewportClientHeight(scrollElement);
                var active = false;
                if (scrollTop === max) {
                    active = length - 1;
                } else {
                    this.targets.every(function(el, i) {
                        if (offset(el).top - offset(getViewport$1(scrollElement)).top - this$1.offset <= 0) {
                            active = i;
                            return true;
                        }
                    });
                    if (active === false && this.overflow) {
                        active = 0;
                    }
                }
                return {
                    active: active
                };
            },
            write: function(ref) {
                var active = ref.active;
                var changed = active !== false && !hasClass(this.elements[active], this.cls);
                this.links.forEach(function(el) {
                    return el.blur();
                });
                removeClass(this.elements, this.cls);
                addClass(this.elements[active], this.cls);
                if (changed) {
                    trigger(this.$el, "active", [ active, this.elements[active] ]);
                }
            },
            events: [ "scroll", "resize" ]
        } ]
    };
    var sticky = {
        mixins: [ Class, Media ],
        props: {
            top: null,
            bottom: Boolean,
            offset: String,
            animation: String,
            clsActive: String,
            clsInactive: String,
            clsFixed: String,
            clsBelow: String,
            selTarget: String,
            widthElement: Boolean,
            showOnUp: Boolean,
            targetOffset: Number
        },
        data: {
            top: 0,
            bottom: false,
            offset: 0,
            animation: "",
            clsActive: "uk-active",
            clsInactive: "",
            clsFixed: "uk-sticky-fixed",
            clsBelow: "uk-sticky-below",
            selTarget: "",
            widthElement: false,
            showOnUp: false,
            targetOffset: false
        },
        computed: {
            offset: function(ref) {
                var offset = ref.offset;
                return toPx(offset);
            },
            selTarget: function(ref, $el) {
                var selTarget = ref.selTarget;
                return selTarget && $(selTarget, $el) || $el;
            },
            widthElement: function(ref, $el) {
                var widthElement = ref.widthElement;
                return query(widthElement, $el) || this.placeholder;
            },
            isActive: {
                get: function() {
                    return hasClass(this.selTarget, this.clsActive);
                },
                set: function(value) {
                    if (value && !this.isActive) {
                        replaceClass(this.selTarget, this.clsInactive, this.clsActive);
                        trigger(this.$el, "active");
                    } else if (!value && !hasClass(this.selTarget, this.clsInactive)) {
                        replaceClass(this.selTarget, this.clsActive, this.clsInactive);
                        trigger(this.$el, "inactive");
                    }
                }
            }
        },
        connected: function() {
            this.placeholder = $("+ .uk-sticky-placeholder", this.$el) || $('<div class="uk-sticky-placeholder"></div>');
            this.isFixed = false;
            this.isActive = false;
        },
        disconnected: function() {
            if (this.isFixed) {
                this.hide();
                removeClass(this.selTarget, this.clsInactive);
            }
            remove$1(this.placeholder);
            this.placeholder = null;
            this.widthElement = null;
        },
        events: [ {
            name: "load hashchange popstate",
            el: function() {
                return window;
            },
            handler: function() {
                var this$1 = this;
                if (!(this.targetOffset !== false && location.hash && window.pageYOffset > 0)) {
                    return;
                }
                var target = $(location.hash);
                if (target) {
                    fastdom.read(function() {
                        var ref = offset(target);
                        var top = ref.top;
                        var elTop = offset(this$1.$el).top;
                        var elHeight = this$1.$el.offsetHeight;
                        if (this$1.isFixed && elTop + elHeight >= top && elTop <= top + target.offsetHeight) {
                            scrollTop(window, top - elHeight - (isNumeric(this$1.targetOffset) ? this$1.targetOffset : 0) - this$1.offset);
                        }
                    });
                }
            }
        } ],
        update: [ {
            read: function(ref, types) {
                var height = ref.height;
                this.inactive = !this.matchMedia || !isVisible(this.$el);
                if (this.inactive) {
                    return false;
                }
                if (this.isActive && types.has("resize")) {
                    this.hide();
                    height = this.$el.offsetHeight;
                    this.show();
                }
                height = !this.isActive ? this.$el.offsetHeight : height;
                this.topOffset = offset(this.isFixed ? this.placeholder : this.$el).top;
                this.bottomOffset = this.topOffset + height;
                var bottom = parseProp("bottom", this);
                this.top = Math.max(toFloat(parseProp("top", this)), this.topOffset) - this.offset;
                this.bottom = bottom && bottom - this.$el.offsetHeight;
                this.width = dimensions(isVisible(this.widthElement) ? this.widthElement : this.$el).width;
                return {
                    height: height,
                    top: offsetPosition(this.placeholder)[0],
                    margins: css(this.$el, [ "marginTop", "marginBottom", "marginLeft", "marginRight" ])
                };
            },
            write: function(ref) {
                var height = ref.height;
                var margins = ref.margins;
                var ref$1 = this;
                var placeholder = ref$1.placeholder;
                css(placeholder, assign({
                    height: height
                }, margins));
                if (!within(placeholder, document)) {
                    after(this.$el, placeholder);
                    placeholder.hidden = true;
                }
                this.isActive = !!this.isActive;
            },
            events: [ "resize" ]
        }, {
            read: function(ref) {
                var scroll = ref.scroll;
                if (scroll === void 0) scroll = 0;
                this.scroll = window.pageYOffset;
                return {
                    dir: scroll <= this.scroll ? "down" : "up",
                    scroll: this.scroll
                };
            },
            write: function(data, types) {
                var this$1 = this;
                var now = Date.now();
                var isScrollUpdate = types.has("scroll");
                var initTimestamp = data.initTimestamp;
                if (initTimestamp === void 0) initTimestamp = 0;
                var dir = data.dir;
                var lastDir = data.lastDir;
                var lastScroll = data.lastScroll;
                var scroll = data.scroll;
                var top = data.top;
                data.lastScroll = scroll;
                if (scroll < 0 || scroll === lastScroll && isScrollUpdate || this.showOnUp && !isScrollUpdate && !this.isFixed) {
                    return;
                }
                if (now - initTimestamp > 300 || dir !== lastDir) {
                    data.initScroll = scroll;
                    data.initTimestamp = now;
                }
                data.lastDir = dir;
                if (this.showOnUp && !this.isFixed && Math.abs(data.initScroll - scroll) <= 30 && Math.abs(lastScroll - scroll) <= 10) {
                    return;
                }
                if (this.inactive || scroll < this.top || this.showOnUp && (scroll <= this.top || dir === "down" && isScrollUpdate || dir === "up" && !this.isFixed && scroll <= this.bottomOffset)) {
                    if (!this.isFixed) {
                        if (Animation.inProgress(this.$el) && top > scroll) {
                            Animation.cancel(this.$el);
                            this.hide();
                        }
                        return;
                    }
                    this.isFixed = false;
                    if (this.animation && scroll > this.topOffset) {
                        Animation.cancel(this.$el);
                        Animation.out(this.$el, this.animation).then(function() {
                            return this$1.hide();
                        }, noop);
                    } else {
                        this.hide();
                    }
                } else if (this.isFixed) {
                    this.update();
                } else if (this.animation) {
                    Animation.cancel(this.$el);
                    this.show();
                    Animation.in(this.$el, this.animation).catch(noop);
                } else {
                    this.show();
                }
            },
            events: [ "resize", "scroll" ]
        } ],
        methods: {
            show: function() {
                this.isFixed = true;
                this.update();
                this.placeholder.hidden = false;
            },
            hide: function() {
                this.isActive = false;
                removeClass(this.$el, this.clsFixed, this.clsBelow);
                css(this.$el, {
                    position: "",
                    top: "",
                    width: ""
                });
                this.placeholder.hidden = true;
            },
            update: function() {
                var active = this.top !== 0 || this.scroll > this.top;
                var top = Math.max(0, this.offset);
                if (isNumeric(this.bottom) && this.scroll > this.bottom - this.offset) {
                    top = this.bottom - this.scroll;
                }
                css(this.$el, {
                    position: "fixed",
                    top: top + "px",
                    width: this.width
                });
                this.isActive = active;
                toggleClass(this.$el, this.clsBelow, this.scroll > this.bottomOffset);
                addClass(this.$el, this.clsFixed);
            }
        }
    };
    function parseProp(prop, ref) {
        var $props = ref.$props;
        var $el = ref.$el;
        var propOffset = ref[prop + "Offset"];
        var value = $props[prop];
        if (!value) {
            return;
        }
        if (isString(value) && value.match(/^-?\d/)) {
            return propOffset + toPx(value);
        } else {
            return offset(value === true ? parent($el) : query(value, $el)).bottom;
        }
    }
    var Switcher = {
        mixins: [ Togglable ],
        args: "connect",
        props: {
            connect: String,
            toggle: String,
            active: Number,
            swiping: Boolean
        },
        data: {
            connect: "~.uk-switcher",
            toggle: "> * > :first-child",
            active: 0,
            swiping: true,
            cls: "uk-active",
            attrItem: "uk-switcher-item"
        },
        computed: {
            connects: {
                get: function(ref, $el) {
                    var connect = ref.connect;
                    return queryAll(connect, $el);
                },
                watch: function(connects) {
                    var this$1 = this;
                    if (this.swiping) {
                        css(connects, "touch-action", "pan-y pinch-zoom");
                    }
                    var index = this.index();
                    this.connects.forEach(function(el) {
                        return children(el).forEach(function(child, i) {
                            return toggleClass(child, this$1.cls, i === index);
                        });
                    });
                },
                immediate: true
            },
            toggles: {
                get: function(ref, $el) {
                    var toggle = ref.toggle;
                    return $$(toggle, $el).filter(function(el) {
                        return !matches(el, ".uk-disabled *, .uk-disabled, [disabled]");
                    });
                },
                watch: function(toggles) {
                    var active = this.index();
                    this.show(~active ? active : toggles[this.active] || toggles[0]);
                },
                immediate: true
            },
            children: function() {
                var this$1 = this;
                return children(this.$el).filter(function(child) {
                    return this$1.toggles.some(function(toggle) {
                        return within(toggle, child);
                    });
                });
            }
        },
        events: [ {
            name: "click",
            delegate: function() {
                return this.toggle;
            },
            handler: function(e) {
                e.preventDefault();
                this.show(e.current);
            }
        }, {
            name: "click",
            el: function() {
                return this.connects;
            },
            delegate: function() {
                return "[" + this.attrItem + "],[data-" + this.attrItem + "]";
            },
            handler: function(e) {
                e.preventDefault();
                this.show(data(e.current, this.attrItem));
            }
        }, {
            name: "swipeRight swipeLeft",
            filter: function() {
                return this.swiping;
            },
            el: function() {
                return this.connects;
            },
            handler: function(ref) {
                var type = ref.type;
                this.show(endsWith(type, "Left") ? "next" : "previous");
            }
        } ],
        methods: {
            index: function() {
                var this$1 = this;
                return findIndex(this.children, function(el) {
                    return hasClass(el, this$1.cls);
                });
            },
            show: function(item) {
                var this$1 = this;
                var prev = this.index();
                var next = getIndex(this.children[getIndex(item, this.toggles, prev)], children(this.$el));
                if (prev === next) {
                    return;
                }
                this.children.forEach(function(child, i) {
                    toggleClass(child, this$1.cls, next === i);
                    attr(this$1.toggles[i], "aria-expanded", next === i);
                });
                this.connects.forEach(function(ref) {
                    var children = ref.children;
                    return this$1.toggleElement(toNodes(children).filter(function(child) {
                        return hasClass(child, this$1.cls);
                    }), false, prev >= 0).then(function() {
                        return this$1.toggleElement(children[next], true, prev >= 0);
                    });
                });
            }
        }
    };
    var tab = {
        mixins: [ Class ],
        extends: Switcher,
        props: {
            media: Boolean
        },
        data: {
            media: 960,
            attrItem: "uk-tab-item"
        },
        connected: function() {
            var cls = hasClass(this.$el, "uk-tab-left") ? "uk-tab-left" : hasClass(this.$el, "uk-tab-right") ? "uk-tab-right" : false;
            if (cls) {
                this.$create("toggle", this.$el, {
                    cls: cls,
                    mode: "media",
                    media: this.media
                });
            }
        }
    };
    var toggle = {
        mixins: [ Media, Togglable ],
        args: "target",
        props: {
            href: String,
            target: null,
            mode: "list",
            queued: Boolean
        },
        data: {
            href: false,
            target: false,
            mode: "click",
            queued: true
        },
        connected: function() {
            if (!isFocusable(this.$el)) {
                attr(this.$el, "tabindex", "0");
            }
        },
        computed: {
            target: {
                get: function(ref, $el) {
                    var href = ref.href;
                    var target = ref.target;
                    target = queryAll(target || href, $el);
                    return target.length && target || [ $el ];
                },
                watch: function() {
                    this.updateAria();
                },
                immediate: true
            }
        },
        events: [ {
            name: pointerDown + " " + pointerUp + " " + pointerCancel,
            filter: function() {
                return includes(this.mode, "hover");
            },
            handler: function(e) {
                this._isTouch = isTouch(e) && e.type === pointerDown;
            }
        }, {
            name: pointerEnter + " " + pointerLeave + " focus blur",
            filter: function() {
                return includes(this.mode, "hover");
            },
            handler: function(e) {
                if (!isTouch(e) && !this._isTouch) {
                    var isPointerEvent = includes([ "pointerleave", "pointerenter" ], e.type);
                    if (!isPointerEvent && matches(this.$el, ":hover") || isPointerEvent && matches(this.$el, ":focus")) {
                        return;
                    }
                    this.toggle("toggle" + (includes([ pointerEnter, "focus" ], e.type) ? "show" : "hide"));
                }
            }
        }, {
            name: "click",
            filter: function() {
                return includes(this.mode, "click") || hasTouch && includes(this.mode, "hover");
            },
            handler: function(e) {
                var link;
                if (closest(e.target, 'a[href="#"], a[href=""]') || (link = closest(e.target, "a[href]")) && (!attr(this.$el, "aria-expanded") || link.hash && matches(this.target, link.hash))) {
                    e.preventDefault();
                }
                this.toggle();
            }
        }, {
            name: "toggled",
            self: true,
            el: function() {
                return this.target;
            },
            handler: function(e, toggled) {
                this.updateAria(toggled);
            }
        } ],
        update: {
            read: function() {
                return includes(this.mode, "media") && this.media ? {
                    match: this.matchMedia
                } : false;
            },
            write: function(ref) {
                var match = ref.match;
                var toggled = this.isToggled(this.target);
                if (match ? !toggled : toggled) {
                    this.toggle();
                }
            },
            events: [ "resize" ]
        },
        methods: {
            toggle: function(type) {
                var this$1 = this;
                if (!trigger(this.target, type || "toggle", [ this ])) {
                    return;
                }
                if (!this.queued) {
                    return this.toggleElement(this.target);
                }
                var leaving = this.target.filter(function(el) {
                    return hasClass(el, this$1.clsLeave);
                });
                if (leaving.length) {
                    this.target.forEach(function(el) {
                        var isLeaving = includes(leaving, el);
                        this$1.toggleElement(el, isLeaving, isLeaving);
                    });
                    return;
                }
                var toggled = this.target.filter(this.isToggled);
                this.toggleElement(toggled, false).then(function() {
                    return this$1.toggleElement(this$1.target.filter(function(el) {
                        return !includes(toggled, el);
                    }), true);
                });
            },
            updateAria: function(toggled) {
                attr(this.$el, "aria-expanded", isBoolean(toggled) ? toggled : this.cls ? hasClass(this.target[0], this.cls.split(" ")[0]) : isVisible(this.target[0]));
            }
        }
    };
    var components$1 = Object.freeze({
        __proto__: null,
        Accordion: Accordion,
        Alert: alert,
        Cover: cover,
        Drop: drop,
        Dropdown: drop,
        FormCustom: formCustom,
        Gif: gif,
        Grid: grid,
        HeightMatch: heightMatch,
        HeightViewport: heightViewport,
        Icon: Icon,
        Img: img,
        Leader: leader,
        Margin: Margin,
        Modal: modal,
        Nav: nav,
        Navbar: navbar,
        Offcanvas: offcanvas,
        OverflowAuto: overflowAuto,
        Responsive: responsive,
        Scroll: scroll,
        Scrollspy: scrollspy,
        ScrollspyNav: scrollspyNav,
        Sticky: sticky,
        Svg: SVG,
        Switcher: Switcher,
        Tab: tab,
        Toggle: toggle,
        Video: Video,
        Close: Close,
        Spinner: Spinner,
        SlidenavNext: Slidenav,
        SlidenavPrevious: Slidenav,
        SearchIcon: Search,
        Marker: IconComponent,
        NavbarToggleIcon: IconComponent,
        OverlayIcon: IconComponent,
        PaginationNext: IconComponent,
        PaginationPrevious: IconComponent,
        Totop: IconComponent
    });
    each(components$1, function(component, name) {
        return UIkit.component(name, component);
    });
    UIkit.use(Core);
    boot(UIkit);
    var countdown = {
        mixins: [ Class ],
        props: {
            date: String,
            clsWrapper: String
        },
        data: {
            date: "",
            clsWrapper: ".uk-countdown-%unit%"
        },
        computed: {
            date: function(ref) {
                var date = ref.date;
                return Date.parse(date);
            },
            days: function(ref, $el) {
                var clsWrapper = ref.clsWrapper;
                return $(clsWrapper.replace("%unit%", "days"), $el);
            },
            hours: function(ref, $el) {
                var clsWrapper = ref.clsWrapper;
                return $(clsWrapper.replace("%unit%", "hours"), $el);
            },
            minutes: function(ref, $el) {
                var clsWrapper = ref.clsWrapper;
                return $(clsWrapper.replace("%unit%", "minutes"), $el);
            },
            seconds: function(ref, $el) {
                var clsWrapper = ref.clsWrapper;
                return $(clsWrapper.replace("%unit%", "seconds"), $el);
            },
            units: function() {
                var this$1 = this;
                return [ "days", "hours", "minutes", "seconds" ].filter(function(unit) {
                    return this$1[unit];
                });
            }
        },
        connected: function() {
            this.start();
        },
        disconnected: function() {
            var this$1 = this;
            this.stop();
            this.units.forEach(function(unit) {
                return empty(this$1[unit]);
            });
        },
        events: [ {
            name: "visibilitychange",
            el: function() {
                return document;
            },
            handler: function() {
                if (document.hidden) {
                    this.stop();
                } else {
                    this.start();
                }
            }
        } ],
        update: {
            write: function() {
                var this$1 = this;
                var timespan = getTimeSpan(this.date);
                if (timespan.total <= 0) {
                    this.stop();
                    timespan.days = timespan.hours = timespan.minutes = timespan.seconds = 0;
                }
                this.units.forEach(function(unit) {
                    var digits = String(Math.floor(timespan[unit]));
                    digits = digits.length < 2 ? "0" + digits : digits;
                    var el = this$1[unit];
                    if (el.textContent !== digits) {
                        digits = digits.split("");
                        if (digits.length !== el.children.length) {
                            html(el, digits.map(function() {
                                return "<span></span>";
                            }).join(""));
                        }
                        digits.forEach(function(digit, i) {
                            return el.children[i].textContent = digit;
                        });
                    }
                });
            }
        },
        methods: {
            start: function() {
                this.stop();
                if (this.date && this.units.length) {
                    this.$update();
                    this.timer = setInterval(this.$update, 1e3);
                }
            },
            stop: function() {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            }
        }
    };
    function getTimeSpan(date) {
        var total = date - Date.now();
        return {
            total: total,
            seconds: total / 1e3 % 60,
            minutes: total / 1e3 / 60 % 60,
            hours: total / 1e3 / 60 / 60 % 24,
            days: total / 1e3 / 60 / 60 / 24
        };
    }
    var clsLeave = "uk-transition-leave";
    var clsEnter = "uk-transition-enter";
    function fade(action, target, duration, stagger) {
        if (stagger === void 0) stagger = 0;
        var index = transitionIndex(target, true);
        var propsIn = {
            opacity: 1
        };
        var propsOut = {
            opacity: 0
        };
        var wrapIndexFn = function(fn) {
            return function() {
                return index === transitionIndex(target) ? fn() : Promise$1.reject();
            };
        };
        var leaveFn = wrapIndexFn(function() {
            addClass(target, clsLeave);
            return Promise$1.all(getTransitionNodes(target).map(function(child, i) {
                return new Promise$1(function(resolve) {
                    return setTimeout(function() {
                        return Transition.start(child, propsOut, duration / 2, "ease").then(resolve);
                    }, i * stagger);
                });
            })).then(function() {
                return removeClass(target, clsLeave);
            });
        });
        var enterFn = wrapIndexFn(function() {
            var oldHeight = height(target);
            addClass(target, clsEnter);
            action();
            css(children(target), {
                opacity: 0
            });
            return new Promise$1(function(resolve) {
                return requestAnimationFrame(function() {
                    var nodes = children(target);
                    var newHeight = height(target);
                    css(target, "alignContent", "flex-start");
                    height(target, oldHeight);
                    var transitionNodes = getTransitionNodes(target);
                    css(nodes, propsOut);
                    var transitions = transitionNodes.map(function(child, i) {
                        return new Promise$1(function(resolve) {
                            return setTimeout(function() {
                                return Transition.start(child, propsIn, duration / 2, "ease").then(resolve);
                            }, i * stagger);
                        });
                    });
                    if (oldHeight !== newHeight) {
                        transitions.push(Transition.start(target, {
                            height: newHeight
                        }, duration / 2 + transitionNodes.length * stagger, "ease"));
                    }
                    Promise$1.all(transitions).then(function() {
                        removeClass(target, clsEnter);
                        if (index === transitionIndex(target)) {
                            css(target, {
                                height: "",
                                alignContent: ""
                            });
                            css(nodes, {
                                opacity: ""
                            });
                            delete target.dataset.transition;
                        }
                        resolve();
                    });
                });
            });
        });
        return hasClass(target, clsLeave) ? waitTransitionend(target).then(enterFn) : hasClass(target, clsEnter) ? waitTransitionend(target).then(leaveFn).then(enterFn) : leaveFn().then(enterFn);
    }
    function transitionIndex(target, next) {
        if (next) {
            target.dataset.transition = 1 + transitionIndex(target);
        }
        return toNumber(target.dataset.transition) || 0;
    }
    function waitTransitionend(target) {
        return Promise$1.all(children(target).filter(Transition.inProgress).map(function(el) {
            return new Promise$1(function(resolve) {
                return once(el, "transitionend transitioncanceled", resolve);
            });
        }));
    }
    function getTransitionNodes(target) {
        return getRows(children(target)).reduce(function(nodes, row) {
            return nodes.concat(sortBy$1(row.filter(function(el) {
                return isInView(el);
            }), "offsetLeft"));
        }, []);
    }
    function slide(action, target, duration) {
        return new Promise$1(function(resolve) {
            return requestAnimationFrame(function() {
                var nodes = children(target);
                var currentProps = nodes.map(function(el) {
                    return getProps(el, true);
                });
                var targetProps = css(target, [ "height", "padding" ]);
                Transition.cancel(target);
                nodes.forEach(Transition.cancel);
                reset(target);
                action();
                nodes = nodes.concat(children(target).filter(function(el) {
                    return !includes(nodes, el);
                }));
                Promise$1.resolve().then(function() {
                    fastdom.flush();
                    var targetPropsTo = css(target, [ "height", "padding" ]);
                    var ref = getTransitionProps(target, nodes, currentProps);
                    var propsTo = ref[0];
                    var propsFrom = ref[1];
                    nodes.forEach(function(el, i) {
                        return propsFrom[i] && css(el, propsFrom[i]);
                    });
                    css(target, assign({
                        display: "block"
                    }, targetProps));
                    requestAnimationFrame(function() {
                        var transitions = nodes.map(function(el, i) {
                            return parent(el) === target && Transition.start(el, propsTo[i], duration, "ease");
                        }).concat(Transition.start(target, targetPropsTo, duration, "ease"));
                        Promise$1.all(transitions).then(function() {
                            nodes.forEach(function(el, i) {
                                return parent(el) === target && css(el, "display", propsTo[i].opacity === 0 ? "none" : "");
                            });
                            reset(target);
                        }, noop).then(resolve);
                    });
                });
            });
        });
    }
    function getProps(el, opacity) {
        var zIndex = css(el, "zIndex");
        return isVisible(el) ? assign({
            display: "",
            opacity: opacity ? css(el, "opacity") : "0",
            pointerEvents: "none",
            position: "absolute",
            zIndex: zIndex === "auto" ? index(el) : zIndex
        }, getPositionWithMargin(el)) : false;
    }
    function getTransitionProps(target, nodes, currentProps) {
        var propsTo = nodes.map(function(el, i) {
            return parent(el) && i in currentProps ? currentProps[i] ? isVisible(el) ? getPositionWithMargin(el) : {
                opacity: 0
            } : {
                opacity: isVisible(el) ? 1 : 0
            } : false;
        });
        var propsFrom = propsTo.map(function(props, i) {
            var from = parent(nodes[i]) === target && (currentProps[i] || getProps(nodes[i]));
            if (!from) {
                return false;
            }
            if (!props) {
                delete from.opacity;
            } else if (!("opacity" in props)) {
                var opacity = from.opacity;
                if (opacity % 1) {
                    props.opacity = 1;
                } else {
                    delete from.opacity;
                }
            }
            return from;
        });
        return [ propsTo, propsFrom ];
    }
    function reset(el) {
        css(el.children, {
            height: "",
            left: "",
            opacity: "",
            pointerEvents: "",
            position: "",
            top: "",
            marginTop: "",
            marginLeft: "",
            transform: "",
            width: "",
            zIndex: ""
        });
        css(el, {
            height: "",
            display: "",
            padding: ""
        });
    }
    function getPositionWithMargin(el) {
        var ref = offset(el);
        var height = ref.height;
        var width = ref.width;
        var ref$1 = position(el);
        var top = ref$1.top;
        var left = ref$1.left;
        var ref$2 = css(el, [ "marginTop", "marginLeft" ]);
        var marginLeft = ref$2.marginLeft;
        var marginTop = ref$2.marginTop;
        return {
            top: top,
            left: left,
            height: height,
            width: width,
            marginLeft: marginLeft,
            marginTop: marginTop,
            transform: ""
        };
    }
    var Animate = {
        props: {
            duration: Number,
            animation: Boolean
        },
        data: {
            duration: 150,
            animation: "slide"
        },
        methods: {
            animate: function(action, target) {
                var this$1 = this;
                if (target === void 0) target = this.$el;
                var name = this.animation;
                var animationFn = name === "fade" ? fade : name === "delayed-fade" ? function() {
                    var args = [], len = arguments.length;
                    while (len--) args[len] = arguments[len];
                    return fade.apply(void 0, args.concat([ 40 ]));
                } : !name ? function() {
                    action();
                    return Promise$1.resolve();
                } : slide;
                return animationFn(action, target, this.duration).then(function() {
                    return this$1.$update(target, "resize");
                }, noop);
            }
        }
    };
    var filter = {
        mixins: [ Animate ],
        args: "target",
        props: {
            target: Boolean,
            selActive: Boolean
        },
        data: {
            target: null,
            selActive: false,
            attrItem: "uk-filter-control",
            cls: "uk-active",
            duration: 250
        },
        computed: {
            toggles: {
                get: function(ref, $el) {
                    var attrItem = ref.attrItem;
                    return $$("[" + attrItem + "],[data-" + attrItem + "]", $el);
                },
                watch: function() {
                    var this$1 = this;
                    this.updateState();
                    if (this.selActive !== false) {
                        var actives = $$(this.selActive, this.$el);
                        this.toggles.forEach(function(el) {
                            return toggleClass(el, this$1.cls, includes(actives, el));
                        });
                    }
                },
                immediate: true
            },
            children: {
                get: function(ref, $el) {
                    var target = ref.target;
                    return $$(target + " > *", $el);
                },
                watch: function(list, old) {
                    if (old && !isEqualList(list, old)) {
                        this.updateState();
                    }
                },
                immediate: true
            }
        },
        events: [ {
            name: "click",
            delegate: function() {
                return "[" + this.attrItem + "],[data-" + this.attrItem + "]";
            },
            handler: function(e) {
                e.preventDefault();
                this.apply(e.current);
            }
        } ],
        methods: {
            apply: function(el) {
                var prevState = this.getState();
                var newState = mergeState(el, this.attrItem, this.getState());
                if (!isEqualState(prevState, newState)) {
                    this.setState(newState);
                }
            },
            getState: function() {
                var this$1 = this;
                return this.toggles.filter(function(item) {
                    return hasClass(item, this$1.cls);
                }).reduce(function(state, el) {
                    return mergeState(el, this$1.attrItem, state);
                }, {
                    filter: {
                        "": ""
                    },
                    sort: []
                });
            },
            setState: function(state, animate) {
                var this$1 = this;
                if (animate === void 0) animate = true;
                state = assign({
                    filter: {
                        "": ""
                    },
                    sort: []
                }, state);
                trigger(this.$el, "beforeFilter", [ this, state ]);
                this.toggles.forEach(function(el) {
                    return toggleClass(el, this$1.cls, !!matchFilter(el, this$1.attrItem, state));
                });
                Promise$1.all($$(this.target, this.$el).map(function(target) {
                    var filterFn = function() {
                        applyState(state, target, children(target));
                        this$1.$update(this$1.$el);
                    };
                    return animate ? this$1.animate(filterFn, target) : filterFn();
                })).then(function() {
                    return trigger(this$1.$el, "afterFilter", [ this$1 ]);
                });
            },
            updateState: function() {
                var this$1 = this;
                fastdom.write(function() {
                    return this$1.setState(this$1.getState(), false);
                });
            }
        }
    };
    function getFilter(el, attr) {
        return parseOptions(data(el, attr), [ "filter" ]);
    }
    function isEqualState(stateA, stateB) {
        return [ "filter", "sort" ].every(function(prop) {
            return isEqual(stateA[prop], stateB[prop]);
        });
    }
    function applyState(state, target, children) {
        var selector = getSelector(state);
        children.forEach(function(el) {
            return css(el, "display", selector && !matches(el, selector) ? "none" : "");
        });
        var ref = state.sort;
        var sort = ref[0];
        var order = ref[1];
        if (sort) {
            var sorted = sortItems(children, sort, order);
            if (!isEqual(sorted, children)) {
                append(target, sorted);
            }
        }
    }
    function mergeState(el, attr, state) {
        var filterBy = getFilter(el, attr);
        var filter = filterBy.filter;
        var group = filterBy.group;
        var sort = filterBy.sort;
        var order = filterBy.order;
        if (order === void 0) order = "asc";
        if (filter || isUndefined(sort)) {
            if (group) {
                if (filter) {
                    delete state.filter[""];
                    state.filter[group] = filter;
                } else {
                    delete state.filter[group];
                    if (isEmpty(state.filter) || "" in state.filter) {
                        state.filter = {
                            "": filter || ""
                        };
                    }
                }
            } else {
                state.filter = {
                    "": filter || ""
                };
            }
        }
        if (!isUndefined(sort)) {
            state.sort = [ sort, order ];
        }
        return state;
    }
    function matchFilter(el, attr, ref) {
        var stateFilter = ref.filter;
        if (stateFilter === void 0) stateFilter = {
            "": ""
        };
        var ref_sort = ref.sort;
        var stateSort = ref_sort[0];
        var stateOrder = ref_sort[1];
        var ref$1 = getFilter(el, attr);
        var filter = ref$1.filter;
        if (filter === void 0) filter = "";
        var group = ref$1.group;
        if (group === void 0) group = "";
        var sort = ref$1.sort;
        var order = ref$1.order;
        if (order === void 0) order = "asc";
        return isUndefined(sort) ? group in stateFilter && filter === stateFilter[group] || !filter && group && !(group in stateFilter) && !stateFilter[""] : stateSort === sort && stateOrder === order;
    }
    function isEqualList(listA, listB) {
        return listA.length === listB.length && listA.every(function(el) {
            return ~listB.indexOf(el);
        });
    }
    function getSelector(ref) {
        var filter = ref.filter;
        var selector = "";
        each(filter, function(value) {
            return selector += value || "";
        });
        return selector;
    }
    function sortItems(nodes, sort, order) {
        return assign([], nodes).sort(function(a, b) {
            return data(a, sort).localeCompare(data(b, sort), undefined, {
                numeric: true
            }) * (order === "asc" || -1);
        });
    }
    var Animations$2 = {
        slide: {
            show: function(dir) {
                return [ {
                    transform: translate(dir * -100)
                }, {
                    transform: translate()
                } ];
            },
            percent: function(current) {
                return translated(current);
            },
            translate: function(percent, dir) {
                return [ {
                    transform: translate(dir * -100 * percent)
                }, {
                    transform: translate(dir * 100 * (1 - percent))
                } ];
            }
        }
    };
    function translated(el) {
        return Math.abs(css(el, "transform").split(",")[4] / el.offsetWidth) || 0;
    }
    function translate(value, unit) {
        if (value === void 0) value = 0;
        if (unit === void 0) unit = "%";
        value += value ? unit : "";
        return isIE ? "translateX(" + value + ")" : "translate3d(" + value + ", 0, 0)";
    }
    function scale3d(value) {
        return "scale3d(" + value + ", " + value + ", 1)";
    }
    var Animations$1 = assign({}, Animations$2, {
        fade: {
            show: function() {
                return [ {
                    opacity: 0
                }, {
                    opacity: 1
                } ];
            },
            percent: function(current) {
                return 1 - css(current, "opacity");
            },
            translate: function(percent) {
                return [ {
                    opacity: 1 - percent
                }, {
                    opacity: percent
                } ];
            }
        },
        scale: {
            show: function() {
                return [ {
                    opacity: 0,
                    transform: scale3d(1 - .2)
                }, {
                    opacity: 1,
                    transform: scale3d(1)
                } ];
            },
            percent: function(current) {
                return 1 - css(current, "opacity");
            },
            translate: function(percent) {
                return [ {
                    opacity: 1 - percent,
                    transform: scale3d(1 - .2 * percent)
                }, {
                    opacity: percent,
                    transform: scale3d(1 - .2 + .2 * percent)
                } ];
            }
        }
    });
    function Transitioner$1(prev, next, dir, ref) {
        var animation = ref.animation;
        var easing = ref.easing;
        var percent = animation.percent;
        var translate = animation.translate;
        var show = animation.show;
        if (show === void 0) show = noop;
        var props = show(dir);
        var deferred = new Deferred();
        return {
            dir: dir,
            show: function(duration, percent, linear) {
                var this$1 = this;
                if (percent === void 0) percent = 0;
                var timing = linear ? "linear" : easing;
                duration -= Math.round(duration * clamp(percent, -1, 1));
                this.translate(percent);
                triggerUpdate$1(next, "itemin", {
                    percent: percent,
                    duration: duration,
                    timing: timing,
                    dir: dir
                });
                triggerUpdate$1(prev, "itemout", {
                    percent: 1 - percent,
                    duration: duration,
                    timing: timing,
                    dir: dir
                });
                Promise$1.all([ Transition.start(next, props[1], duration, timing), Transition.start(prev, props[0], duration, timing) ]).then(function() {
                    this$1.reset();
                    deferred.resolve();
                }, noop);
                return deferred.promise;
            },
            cancel: function() {
                Transition.cancel([ next, prev ]);
            },
            reset: function() {
                for (var prop in props[0]) {
                    css([ next, prev ], prop, "");
                }
            },
            forward: function(duration, percent) {
                if (percent === void 0) percent = this.percent();
                Transition.cancel([ next, prev ]);
                return this.show(duration, percent, true);
            },
            translate: function(percent) {
                this.reset();
                var props = translate(percent, dir);
                css(next, props[1]);
                css(prev, props[0]);
                triggerUpdate$1(next, "itemtranslatein", {
                    percent: percent,
                    dir: dir
                });
                triggerUpdate$1(prev, "itemtranslateout", {
                    percent: 1 - percent,
                    dir: dir
                });
            },
            percent: function() {
                return percent(prev || next, next, dir);
            },
            getDistance: function() {
                return prev && prev.offsetWidth;
            }
        };
    }
    function triggerUpdate$1(el, type, data) {
        trigger(el, createEvent(type, false, false, data));
    }
    var SliderAutoplay = {
        props: {
            autoplay: Boolean,
            autoplayInterval: Number,
            pauseOnHover: Boolean
        },
        data: {
            autoplay: false,
            autoplayInterval: 7e3,
            pauseOnHover: true
        },
        connected: function() {
            this.autoplay && this.startAutoplay();
        },
        disconnected: function() {
            this.stopAutoplay();
        },
        update: function() {
            attr(this.slides, "tabindex", "-1");
        },
        events: [ {
            name: "visibilitychange",
            el: function() {
                return document;
            },
            filter: function() {
                return this.autoplay;
            },
            handler: function() {
                if (document.hidden) {
                    this.stopAutoplay();
                } else {
                    this.startAutoplay();
                }
            }
        } ],
        methods: {
            startAutoplay: function() {
                var this$1 = this;
                this.stopAutoplay();
                this.interval = setInterval(function() {
                    return (!this$1.draggable || !$(":focus", this$1.$el)) && (!this$1.pauseOnHover || !matches(this$1.$el, ":hover")) && !this$1.stack.length && this$1.show("next");
                }, this.autoplayInterval);
            },
            stopAutoplay: function() {
                this.interval && clearInterval(this.interval);
            }
        }
    };
    var SliderDrag = {
        props: {
            draggable: Boolean
        },
        data: {
            draggable: true,
            threshold: 10
        },
        created: function() {
            var this$1 = this;
            [ "start", "move", "end" ].forEach(function(key) {
                var fn = this$1[key];
                this$1[key] = function(e) {
                    var pos = getEventPos(e).x * (isRtl ? -1 : 1);
                    this$1.prevPos = pos !== this$1.pos ? this$1.pos : this$1.prevPos;
                    this$1.pos = pos;
                    fn(e);
                };
            });
        },
        events: [ {
            name: pointerDown,
            delegate: function() {
                return this.selSlides;
            },
            handler: function(e) {
                if (!this.draggable || !isTouch(e) && hasTextNodesOnly(e.target) || closest(e.target, selInput) || e.button > 0 || this.length < 2) {
                    return;
                }
                this.start(e);
            }
        }, {
            name: "dragstart",
            handler: function(e) {
                e.preventDefault();
            }
        } ],
        methods: {
            start: function() {
                this.drag = this.pos;
                if (this._transitioner) {
                    this.percent = this._transitioner.percent();
                    this.drag += this._transitioner.getDistance() * this.percent * this.dir;
                    this._transitioner.cancel();
                    this._transitioner.translate(this.percent);
                    this.dragging = true;
                    this.stack = [];
                } else {
                    this.prevIndex = this.index;
                }
                on(document, pointerMove, this.move, {
                    passive: false
                });
                on(document, pointerUp + " " + pointerCancel + " input", this.end, true);
                css(this.list, "userSelect", "none");
            },
            move: function(e) {
                var this$1 = this;
                var distance = this.pos - this.drag;
                if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
                    return;
                }
                css(this.list, "pointerEvents", "none");
                e.cancelable && e.preventDefault();
                this.dragging = true;
                this.dir = distance < 0 ? 1 : -1;
                var ref = this;
                var slides = ref.slides;
                var ref$1 = this;
                var prevIndex = ref$1.prevIndex;
                var dis = Math.abs(distance);
                var nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
                var width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
                while (nextIndex !== prevIndex && dis > width) {
                    this.drag -= width * this.dir;
                    prevIndex = nextIndex;
                    dis -= width;
                    nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
                    width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
                }
                this.percent = dis / width;
                var prev = slides[prevIndex];
                var next = slides[nextIndex];
                var changed = this.index !== nextIndex;
                var edge = prevIndex === nextIndex;
                var itemShown;
                [ this.index, this.prevIndex ].filter(function(i) {
                    return !includes([ nextIndex, prevIndex ], i);
                }).forEach(function(i) {
                    trigger(slides[i], "itemhidden", [ this$1 ]);
                    if (edge) {
                        itemShown = true;
                        this$1.prevIndex = prevIndex;
                    }
                });
                if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
                    trigger(slides[this.index], "itemshown", [ this ]);
                }
                if (changed) {
                    this.prevIndex = prevIndex;
                    this.index = nextIndex;
                    !edge && trigger(prev, "beforeitemhide", [ this ]);
                    trigger(next, "beforeitemshow", [ this ]);
                }
                this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);
                if (changed) {
                    !edge && trigger(prev, "itemhide", [ this ]);
                    trigger(next, "itemshow", [ this ]);
                }
            },
            end: function() {
                off(document, pointerMove, this.move, {
                    passive: false
                });
                off(document, pointerUp + " " + pointerCancel + " input", this.end, true);
                if (this.dragging) {
                    this.dragging = null;
                    if (this.index === this.prevIndex) {
                        this.percent = 1 - this.percent;
                        this.dir *= -1;
                        this._show(false, this.index, true);
                        this._transitioner = null;
                    } else {
                        var dirChange = (isRtl ? this.dir * (isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
                        this.index = dirChange ? this.index : this.prevIndex;
                        if (dirChange) {
                            this.percent = 1 - this.percent;
                        }
                        this.show(this.dir > 0 && !dirChange || this.dir < 0 && dirChange ? "next" : "previous", true);
                    }
                }
                css(this.list, {
                    userSelect: "",
                    pointerEvents: ""
                });
                this.drag = this.percent = null;
            }
        }
    };
    function hasTextNodesOnly(el) {
        return !el.children.length && el.childNodes.length;
    }
    var SliderNav = {
        data: {
            selNav: false
        },
        computed: {
            nav: function(ref, $el) {
                var selNav = ref.selNav;
                return $(selNav, $el);
            },
            selNavItem: function(ref) {
                var attrItem = ref.attrItem;
                return "[" + attrItem + "],[data-" + attrItem + "]";
            },
            navItems: function(_, $el) {
                return $$(this.selNavItem, $el);
            }
        },
        update: {
            write: function() {
                var this$1 = this;
                if (this.nav && this.length !== this.nav.children.length) {
                    html(this.nav, this.slides.map(function(_, i) {
                        return "<li " + this$1.attrItem + '="' + i + '"><a href></a></li>';
                    }).join(""));
                }
                this.navItems.concat(this.nav).forEach(function(el) {
                    return el && (el.hidden = !this$1.maxIndex);
                });
                this.updateNav();
            },
            events: [ "resize" ]
        },
        events: [ {
            name: "click",
            delegate: function() {
                return this.selNavItem;
            },
            handler: function(e) {
                e.preventDefault();
                this.show(data(e.current, this.attrItem));
            }
        }, {
            name: "itemshow",
            handler: "updateNav"
        } ],
        methods: {
            updateNav: function() {
                var this$1 = this;
                var i = this.getValidIndex();
                this.navItems.forEach(function(el) {
                    var cmd = data(el, this$1.attrItem);
                    toggleClass(el, this$1.clsActive, toNumber(cmd) === i);
                    toggleClass(el, "uk-invisible", this$1.finite && (cmd === "previous" && i === 0 || cmd === "next" && i >= this$1.maxIndex));
                });
            }
        }
    };
    var Slider = {
        mixins: [ SliderAutoplay, SliderDrag, SliderNav ],
        props: {
            clsActivated: Boolean,
            easing: String,
            index: Number,
            finite: Boolean,
            velocity: Number,
            selSlides: String
        },
        data: function() {
            return {
                easing: "ease",
                finite: false,
                velocity: 1,
                index: 0,
                prevIndex: -1,
                stack: [],
                percent: 0,
                clsActive: "uk-active",
                clsActivated: false,
                Transitioner: false,
                transitionOptions: {}
            };
        },
        connected: function() {
            this.prevIndex = -1;
            this.index = this.getValidIndex(this.$props.index);
            this.stack = [];
        },
        disconnected: function() {
            removeClass(this.slides, this.clsActive);
        },
        computed: {
            duration: function(ref, $el) {
                var velocity = ref.velocity;
                return speedUp($el.offsetWidth / velocity);
            },
            list: function(ref, $el) {
                var selList = ref.selList;
                return $(selList, $el);
            },
            maxIndex: function() {
                return this.length - 1;
            },
            selSlides: function(ref) {
                var selList = ref.selList;
                var selSlides = ref.selSlides;
                return selList + " " + (selSlides || "> *");
            },
            slides: {
                get: function() {
                    return $$(this.selSlides, this.$el);
                },
                watch: function() {
                    this.$reset();
                }
            },
            length: function() {
                return this.slides.length;
            }
        },
        events: {
            itemshown: function() {
                this.$update(this.list);
            }
        },
        methods: {
            show: function(index, force) {
                var this$1 = this;
                if (force === void 0) force = false;
                if (this.dragging || !this.length) {
                    return;
                }
                var ref = this;
                var stack = ref.stack;
                var queueIndex = force ? 0 : stack.length;
                var reset = function() {
                    stack.splice(queueIndex, 1);
                    if (stack.length) {
                        this$1.show(stack.shift(), true);
                    }
                };
                stack[force ? "unshift" : "push"](index);
                if (!force && stack.length > 1) {
                    if (stack.length === 2) {
                        this._transitioner.forward(Math.min(this.duration, 200));
                    }
                    return;
                }
                var prevIndex = this.getIndex(this.index);
                var prev = hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
                var nextIndex = this.getIndex(index, this.index);
                var next = this.slides[nextIndex];
                if (prev === next) {
                    reset();
                    return;
                }
                this.dir = getDirection(index, prevIndex);
                this.prevIndex = prevIndex;
                this.index = nextIndex;
                if (prev && !trigger(prev, "beforeitemhide", [ this ]) || !trigger(next, "beforeitemshow", [ this, prev ])) {
                    this.index = this.prevIndex;
                    reset();
                    return;
                }
                var promise = this._show(prev, next, force).then(function() {
                    prev && trigger(prev, "itemhidden", [ this$1 ]);
                    trigger(next, "itemshown", [ this$1 ]);
                    return new Promise$1(function(resolve) {
                        fastdom.write(function() {
                            stack.shift();
                            if (stack.length) {
                                this$1.show(stack.shift(), true);
                            } else {
                                this$1._transitioner = null;
                            }
                            resolve();
                        });
                    });
                });
                prev && trigger(prev, "itemhide", [ this ]);
                trigger(next, "itemshow", [ this ]);
                return promise;
            },
            getIndex: function(index, prev) {
                if (index === void 0) index = this.index;
                if (prev === void 0) prev = this.index;
                return clamp(getIndex(index, this.slides, prev, this.finite), 0, this.maxIndex);
            },
            getValidIndex: function(index, prevIndex) {
                if (index === void 0) index = this.index;
                if (prevIndex === void 0) prevIndex = this.prevIndex;
                return this.getIndex(index, prevIndex);
            },
            _show: function(prev, next, force) {
                this._transitioner = this._getTransitioner(prev, next, this.dir, assign({
                    easing: force ? next.offsetWidth < 600 ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "cubic-bezier(0.165, 0.84, 0.44, 1)" : this.easing
                }, this.transitionOptions));
                if (!force && !prev) {
                    this._translate(1);
                    return Promise$1.resolve();
                }
                var ref = this.stack;
                var length = ref.length;
                return this._transitioner[length > 1 ? "forward" : "show"](length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration, this.percent);
            },
            _getDistance: function(prev, next) {
                return this._getTransitioner(prev, prev !== next && next).getDistance();
            },
            _translate: function(percent, prev, next) {
                if (prev === void 0) prev = this.prevIndex;
                if (next === void 0) next = this.index;
                var transitioner = this._getTransitioner(prev !== next ? prev : false, next);
                transitioner.translate(percent);
                return transitioner;
            },
            _getTransitioner: function(prev, next, dir, options) {
                if (prev === void 0) prev = this.prevIndex;
                if (next === void 0) next = this.index;
                if (dir === void 0) dir = this.dir || 1;
                if (options === void 0) options = this.transitionOptions;
                return new this.Transitioner(isNumber(prev) ? this.slides[prev] : prev, isNumber(next) ? this.slides[next] : next, dir * (isRtl ? -1 : 1), options);
            }
        }
    };
    function getDirection(index, prevIndex) {
        return index === "next" ? 1 : index === "previous" ? -1 : index < prevIndex ? -1 : 1;
    }
    function speedUp(x) {
        return .5 * x + 300;
    }
    var Slideshow = {
        mixins: [ Slider ],
        props: {
            animation: String
        },
        data: {
            animation: "slide",
            clsActivated: "uk-transition-active",
            Animations: Animations$2,
            Transitioner: Transitioner$1
        },
        computed: {
            animation: function(ref) {
                var animation = ref.animation;
                var Animations = ref.Animations;
                return assign(Animations[animation] || Animations.slide, {
                    name: animation
                });
            },
            transitionOptions: function() {
                return {
                    animation: this.animation
                };
            }
        },
        events: {
            "itemshow itemhide itemshown itemhidden": function(ref) {
                var target = ref.target;
                this.$update(target);
            },
            beforeitemshow: function(ref) {
                var target = ref.target;
                addClass(target, this.clsActive);
            },
            itemshown: function(ref) {
                var target = ref.target;
                addClass(target, this.clsActivated);
            },
            itemhidden: function(ref) {
                var target = ref.target;
                removeClass(target, this.clsActive, this.clsActivated);
            }
        }
    };
    var LightboxPanel = {
        mixins: [ Container, Modal, Togglable, Slideshow ],
        functional: true,
        props: {
            delayControls: Number,
            preload: Number,
            videoAutoplay: Boolean,
            template: String
        },
        data: function() {
            return {
                preload: 1,
                videoAutoplay: false,
                delayControls: 3e3,
                items: [],
                cls: "uk-open",
                clsPage: "uk-lightbox-page",
                selList: ".uk-lightbox-items",
                attrItem: "uk-lightbox-item",
                selClose: ".uk-close-large",
                selCaption: ".uk-lightbox-caption",
                pauseOnHover: false,
                velocity: 2,
                Animations: Animations$1,
                template: '<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>'
            };
        },
        created: function() {
            var $el = $(this.template);
            var list = $(this.selList, $el);
            this.items.forEach(function() {
                return append(list, "<li>");
            });
            this.$mount(append(this.container, $el));
        },
        computed: {
            caption: function(ref, $el) {
                var selCaption = ref.selCaption;
                return $(selCaption, $el);
            }
        },
        events: [ {
            name: pointerMove + " " + pointerDown + " keydown",
            handler: "showControls"
        }, {
            name: "click",
            self: true,
            delegate: function() {
                return this.selSlides;
            },
            handler: function(e) {
                if (e.defaultPrevented) {
                    return;
                }
                this.hide();
            }
        }, {
            name: "shown",
            self: true,
            handler: function() {
                this.showControls();
            }
        }, {
            name: "hide",
            self: true,
            handler: function() {
                this.hideControls();
                removeClass(this.slides, this.clsActive);
                Transition.stop(this.slides);
            }
        }, {
            name: "hidden",
            self: true,
            handler: function() {
                this.$destroy(true);
            }
        }, {
            name: "keyup",
            el: function() {
                return document;
            },
            handler: function(e) {
                if (!this.isToggled(this.$el) || !this.draggable) {
                    return;
                }
                switch (e.keyCode) {
                  case 37:
                    this.show("previous");
                    break;

                  case 39:
                    this.show("next");
                    break;
                }
            }
        }, {
            name: "beforeitemshow",
            handler: function(e) {
                if (this.isToggled()) {
                    return;
                }
                this.draggable = false;
                e.preventDefault();
                this.toggleElement(this.$el, true, false);
                this.animation = Animations$1["scale"];
                removeClass(e.target, this.clsActive);
                this.stack.splice(1, 0, this.index);
            }
        }, {
            name: "itemshow",
            handler: function() {
                html(this.caption, this.getItem().caption || "");
                for (var j = -this.preload; j <= this.preload; j++) {
                    this.loadItem(this.index + j);
                }
            }
        }, {
            name: "itemshown",
            handler: function() {
                this.draggable = this.$props.draggable;
            }
        }, {
            name: "itemload",
            handler: function(_, item) {
                var this$1 = this;
                var src = item.source;
                var type = item.type;
                var alt = item.alt;
                if (alt === void 0) alt = "";
                var poster = item.poster;
                var attrs = item.attrs;
                if (attrs === void 0) attrs = {};
                this.setItem(item, "<span uk-spinner></span>");
                if (!src) {
                    return;
                }
                var matches;
                var iframeAttrs = {
                    frameborder: "0",
                    allow: "autoplay",
                    allowfullscreen: "",
                    style: "max-width: 100%; box-sizing: border-box;",
                    "uk-responsive": "",
                    "uk-video": "" + this.videoAutoplay
                };
                if (type === "image" || src.match(/\.(avif|jpe?g|a?png|gif|svg|webp)($|\?)/i)) {
                    getImage(src, attrs.srcset, attrs.size).then(function(ref) {
                        var width = ref.width;
                        var height = ref.height;
                        return this$1.setItem(item, createEl("img", assign({
                            src: src,
                            width: width,
                            height: height,
                            alt: alt
                        }, attrs)));
                    }, function() {
                        return this$1.setError(item);
                    });
                } else if (type === "video" || src.match(/\.(mp4|webm|ogv)($|\?)/i)) {
                    var video = createEl("video", assign({
                        src: src,
                        poster: poster,
                        controls: "",
                        playsinline: "",
                        "uk-video": "" + this.videoAutoplay
                    }, attrs));
                    on(video, "loadedmetadata", function() {
                        attr(video, {
                            width: video.videoWidth,
                            height: video.videoHeight
                        });
                        this$1.setItem(item, video);
                    });
                    on(video, "error", function() {
                        return this$1.setError(item);
                    });
                } else if (type === "iframe" || src.match(/\.(html|php)($|\?)/i)) {
                    this.setItem(item, createEl("iframe", assign({
                        src: src,
                        frameborder: "0",
                        allowfullscreen: "",
                        class: "uk-lightbox-iframe"
                    }, attrs)));
                } else if (matches = src.match(/\/\/(?:.*?youtube(-nocookie)?\..*?[?&]v=|youtu\.be\/)([\w-]{11})[&?]?(.*)?/)) {
                    this.setItem(item, createEl("iframe", assign({
                        src: "https://www.youtube" + (matches[1] || "") + ".com/embed/" + matches[2] + (matches[3] ? "?" + matches[3] : ""),
                        width: 1920,
                        height: 1080
                    }, iframeAttrs, attrs)));
                } else if (matches = src.match(/\/\/.*?vimeo\.[a-z]+\/(\d+)[&?]?(.*)?/)) {
                    ajax("https://vimeo.com/api/oembed.json?maxwidth=1920&url=" + encodeURI(src), {
                        responseType: "json",
                        withCredentials: false
                    }).then(function(ref) {
                        var ref_response = ref.response;
                        var height = ref_response.height;
                        var width = ref_response.width;
                        return this$1.setItem(item, createEl("iframe", assign({
                            src: "https://player.vimeo.com/video/" + matches[1] + (matches[2] ? "?" + matches[2] : ""),
                            width: width,
                            height: height
                        }, iframeAttrs, attrs)));
                    }, function() {
                        return this$1.setError(item);
                    });
                }
            }
        } ],
        methods: {
            loadItem: function(index) {
                if (index === void 0) index = this.index;
                var item = this.getItem(index);
                if (!this.getSlide(item).childElementCount) {
                    trigger(this.$el, "itemload", [ item ]);
                }
            },
            getItem: function(index) {
                if (index === void 0) index = this.index;
                return this.items[getIndex(index, this.slides)];
            },
            setItem: function(item, content) {
                trigger(this.$el, "itemloaded", [ this, html(this.getSlide(item), content) ]);
            },
            getSlide: function(item) {
                return this.slides[this.items.indexOf(item)];
            },
            setError: function(item) {
                this.setItem(item, '<span uk-icon="icon: bolt; ratio: 2"></span>');
            },
            showControls: function() {
                clearTimeout(this.controlsTimer);
                this.controlsTimer = setTimeout(this.hideControls, this.delayControls);
                addClass(this.$el, "uk-active", "uk-transition-active");
            },
            hideControls: function() {
                removeClass(this.$el, "uk-active", "uk-transition-active");
            }
        }
    };
    function createEl(tag, attrs) {
        var el = fragment("<" + tag + ">");
        attr(el, attrs);
        return el;
    }
    var lightbox = {
        install: install$1,
        props: {
            toggle: String
        },
        data: {
            toggle: "a"
        },
        computed: {
            toggles: {
                get: function(ref, $el) {
                    var toggle = ref.toggle;
                    return $$(toggle, $el);
                },
                watch: function() {
                    this.hide();
                }
            }
        },
        disconnected: function() {
            this.hide();
        },
        events: [ {
            name: "click",
            delegate: function() {
                return this.toggle + ":not(.uk-disabled)";
            },
            handler: function(e) {
                e.preventDefault();
                this.show(e.current);
            }
        } ],
        methods: {
            show: function(index) {
                var this$1 = this;
                var items = uniqueBy(this.toggles.map(toItem), "source");
                if (isElement(index)) {
                    var ref = toItem(index);
                    var source = ref.source;
                    index = findIndex(items, function(ref) {
                        var src = ref.source;
                        return source === src;
                    });
                }
                this.panel = this.panel || this.$create("lightboxPanel", assign({}, this.$props, {
                    items: items
                }));
                on(this.panel.$el, "hidden", function() {
                    return this$1.panel = false;
                });
                return this.panel.show(index);
            },
            hide: function() {
                return this.panel && this.panel.hide();
            }
        }
    };
    function install$1(UIkit, Lightbox) {
        if (!UIkit.lightboxPanel) {
            UIkit.component("lightboxPanel", LightboxPanel);
        }
        assign(Lightbox.props, UIkit.component("lightboxPanel").options.props);
    }
    function toItem(el) {
        var item = {};
        [ "href", "caption", "type", "poster", "alt", "attrs" ].forEach(function(attr) {
            item[attr === "href" ? "source" : attr] = data(el, attr);
        });
        item.attrs = parseOptions(item.attrs);
        return item;
    }
    var obj$1;
    var notification = {
        mixins: [ Container ],
        functional: true,
        args: [ "message", "status" ],
        data: {
            message: "",
            status: "",
            timeout: 5e3,
            group: null,
            pos: "top-center",
            clsContainer: "uk-notification",
            clsClose: "uk-notification-close",
            clsMsg: "uk-notification-message"
        },
        install: install,
        computed: {
            marginProp: function(ref) {
                var pos = ref.pos;
                return "margin" + (startsWith(pos, "top") ? "Top" : "Bottom");
            },
            startProps: function() {
                var obj;
                return obj = {
                    opacity: 0
                }, obj[this.marginProp] = -this.$el.offsetHeight, obj;
            }
        },
        created: function() {
            var container = $("." + this.clsContainer + "-" + this.pos, this.container) || append(this.container, '<div class="' + this.clsContainer + " " + this.clsContainer + "-" + this.pos + '" style="display: block"></div>');
            this.$mount(append(container, '<div class="' + this.clsMsg + (this.status ? " " + this.clsMsg + "-" + this.status : "") + '"> <a href class="' + this.clsClose + '" data-uk-close></a> <div>' + this.message + "</div> </div>"));
        },
        connected: function() {
            var this$1 = this;
            var obj;
            var margin = toFloat(css(this.$el, this.marginProp));
            Transition.start(css(this.$el, this.startProps), (obj = {
                opacity: 1
            }, obj[this.marginProp] = margin, obj)).then(function() {
                if (this$1.timeout) {
                    this$1.timer = setTimeout(this$1.close, this$1.timeout);
                }
            });
        },
        events: (obj$1 = {
            click: function(e) {
                if (closest(e.target, 'a[href="#"],a[href=""]')) {
                    e.preventDefault();
                }
                this.close();
            }
        }, obj$1[pointerEnter] = function() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        }, obj$1[pointerLeave] = function() {
            if (this.timeout) {
                this.timer = setTimeout(this.close, this.timeout);
            }
        }, obj$1),
        methods: {
            close: function(immediate) {
                var this$1 = this;
                var removeFn = function(el) {
                    var container = parent(el);
                    trigger(el, "close", [ this$1 ]);
                    remove$1(el);
                    if (container && !container.hasChildNodes()) {
                        remove$1(container);
                    }
                };
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                if (immediate) {
                    removeFn(this.$el);
                } else {
                    Transition.start(this.$el, this.startProps).then(removeFn);
                }
            }
        }
    };
    function install(UIkit) {
        UIkit.notification.closeAll = function(group, immediate) {
            apply$1(document.body, function(el) {
                var notification = UIkit.getComponent(el, "notification");
                if (notification && (!group || group === notification.group)) {
                    notification.close(immediate);
                }
            });
        };
    }
    var props = [ "x", "y", "bgx", "bgy", "rotate", "scale", "color", "backgroundColor", "borderColor", "opacity", "blur", "hue", "grayscale", "invert", "saturate", "sepia", "fopacity", "stroke" ];
    var Parallax = {
        mixins: [ Media ],
        props: props.reduce(function(props, prop) {
            props[prop] = "list";
            return props;
        }, {}),
        data: props.reduce(function(data, prop) {
            data[prop] = undefined;
            return data;
        }, {}),
        computed: {
            props: function(properties, $el) {
                var this$1 = this;
                return props.reduce(function(props, prop) {
                    if (isUndefined(properties[prop])) {
                        return props;
                    }
                    var isColor = prop.match(/color/i);
                    var isCssProp = isColor || prop === "opacity";
                    var pos, bgPos, diff;
                    var steps = properties[prop].slice();
                    if (isCssProp) {
                        css($el, prop, "");
                    }
                    if (steps.length < 2) {
                        steps.unshift((prop === "scale" ? 1 : isCssProp ? css($el, prop) : 0) || 0);
                    }
                    var unit = getUnit(steps);
                    if (isColor) {
                        var ref = $el.style;
                        var color = ref.color;
                        steps = steps.map(function(step) {
                            return parseColor($el, step);
                        });
                        $el.style.color = color;
                    } else if (startsWith(prop, "bg")) {
                        var attr = prop === "bgy" ? "height" : "width";
                        steps = steps.map(function(step) {
                            return toPx(step, attr, this$1.$el);
                        });
                        css($el, "background-position-" + prop[2], "");
                        bgPos = css($el, "backgroundPosition").split(" ")[prop[2] === "x" ? 0 : 1];
                        if (this$1.covers) {
                            var min = Math.min.apply(Math, steps);
                            var max = Math.max.apply(Math, steps);
                            var down = steps.indexOf(min) < steps.indexOf(max);
                            diff = max - min;
                            steps = steps.map(function(step) {
                                return step - (down ? min : max);
                            });
                            pos = (down ? -diff : 0) + "px";
                        } else {
                            pos = bgPos;
                        }
                    } else {
                        steps = steps.map(toFloat);
                    }
                    if (prop === "stroke") {
                        if (!steps.some(function(step) {
                            return step;
                        })) {
                            return props;
                        }
                        var length = getMaxPathLength(this$1.$el);
                        css($el, "strokeDasharray", length);
                        if (unit === "%") {
                            steps = steps.map(function(step) {
                                return step * length / 100;
                            });
                        }
                        steps = steps.reverse();
                        prop = "strokeDashoffset";
                    }
                    props[prop] = {
                        steps: steps,
                        unit: unit,
                        pos: pos,
                        bgPos: bgPos,
                        diff: diff
                    };
                    return props;
                }, {});
            },
            bgProps: function() {
                var this$1 = this;
                return [ "bgx", "bgy" ].filter(function(bg) {
                    return bg in this$1.props;
                });
            },
            covers: function(_, $el) {
                return covers($el);
            }
        },
        disconnected: function() {
            delete this._image;
        },
        update: {
            read: function(data) {
                var this$1 = this;
                if (!this.matchMedia) {
                    return;
                }
                if (!data.image && this.covers && this.bgProps.length) {
                    var src = css(this.$el, "backgroundImage").replace(/^none|url\(["']?(.+?)["']?\)$/, "$1");
                    if (src) {
                        var img = new Image();
                        img.src = src;
                        data.image = img;
                        if (!img.naturalWidth) {
                            img.onload = function() {
                                return this$1.$update();
                            };
                        }
                    }
                }
                var image = data.image;
                if (!image || !image.naturalWidth) {
                    return;
                }
                var dimEl = {
                    width: this.$el.offsetWidth,
                    height: this.$el.offsetHeight
                };
                var dimImage = {
                    width: image.naturalWidth,
                    height: image.naturalHeight
                };
                var dim = Dimensions.cover(dimImage, dimEl);
                this.bgProps.forEach(function(prop) {
                    var ref = this$1.props[prop];
                    var diff = ref.diff;
                    var bgPos = ref.bgPos;
                    var steps = ref.steps;
                    var attr = prop === "bgy" ? "height" : "width";
                    var span = dim[attr] - dimEl[attr];
                    if (span < diff) {
                        dimEl[attr] = dim[attr] + diff - span;
                    } else if (span > diff) {
                        var posPercentage = dimEl[attr] / toPx(bgPos, attr, this$1.$el);
                        if (posPercentage) {
                            this$1.props[prop].steps = steps.map(function(step) {
                                return step - (span - diff) / posPercentage;
                            });
                        }
                    }
                    dim = Dimensions.cover(dimImage, dimEl);
                });
                data.dim = dim;
            },
            write: function(ref) {
                var dim = ref.dim;
                if (!this.matchMedia) {
                    css(this.$el, {
                        backgroundSize: "",
                        backgroundRepeat: ""
                    });
                    return;
                }
                dim && css(this.$el, {
                    backgroundSize: dim.width + "px " + dim.height + "px",
                    backgroundRepeat: "no-repeat"
                });
            },
            events: [ "resize" ]
        },
        methods: {
            reset: function() {
                var this$1 = this;
                each(this.getCss(0), function(_, prop) {
                    return css(this$1.$el, prop, "");
                });
            },
            getCss: function(percent) {
                var ref = this;
                var props = ref.props;
                return Object.keys(props).reduce(function(css, prop) {
                    var ref = props[prop];
                    var steps = ref.steps;
                    var unit = ref.unit;
                    var pos = ref.pos;
                    var value = getValue(steps, percent);
                    switch (prop) {
                      case "x":
                      case "y":
                        {
                            unit = unit || "px";
                            css.transform += " translate" + ucfirst(prop) + "(" + toFloat(value).toFixed(unit === "px" ? 0 : 2) + unit + ")";
                            break;
                        }

                      case "rotate":
                        unit = unit || "deg";
                        css.transform += " rotate(" + (value + unit) + ")";
                        break;

                      case "scale":
                        css.transform += " scale(" + value + ")";
                        break;

                      case "bgy":
                      case "bgx":
                        css["background-position-" + prop[2]] = "calc(" + pos + " + " + value + "px)";
                        break;

                      case "color":
                      case "backgroundColor":
                      case "borderColor":
                        {
                            var ref$1 = getStep(steps, percent);
                            var start = ref$1[0];
                            var end = ref$1[1];
                            var p = ref$1[2];
                            css[prop] = "rgba(" + start.map(function(value, i) {
                                value = value + p * (end[i] - value);
                                return i === 3 ? toFloat(value) : parseInt(value, 10);
                            }).join(",") + ")";
                            break;
                        }

                      case "blur":
                        unit = unit || "px";
                        css.filter += " blur(" + (value + unit) + ")";
                        break;

                      case "hue":
                        unit = unit || "deg";
                        css.filter += " hue-rotate(" + (value + unit) + ")";
                        break;

                      case "fopacity":
                        unit = unit || "%";
                        css.filter += " opacity(" + (value + unit) + ")";
                        break;

                      case "grayscale":
                      case "invert":
                      case "saturate":
                      case "sepia":
                        unit = unit || "%";
                        css.filter += " " + prop + "(" + (value + unit) + ")";
                        break;

                      default:
                        css[prop] = value;
                    }
                    return css;
                }, {
                    transform: "",
                    filter: ""
                });
            }
        }
    };
    function parseColor(el, color) {
        return css(css(el, "color", color), "color").split(/[(),]/g).slice(1, -1).concat(1).slice(0, 4).map(toFloat);
    }
    function getStep(steps, percent) {
        var count = steps.length - 1;
        var index = Math.min(Math.floor(count * percent), count - 1);
        var step = steps.slice(index, index + 2);
        step.push(percent === 1 ? 1 : percent % (1 / count) * count);
        return step;
    }
    function getValue(steps, percent, digits) {
        if (digits === void 0) digits = 2;
        var ref = getStep(steps, percent);
        var start = ref[0];
        var end = ref[1];
        var p = ref[2];
        return (isNumber(start) ? start + Math.abs(start - end) * p * (start < end ? 1 : -1) : +end).toFixed(digits);
    }
    function getUnit(steps) {
        return steps.reduce(function(unit, step) {
            return isString(step) && step.replace(/-|\d/g, "").trim() || unit;
        }, "");
    }
    function covers(el) {
        var ref = el.style;
        var backgroundSize = ref.backgroundSize;
        var covers = css(css(el, "backgroundSize", ""), "backgroundSize") === "cover";
        el.style.backgroundSize = backgroundSize;
        return covers;
    }
    var parallax = {
        mixins: [ Parallax ],
        props: {
            target: String,
            viewport: Number,
            easing: Number
        },
        data: {
            target: false,
            viewport: 1,
            easing: 1
        },
        computed: {
            target: function(ref, $el) {
                var target = ref.target;
                return getOffsetElement(target && query(target, $el) || $el);
            }
        },
        update: {
            read: function(ref, types) {
                var percent = ref.percent;
                if (!types.has("scroll")) {
                    percent = false;
                }
                if (!this.matchMedia) {
                    return;
                }
                var prev = percent;
                percent = ease(scrolledOver(this.target) / (this.viewport || 1), this.easing);
                return {
                    percent: percent,
                    style: prev !== percent ? this.getCss(percent) : false
                };
            },
            write: function(ref) {
                var style = ref.style;
                if (!this.matchMedia) {
                    this.reset();
                    return;
                }
                style && css(this.$el, style);
            },
            events: [ "scroll", "resize" ]
        }
    };
    function ease(percent, easing) {
        return clamp(percent * (1 - (easing - easing * percent)));
    }
    function getOffsetElement(el) {
        return el ? "offsetTop" in el ? el : getOffsetElement(parent(el)) : document.body;
    }
    var SliderReactive = {
        update: {
            write: function() {
                if (this.stack.length || this.dragging) {
                    return;
                }
                var index = this.getValidIndex(this.index);
                if (!~this.prevIndex || this.index !== index) {
                    this.show(index);
                }
            },
            events: [ "resize" ]
        }
    };
    function Transitioner(prev, next, dir, ref) {
        var center = ref.center;
        var easing = ref.easing;
        var list = ref.list;
        var deferred = new Deferred();
        var from = prev ? getLeft(prev, list, center) : getLeft(next, list, center) + dimensions(next).width * dir;
        var to = next ? getLeft(next, list, center) : from + dimensions(prev).width * dir * (isRtl ? -1 : 1);
        return {
            dir: dir,
            show: function(duration, percent, linear) {
                if (percent === void 0) percent = 0;
                var timing = linear ? "linear" : easing;
                duration -= Math.round(duration * clamp(percent, -1, 1));
                this.translate(percent);
                percent = prev ? percent : clamp(percent, 0, 1);
                triggerUpdate(this.getItemIn(), "itemin", {
                    percent: percent,
                    duration: duration,
                    timing: timing,
                    dir: dir
                });
                prev && triggerUpdate(this.getItemIn(true), "itemout", {
                    percent: 1 - percent,
                    duration: duration,
                    timing: timing,
                    dir: dir
                });
                Transition.start(list, {
                    transform: translate(-to * (isRtl ? -1 : 1), "px")
                }, duration, timing).then(deferred.resolve, noop);
                return deferred.promise;
            },
            cancel: function() {
                Transition.cancel(list);
            },
            reset: function() {
                css(list, "transform", "");
            },
            forward: function(duration, percent) {
                if (percent === void 0) percent = this.percent();
                Transition.cancel(list);
                return this.show(duration, percent, true);
            },
            translate: function(percent) {
                var distance = this.getDistance() * dir * (isRtl ? -1 : 1);
                css(list, "transform", translate(clamp(-to + (distance - distance * percent), -getWidth(list), dimensions(list).width) * (isRtl ? -1 : 1), "px"));
                var actives = this.getActives();
                var itemIn = this.getItemIn();
                var itemOut = this.getItemIn(true);
                percent = prev ? clamp(percent, -1, 1) : 0;
                children(list).forEach(function(slide) {
                    var isActive = includes(actives, slide);
                    var isIn = slide === itemIn;
                    var isOut = slide === itemOut;
                    var translateIn = isIn || !isOut && (isActive || dir * (isRtl ? -1 : 1) === -1 ^ getElLeft(slide, list) > getElLeft(prev || next));
                    triggerUpdate(slide, "itemtranslate" + (translateIn ? "in" : "out"), {
                        dir: dir,
                        percent: isOut ? 1 - percent : isIn ? percent : isActive ? 1 : 0
                    });
                });
            },
            percent: function() {
                return Math.abs((css(list, "transform").split(",")[4] * (isRtl ? -1 : 1) + from) / (to - from));
            },
            getDistance: function() {
                return Math.abs(to - from);
            },
            getItemIn: function(out) {
                if (out === void 0) out = false;
                var actives = this.getActives();
                var nextActives = inView(list, getLeft(next || prev, list, center));
                if (out) {
                    var temp = actives;
                    actives = nextActives;
                    nextActives = temp;
                }
                return nextActives[findIndex(nextActives, function(el) {
                    return !includes(actives, el);
                })];
            },
            getActives: function() {
                return inView(list, getLeft(prev || next, list, center));
            }
        };
    }
    function getLeft(el, list, center) {
        var left = getElLeft(el, list);
        return center ? left - centerEl(el, list) : Math.min(left, getMax(list));
    }
    function getMax(list) {
        return Math.max(0, getWidth(list) - dimensions(list).width);
    }
    function getWidth(list) {
        return children(list).reduce(function(right, el) {
            return dimensions(el).width + right;
        }, 0);
    }
    function centerEl(el, list) {
        return dimensions(list).width / 2 - dimensions(el).width / 2;
    }
    function getElLeft(el, list) {
        return el && (position(el).left + (isRtl ? dimensions(el).width - dimensions(list).width : 0)) * (isRtl ? -1 : 1) || 0;
    }
    function inView(list, listLeft) {
        listLeft -= 1;
        var listRight = listLeft + dimensions(list).width + 2;
        return children(list).filter(function(slide) {
            var slideLeft = getElLeft(slide, list);
            var slideRight = slideLeft + dimensions(slide).width;
            return slideLeft >= listLeft && slideRight <= listRight;
        });
    }
    function triggerUpdate(el, type, data) {
        trigger(el, createEvent(type, false, false, data));
    }
    var slider = {
        mixins: [ Class, Slider, SliderReactive ],
        props: {
            center: Boolean,
            sets: Boolean
        },
        data: {
            center: false,
            sets: false,
            attrItem: "uk-slider-item",
            selList: ".uk-slider-items",
            selNav: ".uk-slider-nav",
            clsContainer: "uk-slider-container",
            Transitioner: Transitioner
        },
        computed: {
            avgWidth: function() {
                return getWidth(this.list) / this.length;
            },
            finite: function(ref) {
                var finite = ref.finite;
                return finite || Math.ceil(getWidth(this.list)) < dimensions(this.list).width + getMaxElWidth(this.list) + this.center;
            },
            maxIndex: function() {
                if (!this.finite || this.center && !this.sets) {
                    return this.length - 1;
                }
                if (this.center) {
                    return last(this.sets);
                }
                var lft = 0;
                var max = getMax(this.list);
                var index = findIndex(this.slides, function(el) {
                    if (lft >= max) {
                        return true;
                    }
                    lft += dimensions(el).width;
                });
                return ~index ? index : this.length - 1;
            },
            sets: function(ref) {
                var this$1 = this;
                var sets = ref.sets;
                if (!sets) {
                    return;
                }
                var width = dimensions(this.list).width / (this.center ? 2 : 1);
                var left = 0;
                var leftCenter = width;
                var slideLeft = 0;
                sets = sortBy$1(this.slides, "offsetLeft").reduce(function(sets, slide, i) {
                    var slideWidth = dimensions(slide).width;
                    var slideRight = slideLeft + slideWidth;
                    if (slideRight > left) {
                        if (!this$1.center && i > this$1.maxIndex) {
                            i = this$1.maxIndex;
                        }
                        if (!includes(sets, i)) {
                            var cmp = this$1.slides[i + 1];
                            if (this$1.center && cmp && slideWidth < leftCenter - dimensions(cmp).width / 2) {
                                leftCenter -= slideWidth;
                            } else {
                                leftCenter = width;
                                sets.push(i);
                                left = slideLeft + width + (this$1.center ? slideWidth / 2 : 0);
                            }
                        }
                    }
                    slideLeft += slideWidth;
                    return sets;
                }, []);
                return !isEmpty(sets) && sets;
            },
            transitionOptions: function() {
                return {
                    center: this.center,
                    list: this.list
                };
            }
        },
        connected: function() {
            toggleClass(this.$el, this.clsContainer, !$("." + this.clsContainer, this.$el));
        },
        update: {
            write: function() {
                var this$1 = this;
                this.navItems.forEach(function(el) {
                    var index = toNumber(data(el, this$1.attrItem));
                    if (index !== false) {
                        el.hidden = !this$1.maxIndex || index > this$1.maxIndex || this$1.sets && !includes(this$1.sets, index);
                    }
                });
                if (this.length && !this.dragging && !this.stack.length) {
                    this.reorder();
                    this._translate(1);
                }
                var actives = this._getTransitioner(this.index).getActives();
                this.slides.forEach(function(slide) {
                    return toggleClass(slide, this$1.clsActive, includes(actives, slide));
                });
                if (this.clsActivated && (!this.sets || includes(this.sets, toFloat(this.index)))) {
                    this.slides.forEach(function(slide) {
                        return toggleClass(slide, this$1.clsActivated || "", includes(actives, slide));
                    });
                }
            },
            events: [ "resize" ]
        },
        events: {
            beforeitemshow: function(e) {
                if (!this.dragging && this.sets && this.stack.length < 2 && !includes(this.sets, this.index)) {
                    this.index = this.getValidIndex();
                }
                var diff = Math.abs(this.index - this.prevIndex + (this.dir > 0 && this.index < this.prevIndex || this.dir < 0 && this.index > this.prevIndex ? (this.maxIndex + 1) * this.dir : 0));
                if (!this.dragging && diff > 1) {
                    for (var i = 0; i < diff; i++) {
                        this.stack.splice(1, 0, this.dir > 0 ? "next" : "previous");
                    }
                    e.preventDefault();
                    return;
                }
                var index = this.dir < 0 || !this.slides[this.prevIndex] ? this.index : this.prevIndex;
                this.duration = speedUp(this.avgWidth / this.velocity) * (dimensions(this.slides[index]).width / this.avgWidth);
                this.reorder();
            },
            itemshow: function() {
                if (~this.prevIndex) {
                    addClass(this._getTransitioner().getItemIn(), this.clsActive);
                }
            }
        },
        methods: {
            reorder: function() {
                var this$1 = this;
                if (this.finite) {
                    css(this.slides, "order", "");
                    return;
                }
                var index = this.dir > 0 && this.slides[this.prevIndex] ? this.prevIndex : this.index;
                this.slides.forEach(function(slide, i) {
                    return css(slide, "order", this$1.dir > 0 && i < index ? 1 : this$1.dir < 0 && i >= this$1.index ? -1 : "");
                });
                if (!this.center) {
                    return;
                }
                var next = this.slides[index];
                var width = dimensions(this.list).width / 2 - dimensions(next).width / 2;
                var j = 0;
                while (width > 0) {
                    var slideIndex = this.getIndex(--j + index, index);
                    var slide = this.slides[slideIndex];
                    css(slide, "order", slideIndex > index ? -2 : -1);
                    width -= dimensions(slide).width;
                }
            },
            getValidIndex: function(index, prevIndex) {
                if (index === void 0) index = this.index;
                if (prevIndex === void 0) prevIndex = this.prevIndex;
                index = this.getIndex(index, prevIndex);
                if (!this.sets) {
                    return index;
                }
                var prev;
                do {
                    if (includes(this.sets, index)) {
                        return index;
                    }
                    prev = index;
                    index = this.getIndex(index + this.dir, prevIndex);
                } while (index !== prev);
                return index;
            }
        }
    };
    function getMaxElWidth(list) {
        return Math.max.apply(Math, [ 0 ].concat(children(list).map(function(el) {
            return dimensions(el).width;
        })));
    }
    var sliderParallax = {
        mixins: [ Parallax ],
        data: {
            selItem: "!li"
        },
        computed: {
            item: function(ref, $el) {
                var selItem = ref.selItem;
                return query(selItem, $el);
            }
        },
        events: [ {
            name: "itemin itemout",
            self: true,
            el: function() {
                return this.item;
            },
            handler: function(ref) {
                var this$1 = this;
                var type = ref.type;
                var ref_detail = ref.detail;
                var percent = ref_detail.percent;
                var duration = ref_detail.duration;
                var timing = ref_detail.timing;
                var dir = ref_detail.dir;
                fastdom.read(function() {
                    var propsFrom = this$1.getCss(getCurrentPercent(type, dir, percent));
                    var propsTo = this$1.getCss(isIn(type) ? .5 : dir > 0 ? 1 : 0);
                    fastdom.write(function() {
                        css(this$1.$el, propsFrom);
                        Transition.start(this$1.$el, propsTo, duration, timing).catch(noop);
                    });
                });
            }
        }, {
            name: "transitioncanceled transitionend",
            self: true,
            el: function() {
                return this.item;
            },
            handler: function() {
                Transition.cancel(this.$el);
            }
        }, {
            name: "itemtranslatein itemtranslateout",
            self: true,
            el: function() {
                return this.item;
            },
            handler: function(ref) {
                var this$1 = this;
                var type = ref.type;
                var ref_detail = ref.detail;
                var percent = ref_detail.percent;
                var dir = ref_detail.dir;
                fastdom.read(function() {
                    var props = this$1.getCss(getCurrentPercent(type, dir, percent));
                    fastdom.write(function() {
                        return css(this$1.$el, props);
                    });
                });
            }
        } ]
    };
    function isIn(type) {
        return endsWith(type, "in");
    }
    function getCurrentPercent(type, dir, percent) {
        percent /= 2;
        return !isIn(type) ? dir < 0 ? percent : 1 - percent : dir < 0 ? 1 - percent : percent;
    }
    var Animations = assign({}, Animations$2, {
        fade: {
            show: function() {
                return [ {
                    opacity: 0,
                    zIndex: 0
                }, {
                    zIndex: -1
                } ];
            },
            percent: function(current) {
                return 1 - css(current, "opacity");
            },
            translate: function(percent) {
                return [ {
                    opacity: 1 - percent,
                    zIndex: 0
                }, {
                    zIndex: -1
                } ];
            }
        },
        scale: {
            show: function() {
                return [ {
                    opacity: 0,
                    transform: scale3d(1 + .5),
                    zIndex: 0
                }, {
                    zIndex: -1
                } ];
            },
            percent: function(current) {
                return 1 - css(current, "opacity");
            },
            translate: function(percent) {
                return [ {
                    opacity: 1 - percent,
                    transform: scale3d(1 + .5 * percent),
                    zIndex: 0
                }, {
                    zIndex: -1
                } ];
            }
        },
        pull: {
            show: function(dir) {
                return dir < 0 ? [ {
                    transform: translate(30),
                    zIndex: -1
                }, {
                    transform: translate(),
                    zIndex: 0
                } ] : [ {
                    transform: translate(-100),
                    zIndex: 0
                }, {
                    transform: translate(),
                    zIndex: -1
                } ];
            },
            percent: function(current, next, dir) {
                return dir < 0 ? 1 - translated(next) : translated(current);
            },
            translate: function(percent, dir) {
                return dir < 0 ? [ {
                    transform: translate(30 * percent),
                    zIndex: -1
                }, {
                    transform: translate(-100 * (1 - percent)),
                    zIndex: 0
                } ] : [ {
                    transform: translate(-percent * 100),
                    zIndex: 0
                }, {
                    transform: translate(30 * (1 - percent)),
                    zIndex: -1
                } ];
            }
        },
        push: {
            show: function(dir) {
                return dir < 0 ? [ {
                    transform: translate(100),
                    zIndex: 0
                }, {
                    transform: translate(),
                    zIndex: -1
                } ] : [ {
                    transform: translate(-30),
                    zIndex: -1
                }, {
                    transform: translate(),
                    zIndex: 0
                } ];
            },
            percent: function(current, next, dir) {
                return dir > 0 ? 1 - translated(next) : translated(current);
            },
            translate: function(percent, dir) {
                return dir < 0 ? [ {
                    transform: translate(percent * 100),
                    zIndex: 0
                }, {
                    transform: translate(-30 * (1 - percent)),
                    zIndex: -1
                } ] : [ {
                    transform: translate(-30 * percent),
                    zIndex: -1
                }, {
                    transform: translate(100 * (1 - percent)),
                    zIndex: 0
                } ];
            }
        }
    });
    var slideshow = {
        mixins: [ Class, Slideshow, SliderReactive ],
        props: {
            ratio: String,
            minHeight: Number,
            maxHeight: Number
        },
        data: {
            ratio: "16:9",
            minHeight: false,
            maxHeight: false,
            selList: ".uk-slideshow-items",
            attrItem: "uk-slideshow-item",
            selNav: ".uk-slideshow-nav",
            Animations: Animations
        },
        update: {
            read: function() {
                var ref = this.ratio.split(":").map(Number);
                var width = ref[0];
                var height = ref[1];
                height = height * this.list.offsetWidth / width || 0;
                if (this.minHeight) {
                    height = Math.max(this.minHeight, height);
                }
                if (this.maxHeight) {
                    height = Math.min(this.maxHeight, height);
                }
                return {
                    height: height - boxModelAdjust(this.list, "height", "content-box")
                };
            },
            write: function(ref) {
                var height = ref.height;
                height > 0 && css(this.list, "minHeight", height);
            },
            events: [ "resize" ]
        }
    };
    var sortable = {
        mixins: [ Class, Animate ],
        props: {
            group: String,
            threshold: Number,
            clsItem: String,
            clsPlaceholder: String,
            clsDrag: String,
            clsDragState: String,
            clsBase: String,
            clsNoDrag: String,
            clsEmpty: String,
            clsCustom: String,
            handle: String
        },
        data: {
            group: false,
            threshold: 5,
            clsItem: "uk-sortable-item",
            clsPlaceholder: "uk-sortable-placeholder",
            clsDrag: "uk-sortable-drag",
            clsDragState: "uk-drag",
            clsBase: "uk-sortable",
            clsNoDrag: "uk-sortable-nodrag",
            clsEmpty: "uk-sortable-empty",
            clsCustom: "",
            handle: false,
            pos: {}
        },
        created: function() {
            var this$1 = this;
            [ "init", "start", "move", "end" ].forEach(function(key) {
                var fn = this$1[key];
                this$1[key] = function(e) {
                    assign(this$1.pos, getEventPos(e));
                    fn(e);
                };
            });
        },
        events: {
            name: pointerDown,
            passive: false,
            handler: "init"
        },
        computed: {
            target: function() {
                return (this.$el.tBodies || [ this.$el ])[0];
            },
            items: function() {
                return children(this.target);
            },
            isEmpty: {
                get: function() {
                    return isEmpty(this.items);
                },
                watch: function(empty) {
                    toggleClass(this.target, this.clsEmpty, empty);
                },
                immediate: true
            },
            handles: {
                get: function(ref, el) {
                    var handle = ref.handle;
                    return handle ? $$(handle, el) : this.items;
                },
                watch: function(handles, prev) {
                    css(prev, {
                        touchAction: "",
                        userSelect: ""
                    });
                    css(handles, {
                        touchAction: hasTouch ? "none" : "",
                        userSelect: "none"
                    });
                },
                immediate: true
            }
        },
        update: {
            write: function(data) {
                if (!this.drag || !parent(this.placeholder)) {
                    return;
                }
                var ref = this;
                var ref_pos = ref.pos;
                var x = ref_pos.x;
                var y = ref_pos.y;
                var ref_origin = ref.origin;
                var offsetTop = ref_origin.offsetTop;
                var offsetLeft = ref_origin.offsetLeft;
                var placeholder = ref.placeholder;
                css(this.drag, {
                    top: y - offsetTop,
                    left: x - offsetLeft
                });
                var sortable = this.getSortable(document.elementFromPoint(x, y));
                if (!sortable) {
                    return;
                }
                var items = sortable.items;
                if (items.some(Transition.inProgress)) {
                    return;
                }
                var target = findTarget(items, {
                    x: x,
                    y: y
                });
                if (items.length && (!target || target === placeholder)) {
                    return;
                }
                var previous = this.getSortable(placeholder);
                var insertTarget = findInsertTarget(sortable.target, target, placeholder, x, y, sortable === previous && data.moved !== target);
                if (insertTarget === false) {
                    return;
                }
                if (insertTarget && placeholder === insertTarget) {
                    return;
                }
                if (sortable !== previous) {
                    previous.remove(placeholder);
                    data.moved = target;
                } else {
                    delete data.moved;
                }
                sortable.insert(placeholder, insertTarget);
                this.touched.add(sortable);
            },
            events: [ "move" ]
        },
        methods: {
            init: function(e) {
                var target = e.target;
                var button = e.button;
                var defaultPrevented = e.defaultPrevented;
                var ref = this.items.filter(function(el) {
                    return within(target, el);
                });
                var placeholder = ref[0];
                if (!placeholder || defaultPrevented || button > 0 || isInput(target) || within(target, "." + this.clsNoDrag) || this.handle && !within(target, this.handle)) {
                    return;
                }
                e.preventDefault();
                this.touched = new Set([ this ]);
                this.placeholder = placeholder;
                this.origin = assign({
                    target: target,
                    index: index(placeholder)
                }, this.pos);
                on(document, pointerMove, this.move);
                on(document, pointerUp, this.end);
                if (!this.threshold) {
                    this.start(e);
                }
            },
            start: function(e) {
                this.drag = appendDrag(this.$container, this.placeholder);
                var ref = this.placeholder.getBoundingClientRect();
                var left = ref.left;
                var top = ref.top;
                assign(this.origin, {
                    offsetLeft: this.pos.x - left,
                    offsetTop: this.pos.y - top
                });
                addClass(this.drag, this.clsDrag, this.clsCustom);
                addClass(this.placeholder, this.clsPlaceholder);
                addClass(this.items, this.clsItem);
                addClass(document.documentElement, this.clsDragState);
                trigger(this.$el, "start", [ this, this.placeholder ]);
                trackScroll(this.pos);
                this.move(e);
            },
            move: function(e) {
                if (this.drag) {
                    this.$emit("move");
                } else if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
                    this.start(e);
                }
            },
            end: function() {
                var this$1 = this;
                off(document, pointerMove, this.move);
                off(document, pointerUp, this.end);
                off(window, "scroll", this.scroll);
                if (!this.drag) {
                    return;
                }
                untrackScroll();
                var sortable = this.getSortable(this.placeholder);
                if (this === sortable) {
                    if (this.origin.index !== index(this.placeholder)) {
                        trigger(this.$el, "moved", [ this, this.placeholder ]);
                    }
                } else {
                    trigger(sortable.$el, "added", [ sortable, this.placeholder ]);
                    trigger(this.$el, "removed", [ this, this.placeholder ]);
                }
                trigger(this.$el, "stop", [ this, this.placeholder ]);
                remove$1(this.drag);
                this.drag = null;
                this.touched.forEach(function(ref) {
                    var clsPlaceholder = ref.clsPlaceholder;
                    var clsItem = ref.clsItem;
                    return this$1.touched.forEach(function(sortable) {
                        return removeClass(sortable.items, clsPlaceholder, clsItem);
                    });
                });
                this.touched = null;
                removeClass(document.documentElement, this.clsDragState);
            },
            insert: function(element, target) {
                var this$1 = this;
                addClass(this.items, this.clsItem);
                var insert = function() {
                    return target ? before(target, element) : append(this$1.target, element);
                };
                this.animate(insert);
            },
            remove: function(element) {
                if (!within(element, this.target)) {
                    return;
                }
                this.animate(function() {
                    return remove$1(element);
                });
            },
            getSortable: function(element) {
                do {
                    var sortable = this.$getComponent(element, "sortable");
                    if (sortable && (sortable === this || this.group !== false && sortable.group === this.group)) {
                        return sortable;
                    }
                } while (element = parent(element));
            }
        }
    };
    var trackTimer;
    function trackScroll(pos) {
        var last = Date.now();
        trackTimer = setInterval(function() {
            var x = pos.x;
            var y = pos.y;
            y += window.pageYOffset;
            var dist = (Date.now() - last) * .3;
            last = Date.now();
            scrollParents(document.elementFromPoint(x, pos.y)).reverse().some(function(scrollEl) {
                var scroll = scrollEl.scrollTop;
                var scrollHeight = scrollEl.scrollHeight;
                var ref = offset(getViewport$1(scrollEl));
                var top = ref.top;
                var bottom = ref.bottom;
                var height = ref.height;
                if (top < y && top + 35 > y) {
                    scroll -= dist;
                } else if (bottom > y && bottom - 35 < y) {
                    scroll += dist;
                } else {
                    return;
                }
                if (scroll > 0 && scroll < scrollHeight - height) {
                    scrollTop(scrollEl, scroll);
                    return true;
                }
            });
        }, 15);
    }
    function untrackScroll() {
        clearInterval(trackTimer);
    }
    function appendDrag(container, element) {
        var clone = append(container, element.outerHTML.replace(/(^<)(?:li|tr)|(?:li|tr)(\/>$)/g, "$1div$2"));
        css(clone, "margin", "0", "important");
        css(clone, assign({
            boxSizing: "border-box",
            width: element.offsetWidth,
            height: element.offsetHeight
        }, css(element, [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom" ])));
        height(clone.firstElementChild, height(element.firstElementChild));
        return clone;
    }
    function findTarget(items, point) {
        return items[findIndex(items, function(item) {
            return pointInRect(point, item.getBoundingClientRect());
        })];
    }
    function findInsertTarget(list, target, placeholder, x, y, sameList) {
        if (!children(list).length) {
            return;
        }
        var rect = target.getBoundingClientRect();
        if (!sameList) {
            if (!isHorizontal(list, placeholder)) {
                return y < rect.top + rect.height / 2 ? target : target.nextElementSibling;
            }
            return target;
        }
        var placeholderRect = placeholder.getBoundingClientRect();
        var sameRow = linesIntersect([ rect.top, rect.bottom ], [ placeholderRect.top, placeholderRect.bottom ]);
        var pointerPos = sameRow ? x : y;
        var lengthProp = sameRow ? "width" : "height";
        var startProp = sameRow ? "left" : "top";
        var endProp = sameRow ? "right" : "bottom";
        var diff = placeholderRect[lengthProp] < rect[lengthProp] ? rect[lengthProp] - placeholderRect[lengthProp] : 0;
        if (placeholderRect[startProp] < rect[startProp]) {
            if (diff && pointerPos < rect[startProp] + diff) {
                return false;
            }
            return target.nextElementSibling;
        }
        if (diff && pointerPos > rect[endProp] - diff) {
            return false;
        }
        return target;
    }
    function isHorizontal(list, placeholder) {
        var single = children(list).length === 1;
        if (single) {
            append(list, placeholder);
        }
        var items = children(list);
        var isHorizontal = items.some(function(el, i) {
            var rectA = el.getBoundingClientRect();
            return items.slice(i + 1).some(function(el) {
                var rectB = el.getBoundingClientRect();
                return !linesIntersect([ rectA.left, rectA.right ], [ rectB.left, rectB.right ]);
            });
        });
        if (single) {
            remove$1(placeholder);
        }
        return isHorizontal;
    }
    function linesIntersect(lineA, lineB) {
        return lineA[1] > lineB[0] && lineB[1] > lineA[0];
    }
    var obj;
    var tooltip = {
        mixins: [ Container, Togglable, Position ],
        args: "title",
        props: {
            delay: Number,
            title: String
        },
        data: {
            pos: "top",
            title: "",
            delay: 0,
            animation: [ "uk-animation-scale-up" ],
            duration: 100,
            cls: "uk-active",
            clsPos: "uk-tooltip"
        },
        beforeConnect: function() {
            this._hasTitle = hasAttr(this.$el, "title");
            attr(this.$el, "title", "");
            this.updateAria(false);
            makeFocusable(this.$el);
        },
        disconnected: function() {
            this.hide();
            attr(this.$el, "title", this._hasTitle ? this.title : null);
        },
        methods: {
            show: function() {
                var this$1 = this;
                if (this.isToggled(this.tooltip || null) || !this.title) {
                    return;
                }
                this._unbind = once(document, "show keydown " + pointerDown, this.hide, false, function(e) {
                    return e.type === pointerDown && !within(e.target, this$1.$el) || e.type === "keydown" && e.keyCode === 27 || e.type === "show" && e.detail[0] !== this$1 && e.detail[0].$name === this$1.$name;
                });
                clearTimeout(this.showTimer);
                this.showTimer = setTimeout(this._show, this.delay);
            },
            hide: function() {
                var this$1 = this;
                if (matches(this.$el, "input:focus")) {
                    return;
                }
                clearTimeout(this.showTimer);
                if (!this.isToggled(this.tooltip || null)) {
                    return;
                }
                this.toggleElement(this.tooltip, false, false).then(function() {
                    this$1.tooltip = remove$1(this$1.tooltip);
                    this$1._unbind();
                });
            },
            _show: function() {
                var this$1 = this;
                this.tooltip = append(this.container, '<div class="' + this.clsPos + '"> <div class="' + this.clsPos + '-inner">' + this.title + "</div> </div>");
                on(this.tooltip, "toggled", function(e, toggled) {
                    this$1.updateAria(toggled);
                    if (!toggled) {
                        return;
                    }
                    this$1.positionAt(this$1.tooltip, this$1.$el);
                    this$1.origin = this$1.getAxis() === "y" ? flipPosition(this$1.dir) + "-" + this$1.align : this$1.align + "-" + flipPosition(this$1.dir);
                });
                this.toggleElement(this.tooltip, true);
            },
            updateAria: function(toggled) {
                attr(this.$el, "aria-expanded", toggled);
            }
        },
        events: (obj = {
            focus: "show",
            blur: "hide"
        }, obj[pointerEnter + " " + pointerLeave] = function(e) {
            if (!isTouch(e)) {
                this[e.type === pointerEnter ? "show" : "hide"]();
            }
        }, obj[pointerDown] = function(e) {
            if (isTouch(e)) {
                this.show();
            }
        }, obj)
    };
    function makeFocusable(el) {
        if (!isFocusable(el)) {
            attr(el, "tabindex", "0");
        }
    }
    var upload = {
        props: {
            allow: String,
            clsDragover: String,
            concurrent: Number,
            maxSize: Number,
            method: String,
            mime: String,
            msgInvalidMime: String,
            msgInvalidName: String,
            msgInvalidSize: String,
            multiple: Boolean,
            name: String,
            params: Object,
            type: String,
            url: String
        },
        data: {
            allow: false,
            clsDragover: "uk-dragover",
            concurrent: 1,
            maxSize: 0,
            method: "POST",
            mime: false,
            msgInvalidMime: "Invalid File Type: %s",
            msgInvalidName: "Invalid File Name: %s",
            msgInvalidSize: "Invalid File Size: %s Kilobytes Max",
            multiple: false,
            name: "files[]",
            params: {},
            type: "",
            url: "",
            abort: noop,
            beforeAll: noop,
            beforeSend: noop,
            complete: noop,
            completeAll: noop,
            error: noop,
            fail: noop,
            load: noop,
            loadEnd: noop,
            loadStart: noop,
            progress: noop
        },
        events: {
            change: function(e) {
                if (!matches(e.target, 'input[type="file"]')) {
                    return;
                }
                e.preventDefault();
                if (e.target.files) {
                    this.upload(e.target.files);
                }
                e.target.value = "";
            },
            drop: function(e) {
                stop(e);
                var transfer = e.dataTransfer;
                if (!transfer || !transfer.files) {
                    return;
                }
                removeClass(this.$el, this.clsDragover);
                this.upload(transfer.files);
            },
            dragenter: function(e) {
                stop(e);
            },
            dragover: function(e) {
                stop(e);
                addClass(this.$el, this.clsDragover);
            },
            dragleave: function(e) {
                stop(e);
                removeClass(this.$el, this.clsDragover);
            }
        },
        methods: {
            upload: function(files) {
                var this$1 = this;
                if (!files.length) {
                    return;
                }
                trigger(this.$el, "upload", [ files ]);
                for (var i = 0; i < files.length; i++) {
                    if (this.maxSize && this.maxSize * 1e3 < files[i].size) {
                        this.fail(this.msgInvalidSize.replace("%s", this.maxSize));
                        return;
                    }
                    if (this.allow && !match(this.allow, files[i].name)) {
                        this.fail(this.msgInvalidName.replace("%s", this.allow));
                        return;
                    }
                    if (this.mime && !match(this.mime, files[i].type)) {
                        this.fail(this.msgInvalidMime.replace("%s", this.mime));
                        return;
                    }
                }
                if (!this.multiple) {
                    files = [ files[0] ];
                }
                this.beforeAll(this, files);
                var chunks = chunk(files, this.concurrent);
                var upload = function(files) {
                    var data = new FormData();
                    files.forEach(function(file) {
                        return data.append(this$1.name, file);
                    });
                    for (var key in this$1.params) {
                        data.append(key, this$1.params[key]);
                    }
                    ajax(this$1.url, {
                        data: data,
                        method: this$1.method,
                        responseType: this$1.type,
                        beforeSend: function(env) {
                            var xhr = env.xhr;
                            xhr.upload && on(xhr.upload, "progress", this$1.progress);
                            [ "loadStart", "load", "loadEnd", "abort" ].forEach(function(type) {
                                return on(xhr, type.toLowerCase(), this$1[type]);
                            });
                            return this$1.beforeSend(env);
                        }
                    }).then(function(xhr) {
                        this$1.complete(xhr);
                        if (chunks.length) {
                            upload(chunks.shift());
                        } else {
                            this$1.completeAll(xhr);
                        }
                    }, function(e) {
                        return this$1.error(e);
                    });
                };
                upload(chunks.shift());
            }
        }
    };
    function match(pattern, path) {
        return path.match(new RegExp("^" + pattern.replace(/\//g, "\\/").replace(/\*\*/g, "(\\/[^\\/]+)*").replace(/\*/g, "[^\\/]+").replace(/((?!\\))\?/g, "$1.") + "$", "i"));
    }
    function chunk(files, size) {
        var chunks = [];
        for (var i = 0; i < files.length; i += size) {
            var chunk = [];
            for (var j = 0; j < size; j++) {
                chunk.push(files[i + j]);
            }
            chunks.push(chunk);
        }
        return chunks;
    }
    function stop(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    var components = Object.freeze({
        __proto__: null,
        Countdown: countdown,
        Filter: filter,
        Lightbox: lightbox,
        LightboxPanel: LightboxPanel,
        Notification: notification,
        Parallax: parallax,
        Slider: slider,
        SliderParallax: sliderParallax,
        Slideshow: slideshow,
        SlideshowParallax: sliderParallax,
        Sortable: sortable,
        Tooltip: tooltip,
        Upload: upload
    });
    each(components, function(component, name) {
        return UIkit.component(name, component);
    });
    return UIkit;
});

(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define("uikiticons", factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, 
    global.UIkitIcons = factory());
})(this, function() {
    "use strict";
    function plugin(UIkit) {
        if (plugin.installed) {
            return;
        }
        UIkit.icon.add({
            "500px": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.624,11.866c-0.141,0.132,0.479,0.658,0.662,0.418c0.051-0.046,0.607-0.61,0.662-0.664c0,0,0.738,0.719,0.814,0.719 c0.1,0,0.207-0.055,0.322-0.17c0.27-0.269,0.135-0.416,0.066-0.495l-0.631-0.616l0.658-0.668c0.146-0.156,0.021-0.314-0.1-0.449 c-0.182-0.18-0.359-0.226-0.471-0.125l-0.656,0.654l-0.654-0.654c-0.033-0.034-0.08-0.045-0.124-0.045 c-0.079,0-0.191,0.068-0.307,0.181c-0.202,0.202-0.247,0.351-0.133,0.462l0.665,0.665L9.624,11.866z"/><path d="M11.066,2.884c-1.061,0-2.185,0.248-3.011,0.604c-0.087,0.034-0.141,0.106-0.15,0.205C7.893,3.784,7.919,3.909,7.982,4.066 c0.05,0.136,0.187,0.474,0.452,0.372c0.844-0.326,1.779-0.507,2.633-0.507c0.963,0,1.9,0.191,2.781,0.564 c0.695,0.292,1.357,0.719,2.078,1.34c0.051,0.044,0.105,0.068,0.164,0.068c0.143,0,0.273-0.137,0.389-0.271 c0.191-0.214,0.324-0.395,0.135-0.575c-0.686-0.654-1.436-1.138-2.363-1.533C13.24,3.097,12.168,2.884,11.066,2.884z"/><path d="M16.43,15.747c-0.092-0.028-0.242,0.05-0.309,0.119l0,0c-0.652,0.652-1.42,1.169-2.268,1.521 c-0.877,0.371-1.814,0.551-2.779,0.551c-0.961,0-1.896-0.189-2.775-0.564c-0.848-0.36-1.612-0.879-2.268-1.53 c-0.682-0.688-1.196-1.455-1.529-2.268c-0.325-0.799-0.471-1.643-0.471-1.643c-0.045-0.24-0.258-0.249-0.567-0.203 c-0.128,0.021-0.519,0.079-0.483,0.36v0.01c0.105,0.644,0.289,1.284,0.545,1.895c0.417,0.969,1.002,1.849,1.756,2.604 c0.757,0.754,1.636,1.34,2.604,1.757C8.901,18.785,9.97,19,11.088,19c1.104,0,2.186-0.215,3.188-0.645 c1.838-0.896,2.604-1.757,2.604-1.757c0.182-0.204,0.227-0.317-0.1-0.643C16.779,15.956,16.525,15.774,16.43,15.747z"/><path d="M5.633,13.287c0.293,0.71,0.723,1.341,1.262,1.882c0.54,0.54,1.172,0.971,1.882,1.264c0.731,0.303,1.509,0.461,2.298,0.461 c0.801,0,1.578-0.158,2.297-0.461c0.711-0.293,1.344-0.724,1.883-1.264c0.543-0.541,0.971-1.172,1.264-1.882 c0.314-0.721,0.463-1.5,0.463-2.298c0-0.79-0.148-1.569-0.463-2.289c-0.293-0.699-0.721-1.329-1.264-1.881 c-0.539-0.541-1.172-0.959-1.867-1.263c-0.721-0.303-1.5-0.461-2.299-0.461c-0.802,0-1.613,0.159-2.322,0.461 c-0.577,0.25-1.544,0.867-2.119,1.454v0.012V2.108h8.16C15.1,2.104,15.1,1.69,15.1,1.552C15.1,1.417,15.1,1,14.809,1H5.915 C5.676,1,5.527,1.192,5.527,1.384v6.84c0,0.214,0.273,0.372,0.529,0.428c0.5,0.105,0.614-0.056,0.737-0.224l0,0 c0.18-0.273,0.776-0.884,0.787-0.894c0.901-0.905,2.117-1.408,3.416-1.408c1.285,0,2.5,0.501,3.412,1.408 c0.914,0.914,1.408,2.122,1.408,3.405c0,1.288-0.508,2.496-1.408,3.405c-0.9,0.896-2.152,1.406-3.438,1.406 c-0.877,0-1.711-0.229-2.433-0.671v-4.158c0-0.553,0.237-1.151,0.643-1.614c0.462-0.519,1.094-0.799,1.782-0.799 c0.664,0,1.293,0.253,1.758,0.715c0.459,0.459,0.709,1.071,0.709,1.723c0,1.385-1.094,2.468-2.488,2.468 c-0.273,0-0.769-0.121-0.781-0.125c-0.281-0.087-0.405,0.306-0.438,0.436c-0.159,0.496,0.079,0.585,0.123,0.607 c0.452,0.137,0.743,0.157,1.129,0.157c1.973,0,3.572-1.6,3.572-3.57c0-1.964-1.6-3.552-3.572-3.552c-0.97,0-1.872,0.36-2.546,1.038 c-0.656,0.631-1.027,1.487-1.027,2.322v3.438v-0.011c-0.372-0.42-0.732-1.041-0.981-1.682c-0.102-0.248-0.315-0.202-0.607-0.113 c-0.135,0.035-0.519,0.157-0.44,0.439C5.372,12.799,5.577,13.164,5.633,13.287z"/></svg>',
            album: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="10" height="1"/><rect x="3" y="4" width="14" height="1"/><rect fill="none" stroke="#000" x="1.5" y="6.5" width="17" height="11"/></svg>',
            "arrow-down": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="10.5,16.08 5.63,10.66 6.37,10 10.5,14.58 14.63,10 15.37,10.66"/><line fill="none" stroke="#000" x1="10.5" y1="4" x2="10.5" y2="15"/></svg>',
            "arrow-left": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="10 14 5 9.5 10 5"/><line fill="none" stroke="#000" x1="16" y1="9.5" x2="5" y2="9.52"/></svg>',
            "arrow-right": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="10 5 15 9.5 10 14"/><line fill="none" stroke="#000" x1="4" y1="9.5" x2="15" y2="9.5"/></svg>',
            "arrow-up": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="10.5,4 15.37,9.4 14.63,10.08 10.5,5.49 6.37,10.08 5.63,9.4"/><line fill="none" stroke="#000" x1="10.5" y1="16" x2="10.5" y2="5"/></svg>',
            bag: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M7.5,7.5V4A2.48,2.48,0,0,1,10,1.5,2.54,2.54,0,0,1,12.5,4V7.5"/><polygon fill="none" stroke="#000" points="16.5 7.5 3.5 7.5 2.5 18.5 17.5 18.5 16.5 7.5"/></svg>',
            ban: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><line fill="none" stroke="#000" stroke-width="1.1" x1="4" y1="3.5" x2="16" y2="16.5"/></svg>',
            behance: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.5,10.6c-0.4-0.5-0.9-0.9-1.6-1.1c1.7-1,2.2-3.2,0.7-4.7C7.8,4,6.3,4,5.2,4C3.5,4,1.7,4,0,4v12c1.7,0,3.4,0,5.2,0 c1,0,2.1,0,3.1-0.5C10.2,14.6,10.5,12.3,9.5,10.6L9.5,10.6z M5.6,6.1c1.8,0,1.8,2.7-0.1,2.7c-1,0-2,0-2.9,0V6.1H5.6z M2.6,13.8v-3.1 c1.1,0,2.1,0,3.2,0c2.1,0,2.1,3.2,0.1,3.2L2.6,13.8z"/><path d="M19.9,10.9C19.7,9.2,18.7,7.6,17,7c-4.2-1.3-7.3,3.4-5.3,7.1c0.9,1.7,2.8,2.3,4.7,2.1c1.7-0.2,2.9-1.3,3.4-2.9h-2.2 c-0.4,1.3-2.4,1.5-3.5,0.6c-0.4-0.4-0.6-1.1-0.6-1.7H20C20,11.7,19.9,10.9,19.9,10.9z M13.5,10.6c0-1.6,2.3-2.7,3.5-1.4 c0.4,0.4,0.5,0.9,0.6,1.4H13.5L13.5,10.6z"/><rect x="13" y="4" width="5" height="1.4"/></svg>',
            bell: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17,15.5 L3,15.5 C2.99,14.61 3.79,13.34 4.1,12.51 C4.58,11.3 4.72,10.35 5.19,7.01 C5.54,4.53 5.89,3.2 7.28,2.16 C8.13,1.56 9.37,1.5 9.81,1.5 L9.96,1.5 C9.96,1.5 11.62,1.41 12.67,2.17 C14.08,3.2 14.42,4.54 14.77,7.02 C15.26,10.35 15.4,11.31 15.87,12.52 C16.2,13.34 17.01,14.61 17,15.5 L17,15.5 Z"/><path fill="none" stroke="#000" d="M12.39,16 C12.39,17.37 11.35,18.43 9.91,18.43 C8.48,18.43 7.42,17.37 7.42,16"/></svg>',
            bold: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5,15.3 C5.66,15.3 5.9,15 5.9,14.53 L5.9,5.5 C5.9,4.92 5.56,4.7 5,4.7 L5,4 L8.95,4 C12.6,4 13.7,5.37 13.7,6.9 C13.7,7.87 13.14,9.17 10.86,9.59 L10.86,9.7 C13.25,9.86 14.29,11.28 14.3,12.54 C14.3,14.47 12.94,16 9,16 L5,16 L5,15.3 Z M9,9.3 C11.19,9.3 11.8,8.5 11.85,7 C11.85,5.65 11.3,4.8 9,4.8 L7.67,4.8 L7.67,9.3 L9,9.3 Z M9.185,15.22 C11.97,15 12.39,14 12.4,12.58 C12.4,11.15 11.39,10 9,10 L7.67,10 L7.67,15 L9.18,15 Z"/></svg>',
            bolt: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.74,20 L7.73,12 L3,12 L15.43,1 L12.32,9 L17.02,9 L4.74,20 L4.74,20 L4.74,20 Z M9.18,11 L7.1,16.39 L14.47,10 L10.86,10 L12.99,4.67 L5.61,11 L9.18,11 L9.18,11 L9.18,11 Z"/></svg>',
            bookmark: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="5.5 1.5 15.5 1.5 15.5 17.5 10.5 12.5 5.5 17.5"/></svg>',
            calendar: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 2,3 2,17 18,17 18,3 2,3 Z M 17,16 3,16 3,8 17,8 17,16 Z M 17,7 3,7 3,4 17,4 17,7 Z"/><rect width="1" height="3" x="6" y="2"/><rect width="1" height="3" x="13" y="2"/></svg>',
            camera: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10.8" r="3.8"/><path fill="none" stroke="#000" d="M1,4.5 C0.7,4.5 0.5,4.7 0.5,5 L0.5,17 C0.5,17.3 0.7,17.5 1,17.5 L19,17.5 C19.3,17.5 19.5,17.3 19.5,17 L19.5,5 C19.5,4.7 19.3,4.5 19,4.5 L13.5,4.5 L13.5,2.9 C13.5,2.6 13.3,2.5 13,2.5 L7,2.5 C6.7,2.5 6.5,2.6 6.5,2.9 L6.5,4.5 L1,4.5 L1,4.5 Z"/></svg>',
            cart: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="7.3" cy="17.3" r="1.4"/><circle cx="13.3" cy="17.3" r="1.4"/><polyline fill="none" stroke="#000" points="0 2 3.2 4 5.3 12.5 16 12.5 18 6.5 8 6.5"/></svg>',
            check: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"/></svg>',
            "chevron-double-left": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="10 14 6 10 10 6"/><polyline fill="none" stroke="#000" stroke-width="1.03" points="14 14 10 10 14 6"/></svg>',
            "chevron-double-right": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="10 6 14 10 10 14"/><polyline fill="none" stroke="#000" stroke-width="1.03" points="6 6 10 10 6 14"/></svg>',
            "chevron-down": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"/></svg>',
            "chevron-left": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="13 16 7 10 13 4"/></svg>',
            "chevron-right": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="7 4 13 10 7 16"/></svg>',
            "chevron-up": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="4 13 10 7 16 13"/></svg>',
            clock: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><rect x="9" y="4" width="1" height="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"/></svg>',
            close: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"/><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"/></svg>',
            "cloud-download": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.3,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6"/><polyline fill="none" stroke="#000" points="11.75 16 9.5 18.25 7.25 16"/><path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5"/></svg>',
            "cloud-upload": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.31,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6"/><polyline fill="none" stroke="#000" points="7.25 11.75 9.5 9.5 11.75 11.75"/><path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5"/></svg>',
            code: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.01" points="13,4 19,10 13,16"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="7,4 1,10 7,16"/></svg>',
            cog: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="9.997" cy="10" r="3.31"/><path fill="none" stroke="#000" d="M18.488,12.285 L16.205,16.237 C15.322,15.496 14.185,15.281 13.303,15.791 C12.428,16.289 12.047,17.373 12.246,18.5 L7.735,18.5 C7.938,17.374 7.553,16.299 6.684,15.791 C5.801,15.27 4.655,15.492 3.773,16.237 L1.5,12.285 C2.573,11.871 3.317,10.999 3.317,9.991 C3.305,8.98 2.573,8.121 1.5,7.716 L3.765,3.784 C4.645,4.516 5.794,4.738 6.687,4.232 C7.555,3.722 7.939,2.637 7.735,1.5 L12.263,1.5 C12.072,2.637 12.441,3.71 13.314,4.22 C14.206,4.73 15.343,4.516 16.225,3.794 L18.487,7.714 C17.404,8.117 16.661,8.988 16.67,10.009 C16.672,11.018 17.415,11.88 18.488,12.285 L18.488,12.285 Z"/></svg>',
            comment: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6,18.71 L6,14 L1,14 L1,1 L19,1 L19,14 L10.71,14 L6,18.71 L6,18.71 Z M2,13 L7,13 L7,16.29 L10.29,13 L18,13 L18,2 L2,2 L2,13 L2,13 Z"/></svg>',
            commenting: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="1.5,1.5 18.5,1.5 18.5,13.5 10.5,13.5 6.5,17.5 6.5,13.5 1.5,13.5"/><circle cx="10" cy="8" r="1"/><circle cx="6" cy="8" r="1"/><circle cx="14" cy="8" r="1"/></svg>',
            comments: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="2 0.5 19.5 0.5 19.5 13"/><path d="M5,19.71 L5,15 L0,15 L0,2 L18,2 L18,15 L9.71,15 L5,19.71 L5,19.71 L5,19.71 Z M1,14 L6,14 L6,17.29 L9.29,14 L17,14 L17,3 L1,3 L1,14 L1,14 L1,14 Z"/></svg>',
            copy: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="2.5" width="12" height="16"/><polyline fill="none" stroke="#000" points="5 0.5 17.5 0.5 17.5 17"/></svg>',
            "credit-card": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="1.5" y="4.5" width="17" height="12"/><rect x="1" y="7" width="18" height="3"/></svg>',
            database: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><ellipse fill="none" stroke="#000" cx="10" cy="4.64" rx="7.5" ry="3.14"/><path fill="none" stroke="#000" d="M17.5,8.11 C17.5,9.85 14.14,11.25 10,11.25 C5.86,11.25 2.5,9.84 2.5,8.11"/><path fill="none" stroke="#000" d="M17.5,11.25 C17.5,12.99 14.14,14.39 10,14.39 C5.86,14.39 2.5,12.98 2.5,11.25"/><path fill="none" stroke="#000" d="M17.49,4.64 L17.5,14.36 C17.5,16.1 14.14,17.5 10,17.5 C5.86,17.5 2.5,16.09 2.5,14.36 L2.5,4.64"/></svg>',
            desktop: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="15" width="1" height="2"/><rect x="11" y="15" width="1" height="2"/><rect x="5" y="16" width="10" height="1"/><rect fill="none" stroke="#000" x="1.5" y="3.5" width="17" height="11"/></svg>',
            discord: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M16.074,4.361a14.243,14.243,0,0,0-3.61-1.134,10.61,10.61,0,0,0-.463.96,13.219,13.219,0,0,0-4,0,10.138,10.138,0,0,0-.468-.96A14.206,14.206,0,0,0,3.919,4.364,15.146,15.146,0,0,0,1.324,14.5a14.435,14.435,0,0,0,4.428,2.269A10.982,10.982,0,0,0,6.7,15.21a9.294,9.294,0,0,1-1.494-.727c.125-.093.248-.19.366-.289a10.212,10.212,0,0,0,8.854,0c.119.1.242.2.366.289a9.274,9.274,0,0,1-1.5.728,10.8,10.8,0,0,0,.948,1.562,14.419,14.419,0,0,0,4.431-2.27A15.128,15.128,0,0,0,16.074,4.361Zm-8.981,8.1a1.7,1.7,0,0,1-1.573-1.79A1.689,1.689,0,0,1,7.093,8.881a1.679,1.679,0,0,1,1.573,1.791A1.687,1.687,0,0,1,7.093,12.462Zm5.814,0a1.7,1.7,0,0,1-1.573-1.79,1.689,1.689,0,0,1,1.573-1.791,1.679,1.679,0,0,1,1.573,1.791A1.688,1.688,0,0,1,12.907,12.462Z"/></svg>',
            download: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="14,10 9.5,14.5 5,10"/><rect x="3" y="17" width="13" height="1"/><line fill="none" stroke="#000" x1="9.5" y1="13.91" x2="9.5" y2="3"/></svg>',
            dribbble: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.4" d="M1.3,8.9c0,0,5,0.1,8.6-1c1.4-0.4,2.6-0.9,4-1.9 c1.4-1.1,2.5-2.5,2.5-2.5"/><path fill="none" stroke="#000" stroke-width="1.4" d="M3.9,16.6c0,0,1.7-2.8,3.5-4.2 c1.8-1.3,4-2,5.7-2.2C16,10,19,10.6,19,10.6"/><path fill="none" stroke="#000" stroke-width="1.4" d="M6.9,1.6c0,0,3.3,4.6,4.2,6.8 c0.4,0.9,1.3,3.1,1.9,5.2c0.6,2,0.9,4.4,0.9,4.4"/><circle fill="none" stroke="#000" stroke-width="1.4" cx="10" cy="10" r="9"/></svg>',
            etsy: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M8,4.26C8,4.07,8,4,8.31,4h4.46c.79,0,1.22.67,1.53,1.91l.25,1h.76c.14-2.82.26-4,.26-4S13.65,3,12.52,3H6.81L3.75,2.92v.84l1,.2c.73.11.9.27,1,1,0,0,.06,2,.06,5.17s-.06,5.14-.06,5.14c0,.59-.23.81-1,.94l-1,.2v.84l3.06-.1h5.11c1.15,0,3.82.1,3.82.1,0-.7.45-3.88.51-4.22h-.73l-.76,1.69a2.25,2.25,0,0,1-2.45,1.47H9.4c-1,0-1.44-.4-1.44-1.24V10.44s2.16,0,2.86.06c.55,0,.85.19,1.06,1l.23,1H13L12.9,9.94,13,7.41h-.85l-.28,1.13c-.16.74-.28.84-1,1-1,.1-2.89.09-2.89.09Z"/></svg>',
            expand: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 18 2 18 7 17 7 17 3 13 3"/><polygon points="2 13 3 13 3 17 7 17 7 18 2 18"/><path fill="none" stroke="#000" stroke-width="1.1" d="M11,9 L17,3"/><path fill="none" stroke="#000" stroke-width="1.1" d="M3,17 L9,11"/></svg>',
            facebook: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11,10h2.6l0.4-3H11V5.3c0-0.9,0.2-1.5,1.5-1.5H14V1.1c-0.3,0-1-0.1-2.1-0.1C9.6,1,8,2.4,8,5v2H5.5v3H8v8h3V10z"/></svg>',
            "file-edit": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z"/><polyline fill="none" stroke="#000" points="16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5"/></svg>',
            "file-pdf": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"/><path d="M14.65 11.67c-.48.3-1.37-.19-1.79-.37a4.65 4.65 0 0 1 1.49.06c.35.1.36.28.3.31zm-6.3.06l.43-.79a14.7 14.7 0 0 0 .75-1.64 5.48 5.48 0 0 0 1.25 1.55l.2.15a16.36 16.36 0 0 0-2.63.73zM9.5 5.32c.2 0 .32.5.32.97a1.99 1.99 0 0 1-.23 1.04 5.05 5.05 0 0 1-.17-1.3s0-.71.08-.71zm-3.9 9a4.35 4.35 0 0 1 1.21-1.46l.24-.22a4.35 4.35 0 0 1-1.46 1.68zm9.23-3.3a2.05 2.05 0 0 0-1.32-.3 11.07 11.07 0 0 0-1.58.11 4.09 4.09 0 0 1-.74-.5 5.39 5.39 0 0 1-1.32-2.06 10.37 10.37 0 0 0 .28-2.62 1.83 1.83 0 0 0-.07-.25.57.57 0 0 0-.52-.4H9.4a.59.59 0 0 0-.6.38 6.95 6.95 0 0 0 .37 3.14c-.26.63-1 2.12-1 2.12-.3.58-.57 1.08-.82 1.5l-.8.44A3.11 3.11 0 0 0 5 14.16a.39.39 0 0 0 .15.42l.24.13c1.15.56 2.28-1.74 2.66-2.42a23.1 23.1 0 0 1 3.59-.85 4.56 4.56 0 0 0 2.91.8.5.5 0 0 0 .3-.21 1.1 1.1 0 0 0 .12-.75.84.84 0 0 0-.14-.25z"/></svg>',
            "file-text": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"/><line fill="none" stroke="#000" x1="6" x2="12" y1="12.5" y2="12.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="8.5" y2="8.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="6.5" y2="6.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="10.5" y2="10.5"/></svg>',
            file: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="1.5" width="13" height="17"/></svg>',
            flickr: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="5.5" cy="9.5" r="3.5"/><circle cx="14.5" cy="9.5" r="3.5"/></svg>',
            folder: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="9.5 5.5 8.5 3.5 1.5 3.5 1.5 16.5 18.5 16.5 18.5 5.5"/></svg>',
            forward: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.47,13.11 C4.02,10.02 6.27,7.85 9.04,6.61 C9.48,6.41 10.27,6.13 11,5.91 L11,2 L18.89,9 L11,16 L11,12.13 C9.25,12.47 7.58,13.19 6.02,14.25 C3.03,16.28 1.63,18.54 1.63,18.54 C1.63,18.54 1.38,15.28 2.47,13.11 L2.47,13.11 Z M5.3,13.53 C6.92,12.4 9.04,11.4 12,10.92 L12,13.63 L17.36,9 L12,4.25 L12,6.8 C11.71,6.86 10.86,7.02 9.67,7.49 C6.79,8.65 4.58,10.96 3.49,13.08 C3.18,13.7 2.68,14.87 2.49,16 C3.28,15.05 4.4,14.15 5.3,13.53 L5.3,13.53 Z"/></svg>',
            foursquare: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.23,2 C15.96,2 16.4,2.41 16.5,2.86 C16.57,3.15 16.56,3.44 16.51,3.73 C16.46,4.04 14.86,11.72 14.75,12.03 C14.56,12.56 14.16,12.82 13.61,12.83 C13.03,12.84 11.09,12.51 10.69,13 C10.38,13.38 7.79,16.39 6.81,17.53 C6.61,17.76 6.4,17.96 6.08,17.99 C5.68,18.04 5.29,17.87 5.17,17.45 C5.12,17.28 5.1,17.09 5.1,16.91 C5.1,12.4 4.86,7.81 5.11,3.31 C5.17,2.5 5.81,2.12 6.53,2 L15.23,2 L15.23,2 Z M9.76,11.42 C9.94,11.19 10.17,11.1 10.45,11.1 L12.86,11.1 C13.12,11.1 13.31,10.94 13.36,10.69 C13.37,10.64 13.62,9.41 13.74,8.83 C13.81,8.52 13.53,8.28 13.27,8.28 C12.35,8.29 11.42,8.28 10.5,8.28 C9.84,8.28 9.83,7.69 9.82,7.21 C9.8,6.85 10.13,6.55 10.5,6.55 C11.59,6.56 12.67,6.55 13.76,6.55 C14.03,6.55 14.23,6.4 14.28,6.14 C14.34,5.87 14.67,4.29 14.67,4.29 C14.67,4.29 14.82,3.74 14.19,3.74 L7.34,3.74 C7,3.75 6.84,4.02 6.84,4.33 C6.84,7.58 6.85,14.95 6.85,14.99 C6.87,15 8.89,12.51 9.76,11.42 L9.76,11.42 Z"/></svg>',
            future: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline points="19 2 18 2 18 6 14 6 14 7 19 7 19 2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M18,6.548 C16.709,3.29 13.354,1 9.6,1 C4.6,1 0.6,5 0.6,10 C0.6,15 4.6,19 9.6,19 C14.6,19 18.6,15 18.6,10"/><rect x="9" y="4" width="1" height="7"/><path d="M13.018,14.197 L9.445,10.625" fill="none" stroke="#000" stroke-width="1.1"/></svg>',
            "git-branch": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="3" r="2"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="14" cy="6" r="2"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="17" r="2"/><path fill="none" stroke="#000" stroke-width="2" d="M14,8 C14,10.41 12.43,10.87 10.56,11.25 C9.09,11.54 7,12.06 7,15 L7,5"/></svg>',
            "git-fork": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.2" cx="5.79" cy="2.79" r="1.79"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="14.19" cy="2.79" r="1.79"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="10.03" cy="16.79" r="1.79"/><path fill="none" stroke="#000" stroke-width="2" d="M5.79,4.57 L5.79,6.56 C5.79,9.19 10.03,10.22 10.03,13.31 C10.03,14.86 10.04,14.55 10.04,14.55 C10.04,14.37 10.04,14.86 10.04,13.31 C10.04,10.22 14.2,9.19 14.2,6.56 L14.2,4.57"/></svg>',
            "github-alt": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5 C4.75,0.5 0.5,4.76 0.5,10.01 C0.5,15.26 4.75,19.51 10,19.51 C15.24,19.51 19.5,15.26 19.5,10.01 C19.5,4.76 15.25,0.5 10,0.5 L10,0.5 Z M12.81,17.69 C12.81,17.69 12.81,17.7 12.79,17.69 C12.47,17.75 12.35,17.59 12.35,17.36 L12.35,16.17 C12.35,15.45 12.09,14.92 11.58,14.56 C12.2,14.51 12.77,14.39 13.26,14.21 C13.87,13.98 14.36,13.69 14.74,13.29 C15.42,12.59 15.76,11.55 15.76,10.17 C15.76,9.25 15.45,8.46 14.83,7.8 C15.1,7.08 15.07,6.29 14.75,5.44 L14.51,5.42 C14.34,5.4 14.06,5.46 13.67,5.61 C13.25,5.78 12.79,6.03 12.31,6.35 C11.55,6.16 10.81,6.05 10.09,6.05 C9.36,6.05 8.61,6.15 7.88,6.35 C7.28,5.96 6.75,5.68 6.26,5.54 C6.07,5.47 5.9,5.44 5.78,5.44 L5.42,5.44 C5.06,6.29 5.04,7.08 5.32,7.8 C4.7,8.46 4.4,9.25 4.4,10.17 C4.4,11.94 4.96,13.16 6.08,13.84 C6.53,14.13 7.05,14.32 7.69,14.43 C8.03,14.5 8.32,14.54 8.55,14.55 C8.07,14.89 7.82,15.42 7.82,16.16 L7.82,17.51 C7.8,17.69 7.7,17.8 7.51,17.8 C4.21,16.74 1.82,13.65 1.82,10.01 C1.82,5.5 5.49,1.83 10,1.83 C14.5,1.83 18.17,5.5 18.17,10.01 C18.18,13.53 15.94,16.54 12.81,17.69 L12.81,17.69 Z"/></svg>',
            github: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,1 C5.03,1 1,5.03 1,10 C1,13.98 3.58,17.35 7.16,18.54 C7.61,18.62 7.77,18.34 7.77,18.11 C7.77,17.9 7.76,17.33 7.76,16.58 C5.26,17.12 4.73,15.37 4.73,15.37 C4.32,14.33 3.73,14.05 3.73,14.05 C2.91,13.5 3.79,13.5 3.79,13.5 C4.69,13.56 5.17,14.43 5.17,14.43 C5.97,15.8 7.28,15.41 7.79,15.18 C7.87,14.6 8.1,14.2 8.36,13.98 C6.36,13.75 4.26,12.98 4.26,9.53 C4.26,8.55 4.61,7.74 5.19,7.11 C5.1,6.88 4.79,5.97 5.28,4.73 C5.28,4.73 6.04,4.49 7.75,5.65 C8.47,5.45 9.24,5.35 10,5.35 C10.76,5.35 11.53,5.45 12.25,5.65 C13.97,4.48 14.72,4.73 14.72,4.73 C15.21,5.97 14.9,6.88 14.81,7.11 C15.39,7.74 15.73,8.54 15.73,9.53 C15.73,12.99 13.63,13.75 11.62,13.97 C11.94,14.25 12.23,14.8 12.23,15.64 C12.23,16.84 12.22,17.81 12.22,18.11 C12.22,18.35 12.38,18.63 12.84,18.54 C16.42,17.35 19,13.98 19,10 C19,5.03 14.97,1 10,1 L10,1 Z"/></svg>',
            gitter: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="1" width="1.531" height="11.471"/><rect x="7.324" y="4.059" width="1.529" height="15.294"/><rect x="11.148" y="4.059" width="1.527" height="15.294"/><rect x="14.971" y="4.059" width="1.529" height="8.412"/></svg>',
            google: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.86,9.09 C18.46,12.12 17.14,16.05 13.81,17.56 C9.45,19.53 4.13,17.68 2.47,12.87 C0.68,7.68 4.22,2.42 9.5,2.03 C11.57,1.88 13.42,2.37 15.05,3.65 C15.22,3.78 15.37,3.93 15.61,4.14 C14.9,4.81 14.23,5.45 13.5,6.14 C12.27,5.08 10.84,4.72 9.28,4.98 C8.12,5.17 7.16,5.76 6.37,6.63 C4.88,8.27 4.62,10.86 5.76,12.82 C6.95,14.87 9.17,15.8 11.57,15.25 C13.27,14.87 14.76,13.33 14.89,11.75 L10.51,11.75 L10.51,9.09 L17.86,9.09 L17.86,9.09 Z"/></svg>',
            grid: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="3" height="3"/><rect x="8" y="2" width="3" height="3"/><rect x="14" y="2" width="3" height="3"/><rect x="2" y="8" width="3" height="3"/><rect x="8" y="8" width="3" height="3"/><rect x="14" y="8" width="3" height="3"/><rect x="2" y="14" width="3" height="3"/><rect x="8" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>',
            happy: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="13" cy="7" r="1"/><circle cx="7" cy="7" r="1"/><circle fill="none" stroke="#000" cx="10" cy="10" r="8.5"/><path fill="none" stroke="#000" d="M14.6,11.4 C13.9,13.3 12.1,14.5 10,14.5 C7.9,14.5 6.1,13.3 5.4,11.4"/></svg>',
            hashtag: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.431,8 L15.661,7 L12.911,7 L13.831,3 L12.901,3 L11.98,7 L9.29,7 L10.21,3 L9.281,3 L8.361,7 L5.23,7 L5,8 L8.13,8 L7.21,12 L4.23,12 L4,13 L6.98,13 L6.061,17 L6.991,17 L7.911,13 L10.601,13 L9.681,17 L10.611,17 L11.531,13 L14.431,13 L14.661,12 L11.76,12 L12.681,8 L15.431,8 Z M10.831,12 L8.141,12 L9.061,8 L11.75,8 L10.831,12 Z"/></svg>',
            heart: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.03" d="M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z"/></svg>',
            history: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="#000" points="1 2 2 2 2 6 6 6 6 7 1 7 1 2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M2.1,6.548 C3.391,3.29 6.746,1 10.5,1 C15.5,1 19.5,5 19.5,10 C19.5,15 15.5,19 10.5,19 C5.5,19 1.5,15 1.5,10"/><rect x="9" y="4" width="1" height="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"/></svg>',
            home: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="18.65 11.35 10 2.71 1.35 11.35 0.65 10.65 10 1.29 19.35 10.65"/><polygon points="15 4 18 4 18 7 17 7 17 5 15 5"/><polygon points="3 11 4 11 4 18 7 18 7 12 12 12 12 18 16 18 16 11 17 11 17 19 11 19 11 13 8 13 8 19 3 19"/></svg>',
            image: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="16.1" cy="6.1" r="1.1"/><rect fill="none" stroke="#000" x=".5" y="2.5" width="19" height="15"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="4,13 8,9 13,14"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="11,12 12.5,10.5 16,14"/></svg>',
            info: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.13,11.59 C11.97,12.84 10.35,14.12 9.1,14.16 C6.17,14.2 9.89,9.46 8.74,8.37 C9.3,8.16 10.62,7.83 10.62,8.81 C10.62,9.63 10.12,10.55 9.88,11.32 C8.66,15.16 12.13,11.15 12.14,11.18 C12.16,11.21 12.16,11.35 12.13,11.59 C12.08,11.95 12.16,11.35 12.13,11.59 L12.13,11.59 Z M11.56,5.67 C11.56,6.67 9.36,7.15 9.36,6.03 C9.36,5 11.56,4.54 11.56,5.67 L11.56,5.67 Z"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/></svg>',
            instagram: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.55,1H6.46C3.45,1,1,3.44,1,6.44v7.12c0,3,2.45,5.44,5.46,5.44h7.08c3.02,0,5.46-2.44,5.46-5.44V6.44 C19.01,3.44,16.56,1,13.55,1z M17.5,14c0,1.93-1.57,3.5-3.5,3.5H6c-1.93,0-3.5-1.57-3.5-3.5V6c0-1.93,1.57-3.5,3.5-3.5h8 c1.93,0,3.5,1.57,3.5,3.5V14z"/><circle cx="14.87" cy="5.26" r="1.09"/><path d="M10.03,5.45c-2.55,0-4.63,2.06-4.63,4.6c0,2.55,2.07,4.61,4.63,4.61c2.56,0,4.63-2.061,4.63-4.61 C14.65,7.51,12.58,5.45,10.03,5.45L10.03,5.45L10.03,5.45z M10.08,13c-1.66,0-3-1.34-3-2.99c0-1.65,1.34-2.99,3-2.99s3,1.34,3,2.99 C13.08,11.66,11.74,13,10.08,13L10.08,13L10.08,13z"/></svg>',
            italic: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.63,5.48 L10.15,14.52 C10,15.08 10.37,15.25 11.92,15.3 L11.72,16 L6,16 L6.2,15.31 C7.78,15.26 8.19,15.09 8.34,14.53 L10.82,5.49 C10.97,4.92 10.63,4.76 9.09,4.71 L9.28,4 L15,4 L14.81,4.69 C13.23,4.75 12.78,4.91 12.63,5.48 L12.63,5.48 Z"/></svg>',
            joomla: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.8,13.4l1.7-1.7L5.9,8c-0.6-0.5-0.6-1.5,0-2c0.6-0.6,1.4-0.6,2,0l1.7-1.7c-1-1-2.3-1.3-3.6-1C5.8,2.2,4.8,1.4,3.7,1.4 c-1.3,0-2.3,1-2.3,2.3c0,1.1,0.8,2,1.8,2.3c-0.4,1.3-0.1,2.8,1,3.8L7.8,13.4L7.8,13.4z"/><path d="M10.2,4.3c1-1,2.5-1.4,3.8-1c0.2-1.1,1.1-2,2.3-2c1.3,0,2.3,1,2.3,2.3c0,1.2-0.9,2.2-2,2.3c0.4,1.3,0,2.8-1,3.8L13.9,8 c0.6-0.5,0.6-1.5,0-2c-0.5-0.6-1.5-0.6-2,0L8.2,9.7L6.5,8"/><path d="M14.1,16.8c-1.3,0.4-2.8,0.1-3.8-1l1.7-1.7c0.6,0.6,1.5,0.6,2,0c0.5-0.6,0.6-1.5,0-2l-3.7-3.7L12,6.7l3.7,3.7 c1,1,1.3,2.4,1,3.6c1.1,0.2,2,1.1,2,2.3c0,1.3-1,2.3-2.3,2.3C15.2,18.6,14.3,17.8,14.1,16.8"/><path d="M13.2,12.2l-3.7,3.7c-1,1-2.4,1.3-3.6,1c-0.2,1-1.2,1.8-2.2,1.8c-1.3,0-2.3-1-2.3-2.3c0-1.1,0.8-2,1.8-2.3 c-0.3-1.3,0-2.7,1-3.7l1.7,1.7c-0.6,0.6-0.6,1.5,0,2c0.6,0.6,1.4,0.6,2,0l3.7-3.7"/></svg>',
            laptop: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="16" width="20" height="1"/><rect fill="none" stroke="#000" x="2.5" y="4.5" width="15" height="10"/></svg>',
            lifesaver: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5 C4.76,0.5 0.5,4.76 0.5,10 C0.5,15.24 4.76,19.5 10,19.5 C15.24,19.5 19.5,15.24 19.5,10 C19.5,4.76 15.24,0.5 10,0.5 L10,0.5 Z M10,1.5 C11.49,1.5 12.89,1.88 14.11,2.56 L11.85,4.82 C11.27,4.61 10.65,4.5 10,4.5 C9.21,4.5 8.47,4.67 7.79,4.96 L5.58,2.75 C6.87,1.95 8.38,1.5 10,1.5 L10,1.5 Z M4.96,7.8 C4.67,8.48 4.5,9.21 4.5,10 C4.5,10.65 4.61,11.27 4.83,11.85 L2.56,14.11 C1.88,12.89 1.5,11.49 1.5,10 C1.5,8.38 1.95,6.87 2.75,5.58 L4.96,7.79 L4.96,7.8 L4.96,7.8 Z M10,18.5 C8.25,18.5 6.62,17.97 5.27,17.06 L7.46,14.87 C8.22,15.27 9.08,15.5 10,15.5 C10.79,15.5 11.53,15.33 12.21,15.04 L14.42,17.25 C13.13,18.05 11.62,18.5 10,18.5 L10,18.5 Z M10,14.5 C7.52,14.5 5.5,12.48 5.5,10 C5.5,7.52 7.52,5.5 10,5.5 C12.48,5.5 14.5,7.52 14.5,10 C14.5,12.48 12.48,14.5 10,14.5 L10,14.5 Z M15.04,12.21 C15.33,11.53 15.5,10.79 15.5,10 C15.5,9.08 15.27,8.22 14.87,7.46 L17.06,5.27 C17.97,6.62 18.5,8.25 18.5,10 C18.5,11.62 18.05,13.13 17.25,14.42 L15.04,12.21 L15.04,12.21 Z"/></svg>',
            link: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M10.625,12.375 L7.525,15.475 C6.825,16.175 5.925,16.175 5.225,15.475 L4.525,14.775 C3.825,14.074 3.825,13.175 4.525,12.475 L7.625,9.375"/><path fill="none" stroke="#000" stroke-width="1.1" d="M9.325,7.375 L12.425,4.275 C13.125,3.575 14.025,3.575 14.724,4.275 L15.425,4.975 C16.125,5.675 16.125,6.575 15.425,7.275 L12.325,10.375"/><path fill="none" stroke="#000" stroke-width="1.1" d="M7.925,11.875 L11.925,7.975"/></svg>',
            linkedin: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.77,17.89 L5.77,7.17 L2.21,7.17 L2.21,17.89 L5.77,17.89 L5.77,17.89 Z M3.99,5.71 C5.23,5.71 6.01,4.89 6.01,3.86 C5.99,2.8 5.24,2 4.02,2 C2.8,2 2,2.8 2,3.85 C2,4.88 2.77,5.7 3.97,5.7 L3.99,5.7 L3.99,5.71 L3.99,5.71 Z"/><path d="M7.75,17.89 L11.31,17.89 L11.31,11.9 C11.31,11.58 11.33,11.26 11.43,11.03 C11.69,10.39 12.27,9.73 13.26,9.73 C14.55,9.73 15.06,10.71 15.06,12.15 L15.06,17.89 L18.62,17.89 L18.62,11.74 C18.62,8.45 16.86,6.92 14.52,6.92 C12.6,6.92 11.75,7.99 11.28,8.73 L11.3,8.73 L11.3,7.17 L7.75,7.17 C7.79,8.17 7.75,17.89 7.75,17.89 L7.75,17.89 L7.75,17.89 Z"/></svg>',
            list: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="12" height="1"/><rect x="6" y="9" width="12" height="1"/><rect x="6" y="14" width="12" height="1"/><rect x="2" y="4" width="2" height="1"/><rect x="2" y="9" width="2" height="1"/><rect x="2" y="14" width="2" height="1"/></svg>',
            location: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.01" d="M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z"/><circle fill="none" stroke="#000" cx="10" cy="6.8" r="2.3"/></svg>',
            lock: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" height="10" width="13" y="8.5" x="3.5"/><path fill="none" stroke="#000" d="M6.5,8 L6.5,4.88 C6.5,3.01 8.07,1.5 10,1.5 C11.93,1.5 13.5,3.01 13.5,4.88 L13.5,8"/></svg>',
            mail: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="1.4,6.5 10,11 18.6,6.5"/><path d="M 1,4 1,16 19,16 19,4 1,4 Z M 18,15 2,15 2,5 18,5 18,15 Z"/></svg>',
            menu: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="16" height="1"/><rect x="2" y="9" width="16" height="1"/><rect x="2" y="14" width="16" height="1"/></svg>',
            microphone: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" x1="10" x2="10" y1="16.44" y2="18.5"/><line fill="none" stroke="#000" x1="7" x2="13" y1="18.5" y2="18.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.5 4.89v5.87a3.5 3.5 0 0 1-7 0V4.89a3.5 3.5 0 0 1 7 0z"/><path fill="none" stroke="#000" stroke-width="1.1" d="M15.5 10.36V11a5.5 5.5 0 0 1-11 0v-.6"/></svg>',
            "minus-circle": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9"/><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5"/></svg>',
            minus: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect height="1" width="18" y="9" x="1"/></svg>',
            "more-vertical": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="3" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
            more: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="10" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="17" cy="10" r="2"/></svg>',
            move: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="4,5 1,5 1,9 2,9 2,6 4,6"/><polygon points="1,16 2,16 2,18 4,18 4,19 1,19"/><polygon points="14,16 14,19 11,19 11,18 13,18 13,16"/><rect fill="none" stroke="#000" x="5.5" y="1.5" width="13" height="13"/><rect x="1" y="11" width="1" height="3"/><rect x="6" y="18" width="3" height="1"/></svg>',
            nut: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="2.5,5.7 10,1.3 17.5,5.7 17.5,14.3 10,18.7 2.5,14.3"/><circle fill="none" stroke="#000" cx="10" cy="10" r="3.5"/></svg>',
            pagekit: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="3,1 17,1 17,16 10,16 10,13 14,13 14,4 6,4 6,16 10,16 10,19 3,19"/></svg>',
            "paint-bucket": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.21,1 L0,11.21 L8.1,19.31 L18.31,9.1 L10.21,1 L10.21,1 Z M16.89,9.1 L15,11 L1.7,11 L10.21,2.42 L16.89,9.1 Z"/><path fill="none" stroke="#000" stroke-width="1.1" d="M6.42,2.33 L11.7,7.61"/><path d="M18.49,12 C18.49,12 20,14.06 20,15.36 C20,16.28 19.24,17 18.49,17 L18.49,17 C17.74,17 17,16.28 17,15.36 C17,14.06 18.49,12 18.49,12 L18.49,12 Z"/></svg>',
            pencil: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M17.25,6.01 L7.12,16.1 L3.82,17.2 L5.02,13.9 L15.12,3.88 C15.71,3.29 16.66,3.29 17.25,3.88 C17.83,4.47 17.83,5.42 17.25,6.01 L17.25,6.01 Z"/><path fill="none" stroke="#000" d="M15.98,7.268 L13.851,5.148"/></svg>',
            "phone-landscape": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M17,5.5 C17.8,5.5 18.5,6.2 18.5,7 L18.5,14 C18.5,14.8 17.8,15.5 17,15.5 L3,15.5 C2.2,15.5 1.5,14.8 1.5,14 L1.5,7 C1.5,6.2 2.2,5.5 3,5.5 L17,5.5 L17,5.5 L17,5.5 Z"/><circle cx="3.8" cy="10.5" r=".8"/></svg>',
            phone: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M15.5,17 C15.5,17.8 14.8,18.5 14,18.5 L7,18.5 C6.2,18.5 5.5,17.8 5.5,17 L5.5,3 C5.5,2.2 6.2,1.5 7,1.5 L14,1.5 C14.8,1.5 15.5,2.2 15.5,3 L15.5,17 L15.5,17 L15.5,17 Z"/><circle cx="10.5" cy="16.5" r=".8"/></svg>',
            pinterest: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.21,1 C5.5,1 3,4.16 3,7.61 C3,9.21 3.85,11.2 5.22,11.84 C5.43,11.94 5.54,11.89 5.58,11.69 C5.62,11.54 5.8,10.8 5.88,10.45 C5.91,10.34 5.89,10.24 5.8,10.14 C5.36,9.59 5,8.58 5,7.65 C5,5.24 6.82,2.91 9.93,2.91 C12.61,2.91 14.49,4.74 14.49,7.35 C14.49,10.3 13,12.35 11.06,12.35 C9.99,12.35 9.19,11.47 9.44,10.38 C9.75,9.08 10.35,7.68 10.35,6.75 C10.35,5.91 9.9,5.21 8.97,5.21 C7.87,5.21 6.99,6.34 6.99,7.86 C6.99,8.83 7.32,9.48 7.32,9.48 C7.32,9.48 6.24,14.06 6.04,14.91 C5.7,16.35 6.08,18.7 6.12,18.9 C6.14,19.01 6.26,19.05 6.33,18.95 C6.44,18.81 7.74,16.85 8.11,15.44 C8.24,14.93 8.79,12.84 8.79,12.84 C9.15,13.52 10.19,14.09 11.29,14.09 C14.58,14.09 16.96,11.06 16.96,7.3 C16.94,3.7 14,1 10.21,1"/></svg>',
            "play-circle": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" stroke-width="1.1" points="8.5 7 13.5 10 8.5 13"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/></svg>',
            play: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="6.5,5 14.5,10 6.5,15"/></svg>',
            "plus-circle": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9"/><line fill="none" stroke="#000" x1="9.5" y1="5" x2="9.5" y2="14"/><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5"/></svg>',
            plus: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="1" width="1" height="17"/><rect x="1" y="9" width="17" height="1"/></svg>',
            print: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="4.5 13.5 1.5 13.5 1.5 6.5 18.5 6.5 18.5 13.5 15.5 13.5"/><polyline fill="none" stroke="#000" points="15.5 6.5 15.5 2.5 4.5 2.5 4.5 6.5"/><rect fill="none" stroke="#000" width="11" height="6" x="4.5" y="11.5"/><rect width="8" height="1" x="6" y="13"/><rect width="8" height="1" x="6" y="15"/></svg>',
            pull: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="6.85,8 9.5,10.6 12.15,8 12.85,8.7 9.5,12 6.15,8.7"/><line fill="none" stroke="#000" x1="9.5" y1="11" x2="9.5" y2="2"/><polyline fill="none" stroke="#000" points="6,5.5 3.5,5.5 3.5,18.5 15.5,18.5 15.5,5.5 13,5.5"/></svg>',
            push: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="12.15,4 9.5,1.4 6.85,4 6.15,3.3 9.5,0 12.85,3.3"/><line fill="none" stroke="#000" x1="9.5" y1="10" x2="9.5" y2="1"/><polyline fill="none" stroke="#000" points="6 5.5 3.5 5.5 3.5 18.5 15.5 18.5 15.5 5.5 13 5.5"/></svg>',
            question: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><circle cx="10.44" cy="14.42" r="1.05"/><path fill="none" stroke="#000" stroke-width="1.2" d="M8.17,7.79 C8.17,4.75 12.72,4.73 12.72,7.72 C12.72,8.67 11.81,9.15 11.23,9.75 C10.75,10.24 10.51,10.73 10.45,11.4 C10.44,11.53 10.43,11.64 10.43,11.75"/></svg>',
            "quote-right": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.27,7.79 C17.27,9.45 16.97,10.43 15.99,12.02 C14.98,13.64 13,15.23 11.56,15.97 L11.1,15.08 C12.34,14.2 13.14,13.51 14.02,11.82 C14.27,11.34 14.41,10.92 14.49,10.54 C14.3,10.58 14.09,10.6 13.88,10.6 C12.06,10.6 10.59,9.12 10.59,7.3 C10.59,5.48 12.06,4 13.88,4 C15.39,4 16.67,5.02 17.05,6.42 C17.19,6.82 17.27,7.27 17.27,7.79 L17.27,7.79 Z"/><path d="M8.68,7.79 C8.68,9.45 8.38,10.43 7.4,12.02 C6.39,13.64 4.41,15.23 2.97,15.97 L2.51,15.08 C3.75,14.2 4.55,13.51 5.43,11.82 C5.68,11.34 5.82,10.92 5.9,10.54 C5.71,10.58 5.5,10.6 5.29,10.6 C3.47,10.6 2,9.12 2,7.3 C2,5.48 3.47,4 5.29,4 C6.8,4 8.08,5.02 8.46,6.42 C8.6,6.82 8.68,7.27 8.68,7.79 L8.68,7.79 Z"/></svg>',
            receiver: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.01" d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611"/></svg>',
            reddit: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19 9.05a2.56 2.56 0 0 0-2.56-2.56 2.59 2.59 0 0 0-1.88.82 10.63 10.63 0 0 0-4.14-1v-.08c.58-1.62 1.58-3.89 2.7-4.1.38-.08.77.12 1.19.57a1.15 1.15 0 0 0-.06.37 1.48 1.48 0 1 0 1.51-1.45 1.43 1.43 0 0 0-.76.19A2.29 2.29 0 0 0 12.91 1c-2.11.43-3.39 4.38-3.63 5.19 0 0 0 .11-.06.11a10.65 10.65 0 0 0-3.75 1A2.56 2.56 0 0 0 1 9.05a2.42 2.42 0 0 0 .72 1.76A5.18 5.18 0 0 0 1.24 13c0 3.66 3.92 6.64 8.73 6.64s8.74-3 8.74-6.64a5.23 5.23 0 0 0-.46-2.13A2.58 2.58 0 0 0 19 9.05zm-16.88 0a1.44 1.44 0 0 1 2.27-1.19 7.68 7.68 0 0 0-2.07 1.91 1.33 1.33 0 0 1-.2-.72zM10 18.4c-4.17 0-7.55-2.4-7.55-5.4S5.83 7.53 10 7.53 17.5 10 17.5 13s-3.38 5.4-7.5 5.4zm7.69-8.61a7.62 7.62 0 0 0-2.09-1.91 1.41 1.41 0 0 1 .84-.28 1.47 1.47 0 0 1 1.44 1.45 1.34 1.34 0 0 1-.21.72z"/><path d="M6.69 12.58a1.39 1.39 0 1 1 1.39-1.39 1.38 1.38 0 0 1-1.38 1.39z"/><path d="M14.26 11.2a1.39 1.39 0 1 1-1.39-1.39 1.39 1.39 0 0 1 1.39 1.39z"/><path d="M13.09 14.88a.54.54 0 0 1-.09.77 5.3 5.3 0 0 1-3.26 1.19 5.61 5.61 0 0 1-3.4-1.22.55.55 0 1 1 .73-.83 4.09 4.09 0 0 0 5.25 0 .56.56 0 0 1 .77.09z"/></svg>',
            refresh: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17.08,11.15 C17.09,11.31 17.1,11.47 17.1,11.64 C17.1,15.53 13.94,18.69 10.05,18.69 C6.16,18.68 3,15.53 3,11.63 C3,7.74 6.16,4.58 10.05,4.58 C10.9,4.58 11.71,4.73 12.46,5"/><polyline fill="none" stroke="#000" points="9.9 2 12.79 4.89 9.79 7.9"/></svg>',
            reply: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"/></svg>',
            rss: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="3.12" cy="16.8" r="1.85"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,8.2 C1.78,8.18 2.06,8.16 2.35,8.16 C7.57,8.16 11.81,12.37 11.81,17.57 C11.81,17.89 11.79,18.19 11.76,18.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,2.52 C1.78,2.51 2.06,2.5 2.35,2.5 C10.72,2.5 17.5,9.24 17.5,17.57 C17.5,17.89 17.49,18.19 17.47,18.5"/></svg>',
            search: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',
            server: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="1" height="2"/><rect x="5" y="3" width="1" height="2"/><rect x="7" y="3" width="1" height="2"/><rect x="16" y="3" width="1" height="1"/><rect x="16" y="10" width="1" height="1"/><circle fill="none" stroke="#000" cx="9.9" cy="17.4" r="1.4"/><rect x="3" y="10" width="1" height="2"/><rect x="5" y="10" width="1" height="2"/><rect x="9.5" y="14" width="1" height="2"/><rect x="3" y="17" width="6" height="1"/><rect x="11" y="17" width="6" height="1"/><rect fill="none" stroke="#000" x="1.5" y="1.5" width="17" height="5"/><rect fill="none" stroke="#000" x="1.5" y="8.5" width="17" height="5"/></svg>',
            settings: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><ellipse fill="none" stroke="#000" cx="6.11" cy="3.55" rx="2.11" ry="2.15"/><ellipse fill="none" stroke="#000" cx="6.11" cy="15.55" rx="2.11" ry="2.15"/><circle fill="none" stroke="#000" cx="13.15" cy="9.55" r="2.15"/><rect x="1" y="3" width="3" height="1"/><rect x="10" y="3" width="8" height="1"/><rect x="1" y="9" width="8" height="1"/><rect x="15" y="9" width="3" height="1"/><rect x="1" y="15" width="3" height="1"/><rect x="10" y="15" width="8" height="1"/></svg>',
            shrink: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="11 4 12 4 12 8 16 8 16 9 11 9"/><polygon points="4 11 9 11 9 16 8 16 8 12 4 12"/><path fill="none" stroke="#000" stroke-width="1.1" d="M12,8 L18,2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M2,18 L8,12"/></svg>',
            "sign-in": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="7 2 17 2 17 17 7 17 7 16 16 16 16 3 7 3"/><polygon points="9.1 13.4 8.5 12.8 11.28 10 4 10 4 9 11.28 9 8.5 6.2 9.1 5.62 13 9.5"/></svg>',
            "sign-out": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="13.1 13.4 12.5 12.8 15.28 10 8 10 8 9 15.28 9 12.5 6.2 13.1 5.62 17 9.5"/><polygon points="13 2 3 2 3 17 13 17 13 16 4 16 4 3 13 3"/></svg>',
            social: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="13.4" y1="14" x2="6.3" y2="10.7"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13.5" y1="5.5" x2="6.5" y2="8.8"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="4.6" r="2.3"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="14.8" r="2.3"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="4.5" cy="9.8" r="2.3"/></svg>',
            soundcloud: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.2,9.4c-0.4,0-0.8,0.1-1.101,0.2c-0.199-2.5-2.399-4.5-5-4.5c-0.6,0-1.2,0.1-1.7,0.3C9.2,5.5,9.1,5.6,9.1,5.6V15h8 c1.601,0,2.801-1.2,2.801-2.8C20,10.7,18.7,9.4,17.2,9.4L17.2,9.4z"/><rect x="6" y="6.5" width="1.5" height="8.5"/><rect x="3" y="8" width="1.5" height="7"/><rect y="10" width="1.5" height="5"/></svg>',
            star: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"/></svg>',
            strikethrough: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6,13.02 L6.65,13.02 C7.64,15.16 8.86,16.12 10.41,16.12 C12.22,16.12 12.92,14.93 12.92,13.89 C12.92,12.55 11.99,12.03 9.74,11.23 C8.05,10.64 6.23,10.11 6.23,7.83 C6.23,5.5 8.09,4.09 10.4,4.09 C11.44,4.09 12.13,4.31 12.72,4.54 L13.33,4 L13.81,4 L13.81,7.59 L13.16,7.59 C12.55,5.88 11.52,4.89 10.07,4.89 C8.84,4.89 7.89,5.69 7.89,7.03 C7.89,8.29 8.89,8.78 10.88,9.45 C12.57,10.03 14.38,10.6 14.38,12.91 C14.38,14.75 13.27,16.93 10.18,16.93 C9.18,16.93 8.17,16.69 7.46,16.39 L6.52,17 L6,17 L6,13.02 L6,13.02 Z"/><rect x="3" y="10" width="15" height="1"/></svg>',
            table: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="18" height="1"/><rect x="1" y="7" width="18" height="1"/><rect x="1" y="11" width="18" height="1"/><rect x="1" y="15" width="18" height="1"/></svg>',
            "tablet-landscape": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M1.5,5 C1.5,4.2 2.2,3.5 3,3.5 L17,3.5 C17.8,3.5 18.5,4.2 18.5,5 L18.5,16 C18.5,16.8 17.8,17.5 17,17.5 L3,17.5 C2.2,17.5 1.5,16.8 1.5,16 L1.5,5 L1.5,5 L1.5,5 Z"/><circle cx="3.7" cy="10.5" r=".8"/></svg>',
            tablet: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M5,18.5 C4.2,18.5 3.5,17.8 3.5,17 L3.5,3 C3.5,2.2 4.2,1.5 5,1.5 L16,1.5 C16.8,1.5 17.5,2.2 17.5,3 L17.5,17 C17.5,17.8 16.8,18.5 16,18.5 L5,18.5 L5,18.5 L5,18.5 Z"/><circle cx="10.5" cy="16.3" r=".8"/></svg>',
            tag: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17.5,3.71 L17.5,7.72 C17.5,7.96 17.4,8.2 17.21,8.39 L8.39,17.2 C7.99,17.6 7.33,17.6 6.93,17.2 L2.8,13.07 C2.4,12.67 2.4,12.01 2.8,11.61 L11.61,2.8 C11.81,2.6 12.08,2.5 12.34,2.5 L16.19,2.5 C16.52,2.5 16.86,2.63 17.11,2.88 C17.35,3.11 17.48,3.4 17.5,3.71 L17.5,3.71 Z"/><circle cx="14" cy="6" r="1"/></svg>',
            thumbnails: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="3.5" width="5" height="5"/><rect fill="none" stroke="#000" x="11.5" y="3.5" width="5" height="5"/><rect fill="none" stroke="#000" x="11.5" y="11.5" width="5" height="5"/><rect fill="none" stroke="#000" x="3.5" y="11.5" width="5" height="5"/></svg>',
            tiktok: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.24,6V8.82a6.79,6.79,0,0,1-4-1.28v5.81A5.26,5.26,0,1,1,8,8.1a4.36,4.36,0,0,1,.72.05v2.9A2.57,2.57,0,0,0,7.64,11a2.4,2.4,0,1,0,2.77,2.38V2h2.86a4,4,0,0,0,1.84,3.38A4,4,0,0,0,17.24,6Z"/></svg>',
            trash: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3"/><polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4"/><rect x="8" y="7" width="1" height="9"/><rect x="11" y="7" width="1" height="9"/><rect x="2" y="3" width="16" height="1"/></svg>',
            "triangle-down": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="5 7 15 7 10 12"/></svg>',
            "triangle-left": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="12 5 7 10 12 15"/></svg>',
            "triangle-right": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="8 5 13 10 8 15"/></svg>',
            "triangle-up": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="5 13 10 8 15 13"/></svg>',
            tripadvisor: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19.021,7.866C19.256,6.862,20,5.854,20,5.854h-3.346C14.781,4.641,12.504,4,9.98,4C7.363,4,4.999,4.651,3.135,5.876H0\tc0,0,0.738,0.987,0.976,1.988c-0.611,0.837-0.973,1.852-0.973,2.964c0,2.763,2.249,5.009,5.011,5.009\tc1.576,0,2.976-0.737,3.901-1.879l1.063,1.599l1.075-1.615c0.475,0.611,1.1,1.111,1.838,1.451c1.213,0.547,2.574,0.612,3.825,0.15\tc2.589-0.963,3.913-3.852,2.964-6.439c-0.175-0.463-0.4-0.876-0.675-1.238H19.021z M16.38,14.594\tc-1.002,0.371-2.088,0.328-3.06-0.119c-0.688-0.317-1.252-0.817-1.657-1.438c-0.164-0.25-0.313-0.52-0.417-0.811\tc-0.124-0.328-0.186-0.668-0.217-1.014c-0.063-0.689,0.037-1.396,0.339-2.043c0.448-0.971,1.251-1.71,2.25-2.079\tc2.075-0.765,4.375,0.3,5.14,2.366c0.762,2.066-0.301,4.37-2.363,5.134L16.38,14.594L16.38,14.594z M8.322,13.066\tc-0.72,1.059-1.935,1.76-3.309,1.76c-2.207,0-4.001-1.797-4.001-3.996c0-2.203,1.795-4.002,4.001-4.002\tc2.204,0,3.999,1.8,3.999,4.002c0,0.137-0.024,0.261-0.04,0.396c-0.067,0.678-0.284,1.313-0.648,1.853v-0.013H8.322z M2.472,10.775\tc0,1.367,1.112,2.479,2.476,2.479c1.363,0,2.472-1.11,2.472-2.479c0-1.359-1.11-2.468-2.472-2.468\tC3.584,8.306,2.473,9.416,2.472,10.775L2.472,10.775z M12.514,10.775c0,1.367,1.104,2.479,2.471,2.479\tc1.363,0,2.474-1.108,2.474-2.479c0-1.359-1.11-2.468-2.474-2.468c-1.364,0-2.477,1.109-2.477,2.468H12.514z M3.324,10.775\tc0-0.893,0.726-1.618,1.614-1.618c0.889,0,1.625,0.727,1.625,1.618c0,0.898-0.725,1.627-1.625,1.627\tc-0.901,0-1.625-0.729-1.625-1.627H3.324z M13.354,10.775c0-0.893,0.726-1.618,1.627-1.618c0.886,0,1.61,0.727,1.61,1.618\tc0,0.898-0.726,1.627-1.626,1.627s-1.625-0.729-1.625-1.627H13.354z M9.977,4.875c1.798,0,3.425,0.324,4.849,0.968\tc-0.535,0.015-1.061,0.108-1.586,0.3c-1.264,0.463-2.264,1.388-2.815,2.604c-0.262,0.551-0.398,1.133-0.448,1.72\tC9.79,7.905,7.677,5.873,5.076,5.82C6.501,5.208,8.153,4.875,9.94,4.875H9.977z"/></svg>',
            tumblr: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.885,8.598c0,0,0,3.393,0,4.996c0,0.282,0,0.66,0.094,0.942c0.377,1.509,1.131,2.545,2.545,3.11 c1.319,0.472,2.356,0.472,3.676,0c0.565-0.188,1.132-0.659,1.132-0.659l-0.849-2.263c0,0-1.036,0.378-1.603,0.283 c-0.565-0.094-1.226-0.66-1.226-1.508c0-1.603,0-4.902,0-4.902h2.828V5.771h-2.828V2H8.205c0,0-0.094,0.66-0.188,0.942 C7.828,3.791,7.262,4.733,6.603,5.394C5.848,6.147,5,6.43,5,6.43v2.168H6.885z"/></svg>',
            tv: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="16" width="6" height="1"/><rect fill="none" stroke="#000" x=".5" y="3.5" width="19" height="11"/></svg>',
            twitch: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.23,1,2,4.23V15.85H5.88v3.23L9.1,15.85h2.59L17.5,10V1Zm11,8.4L13.62,12H11L8.78,14.24V12H5.88V2.29H16.21Z"/><rect x="12.98" y="4.55" width="1.29" height="3.88"/><rect x="9.43" y="4.55" width="1.29" height="3.88"/></svg>',
            twitter: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19,4.74 C18.339,5.029 17.626,5.229 16.881,5.32 C17.644,4.86 18.227,4.139 18.503,3.28 C17.79,3.7 17.001,4.009 16.159,4.17 C15.485,3.45 14.526,3 13.464,3 C11.423,3 9.771,4.66 9.771,6.7 C9.771,6.99 9.804,7.269 9.868,7.539 C6.795,7.38 4.076,5.919 2.254,3.679 C1.936,4.219 1.754,4.86 1.754,5.539 C1.754,6.82 2.405,7.95 3.397,8.61 C2.79,8.589 2.22,8.429 1.723,8.149 L1.723,8.189 C1.723,9.978 2.997,11.478 4.686,11.82 C4.376,11.899 4.049,11.939 3.713,11.939 C3.475,11.939 3.245,11.919 3.018,11.88 C3.49,13.349 4.852,14.419 6.469,14.449 C5.205,15.429 3.612,16.019 1.882,16.019 C1.583,16.019 1.29,16.009 1,15.969 C2.635,17.019 4.576,17.629 6.662,17.629 C13.454,17.629 17.17,12 17.17,7.129 C17.17,6.969 17.166,6.809 17.157,6.649 C17.879,6.129 18.504,5.478 19,4.74"/></svg>',
            uikit: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="14.4,3.1 11.3,5.1 15,7.3 15,12.9 10,15.7 5,12.9 5,8.5 2,6.8 2,14.8 9.9,19.5 18,14.8 18,5.3"/><polygon points="9.8,4.2 6.7,2.4 9.8,0.4 12.9,2.3"/></svg>',
            unlock: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="8.5" width="13" height="10"/><path fill="none" stroke="#000" d="M6.5,8.5 L6.5,4.9 C6.5,3 8.1,1.5 10,1.5 C11.9,1.5 13.5,3 13.5,4.9"/></svg>',
            upload: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="5 8 9.5 3.5 14 8"/><rect x="3" y="17" width="13" height="1"/><line fill="none" stroke="#000" x1="9.5" y1="15" x2="9.5" y2="4"/></svg>',
            user: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.9" cy="6.4" r="4.4"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,19 C2.3,14.5 5.8,11.2 10,11.2 C14.2,11.2 17.7,14.6 18.5,19.2"/></svg>',
            users: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="7.7" cy="8.6" r="3.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3"/><path fill="none" stroke="#000" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1"/></svg>',
            "video-camera": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="17.5 6.9 17.5 13.1 13.5 10.4 13.5 14.5 2.5 14.5 2.5 5.5 13.5 5.5 13.5 9.6 17.5 6.9"/></svg>',
            vimeo: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.065,7.59C1.84,7.367,1.654,7.082,1.468,6.838c-0.332-0.42-0.137-0.411,0.274-0.772c1.026-0.91,2.004-1.896,3.127-2.688 c1.017-0.713,2.365-1.173,3.286-0.039c0.849,1.045,0.869,2.629,1.084,3.891c0.215,1.309,0.421,2.648,0.88,3.901 c0.127,0.352,0.37,1.018,0.81,1.074c0.567,0.078,1.145-0.917,1.408-1.289c0.684-0.987,1.611-2.317,1.494-3.587 c-0.115-1.349-1.572-1.095-2.482-0.773c0.146-1.514,1.555-3.216,2.912-3.792c1.439-0.597,3.579-0.587,4.302,1.036 c0.772,1.759,0.078,3.802-0.763,5.396c-0.918,1.731-2.1,3.333-3.363,4.829c-1.114,1.329-2.432,2.787-4.093,3.422 c-1.897,0.723-3.021-0.686-3.667-2.318c-0.705-1.777-1.056-3.771-1.565-5.621C4.898,8.726,4.644,7.836,4.136,7.191 C3.473,6.358,2.72,7.141,2.065,7.59C1.977,7.502,2.115,7.551,2.065,7.59L2.065,7.59z"/></svg>',
            warning: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="14" r="1"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><path d="M10.97,7.72 C10.85,9.54 10.56,11.29 10.56,11.29 C10.51,11.87 10.27,12 9.99,12 C9.69,12 9.49,11.87 9.43,11.29 C9.43,11.29 9.16,9.54 9.03,7.72 C8.96,6.54 9.03,6 9.03,6 C9.03,5.45 9.46,5.02 9.99,5 C10.53,5.01 10.97,5.44 10.97,6 C10.97,6 11.04,6.54 10.97,7.72 L10.97,7.72 Z"/></svg>',
            whatsapp: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.7,3.3c-1.8-1.8-4.1-2.8-6.7-2.8c-5.2,0-9.4,4.2-9.4,9.4c0,1.7,0.4,3.3,1.3,4.7l-1.3,4.9l5-1.3c1.4,0.8,2.9,1.2,4.5,1.2 l0,0l0,0c5.2,0,9.4-4.2,9.4-9.4C19.5,7.4,18.5,5,16.7,3.3 M10.1,17.7L10.1,17.7c-1.4,0-2.8-0.4-4-1.1l-0.3-0.2l-3,0.8l0.8-2.9 l-0.2-0.3c-0.8-1.2-1.2-2.7-1.2-4.2c0-4.3,3.5-7.8,7.8-7.8c2.1,0,4.1,0.8,5.5,2.3c1.5,1.5,2.3,3.4,2.3,5.5 C17.9,14.2,14.4,17.7,10.1,17.7 M14.4,11.9c-0.2-0.1-1.4-0.7-1.6-0.8c-0.2-0.1-0.4-0.1-0.5,0.1c-0.2,0.2-0.6,0.8-0.8,0.9 c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5C8,8.8,8.1,8.7,8.2,8.5 c0.1-0.1,0.2-0.2,0.2-0.4c0.1-0.2,0-0.3,0-0.4C8.4,7.6,7.9,6.5,7.7,6C7.5,5.5,7.3,5.6,7.2,5.6c-0.1,0-0.3,0-0.4,0 c-0.2,0-0.4,0.1-0.6,0.3c-0.2,0.2-0.8,0.8-0.8,2c0,1.2,0.8,2.3,1,2.4c0.1,0.2,1.7,2.5,4,3.5c0.6,0.2,1,0.4,1.3,0.5 c0.6,0.2,1.1,0.2,1.5,0.1c0.5-0.1,1.4-0.6,1.6-1.1c0.2-0.5,0.2-1,0.1-1.1C14.8,12.1,14.6,12,14.4,11.9"/></svg>',
            wordpress: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5c-5.2,0-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5c5.2,0,9.5-4.3,9.5-9.5S15.2,0.5,10,0.5L10,0.5L10,0.5z M15.6,3.9h-0.1 c-0.8,0-1.4,0.7-1.4,1.5c0,0.7,0.4,1.3,0.8,1.9c0.3,0.6,0.7,1.3,0.7,2.3c0,0.7-0.3,1.5-0.6,2.7L14.1,15l-3-8.9 c0.5,0,0.9-0.1,0.9-0.1C12.5,6,12.5,5.3,12,5.4c0,0-1.3,0.1-2.2,0.1C9,5.5,7.7,5.4,7.7,5.4C7.2,5.3,7.2,6,7.6,6c0,0,0.4,0.1,0.9,0.1 l1.3,3.5L8,15L5,6.1C5.5,6.1,5.9,6,5.9,6C6.4,6,6.3,5.3,5.9,5.4c0,0-1.3,0.1-2.2,0.1c-0.2,0-0.3,0-0.5,0c1.5-2.2,4-3.7,6.9-3.7 C12.2,1.7,14.1,2.6,15.6,3.9L15.6,3.9L15.6,3.9z M2.5,6.6l3.9,10.8c-2.7-1.3-4.6-4.2-4.6-7.4C1.8,8.8,2,7.6,2.5,6.6L2.5,6.6L2.5,6.6 z M10.2,10.7l2.5,6.9c0,0,0,0.1,0.1,0.1C11.9,18,11,18.2,10,18.2c-0.8,0-1.6-0.1-2.3-0.3L10.2,10.7L10.2,10.7L10.2,10.7z M14.2,17.1 l2.5-7.3c0.5-1.2,0.6-2.1,0.6-2.9c0-0.3,0-0.6-0.1-0.8c0.6,1.2,1,2.5,1,4C18.3,13,16.6,15.7,14.2,17.1L14.2,17.1L14.2,17.1z"/></svg>',
            world: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M1,10.5 L19,10.5"/><path fill="none" stroke="#000" d="M2.35,15.5 L17.65,15.5"/><path fill="none" stroke="#000" d="M2.35,5.5 L17.523,5.5"/><path fill="none" stroke="#000" d="M10,19.46 L9.98,19.46 C7.31,17.33 5.61,14.141 5.61,10.58 C5.61,7.02 7.33,3.83 10,1.7 C10.01,1.7 9.99,1.7 10,1.7 L10,1.7 C12.67,3.83 14.4,7.02 14.4,10.58 C14.4,14.141 12.67,17.33 10,19.46 L10,19.46 L10,19.46 L10,19.46 Z"/><circle fill="none" stroke="#000" cx="10" cy="10.5" r="9"/></svg>',
            xing: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.4,4.56 C4.24,4.56 4.11,4.61 4.05,4.72 C3.98,4.83 3.99,4.97 4.07,5.12 L5.82,8.16 L5.82,8.17 L3.06,13.04 C2.99,13.18 2.99,13.33 3.06,13.44 C3.12,13.55 3.24,13.62 3.4,13.62 L6,13.62 C6.39,13.62 6.57,13.36 6.71,13.12 C6.71,13.12 9.41,8.35 9.51,8.16 C9.49,8.14 7.72,5.04 7.72,5.04 C7.58,4.81 7.39,4.56 6.99,4.56 L4.4,4.56 L4.4,4.56 Z"/><path d="M15.3,1 C14.91,1 14.74,1.25 14.6,1.5 C14.6,1.5 9.01,11.42 8.82,11.74 C8.83,11.76 12.51,18.51 12.51,18.51 C12.64,18.74 12.84,19 13.23,19 L15.82,19 C15.98,19 16.1,18.94 16.16,18.83 C16.23,18.72 16.23,18.57 16.16,18.43 L12.5,11.74 L12.5,11.72 L18.25,1.56 C18.32,1.42 18.32,1.27 18.25,1.16 C18.21,1.06 18.08,1 17.93,1 L15.3,1 L15.3,1 Z"/></svg>',
            yelp: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.175,14.971c-0.112,0.77-1.686,2.767-2.406,3.054c-0.246,0.1-0.487,0.076-0.675-0.069\tc-0.122-0.096-2.446-3.859-2.446-3.859c-0.194-0.293-0.157-0.682,0.083-0.978c0.234-0.284,0.581-0.393,0.881-0.276\tc0.016,0.01,4.21,1.394,4.332,1.482c0.178,0.148,0.263,0.379,0.225,0.646L17.175,14.971L17.175,14.971z M11.464,10.789\tc-0.203-0.307-0.199-0.666,0.009-0.916c0,0,2.625-3.574,2.745-3.657c0.203-0.135,0.452-0.141,0.69-0.025\tc0.691,0.335,2.085,2.405,2.167,3.199v0.027c0.024,0.271-0.082,0.491-0.273,0.623c-0.132,0.083-4.43,1.155-4.43,1.155\tc-0.322,0.096-0.68-0.06-0.882-0.381L11.464,10.789z M9.475,9.563C9.32,9.609,8.848,9.757,8.269,8.817c0,0-3.916-6.16-4.007-6.351\tc-0.057-0.212,0.011-0.455,0.202-0.65C5.047,1.211,8.21,0.327,9.037,0.529c0.27,0.069,0.457,0.238,0.522,0.479\tc0.047,0.266,0.433,5.982,0.488,7.264C10.098,9.368,9.629,9.517,9.475,9.563z M9.927,19.066c-0.083,0.225-0.273,0.373-0.54,0.421\tc-0.762,0.13-3.15-0.751-3.647-1.342c-0.096-0.131-0.155-0.262-0.167-0.394c-0.011-0.095,0-0.189,0.036-0.272\tc0.061-0.155,2.917-3.538,2.917-3.538c0.214-0.272,0.595-0.355,0.952-0.213c0.345,0.13,0.56,0.428,0.536,0.749\tC10.014,14.479,9.977,18.923,9.927,19.066z M3.495,13.912c-0.235-0.009-0.444-0.148-0.568-0.382c-0.089-0.17-0.151-0.453-0.19-0.794\tC2.63,11.701,2.761,10.144,3.07,9.648c0.145-0.226,0.357-0.345,0.592-0.336c0.154,0,4.255,1.667,4.255,1.667\tc0.321,0.118,0.521,0.453,0.5,0.833c-0.023,0.37-0.236,0.655-0.551,0.738L3.495,13.912z"/></svg>',
            youtube: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15,4.1c1,0.1,2.3,0,3,0.8c0.8,0.8,0.9,2.1,0.9,3.1C19,9.2,19,10.9,19,12c-0.1,1.1,0,2.4-0.5,3.4c-0.5,1.1-1.4,1.5-2.5,1.6 c-1.2,0.1-8.6,0.1-11,0c-1.1-0.1-2.4-0.1-3.2-1c-0.7-0.8-0.7-2-0.8-3C1,11.8,1,10.1,1,8.9c0-1.1,0-2.4,0.5-3.4C2,4.5,3,4.3,4.1,4.2 C5.3,4.1,12.6,4,15,4.1z M8,7.5v6l5.5-3L8,7.5z"/></svg>'
        });
    }
    if (typeof window !== "undefined" && window.UIkit) {
        window.UIkit.use(plugin);
    }
    return plugin;
});

(function() {
    "use strict";
    var _$Templater_7 = {
        compile: compile,
        setOptions: setOptions
    };
    const options = {};
    options.pattern = /\{(.*?)\}/g;
    options.template = "";
    options.middleware = function() {};
    function setOptions(_options) {
        options.pattern = _options.pattern || options.pattern;
        options.template = _options.template || options.template;
        if (typeof _options.middleware === "function") {
            options.middleware = _options.middleware;
        }
    }
    function compile(data) {
        return options.template.replace(options.pattern, function(match, prop) {
            const value = options.middleware(prop, data[prop], options.template);
            if (typeof value !== "undefined") {
                return value;
            }
            return data[prop] || match;
        });
    }
    "use strict";
    function fuzzysearch(needle, haystack) {
        var tlen = haystack.length;
        var qlen = needle.length;
        if (qlen > tlen) {
            return false;
        }
        if (qlen === tlen) {
            return needle === haystack;
        }
        outer: for (var i = 0, j = 0; i < qlen; i++) {
            var nch = needle.charCodeAt(i);
            while (j < tlen) {
                if (haystack.charCodeAt(j++) === nch) {
                    continue outer;
                }
            }
            return false;
        }
        return true;
    }
    var _$fuzzysearch_1 = fuzzysearch;
    "use strict";
    var _$FuzzySearchStrategy_5 = new FuzzySearchStrategy();
    function FuzzySearchStrategy() {
        this.matches = function(string, crit) {
            return _$fuzzysearch_1(crit.toLowerCase(), string.toLowerCase());
        };
    }
    "use strict";
    var _$LiteralSearchStrategy_6 = new LiteralSearchStrategy();
    function LiteralSearchStrategy() {
        this.matches = function(str, crit) {
            if (!str) return false;
            str = str.trim().toLowerCase();
            crit = crit.trim().toLowerCase();
            return crit.split(" ").filter(function(word) {
                return str.indexOf(word) >= 0;
            }).length === crit.split(" ").length;
        };
    }
    "use strict";
    var _$Repository_4 = {
        put: put,
        clear: clear,
        search: search,
        setOptions: __setOptions_4
    };
    function NoSort() {
        return 0;
    }
    const data = [];
    let opt = {};
    opt.fuzzy = false;
    opt.limit = 10;
    opt.searchStrategy = opt.fuzzy ? _$FuzzySearchStrategy_5 : _$LiteralSearchStrategy_6;
    opt.sort = NoSort;
    opt.exclude = [];
    function put(data) {
        if (isObject(data)) {
            return addObject(data);
        }
        if (isArray(data)) {
            return addArray(data);
        }
        return undefined;
    }
    function clear() {
        data.length = 0;
        return data;
    }
    function isObject(obj) {
        return Boolean(obj) && Object.prototype.toString.call(obj) === "[object Object]";
    }
    function isArray(obj) {
        return Boolean(obj) && Object.prototype.toString.call(obj) === "[object Array]";
    }
    function addObject(_data) {
        data.push(_data);
        return data;
    }
    function addArray(_data) {
        const added = [];
        clear();
        for (let i = 0, len = _data.length; i < len; i++) {
            if (isObject(_data[i])) {
                added.push(addObject(_data[i]));
            }
        }
        return added;
    }
    function search(crit) {
        if (!crit) {
            return [];
        }
        return findMatches(data, crit, opt.searchStrategy, opt).sort(opt.sort);
    }
    function __setOptions_4(_opt) {
        opt = _opt || {};
        opt.fuzzy = _opt.fuzzy || false;
        opt.limit = _opt.limit || 10;
        opt.searchStrategy = _opt.fuzzy ? _$FuzzySearchStrategy_5 : _$LiteralSearchStrategy_6;
        opt.sort = _opt.sort || NoSort;
        opt.exclude = _opt.exclude || [];
    }
    function findMatches(data, crit, strategy, opt) {
        const matches = [];
        for (let i = 0; i < data.length && matches.length < opt.limit; i++) {
            const match = findMatchesInObject(data[i], crit, strategy, opt);
            if (match) {
                matches.push(match);
            }
        }
        return matches;
    }
    function findMatchesInObject(obj, crit, strategy, opt) {
        for (const key in obj) {
            if (!isExcluded(obj[key], opt.exclude) && strategy.matches(obj[key], crit)) {
                return obj;
            }
        }
    }
    function isExcluded(term, excludedTerms) {
        for (let i = 0, len = excludedTerms.length; i < len; i++) {
            const excludedTerm = excludedTerms[i];
            if (new RegExp(excludedTerm).test(term)) {
                return true;
            }
        }
        return false;
    }
    "use strict";
    var _$JSONLoader_2 = {
        load: load
    };
    function load(location, callback) {
        const xhr = getXHR();
        xhr.open("GET", location, true);
        xhr.onreadystatechange = createStateChangeListener(xhr, callback);
        xhr.send();
    }
    function createStateChangeListener(xhr, callback) {
        return function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    callback(null, JSON.parse(xhr.responseText));
                } catch (err) {
                    callback(err, null);
                }
            }
        };
    }
    function getXHR() {
        return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    }
    "use strict";
    var _$OptionsValidator_3 = function OptionsValidator(params) {
        if (!validateParams(params)) {
            throw new Error("-- OptionsValidator: required options missing");
        }
        if (!(this instanceof OptionsValidator)) {
            return new OptionsValidator(params);
        }
        const requiredOptions = params.required;
        this.getRequiredOptions = function() {
            return requiredOptions;
        };
        this.validate = function(parameters) {
            const errors = [];
            requiredOptions.forEach(function(requiredOptionName) {
                if (typeof parameters[requiredOptionName] === "undefined") {
                    errors.push(requiredOptionName);
                }
            });
            return errors;
        };
        function validateParams(params) {
            if (!params) {
                return false;
            }
            return typeof params.required !== "undefined" && params.required instanceof Array;
        }
    };
    "use strict";
    var _$utils_9 = {
        merge: merge,
        isJSON: isJSON
    };
    function merge(defaultParams, mergeParams) {
        const mergedOptions = {};
        for (const option in defaultParams) {
            mergedOptions[option] = defaultParams[option];
            if (typeof mergeParams[option] !== "undefined") {
                mergedOptions[option] = mergeParams[option];
            }
        }
        return mergedOptions;
    }
    function isJSON(json) {
        try {
            if (json instanceof Object && JSON.parse(JSON.stringify(json))) {
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    }
    var _$src_8 = {};
    (function(window) {
        "use strict";
        let options = {
            searchInput: null,
            resultsContainer: null,
            json: [],
            success: Function.prototype,
            searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
            templateMiddleware: Function.prototype,
            sortMiddleware: function() {
                return 0;
            },
            noResultsText: "No results found",
            limit: 10,
            fuzzy: false,
            debounceTime: null,
            exclude: []
        };
        let debounceTimerHandle;
        const debounce = function(func, delayMillis) {
            if (delayMillis) {
                clearTimeout(debounceTimerHandle);
                debounceTimerHandle = setTimeout(func, delayMillis);
            } else {
                func.call();
            }
        };
        const requiredOptions = [ "searchInput", "resultsContainer", "json" ];
        const optionsValidator = _$OptionsValidator_3({
            required: requiredOptions
        });
        window.SimpleJekyllSearch = function(_options) {
            const errors = optionsValidator.validate(_options);
            if (errors.length > 0) {
                throwError("You must specify the following required options: " + requiredOptions);
            }
            options = _$utils_9.merge(options, _options);
            _$Templater_7.setOptions({
                template: options.searchResultTemplate,
                middleware: options.templateMiddleware
            });
            _$Repository_4.setOptions({
                fuzzy: options.fuzzy,
                limit: options.limit,
                sort: options.sortMiddleware,
                exclude: options.exclude
            });
            if (_$utils_9.isJSON(options.json)) {
                initWithJSON(options.json);
            } else {
                initWithURL(options.json);
            }
            const rv = {
                search: search
            };
            typeof options.success === "function" && options.success.call(rv);
            return rv;
        };
        function initWithJSON(json) {
            _$Repository_4.put(json);
            registerInput();
        }
        function initWithURL(url) {
            _$JSONLoader_2.load(url, function(err, json) {
                if (err) {
                    throwError("failed to get JSON (" + url + ")");
                }
                initWithJSON(json);
            });
        }
        function emptyResultsContainer() {
            options.resultsContainer.innerHTML = "";
        }
        function appendToResultsContainer(text) {
            options.resultsContainer.innerHTML += text;
        }
        function registerInput() {
            options.searchInput.addEventListener("input", function(e) {
                if (isWhitelistedKey(e.which)) {
                    emptyResultsContainer();
                    debounce(function() {
                        search(e.target.value);
                    }, options.debounceTime);
                }
            });
        }
        function search(query) {
            if (isValidQuery(query)) {
                emptyResultsContainer();
                render(_$Repository_4.search(query), query);
            }
        }
        function render(results, query) {
            const len = results.length;
            if (len === 0) {
                return appendToResultsContainer(options.noResultsText);
            }
            for (let i = 0; i < len; i++) {
                results[i].query = query;
                appendToResultsContainer(_$Templater_7.compile(results[i]));
            }
        }
        function isValidQuery(query) {
            return query && query.length > 0;
        }
        function isWhitelistedKey(key) {
            return [ 13, 16, 20, 37, 38, 39, 40, 91 ].indexOf(key) === -1;
        }
        function throwError(message) {
            throw new Error("SimpleJekyllSearch --- " + message);
        }
    })(window);
})();

/*function formsubmit() {
    var opurl = "https://openness-staging.onsumaye.com/index.php?option=com_products&task=githubpages_release_request";
    var form = $("#requestAccess");
    var url = $.ajax({
        type: form.attr("method"),
        url: opurl,
        crossDomain: true,
        data: form.serialize(),
        success: function(data) {
            var data = jQuery.parseJSON(data);
            if (data.status == 1) {
                window.location.href = "/intel-smart-edge-open/thankyou";
            } else {
                $("#bug").html(data.msg.serverError);
            }
        }
    });
}

function contactformsubmit() {
    var opurl = "https://openness.localhost.com/index.php?option=com_products&task=githubpages_contact_request";
    var form = $("#contact");
    var url = $.ajax({
        type: form.attr("method"),
        url: opurl,
        crossDomain: true,
        data: form.serialize(),
        success: function(data) {
            var data = jQuery.parseJSON(data);
            if (data.status == 1) {
                window.location.href = "/intel-smart-edge-open/thankyou";
            } else {
                $("#bug").html(data.msg.serverError);
            }
        }
    });
}*/

jQuery(document).ready(function() {
    jQuery("input[name='existing_member']").click(function() {
        if (jQuery("input:radio[name=existing_member]:checked").val() == "yes") {
            $(".cn-no").hide();
            $(".cn-yes").show();
            var options = [ "128 Technology", "3nfinite", "5x9 Networks", "5x9 Networks", "99cloud", "A TLC srl", "A1 TELEKOM AUSTRIA AG", "A1 TELEKOM AUSTRIA AG", "A5G Networks", "AAEON", "Aarna Networks, Inc.", "Accedian", "Accelercomm", "Acceleron Labs", "Accenture, LLP", "Accelleran", "AcceAccton Technology", "Actian Corporation" ];
            $("#companyname").empty();
            $("#companyname").append('<option value="" selected="selected">Select Company</option>');
            $.each(options, function(i, p) {
                $("#companyname").append($("<option></option>").val(p).html(p));
            });
        } else if (jQuery("input:radio[name=existing_member]:checked").val() == "no") {
            $(".cn-no").show();
            $(".cn-yes").hide();
        } else {
            $(".cn-no").hide();
            $(".cn-yes").hide();
        }
    });

    jQuery('.collapsedArea ul li > span').on('click', function(){
        if(jQuery(this).next('ul').is(':visible')){
            jQuery(this).next('ul').slideUp();
            jQuery(this).parent('li').removeClass('openList');
        }
        else{
            jQuery(this).next('ul').slideDown();
            jQuery(this).parent('li').addClass('openList');
        }
    });
});


function cleanString(str) {
    return str.replace(/[^A-Za-z0-9,_()&reg;.-:{}$%@!~=+'&#39;`? ]/g, "");
}
jQuery(window).on('load', function(){
    var pathURL = window.location.pathname + window.location.search + window.location.hash;
    var pathname = pathURL.replace(/\/$/, "");
    if(pathname.includes('/docs/') || pathname.includes('/ido-specs/')){
        jQuery('.sidebar-docs .leftSection .collapsedArea ul li span a[href="'+pathname+'"]').parent('span').parent('li').addClass('uk-active');
    }
    jQuery('.sidebar-docs .leftSection .collapsedArea ul li>ul li span a').on('click', function(){
        setTimeout(function(){
            pathURL = window.location.pathname + window.location.search + window.location.hash;
            var pathname = pathURL.replace(/\/$/, "");
            jQuery('.sidebar-docs .leftSection .collapsedArea ul li').removeClass('uk-active')
            jQuery('.sidebar-docs .leftSection .collapsedArea ul li span a[href="'+pathname+'"]').parent('span').parent('li').addClass('uk-active');
            jQuery('.sidebar-docs .leftSection .collapsedArea ul li span a[href="'+pathname+'"]').parent('span').parent('li').siblings('li').removeClass('openList')
        }, 500)


        if(jQuery('#breadcrumbs').length){
			setTimeout(function(){
				const breadcrumbs    = document.querySelector('#breadcrumbs').innerHTML;
				const homeLink       = breadcrumbs.split("&gt;")[0];
				const allActiveTabs  = document.querySelectorAll('.openList');
				let nodeList = '';
				allActiveTabs.forEach(function(activeTab, i) {
					nodeList = (i == 0) ? activeTab.firstElementChild.innerHTML : nodeList+" > "+activeTab.firstElementChild.innerText;
				});
				document.querySelector('#breadcrumbs').innerHTML = '';
				document.querySelector('#breadcrumbs').innerHTML =  homeLink + " > " + nodeList; 
			}, 600)
		}
	})
    if(jQuery('.sidebar-docs .leftSection .collapsedArea ul li.uk-active').length > 0){
        jQuery('.sidebar-docs .leftSection .collapsedArea ul li.uk-active').parents('.hasChild').addClass('openList');
        jQuery('.sidebar-docs .leftSection .collapsedArea ul li.uk-active').parents('.hasChild').children('.uk-nav').slideDown();
    }
    setTimeout(function(){
        if(jQuery('.sidebar-docs .leftSection .collapsedArea ul li.uk-active').length){
            jQuery('.sidebar-docs .leftSection .collapsedArea').animate({
                scrollTop: jQuery('.sidebar-docs .leftSection .collapsedArea ul li.uk-active').position().top
            });
        }
    }, 1000)
   jQuery('.menuIcon').on('click', function(){
        jQuery(this).parent('.toggleMenu').toggleClass('showMenu')
    })
    if(jQuery('#breadcrumbs').length){
		console.log("On load");
        setTimeout(function(){
            const breadcrumbs    = document.querySelector('#breadcrumbs');
            const allActiveTabs  = document.querySelectorAll('.openList');
            let nodeList = '';
            allActiveTabs.forEach(function(activeTab, i) {
                nodeList = (i == 0) ? activeTab.firstElementChild.innerHTML : nodeList+" > "+activeTab.firstElementChild.innerHTML;
                //console.log(nodeList);
            });
            const linkText =  jQuery('.sidebar-docs .leftSection .collapsedArea ul li span a[href="'+pathname+'"]').text();
            if(nodeList != ''){
                breadcrumbs.insertAdjacentHTML("beforeend", nodeList+ " > " +linkText);
            }else{
                breadcrumbs.insertAdjacentHTML("beforeend", linkText);
            }

        }, 10)
    }
})
jQuery(window).on('resize', function(){
    if(jQuery(window).width() >= 960){
        jQuery('#offcanvas-docs').removeClass('uk-offcanvas-overlay uk-open');
    }
})
jQuery(window).on('scroll', function(){
    if(jQuery(window).scrollTop() >= 200){
        jQuery('.leftSection').addClass('leftSectionFixed');
    }
    else{
        jQuery('.leftSection').removeClass('leftSectionFixed');
    }
})

