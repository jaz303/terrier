!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.terrier=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = terrier;

var doc         = (typeof document !== 'undefined') ? document : null;
var mapperFn    = function(el) { return el; };
var ATTR        = 'data-pluck';
var EMPTY       = {};

module.exports.setDocument = function(_doc) {
    doc = _doc;
}

module.exports.setNodeMapper = function(_fn) {
    mapperFn = _fn;
}

function terrier(html, opts) {

    opts = opts || EMPTY;

    var map = opts.mapNode || mapperFn;
    var attr = opts.attribute || ATTR;
    var el  = templateToNode(html);

    var plucked = pluckDesignatedElements(el, attr, map);
    plucked.root = map(el);

    return plucked;

}

function templateToNode(html) {
    var wrapper = doc.createElement('div');
    wrapper.innerHTML = html;
    for (var i = 0, l = wrapper.childNodes.length; i < l; ++i) {
        if (wrapper.childNodes[i].nodeType === 1) {
            return wrapper.childNodes[i];
        }
    }
    return null;
}

function pluckDesignatedElements(root, attr, map) {

    var plucked = {};

    function _addOne(k, el) {
        if (k.substr(-2, 2) === '[]') {
            k = k.slice(0, -2);
            if (!(k in plucked))
                plucked[k] = [];
            if (!Array.isArray(plucked[k]))
                throw new Error("type mismatch - existing element for plucked key '" + k + "' is not an array");
            plucked[k].push(map(el));
        } else {
            plucked[k] = map(el);
        }
    }

    var els = root.querySelectorAll('[' + attr + ']');
    for (var i = 0; i < els.length; ++i) {
        var el = els[i];
        var key = el.getAttribute(attr);
        if (key.indexOf(' ') >= 0) {
            key.trim().split(/\s+/).forEach(function(k) {
                _addOne(k, el);
            });
        } else {
            _addOne(key, el);
        }
    }

    return plucked;

}
},{}]},{},[1])(1)
});