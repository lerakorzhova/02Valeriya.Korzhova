'use strict';

var identity = 0;
var infoBlock = document.getElementById('info');
var menu = document.getElementById('menu');

function Product(name, type, price, date) {
    identity++;
    return {
        name: name,
        type: type,
        price: price,
        date: date
    }
}

function FoodProduct(shelfLife) {
    this.shelfLife = shelfLife;
    Object.defineProperty(this, "shelfLife", {
        configurable: false,
        writable: false,
        enumerable: false

    });
}

FoodProduct.prototype = new Product();
FoodProduct.prototype.constructor = FoodProduct;

function Shop(name, addr, margin) {
    this.name = name;
    this.address = addr;
    this.productArr = [];
    this.margin = margin;
    this.income = 0;
    //TODO
    Object.defineProperty(this, "sumOfProducts", {
        get: function () {
            return this.sumOfProducts;
        },
        set: function () {}
    })
};

var Market = {
    showAllShops: function () {

    },
    shopsArr: []
};

var addShop = document.getElementById("add_shop");
var showMarket = document.getElementById("show_shops");

addShop.addEventListener('click', function () {
    createInputShop();
});
showMarket.addEventListener('click', function () {
    showAllShops();
});

var helpDiv = document.createElement('div');
infoBlock.appendChild(helpDiv);

function createInputShop() {
    infoBlock.removeChild(helpDiv);
    helpDiv = document.createElement('div');
    infoBlock.appendChild(helpDiv);
    helpDiv.setAttribute("class", "help");
    var nameText = document.createElement('p');
    nameText.innerHTML = "Name of shop: ";
    var name = document.createElement('input');
    name.setAttribute('type', 'text');
    helpDiv.appendChild(nameText);
    helpDiv.appendChild(name);

    var addrText = document.createElement('p');
    addrText.innerHTML = "Address of shop: ";
    var addr = document.createElement('input');
    addr.setAttribute('type', 'text');
    helpDiv.appendChild(addrText);
    helpDiv.appendChild(addr);

    var marginText = document.createElement('p');
    marginText.innerHTML = "Margin of shop: ";
    var margin = document.createElement('input');
    margin.setAttribute('type', 'number');
    helpDiv.appendChild(marginText);
    helpDiv.appendChild(margin);

    var addBth = document.createElement('div');
    addBth.innerHTML = "<button class='add'>Add</button>";
    addBth.addEventListener('click', function () {
        var shop = new Shop(name.value, addr.value, margin.value);
        Market.shopsArr.push(shop);
        name.value = '';
        addr.value = '';
        margin.value = '';
        console.log(Market.shopsArr);
    });
    helpDiv.appendChild(addBth);
}

function showAllShops() {
    infoBlock.removeChild(helpDiv);
    helpDiv = document.createElement('div');
    infoBlock.appendChild(helpDiv);
    var len = Market.shopsArr.length;
    var arr = Market.shopsArr;

    helpDiv = document.createElement('div');
    infoBlock.appendChild(helpDiv);

    for (var i = 0; i < len; i++) {
        var div = document.createElement('div');
        div.setAttribute('class', 'shop');
        helpDiv.appendChild(div);

        var nameText = document.createElement('span');
        nameText.innerHTML = 'Name of shop: <br>';
        div.appendChild(nameText);
        var name = document.createElement('textarea');
        name.innerHTML = arr[i].name;
        name.setAttribute('readonly', 'readonly');
        name.setAttribute('class', 'inp');
        div.appendChild(name);

        var addrText = document.createElement('span');
        addrText.innerHTML = '<br>Address of shop: <br>';
        div.appendChild(addrText);
        var addr = document.createElement('textarea');
        addr.innerHTML = arr[i].address;
        addr.setAttribute('readonly', 'readonly');
        addr.setAttribute('class', 'inp');
        div.appendChild(addr);

        var marginText = document.createElement('span');
        marginText.innerHTML = '<br>Margin of shop: <br>';
        div.appendChild(marginText);
        var margin = document.createElement('textarea');
        margin.setAttribute('readonly', 'readonly');
        margin.setAttribute('class', 'inp');
        margin.innerHTML = arr[i].margin;
        div.appendChild(margin);

        var incomeText = document.createElement('span');
        incomeText.innerHTML = '<br>Income of shop: <br>';
        div.appendChild(incomeText);
        var income = document.createElement('textarea');
        income.setAttribute('readonly', 'readonly');
        income.setAttribute('class', 'inp');
        income.innerHTML = arr[i].income;
        div.appendChild(income);

        var addProd = document.createElement("button");
        addProd.innerHTML = "Add product";
        var addFoodProd = document.createElement("button");
        addFoodProd.innerHTML = "Add food product";
        var showProd = document.createElement("button");
        showProd.innerHTML = "Show all products";
        var removeProd = document.createElement("button");
        removeProd.innerHTML = "Sell products";

        div.appendChild(addProd);
        div.appendChild(addFoodProd);
        div.appendChild(showProd);
        div.appendChild(removeProd);

        addProd.addEventListener('click', function () {
            addNewProd(this.parentNode.firstChild.nextSibling.value, arr);
        })
        addFoodProd.addEventListener('click', function () {
            addNewFoodProd(this.parentNode.firstChild.nextSibling.value, arr);
        })
        removeProd.addEventListener('click', function () {
            remove(this.parentNode.firstChild.nextSibling.value, arr);
        })
        showProd.addEventListener('click', function () {
            showAllProd(this.parentNode.firstChild.nextSibling.value, arr);
        })

    }
};

var addBlock = document.createElement('div');
infoBlock.appendChild(addBlock);

