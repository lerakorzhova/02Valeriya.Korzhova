/*Написать функцию, которая выведет все комментарии с веб-страницы в консоль*/

'use strict';

function getComment(elem) {
    var comments = [];
    function findComment(elem) {
        for (var i = 0; i < elem.childNodes.length; i++) {
            if (elem.childNodes[i].nodeType == 8)
                comments.push(elem.childNodes[i].nodeValue);
            findComment(elem.childNodes[i]);
        }
        return comments;
    }
    console.log(findComment(elem));
}

getComment(document);