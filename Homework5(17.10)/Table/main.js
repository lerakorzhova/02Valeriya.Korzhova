//Создать на базе массивов таблицу о странах мира с информацией о флаге, названии, телефонном коде, населении и т.д. 

'use strict';

var array = [{
        country: "Belarus",
        code: "+375",
        population: 9400000,
        img: "bel.png"
},
    {
        country: "Russia",
        code: "+7",
        population: 146544710,
        img: "rus.png"
},
    {
        country: "Ukraine",
        code: "+380",
        population: 48240902,
        img: "ukr.png"
},
    {
        country: "Lithuania",
        code: "+370",
        population: 2956000,
        img: "lit.png"
},
    {
        country: "Latvia",
        code: "+371",
        population: 2013000,
        img: "lat.png"
},
    {
        country: "Poland",
        code: "+48",
        population: 38623221,
        img: "pol.png"
}
]

var table = document.createElement('table');
var div = document.createElement("div");
var title=document.createElement("tr");
title.innerHTML="<th>Country</th><th>Code</th><th>Population</th><th>Flag</th>";
table.appendChild(title);
table.setAttribute('border', 1);
table.setAttribute('cellpadding', 10)
document.body.appendChild(div);
div.appendChild(table);

for (var i = 0; i < array.length; i++) {
    var row = document.createElement("tr");
    for (var j in array[i]) {
        var cell = document.createElement("td");
        if (j !== 'img') {
            cell.innerHTML = array[i][j];
            table.appendChild(row);
            row.appendChild(cell);
        }
    }
    var img = document.createElement("img");
    var cell2 = document.createElement("td");
    img.setAttribute('src', array[i].img);
    cell2.appendChild(img);
    row.appendChild(cell2);
}