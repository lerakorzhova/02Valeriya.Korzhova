var app = {
    housesArray: [],
    personsArray: []
}

app.generateHouse = function (numberOfFlats, area, material, numberOfFloors, address, year) {
    var house = {
        numberOfFlats: numberOfFlats,
        area: area,
        material: material,
        numberOfFloors: numberOfFloors,
        address: address,
        year: year,
        residents: []
    };
    return house;
};

app.generatePerson = function (weight, height, name, gender, age, occupation) {
    var person = {
        weight: weight,
        height: height,
        name: name,
        gender: gender,
        age: age,
        occupation: occupation,
        address: "",
        settlement: function (house) {
            house.residents.push(this);
            this.address = house.address;
        }
    };
    return person;
};

app.createHouse = function () {
    alert("Creating a house...");
    var numberOfFlats = prompt("Enter number of flats: ");
    var area = prompt("Enter number of square meters: ");
    var material = prompt("Enter a material of house: ");
    var numberOfFloors = prompt("Enter number of floors: ");
    var address = prompt("Enter house`s address: ");
    var year = prompt("Enter year of the house: ");
    this.housesArray.push(app.generateHouse(numberOfFlats, area, material, numberOfFloors, address, year));
    return;
};

app.createPerson = function () {
    alert("Creating a person...");
    var weight = prompt("Enter weight:");
    var height = prompt("Enter height:");
    var name = prompt("Enter name:");
    var gender = prompt("Enter gender:");
    var age = prompt("Enter age:");
    var occupation = prompt("Enter occupation:");
    this.personsArray.push(app.generatePerson(weight, height, name, gender, age, occupation));
    return;
};

app.movePersonToHouse = function (personName, houseAddress) {
    var persons = this.personsArray.filter(function (a) {
        return a.name === personName;
    });
    var houses = this.housesArray.filter(function (a) {
        return a.address === houseAddress;
    });
    persons.forEach(function (a) {
        a.settlement(houses);
    });
    console.log(this.housesArray);
    console.log(this.personsArray);
    return;
};

app.sortHousesByAddress = function () {
    alert('Sort the houses by address...');
    app.housesArray.sort(function (a, b) {
        return a.address.localeCompare(b.address);
    });
    console.log(app.housesArray);
    return;
};

app.sortHousesByNumber = function () {
    alert('Sort the houses by the number of residents...');
    app.housesArray.sort(function (a, b) {
        return a.residents.length - b.residents.length
    });
    console.log(app.housesArray);
};

app.deleteAndStartAgain = function () {
    app.housesArray = [];
    app.personsArray = [];
    alert("DELETE AND START AGAIN");
    app.start();
    return;
};

app.start = function () {
    var numberOfHouses = prompt("Enter number of houses:");
    var numberOfPersons = prompt("Enter number of persons:");
    for (var i = 1; i <= numberOfHouses; i++) {
        app.createHouse();
    }
    for (var i = 1; i <= numberOfPersons; i++) {
        app.createPerson();
    }
    var numberOfSetlements = prompt("How many persons do you want to move to house?");
    for (var i = 1; i <= numberOfSetlements; i++) {
        app.movePersonToHouse(prompt("Person's name:"), prompt("Address:"));
    }
    app.sortHousesByAddress();
    app.sortHousesByNumber();
    app.deleteAndStartAgain();
    return;
};

app.start();