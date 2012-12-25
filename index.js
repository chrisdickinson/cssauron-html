module.exports = require('cssauron')({
  tag: function(node) { return (node.tagName || '').toLowerCase() }
, contents: function(node) { return node.innerText || node.innerHTML }
, id: 'id'
, "class": 'className'
, parent: 'parentNode'
, children: 'children'
, attr: function(node, attr) { return node.getAttribute(attr) }
})
