module.exports = require('cssauron')({
  tag: 'tagName.toLowerCase()'
, contents: 'innerText'
, id: 'id'
, class: 'className'
, parent: 'parentNode'
, children: 'childNodes'
, attr: function(node, attr) { return node.getAttribute(attr) }
})
