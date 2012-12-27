module.exports = require('cssauron')({
  tag: function(node) { return (node.tagName || '').toLowerCase() }
, contents: function(node) { return node.innerText || node.textContent || '' }
, id: 'id'
, "class": 'className'
, parent: 'parentNode'
, children: function(node) {
    if(node.children) {
      return node.children
    }

    var out = []
    for(var i = 0, len = node.childNodes.length; i < len; ++i) {
      if(node.childNodes[i].tagName) out.push(node.childNodes[i])
    } 
    return out
  }
, attr: function(node, attr) { return node.getAttribute(attr) }
})
