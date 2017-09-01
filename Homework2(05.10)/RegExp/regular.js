//Написать регулярное выражение, которое проверяет правильность введенного номера телефона

var phoneNumber=prompt("Enter the phone number: ");
document.writeln(phoneNumber);

var bool=/\+375\-\([1-9]\d{1}\)\-[1-9]\d{2}\-\d{2}\-\d{2}/.test(phoneNumber);
document.writeln(bool);