function addNewProd(shopName, arr) {
    infoBlock.removeChild(addBlock);
    addBlock = document.createElement('div');
    infoBlock.appendChild(addBlock);
    var shop;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === shopName) {
            shop = arr[i];
        }
    }
    var div = document.createElement('div');
    div.setAttribute('class', 'prod_info');
    menu.appendChild(div);
    var nameText = document.createElement('p');
    nameText.innerHTML = "Name of product: ";
    var name = document.createElement('input');
    name.setAttribute('type', 'text');
    div.appendChild(nameText);
    div.appendChild(name);

    var numText = document.createElement('p');
    numText.innerHTML = "Number of product: ";
    var num = document.createElement('input');
    name.setAttribute('type', 'text');
    div.appendChild(numText);
    div.appendChild(num);

    var typeText = document.createElement('p');
    typeText.innerHTML = "Type of product: ";
    var type = document.createElement('input');
    type.setAttribute('type', 'text');
    div.appendChild(typeText);
    div.appendChild(type);

    var priceText = document.createElement('p');
    priceText.innerHTML = "Price of product: ";
    var price = document.createElement('input');
    price.setAttribute('type', 'number');
    div.appendChild(priceText);
    div.appendChild(price);

    var dateText = document.createElement('p');
    dateText.innerHTML = "Date of manufacture of product: ";
    var date = document.createElement('input');
    date.setAttribute('type', 'number');
    div.appendChild(dateText);
    div.appendChild(date);

    var addBth = document.createElement('div');
    addBth.innerHTML = "<button class='add'>Add</button>";
    addBth.addEventListener('click', function () {
        for (var i = 0; i < num.value; i++) {
            var product = new Product(name.value, type.value, price.value, date.value);
            shop.productArr.push(product);
        }
        console.log(shop);
        console.log(shop.productArr);
        menu.removeChild(div);
    });
    div.appendChild(addBth);
}

function addNewFoodProd(shopName, arr) {
    infoBlock.removeChild(addBlock);
    addBlock = document.createElement('div');
    infoBlock.appendChild(addBlock);
    var shop;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === shopName) {
            shop = arr[i];
        }
    }
    var div = document.createElement('div');
    div.setAttribute('class', 'prod_info');
    menu.appendChild(div);
    var nameText = document.createElement('p');
    nameText.innerHTML = "Name of product: ";
    var name = document.createElement('input');
    name.setAttribute('type', 'text');
    div.appendChild(nameText);
    div.appendChild(name);

    var numText = document.createElement('p');
    numText.innerHTML = "Number of product: ";
    var num = document.createElement('input');
    name.setAttribute('type', 'text');
    div.appendChild(numText);
    div.appendChild(num);

    var typeText = document.createElement('p');
    typeText.innerHTML = "Type of product: ";
    var type = document.createElement('input');
    type.setAttribute('type', 'text');
    div.appendChild(typeText);
    div.appendChild(type);

    var priceText = document.createElement('p');
    priceText.innerHTML = "Price of product: ";
    var price = document.createElement('input');
    price.setAttribute('type', 'number');
    div.appendChild(priceText);
    div.appendChild(price);

    var dateText = document.createElement('p');
    dateText.innerHTML = "Date of manufacture of product: ";
    var date = document.createElement('input');
    date.setAttribute('type', 'number');
    div.appendChild(dateText);
    div.appendChild(date);

    var shelfLifeText = document.createElement('p');
    shelfLifeText.innerHTML = "Shelf life of product: ";
    var shelfLife = document.createElement('input');
    shelfLife.setAttribute('type', 'number');
    div.appendChild(shelfLifeText);
    div.appendChild(shelfLife);


    var addBth = document.createElement('div');
    addBth.innerHTML = "<button class='add'>Add</button>";
    addBth.addEventListener('click', function () {
        for (var i = 0; i < num.value; i++) {
            var product = new FoodProduct(shelfLife.value);
            product.name = name.value;
            product.type = type.value;
            product.price = price.value;
            product.date = date.value;
            product.exp = +product.date + +shelfLife.value;
            shop.productArr.push(product);
        }
        console.log(shop);
        console.log(shop.productArr);
        menu.removeChild(div);
    });
    div.appendChild(addBth);
}

function remove(shopName, arr) {
    var shop;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === shopName) {
            shop = arr[i];
        }
    }
    var div = document.createElement('div');
    div.setAttribute('class', 'prod_info');
    menu.appendChild(div);

    var nameText = document.createElement('p');
    nameText.innerHTML = "Name of product: ";
    var name = document.createElement('input');
    name.setAttribute('type', 'text');
    div.appendChild(nameText);
    div.appendChild(name);

    var numText = document.createElement('p');
    numText.innerHTML = "Number of product: ";
    var num = document.createElement('input');
    name.setAttribute('type', 'text');
    div.appendChild(numText);
    div.appendChild(num);

    var remBth = document.createElement('div');
    remBth.innerHTML = "<button class='add'>Remove</button>";
    remBth.addEventListener('click', function () {
        for (var i = 0; i < num.value; i++) {
            if (name.value === shop.productArr[i].name) delete shop.productArr[i];
        }
        menu.removeChild(div);
    });
    div.appendChild(remBth);
}

function showAllProd(shopName, arr) {
    var shop;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === shopName) {
            shop = arr[i];
        }
    }
    var div = document.createElement('div');
    div.setAttribute('class', 'prod_info');
    menu.appendChild(div);

    for (var i = 0; i < shop.productArr.length; i++) {
        var p = document.createElement("p");
        p.innerHTML = "Name of product: " + shop.productArr[i].name + "<br>Type of product: " + shop.productArr[i].type + "<br>Price of product: " + shop.productArr[i].price + "<br>Exp of product: " + shop.productArr[i].exp;
        div.appendChild(p);
    }
}
