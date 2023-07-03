import { createTabs, changeColor } from '../src/modules/tabs.js';
import { yourEvents } from '../src/settings.js';
import { buildViewGrid } from './modules/grids.js';
import LocalStorageManager from './modules/singleton__pattern.js';

const localStorageManager = new LocalStorageManager();

createTabs(yourEvents);

const tabButtons = document.querySelectorAll('.tabButton');

// Agrega un controlador de eventos al botón
tabButtons.forEach(function (element, index) {
  element.addEventListener('click', async function () {
    changeColor(index);
    buildViewGrid(localStorageManager.getItem(event.target.id));
  });
});
