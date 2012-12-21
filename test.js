var test = require('tape')
  , language = require('./index')

var tests = [
    test_select_single      // all of the selectors by themselves
  , test_select_multiple    // all of the combinators
]

start()

function setup() {
}

// integration tests because reasons.

function test_select_single(t) {
  var data = document.createElement('div')

  data.id = 'one-id'
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
}

function test_select_multiple(t) {
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
}

// utils

function out(what) {
  console.log(what)
}

// test runner

function start() {
  run()
}

function run() {
  var next = tests.shift()
    , now = Date.now()

  setup()

  out(next.name+' - ')
  next.length > 1 ? test(next.name, next).on('end', done) : (test(next.name, next).end(), done())

  function done() {
    out('# '+next.name+' '+(Date.now() - now)+'ms\n')
    run()
  }
}
