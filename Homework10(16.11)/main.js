"use strict";
/*1.Выделять текст жирным, подчеркнутым, курсивом и снимать это поведение
2. Изменять размер шрифта и сам шрифт
3. Вставлять списки и вертикальные линии в текст
4. Изменять цвет и фоновой цвет текста, задавать выравнивание текста и добавлять/удалять отступы
5. Добавлять в текст ссылки. Адрес ссылки запрашивается у пользователя.
6. Подсвечивать в интерфейсе состояние текста и дать возможность очистить форматирование*/

var div = document.getElementById("container");
div.contentEditable = true;

///////////////////////////////////////////////////////////////////////

var bold = document.getElementById("bold");
bold.addEventListener("click", function () {
    document.execCommand("bold", false, null);
    checkState("bold", bold);
})

var italic = document.getElementById("italic");
italic.addEventListener("click", function () {
    document.execCommand("italic", false, null);
    checkState("italic", italic);
})

var underline = document.getElementById("underline");
underline.addEventListener("click", function () {
    document.execCommand("underline", false, null);
    checkState("underline", underline);
})

/////////////////////////////////////////////////////////////////////////

function checkState(event, ob) {
    if (document.queryCommandState(event)) {
        ob.setAttribute("class", "btn selected");
    } else {
        ob.removeAttribute("class", "selected");
        ob.setAttribute("class", "btn");
    }
}

////////////////////////////////////////////////////////////////////////

var fontName = document.getElementById("fontName");
fontName.addEventListener("change", function () {
    document.execCommand("fontname", false, fontName.value);
})

var fontSize = document.getElementById("fontSize");
fontSize.addEventListener("change", function () {
    document.execCommand("fontsize", false, +fontSize.value);
})

/////////////////////////////////////////////////////////////////////////

var horLine =
    document.getElementById("horLine");
horLine.addEventListener("click", function () {
    document.execCommand("inserthorizontalrule", false, null);
})

var unList = document.getElementById("unList");
unList.addEventListener("click", function () {
    if (!document.queryCommandState("insertorderedlist")) {
        document.execCommand("insertunorderedlist", false, null);
        checkState("insertunorderedlist", unList);
    }
})

var onList = document.getElementById("onList");
onList.addEventListener("click", function () {
    if (!document.queryCommandState("insertunorderedlist")) {
        document.execCommand("insertorderedlist", false, null);
        checkState("insertorderedlist", onList);
    }
})

//////////////////////////////////////////////////////////////////////////

var fontColor = document.getElementById("fontColor");
fontColor.addEventListener("change", function () {
    document.execCommand("forecolor", false, fontColor.value);
})

var textColor = document.getElementById("textColor");
textColor.addEventListener("change", function () {
    document.execCommand("backcolor", false, textColor.value);
})

var left = document.getElementById("left");
left.addEventListener("click", function () {
    document.execCommand("justifyLeft", false, null);
})

var center = document.getElementById("center");
center.addEventListener("click", function () {
    document.execCommand("justifyCenter", false, null);

})

var right = document.getElementById("right");
right.addEventListener("click", function () {
    document.execCommand("justifyRight", false, null);
})

var indent = document.getElementById("indent");
indent.addEventListener("click", function () {
    document.execCommand("indent", false, null);
})

var outdent = document.getElementById("outdent");
outdent.addEventListener("click", function () {
    document.execCommand("outdent", false, null);
})

//////////////////////////////////////////////////////////////////////////

var link = document.getElementById("link");
link.addEventListener("click", function () {
    var url = prompt("Enter a link: ");
    if (url !== "") {
        document.execCommand("createlink", false, url);
    }
})

//////////////////////////////////////////////////////////////////////////

var reset = document.getElementById("reset");
reset.addEventListener("click", function () {
    document.execCommand("removeformat", false, null);
})