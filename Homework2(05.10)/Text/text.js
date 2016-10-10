//Написать функцию, которая принимает в себя строку и массив с ключевых слов. Функция должна
//каждое ключевое слово выделить тегом <b>. Ввести достаточно крупный текст и вывести в страницу результат обработки

var str = prompt('Enter your string: ');
var keyWords = prompt('Enter keywords: ');
var keyWordsArray = keyWords.split(', ');

document.writeln('Your text: ' + str);
document.writeln('Your keywords: ');
for (var i = 0; i < keyWordsArray.length; i++) {
    document.writeln(keyWordsArray[i] + ' ');
}

function enterText(text, array) {
    for (var i = 0; i < keyWordsArray.length; i++) {
        var pattern = new RegExp(keyWordsArray[i], 'g');
        text=text.replace(pattern, function(){
            return '<b>'+keyWordsArray[i]+'</b>';
        });
    }
    return text;
}
var result=enterText(str, keyWordsArray);
document.writeln('Result: '+result);