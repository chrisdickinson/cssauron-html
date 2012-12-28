if(typeof console === 'undefined') {
  console = {log: function() {}, error:function() {}}
}

Array.prototype.indexOf = function(n) {
  for(var i = this.length - 1; i > -1; --i) {
    if(this[i] === n) break
  }
  return i
}

var test = require('tape')
  , language = require('./index')

test("test select single", function test_select_single(t) {
  var data = document.createElement('div')

  data.setAttribute('id', 'one-id')
  data.setAttribute('class', 'one-class')
  data.setAttribute('first', 'test')
  data.setAttribute('second', 'gary busey')
  data.setAttribute('third', 'richard-m-nixon')

  t.ok(language('#one-id')(data))
  t.ok(!language('#one-id-false')(data))
  t.ok(language('.one-class')(data))
  t.ok(!language('.one-other-class')(data))
  t.ok(language('div')(data))
  t.ok(!language('span')(data))

  t.end()
})

test("test select multiple", function test_select_multiple(t) {
  var div = document.createElement('div')

  div.innerHTML = [
    '<div id="parent-id" class="parent-class">'
  , '  <span id="one-id" class="one-class" first="first" second="gary busey" third="richard-m-nixon"></span>'
  , '  <b id="two-id" class="two-class">hello world</b>'
  , '  <p id="three-id" class="three-class"></p>'
  , '</div>'
  ].join('')
  div.id = 'root-id'
  div.setAttribute('class', 'root-class')

  var data
    , data2
    , data3
    , parent
  try {
    data = div.children[0].children[0]
    data2 = div.children[0].children[1]
    data3 = div.children[0].children[2]
    parent = div.children[0]
  } catch(e) {
    data = div.childNodes[0].childNodes[1]
    data2 = div.childNodes[0].childNodes[3]
    data3 = div.childNodes[0].childNodes[5]
    parent = div.childNodes[0]
  }
  t.ok(language('#root-id #one-id')(data))
  t.ok(!language('#root-id > #one-id')(data))
  t.ok(language('#root-id > #parent-id > #one-id')(data))
  t.ok(language('.one-class + .two-class')(data2))
  t.ok(!language('.one-class + #one-id')(data))
  t.ok(language('span ~ #three-id')(data3))
  t.ok(language('span:first-child')(data))
  t.ok(language('span:empty')(data))
  t.ok(!language('#parent-id:empty')(parent))
  t.ok(!language('span:last-child')(data))
  t.ok(language('p:last-child')(data3))
  t.ok(language('[first]')(data))
  t.ok(!language('[dne]')(data))
  t.ok(language('[third|=m]')(data))
  t.ok(language('[third|=richard]')(data))
  t.ok(language('[third|=nixon]')(data))
  t.ok(!language('[third|=tricky-dick]')(data))
  t.ok(language('[third$=nixon]')(data))
  t.ok(!language('[third$=dixon]')(data))
  t.ok(!language('[third^=dick]')(data))
  t.ok(language('[third^=richard]')(data))
  t.ok(language('[third*=-m-]')(data))
  t.ok(!language('[third*=radical]')(data))
  t.ok(!language('[second~=dne]')(data))
  t.ok(language('[second~=gary]')(data))
  t.ok(language('[second~=busey]')(data))
  t.ok(!language(':contains(hello)')(data))
  t.ok(!language(':contains(world)')(data))
  t.ok(language(':contains(hello)')(data2))
  t.ok(language(':contains(world)')(data2))
  t.ok(language('* > .one-class')(data))
  t.end()
})
