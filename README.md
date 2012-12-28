# cssauron-html

[![browser support](http://ci.testling.com/chrisdickinson/cssauron-html.png)](http://ci.testling.com/chrisdickinson/cssauron-html)

[CSSauron](https://github.com/chrisdickinson/cssauron) preconfigured for DOM objects.

```javascript

var css = require('cssauron-html')

var sel = css('div#dom > [some-attribute]')

var el = document.getElementById('some-target')

console.log(sel(el) ? 'element matches sel' : 'element doesn\'t match ):')

```

# License

MIT
