module.exports = require('cssauron')({
  tag: function(node) { return (node.tagName || '').toLowerCase() }
, contents: 'innerText'
, id: 'id'
, "class": 'className'
, parent: 'parentNode'
, children: 'childNodes'
, attr: function(node, attr) { return node.getAttribute(attr) }
})
