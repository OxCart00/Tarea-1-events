import { createTabs, changeColor } from '../Js/tabs.js';
import { storageInfo } from '../Js/events.js';
import categories from '../Js/settings.js';

createTabs(categories);

const tabButtons = document.querySelectorAll('.tabButton');
let API_URL;

// Agrega un controlador de eventos al botón
tabButtons.forEach(function (element, index) {
  element.addEventListener('click', function () {
    changeColor(index);
    API_URL = `https://knassbani2.execute-api.us-east-2.amazonaws.com/events/${element.id}`;
    storageInfo(API_URL, element.id);
  });
});
