'use strict';

function getTree(elem) {
    var tree = {
        element: elem,
        children: []
    };
    for(var i=0; i<elem.childNodes.length; i++){
        tree.children.push(getTree(elem.childNodes[i]));
    }
    return tree;
}

var Tree=getTree(document);
console.log(Tree);






