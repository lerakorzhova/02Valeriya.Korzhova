/*Создать фреймворк, инкапсулирующий работу с DOM*/

'use strict';

var Framework = {
    get: {
        byId: function (id) {
            return document.getElementById(id);
        },
        byTag: function (tag) {
            return document.getElementsByTagName(tag);
        },
        byClass: function (className) {
            return document.getElementsByClassName(className);
        },
        byName: function (name) {
            return document.getElementsByName(name);
        },
        selectCss: function (querySelector) {
            return document.querySelector(querySelector);
        },
        selectCssAll: function (querySelector) {
            return document.querySelectorAll(querySelector);
        }
    },
    remove: function (el) {
        return el.parentNode.removeChild(el);
    },
    append: function (el, target) {
        return target.appendChild(el);
    },

    create: function (el) {
        return document.createElement(el);
    },
    replace: function (el, target) {
        return target.parentNode.replaceChild(el, target);
    },
    prepend: function (el, target) {
        return target.insertBefore(el, target.firstChild);
    },
    copy: function (el, target) {
        return target.appendChild(el.cloneNode());
    },
    copyPre: function (el, target) {
        return target.insertBefore(el.cloneNode(), target.firstChild);
    },
    randNum: function (min, max) {
        return Math.random() * (max - min) + min;
    },
    randNumInteger: function (min, max) {
        return Math.round(this.randNum(min, max));
    },
    event: function (type, el, f) {
        return {
            if (typeof el.attachEvent() === 'function') {
                el.attachEvent('on' + type, f);
            } else if (typeof el.addEventListener() === 'function') {
                el.addEventListener('type', f);
            } else {
                el.setAttribute('on' + type, 'f()');
            }
        }
    },
    unevent: function (type, el, f) {
        return {
            if (typeof el.detachEvent() === 'function') {
                el.detachEvent('on' + type, f);
            } else if (typeof el.removeEventListener() === 'function') {
                el.removeEventListener('type', f);
            } else {
                el.setAttribute('on' + type, 'null');
            }
        }
    },
    dispatch: function (type, el, f) {
        if (el.fireEvent() === 'function') {
            var evnt = document.createEventObject(window.event);
            event.srcElement.fireEvent("on" + type, f);
        } else {
            el.addEventListener(type, f);
            el.dispatchEvent(evt);
        }
    }
}