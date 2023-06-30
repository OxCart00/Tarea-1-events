import { createTabs, changeColor } from '../src/modules/tabs.js';
import { yourEvents } from '../src/settings.js';

createTabs(yourEvents);

const tabButtons = document.querySelectorAll('.tabButton');

// Agrega un controlador de eventos al botón
tabButtons.forEach(function (element, index) {
  element.addEventListener('click', async function () {
    changeColor(index);
  });
});
