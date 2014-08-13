var terrier = require('../');
var test = require('tape');

var TEMPLATE = [
    "<div data-pluck='foo' id='foo'>",
    "  <ul>",
    "    <li data-pluck='list[] a' id='a'></li>",
    "    <li data-pluck='list[] b' id='b'></li>",
    "    <li data-pluck='list[] c' id='c'></li>",
    "  </ul>",
    "  <div><a href='#'><span><b id='nested' data-pluck='nested'></b></span></a></div>",
    "</div>"
].join("\n");

window.init = function() {
    test("create instance", function(assert) {

        var instance = terrier(TEMPLATE);

        assert.equal(instance.root.id, "foo");
        
        assert.equal(instance.a.id, 'a');
        assert.equal(instance.b.id, 'b');
        assert.equal(instance.c.id, 'c');

        assert.equal(instance.list[0].id, 'a');
        assert.equal(instance.list[1].id, 'b');
        assert.equal(instance.list[2].id, 'c');

        assert.equal(instance.nested.id, 'nested');

        assert.end();

    });

    test("compile template", function(assert) {

        var tpl = terrier.compile("<div><h1 data-pluck='title'></h1></div>");

        var i1 = tpl.instance();
        var i2 = tpl.instance();

        assert.equal(i1.root.nodeName.toLowerCase(), 'div');
        assert.equal(i2.root.nodeName.toLowerCase(), 'div');
        assert.ok(i1.root !== i2.root);

        assert.equal(i1.title.nodeName.toLowerCase(), 'h1');
        assert.equal(i2.title.nodeName.toLowerCase(), 'h1');
        assert.ok(i1.title !== i2.title);

        assert.end();

    });
}