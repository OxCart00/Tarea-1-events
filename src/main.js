import { createTabs, changeColor } from '../src/modules/tabs.js';
import { storageInfo } from '../src/events.js';
import categories from '../src/settings.js';

createTabs(categories);

const tabButtons = document.querySelectorAll('.tabButton');
let API_URL;

// Init
changeColor(0);
API_URL = `https://knassbani2.execute-api.us-east-2.amazonaws.com/events/music`;
await storageInfo(API_URL, "music");

// Agrega un controlador de eventos al botón
tabButtons.forEach(function (element, index) {
  element.addEventListener('click', async function () {
    changeColor(index);
    API_URL = `https://knassbani2.execute-api.us-east-2.amazonaws.com/events/${element.id}`;
    await storageInfo(API_URL, element.id);
  });
});
