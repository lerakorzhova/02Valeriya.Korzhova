'use strict';
document.write('<table border="1"> <tr><th>Название характеристики</th><th>Значение</th>  <tr><td>Ширина области просмотра</td><td>' + window.innerWidth + '</td></tr> <tr><td>Высота области просмотра</td><td>' + window.innerHeight + '</td></tr> <tr><td>href</td><td>' + window.location.href + '</td></tr> <tr><td>host</td><td>' + window.location.host + '</td></tr> <tr><td>protocol</td><td>' + window.location.protocol + '</td></tr> <tr><td>Кодовое имя браузера</td><td>' + window.navigator.appCodeName + '</td></tr> <tr><td>Имя браузера</td><td>' + window.navigator.appName + '</td></tr> <tr><td>User Agent</td><td>' + window.navigator.userAgent + '</td></tr> <tr><td>Ширина экрана</td><td>' + window.screen.width + '</td></tr> <tr><td>Включены ли cookies</td><td>' + window.navigator.cookieEnabled + '</td></tr> <tr><td>Включена ли поддержка java</td><td>' + window.navigator.javaEnabled() + '</td></tr> <tr><td>Высота экрана</td><td>' + window.screen.height + '</td></tr>  <tr><td>полезная ширина экрана</td>    <td>' + window.screen.availWidth + '</td></tr>  <tr><td>полезная высота экрана</td><td>' + window.screen.availHeight + '</td></tr>  <tr><td>Число бит для цветопередачи</td><td>' + window.screen.colorDepth + '</td></tr>  <tr><td>Ориентация экрана</td><td>' + window.screen.orientation.angle + '<br />' + window.screen.orientation.type + '<br />' + window.screen.orientation.onchange + '</td></tr>  </table>');