module.exports = exports = terrier;
exports.compile = compile;

var pluck = require('pluck-elements');

var doc         = (typeof document !== 'undefined') ? document : null;
var mapperFn    = null;
var EMPTY       = {};

module.exports.setDocument = function(_doc) {
    doc = _doc;
}

module.exports.setNodeMapper = function(_fn) {
    mapperFn = _fn;
}

function terrier(html, opts) {
    var el = templateToNode(html);
    opts = opts || EMPTY;
    return pluck(el, opts.attribute, opts.mapNode || mapperFn);
}

function compile(html, opts) {
    return new Template(html, opts || EMPTY);
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

function Template(html, opts) {
    this._frag = doc.createDocumentFragment();
    this._frag.appendChild(templateToNode(html));
    this._attr = opts.attribute;
    this._mapNode = opts.mapNode || mapperFn;
}

Template.prototype.instance = function() {
    return pluck(
        this._frag.cloneNode(true).childNodes[0],
        this._attr,
        this._mapNode
    );
}